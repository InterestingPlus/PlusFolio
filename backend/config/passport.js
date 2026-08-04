// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import crypto from "crypto";
import { GoogleSheetService } from "../utils/GoogleSheets.js";
import { SheetsConfig } from "../models/sheets.js";
import OAuth2Strategy from "passport-oauth2";

const sheetService = new GoogleSheetService();

// ==========================================
// 1. GOOGLE STRATEGY
// ==========================================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const googleId = profile.id;
        const name = profile.displayName || "Google User";
        const avatar = profile.photos?.[0]?.value || "";

        if (!email) return done(new Error("No email found from Google."), null);

        const allUsers = await sheetService.read("users");
        let existingUser =
          allUsers.find((u) => u.googleId === googleId) ||
          allUsers.find((u) => u.email?.toLowerCase() === email);

        if (existingUser) {
          const needsAvatarUpdate = avatar && existingUser.avatar !== avatar;
          const needsGoogleIdLink = !existingUser.googleId && googleId;

          if (needsAvatarUpdate || needsGoogleIdLink) {
            const updatedUserObj = {
              ...existingUser,
              avatar: avatar || existingUser.avatar,
              googleId: existingUser.googleId || googleId,
            };
            const rowValues = SheetsConfig.users.columns.map(
              (col) => updatedUserObj[col] ?? "",
            );
            const syncedUser = await sheetService.updateById(
              "users",
              existingUser.id,
              rowValues.slice(1),
            );
            return done(null, syncedUser);
          }
          return done(null, existingUser);
        }

        const newUserObj = {
          id: crypto.randomUUID(),
          username: email.split("@")[0],
          email: email,
          password: "",
          name: name,
          googleId: googleId,
          linkedinId: "",
          avatar: avatar,
          created_at: new Date().toISOString(),
        };

        const rowValues = SheetsConfig.users.columns.map(
          (col) => newUserObj[col] ?? "",
        );
        const createdUser = await sheetService.insert("users", rowValues);
        return done(null, createdUser);
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error, null);
      }
    },
  ),
);

// ==========================================
// 2. LINKEDIN STRATEGY
// ==========================================
// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//       callbackURL: process.env.LINKEDIN_CALLBACK_URL,
//       scope: ["openid", "profile", "email"],
//       state: false,
//       // CRITICAL FIX: Tell the strategy to use LinkedIn's OIDC /v2/userinfo endpoint!
//       profileFields: [
//         "id",
//         "first-name",
//         "last-name",
//         "email-address",
//         "picture-url",
//       ],
//       scopeSeparator: " ",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value?.toLowerCase();
//         const linkedinId = profile.id;
//         const name = profile.displayName || "LinkedIn User";
//         const avatar = profile.photos?.[0]?.value || "";

//         if (!email)
//           return done(new Error("No email found from LinkedIn."), null);

//         const allUsers = await sheetService.read("users");

//         // Match by linkedinId first, then fallback to email
//         let existingUser =
//           allUsers.find((u) => u.linkedinId === linkedinId) ||
//           allUsers.find((u) => u.email?.toLowerCase() === email);

//         if (existingUser) {
//           const needsAvatarUpdate = avatar && existingUser.avatar !== avatar;
//           const needsLinkedinIdLink = !existingUser.linkedinId && linkedinId;

//           if (needsAvatarUpdate || needsLinkedinIdLink) {
//             const updatedUserObj = {
//               ...existingUser,
//               avatar: avatar || existingUser.avatar,
//               linkedinId: existingUser.linkedinId || linkedinId,
//             };
//             const rowValues = SheetsConfig.users.columns.map(
//               (col) => updatedUserObj[col] ?? "",
//             );
//             const syncedUser = await sheetService.updateById(
//               "users",
//               existingUser.id,
//               rowValues.slice(1),
//             );
//             return done(null, syncedUser);
//           }
//           return done(null, existingUser);
//         }

//         const newUserObj = {
//           id: crypto.randomUUID(),
//           username: email.split("@")[0],
//           email: email,
//           password: "",
//           name: name,
//           googleId: "",
//           linkedinId: linkedinId,
//           avatar: avatar,
//           created_at: new Date().toISOString(),
//         };

//         const rowValues = SheetsConfig.users.columns.map(
//           (col) => newUserObj[col] ?? "",
//         );
//         const createdUser = await sheetService.insert("users", rowValues);
//         return done(null, createdUser);
//       } catch (error) {
//         console.error("LinkedIn OAuth Error:", error);
//         return done(error, null);
//       }
//     },
//   ),
// );

// ==========================================
// 2. LINKEDIN STRATEGY (Modern OIDC + Sheet Sync)
// ==========================================
passport.use(
  "linkedin",
  new OAuth2Strategy(
    {
      authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
      tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ["openid", "profile", "email"],
      state: false, // Prevents express-session dependency
    },
    async (accessToken, refreshToken, _profile, done) => {
      try {
        // 1. Fetch raw user profile directly from LinkedIn's OIDC /v2/userinfo endpoint
        const response = await fetch("https://api.linkedin.com/v2/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error(
            `LinkedIn UserInfo request failed: ${response.status}`,
          );
        }

        const userProfile = await response.json();

        // 2. Extract standardized fields from LinkedIn OIDC object
        const email = userProfile.email?.toLowerCase();
        const linkedinId = userProfile.sub;
        const name = userProfile.name || "LinkedIn User";
        const avatar = userProfile.picture || "";

        if (!email) {
          return done(
            new Error("No email found from LinkedIn OIDC response."),
            null,
          );
        }

        // 3. Fetch all users from Google Sheet
        const allUsers = await sheetService.read("users");

        // 4. Match by linkedinId first, then fallback to email (Account Linking)
        let existingUser =
          allUsers.find((u) => u.linkedinId === linkedinId) ||
          allUsers.find((u) => u.email?.toLowerCase() === email);

        if (existingUser) {
          const needsAvatarUpdate = avatar && existingUser.avatar !== avatar;
          const needsLinkedinIdLink = !existingUser.linkedinId && linkedinId;

          // Sync avatar or link linkedinId if existing email account was found
          if (needsAvatarUpdate || needsLinkedinIdLink) {
            const updatedUserObj = {
              ...existingUser,
              avatar: avatar || existingUser.avatar,
              linkedinId: existingUser.linkedinId || linkedinId,
            };

            const rowValues = SheetsConfig.users.columns.map(
              (col) => updatedUserObj[col] ?? "",
            );

            // Slice(1) assumes ID is the first column and updateById expects values after ID
            const syncedUser = await sheetService.updateById(
              "users",
              existingUser.id,
              rowValues.slice(1),
            );

            return done(null, syncedUser);
          }

          return done(null, existingUser);
        }

        // 5. Create new user if no matching account exists
        const newUserObj = {
          id: crypto.randomUUID(),
          username: email.split("@")[0],
          email: email,
          password: "", // Empty for OAuth users
          name: name,
          googleId: "",
          linkedinId: linkedinId,
          avatar: avatar,
          created_at: new Date().toISOString(),
        };

        const rowValues = SheetsConfig.users.columns.map(
          (col) => newUserObj[col] ?? "",
        );

        const createdUser = await sheetService.insert("users", rowValues);
        return done(null, createdUser);
      } catch (error) {
        console.error("LinkedIn OAuth Error:", error);
        return done(error, null);
      }
    },
  ),
);
export default passport;

// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import { GoogleSheetService } from "../utils/GoogleSheets.js";
import { SheetsConfig } from "../models/sheets.js";

const sheetService = new GoogleSheetService();

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

        if (!email) {
          return done(new Error("No email found from Google account."), null);
        }

        // 1. Check if user already exists in Google Sheets
        const allUsers = await sheetService.read("users");

        // First check by googleId, otherwise fall back to matching email
        let existingUser = allUsers.find((u) => u.googleId === googleId);

        if (!existingUser) {
          existingUser = allUsers.find((u) => u.email?.toLowerCase() === email);
        }

        // 2. If user exists, check & sync their avatar/googleId if changed
        if (existingUser) {
          const needsAvatarUpdate = avatar && existingUser.avatar !== avatar;
          const needsGoogleIdLink = !existingUser.googleId && googleId;

          // Agar photo badal gayi hai YA pehli baar Google se link ho raha hai
          if (needsAvatarUpdate || needsGoogleIdLink) {
            const updatedUserObj = {
              ...existingUser,
              avatar: avatar || existingUser.avatar,
              googleId: existingUser.googleId || googleId,
            };

            // Order row values to match SheetsConfig.users.columns (excluding id at index 0 for updatePayload)
            const rowValues = SheetsConfig.users.columns.map(
              (col) => updatedUserObj[col] ?? "",
            );
            const updatePayload = rowValues.slice(1);

            // Sheet me update kar do
            const syncedUser = await sheetService.updateById(
              "users",
              existingUser.id,
              updatePayload,
            );

            return done(null, syncedUser);
          }

          return done(null, existingUser);
        }

        // 3. If new user, create their row in SheetsConfig.users.columns order
        const newUserObj = {
          id: crypto.randomUUID(),
          username: email.split("@")[0],
          email: email,
          password: "", // Empty password for OAuth accounts
          name: name,
          googleId: googleId,
          avatar: avatar,
          created_at: new Date().toISOString(),
        };

        const rowValues = SheetsConfig.users.columns.map(
          (col) => newUserObj[col] ?? "",
        );

        const createdUser = await sheetService.insert("users", rowValues);

        return done(null, createdUser);
      } catch (error) {
        console.error("Google OAuth Strategy Error:", error);
        return done(error, null);
      }
    },
  ),
);

export default passport;

export const SheetsConfig = {
  users: {
    sheetName: "users",
    columns: [
      "id",
      "username",
      "email",
      "password",
      "name",
      "googleId",
      "linkedinId",
      "avatar",
      "created_at",
    ],
  },

  resumes: {
    sheetName: "Resumes",
    columns: [
      "id",
      "user_id",
      "title",
      "raw_input",
      "personal_info", // Stored as JSON string
      "summary",
      "experience", // Stored as JSON string
      "education", // Stored as JSON string
      "skills", // Stored as JSON string
      "projects", // Stored as JSON string
      "template",
      "ai_generated", // Stored as boolean string ("true" / "false")
      "created_at",
    ],
  },
};

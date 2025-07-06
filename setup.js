#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🚀 URL Shortener Frontend Setup");
console.log("================================\n");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.log("📝 Creating .env file...");

  const envContent = `# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# Optional: Analytics
REACT_APP_GA_TRACKING_ID=your_google_analytics_id_here
`;

  fs.writeFileSync(envPath, envContent);
  console.log("✅ .env file created successfully!");
} else {
  console.log("✅ .env file already exists");
}

console.log("\n📋 Next Steps:");
console.log("1. Update the .env file with your Google OAuth Client ID");
console.log(
  "2. Make sure your backend server is running on http://localhost:5000"
);
console.log('3. Run "npm install" to install dependencies');
console.log('4. Run "npm start" to start the development server');
console.log("\n🔗 Google OAuth Setup:");
console.log("- Go to https://console.cloud.google.com/");
console.log("- Create a new project or select existing one");
console.log("- Enable Google+ API");
console.log("- Create OAuth 2.0 credentials");
console.log("- Add http://localhost:3000 to authorized origins");
console.log("- Copy the Client ID to your .env file");

console.log("\n🎉 Setup complete! Happy coding!");

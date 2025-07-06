# CORS Setup Guide

## Frontend Configuration ✅

The frontend has been updated with proper CORS configuration:

1. **API Service** (`src/services/api.js`) - Centralized API handling
2. **withCredentials: false** - Disabled to avoid CORS issues
3. **Proper headers** - Content-Type and Authorization headers
4. **Environment variables** - Configurable API URL and slug

## Backend CORS Configuration

You need to add CORS middleware to your backend. Here's how:

### For Express.js Backend:

1. **Install CORS package:**

   ```bash
   npm install cors
   ```

2. **Add CORS middleware to your main server file:**

   ```javascript
   const express = require("express");
   const cors = require("cors");
   const app = express();

   // CORS configuration
   app.use(
     cors({
       origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
       credentials: false,
       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
       allowedHeaders: ["Content-Type", "Authorization"],
     })
   );

   // Your existing middleware and routes...
   ```

### Alternative Simple CORS Setup:

If you don't want to install the cors package, add these headers manually:

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "false");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Environment Variables

Make sure your `.env` file has the correct configuration:

```env
REACT_APP_API_URL=http://localhost:3322
REACT_APP_API_SLUG=/api/v1
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Testing

After adding CORS to your backend:

1. Restart your backend server
2. Restart your frontend development server
3. Try logging in/registering again

The CORS error should be resolved! 🎉

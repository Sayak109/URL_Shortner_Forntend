# URL Shortener Frontend

A modern, responsive React frontend for the URL Shortener application with authentication and URL management features.

## Features

- 🔐 **Authentication System**

  - Email/Password login and registration
  - Google OAuth integration
  - Protected routes
  - JWT token management

- 🎨 **Modern UI/UX**

  - Beautiful gradient design
  - Glass morphism effects
  - Responsive layout
  - Smooth animations
  - Toast notifications

- 🔗 **URL Management**

  - Shorten long URLs
  - View all shortened URLs
  - Copy shortened URLs to clipboard
  - Delete URLs
  - Search functionality
  - Statistics dashboard

- 📊 **Dashboard**
  - URL statistics (total, today, this week)
  - Clean table view of URLs
  - User profile information

## Tech Stack

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **@react-oauth/google** - Google OAuth (React 18 compatible)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend setup)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd URL-Shortner/Forntend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:

   ```env
   REACT_APP_API_URL=http://localhost:3322
   REACT_APP_API_SLUG=/api/v1
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Google OAuth Setup**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins
   - Create a `.env` file in the frontend directory and add your Google Client ID:
     ```env
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```

5. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Login page with email/password and Google OAuth
│   ├── Register.js       # Registration page
│   └── Dashboard.js      # Main dashboard with URL management
├── contexts/
│   └── AuthContext.js    # Authentication context and state management
├── App.js               # Main app component with routing
├── App.css              # Custom styles
├── index.js             # React entry point
└── index.css            # Global styles with Tailwind imports
```

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication

- `POST /api/v1/signin` - User login
- `POST /api/v1/signup` - User registration
- `POST /api/v1/logout` - User logout
- `GET /api/v1/user/me` - Get user info

### URL Management

- `GET /api/v1/url/url-list` - Get user's URLs
- `POST /api/v1/url/shorten-url` - Shorten a URL
- `DELETE /api/v1/url/:id` - Delete a URL

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Edit component-specific styles in individual files

### Components

- All components are modular and can be easily modified
- Icons can be changed using Lucide React icons
- Toast notifications can be customized in `App.js`

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service (Netlify, Vercel, etc.)

3. **Update environment variables** in your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

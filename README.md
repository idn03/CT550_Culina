# Culina2 - v2.0

Culina 2 is an enhanced version of a CT466 course project, featuring an improved interface, better user experience, and key functions like recipe posting, cooking guides, filtering, and user following.
The app integrates AI using the SVD model to deliver personalized recipe recommendations, trained on the Food.com dataset.

## Features

- Browse and discover recipes from other users
- Create and share your own recipes with step-by-step instructions
- Rate and save recipes to your personal collection
- Track achievements based on your contributions and engagement
- Advanced recipe search with filters
- Real-time user interactions and comments
- Personalized AI recipe recommendations
- Cross-platform support (iOS and Android)

## Tech Stack

- React Native & Expo
- TypeScript
- React Navigation (Stack, Drawer, Bottom Tabs)
- Appwrite Backend Integration
- React Native Safe Area Context 
- Custom UI Components

## Getting Started

1. Install dependencies:

```bash
npm install
# or 
yarn install
```

2. Set up environment variables:
Create a `.env` file with your Appwrite credentials:

```env
APPWRITE_ENDPOINT=your_endpoint
APPWRITE_PROJECT_ID=your_project_id 
APPWRITE_DATABASE_ID=your_database_id
```

3. Start the development server:

```bash
npm run start
# or
yarn run start
```

4. Run on platform:

```bash 
# iOS
npm run ios

# Android
npm run android
```

## Project Structure

```
app/
├── assets/         # Images, fonts and other static assets
├── components/     # Reusable UI components
├── interfaces/     # TypeScript interfaces/types
├── navigate/       # Navigation configuration
├── screens/        # App screens/pages
├── services/       # API and backend services
├── utils/         # Helper functions and utilities
├── App.tsx        # Root app component 
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
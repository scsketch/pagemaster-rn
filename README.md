# Pagemaster React-Native Client

React-Native + Expo client for connecting to Pagemaster bookstore backend. Allows managing and viewing of books.

<img width="1287" alt="image" src="https://github.com/user-attachments/assets/6ad08294-71b0-4d49-b0ec-ba840338fa58" />

<img width="340" alt="image" src="https://github.com/user-attachments/assets/5cf2fb0f-c80d-4c70-b0fe-088bbee877fe" />

## Tools and Technology

- **Framework:** React-Native w/ Expo
- **Language:** TypeScript
- **API State Management:** Tanstack Query
- **HTTP Client:** Axios
- **Navigation:** React-Navigation
- **Validation:** zod
- **AI Tooling:** Cursor IDE

## Prerequisites

- Node.js https://nodejs.org
- Expo Go (optional to run on your phone - see below)

## Run the Application 

Follow these steps to get the application running:

### 1. Install dependencies

```bash
npm install
```

### 2. Copy .env.example

```bash
cp .env.example .env
```

### 3A. Run on the web

This was made as mobile first, but you can also test it in a browser.

```bash
npm run web
```

You can then press `w` in the terminal. If a new browser tab doesn't open then open one at `http://localhost:8081/`

### 3B. Run on your mobile device

_IMPORTANT:_ Make sure your mobile device is on the same WiFi network as your computer running the Pagemaster backend. Otherwise the React-Native client running on your phone won't be able to connect to the backend running on your machine (you will see an "Unable to connect to server" message when you try to sign up / log in).

#### - Modify .env file

Replace `EXPO_PUBLIC_API_URL` in the `.env` file with your local IP, so it looks like:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.80:3000/api/v1
```

#### - Start the development server

```bash
npm start
```

You should see a QR code printed in the terminal.

### 3. Download Expo Go from the App Store on your device

Expo Go is used for easily testing React-Native development builds on your device.

### 4. Scan the QR code with your device's camera

The app will open in Expo Go.

## How to use the client

1. Sign up with a user name and password
2. Browse books
3. Search books by author and title
4. Filter books by category (genre)
5. Press "Add Book" to add a new book
6. Press a book in the list to view and edit the book's details or delete it.

## Notes

1. Authentication Implementation Notes:

   - Mobile: JWT tokens are stored in SecureStore (expo-secure-store), which provides encrypted storage
   - Web: Currently using localStorage for token storage (not recommended for production)
   - Production Recommendation:
     - Use HTTP-only cookies for web authentication
     - Let the browser handle cookie management automatically
     - Continue using SecureStore for mobile platforms

2. Accessibility:

   - All text colors meet WCAG AA (4.5:1) or AAA (7:1) contrast ratios
   - Screen reader support including proper labels, hints, and roles for interactive elements. To test press CMD+F5 in Chrome, or use your screen reader on your mobile device (eg: VoiceOver for iOS).
   - Keyboard navigable

3. Tests are minimal for demonstration purposes (run `npm test`)

4. The app has an ErrorBoundary that will catch uncaught errors and display a user friendly error page.

5. Mobile Device Support:

   - I primarily tested this on the iOS simulator, Chrome browser, and a physical iPhone. It seems to work on the Android simulator as well, but I have not tested it on an Android device.

6. Development Mode Considerations:
   - If you inspect the Chrome console to check the network and notice requests are firing twice, it's because of how React runs in development Strict mode. It's a feature used to help debug in development, and is disabled in production builds.
  
   - Performance is slower than it would be in a production app because we are running in development mode with the development server.

## Future Work

1. Offline support to add/edit books and sync when back online.
2. Additional unit tests, E2E tests using Detox.
3. Additional attention to accessibility

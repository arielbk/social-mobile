# SocialApp

This is my first mobile full stack project using React Native.

I find it best when learning technology I'm unfamiliar with to follow along with tutorials so I can get a better idea of how things work overall, and then try things out on my own.

This project was originally built following along with this [tutorial series on YouTube by DesignIntoCode](https://www.youtube.com/playlist?list=PLqtWgQ5BRLPvaAnoiZD8_z2RTh1VYVqN2).

The design assets and colour scheme has been changed. React-Navigation has been updated to the latest version and the home screen feed has been implemented so that it actually fetches posts from the Firestore database.

The app is basic but is a good opportunity to see how a full stack mobile app with React-Native works.

## Auth: login and registration

![Login](https://github.com/arielbk/social-mobile/raw/master/screenshots/login.png "Login")

![Register](https://github.com/arielbk/social-mobile/raw/master/screenshots/signup.png "Register")

## Adding posts (adding data to Firestore)

![Compose](https://github.com/arielbk/social-mobile/raw/master/screenshots/compose.png "Compose")

## Displaying user posts in a feed

![Post feed](https://github.com/arielbk/social-mobile/raw/master/screenshots/feed.png "Post feed")

# Running the app locally

To run the app locally, it's simple with [Expo](https://expo.io).
- If you don't have the Expo CLI, install it with `npm i -g expo-cli`
- Install project dependencies with `npm i`
- Run `npm start` on the project root to run the Expo server. From here you can run the app in an iOS or Android simulator, or run it on your own phone with the Expo Client app.

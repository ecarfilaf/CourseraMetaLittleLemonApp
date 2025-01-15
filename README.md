# CourseraMetaLittleLemonApp
Coursera Meta Little Lemon Food Ordering App

 - The application is a React Native Expo Food app.
 - Users will be capable of signing up on the Little Lemon restaurant app.
 - Users will have to go through a registration process.
 - Once they successfully complete that phase, they are redirected to a home screen.
 - Home screen will represent the landing screen after completing the onboarding flow, displaying a header, a banner with a search bar and a list of menu items where a user can filter each categories.
 - User can also customize their name, email, photo and and other user preferences through a Profile Screen.
 - Profile screen also contains four checkboxes enable specific email notifications, like order status, password changes,special offers, and newsletters.
 - Use AsyncStorage module to preserve the chosen preferences even when the user quits the application
When clicking the Logout button, user will redirect back to login page, clearing all data saved from Profile.
 - Use SQLite Database to populate, query and filter menu items.


## Table of contents

- [Overview](#overview)
  - [How to use the project](#how-to-use-the-project)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### How to use the project

##### npm install && npm start

##### Then, a QR Code wil appear on your terminal.

##### On IOS Scan QR code through Camera app.

##### On Android : Scan QR code through Expo Go app.


### Screenshot

![Onboarding and Profile ](https://github.com/ecarfilaf/CourseraMetaLittleLemonApp/blob/master/assets/images/Onboarding_Profile.png?raw=true)
![Home and Order-Dish](https://github.com/ecarfilaf/CourseraMetaLittleLemonApp/blob/master/assets/images/Order_Dish_Food.png?raw=true)

### Links

- Github: [Code](https://github.com/ecarfilaf/CourseraMetaLittleLemonApp)
- Demo : Scan the [QR Code](https://expo.dev/preview/update?message=Publish%20Update&updateRuntimeVersion=exposdk%3A47.0.0&createdAt=2024-07-03T09%3A21%3A32.588Z&slug=exp&projectId=221d2bc0-e34d-4538-b828-2e1cabe5bba7&group=2468e4a0-6270-4a2e-8e34-17167031fde8) to see the demo.

## My process

### Built with

- [React Native](https://reactnative.dev/docs/environment-setup) - React Native app built with expo
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) - For storing restaurant's menu items.
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/api/) - For storing user preferences.
- [StyleSheet](https://reactnative.dev/docs/stylesheet) - For styles


### What I learned

- Create a React Native App using Expo
- Create a wireframe and high fidelity mockup using Figma.
- Use ContextAPI for login
- Use React Navigation (Native Stack) for screen routes.
- Use ImagePicker API to set user Profile Picture
- Use useFonts Hook from expo-fonts to set custom fonts
- Use AsyncStorage to store user settings.
- Use getItem and setItem methods to read and set data to AsyncStorage
- ConnectAsyncStorage to a state
- Use SQLite to store Menu Items
- Connect SQLite to a state
- Create form validation for users
- Handling side-effects using useEffect Hook
- Use FlatList component to render menu
- Use ScrollView component to render categories title
- Use View, View, Text Components
- Use Checkbox, Dropdownlist Components
- Extract all styles to StyleSheet API

### Useful resources

- [React Native Docs (StyleSheet) ](https://reactnative.dev/docs/stylesheet) - This helped me for all the neccessary React Native styles. I really liked their documentation and will use it going forward.
- [ImagePicker API](https://docs.expo.dev/versions/latest/sdk/imagepicker/) - This helped me for creating an option for user to select profile picture on their devices.
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) - This helped me for saving menu items.
- [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/api/) - This helped me for saving user settings.
- [ContextAPI](https://beta.reactjs.org/reference/react/createContext)- This helped me for creating a authentication context for login.

## Author

- Website - [Esteban Carfilaf](https://ecarfilaf.github.io/html-portfolio/personalsite/index.html)
- LinkedIn - [@ecarfilaf](https://www.linkedin.com/in/ecarfilaf/)
- X (Twitter) - [@ecarfilaf](https://x.com/ECarfilaf)


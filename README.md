# HomeDex

## Introduction

HomeDex is a mobile application that helps end users track inventory of items within their home (currently geared towards iOS).

- Aimed to prevent excess purchases, simplify shopping experience, and provide a snapshot of current inventory
- Can be used by all consumers! 
- Future enhancements would make it convenient for Amazon shoppers

## MVP Features

- Pseudo login - verifies the user exists in the database or create new user
- Create / edit / delete a household, category, item
  - Option to take or choose a photo for household image
  - Category represents an area in the home, ie. fridge
  - Required fields for items: name, brand, measurement (quantity or scale) | optional: expiration date, additional notes
  - Favorite and shopping lists by household
- Ability to view user details and sign out


## Demo

[HomeDex Demo Video](https://drive.google.com/file/d/1LEgKoR5gpt1Y7TTG0S9Pg36NijPRLZY0/view?usp=sharing)

## Dependencies

- XCode for iOS simulator
- Node
- Yarn
- Expo
- Expo Client (optional)

## Environment Set-up

1. Clone this repository.
1. Install the Expo CLI by running:
    ```
    yarn global add expo-cli
    ```
1. Install dependecies by running:
    ```
    yarn install
    ```
1. Start the server by running:
    ```
    expo start --ios
    ```

## Author

This mobile app is developed by [Thu Vuong](www.linkedin.com/in/vuongthu) as a capstone project for [Ada Developers Academy](https://adadevelopersacademy.org/).

Designed by [Christine Danh](https://www.linkedin.com/in/cdanh), UI/UX designer.

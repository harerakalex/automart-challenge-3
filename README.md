# automart-challenge-3
 
[![Build Status](https://travis-ci.org/harerakalex/automart-challenge-3.svg?branch=develop)](https://travis-ci.org/harerakalex/automart-challenge-3)  [![Coverage Status](https://coveralls.io/repos/github/harerakalex/automart-challenge-3/badge.svg?branch=develop)](https://coveralls.io/github/harerakalex/automart-challenge-3?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/ba0c42d5d96bf4c30384/maintainability)](https://codeclimate.com/github/harerakalex/automart-challenge-3/maintainability)



online shopping app for cars, this is a market place app where one can make ads and others can be able to make order of that car.

# UI Tools
- HTML
- CSS
- Javascript

### links for the UI
github page for user [link here](https://harerakalex.github.io/automart-challenge/UI)

github page for admin [link here](https://harerakalex.github.io/automart-challenge/UI/html/admin-dashbaord/dashboard.html) 

# Getting Started for backend

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See Installation, Running and deployment for more details. This Application is built in nodejs with es6.

## Prerequisites
AutoMart is built in node js with ES6 format. to get up the application running you need to install the following:
```
download the latest version of node js
```
## Installing
You have to follow the follow this procedure to get started.
Curretly data are being stored as json file but hopefully I will use postgresql database for persistence data.

got to the Version control and clone down the application
```
git clone https://github.com/harerakalex/auto-mart.git
```
To install all required dependecy ```run npm install```
```
the server will automatically install all the needed packages in the application
```
You need a testing environment like POSTMAN
```
For getting data from the app you will have to access every single API endpoint
like  localhost:3000/api/v1/
```
| URL | METHOD | DESCRIPTION |
| ------ | ------ | ---------- |
| /api/v1/auth/signup | POST | Get the user to signup |
| /api/v1/auth/signin | POST | Get the user into the system |
| /api/v1/car | POST | Post a new car |
| /api/v1/order | POST | User can make an order |
| /api/v1/car/:id/price | PATCH | User update the price of posted car |
| /api/v1/order/:id/price | PATCH | User update the price of pendig order |
| /api/v1/car/:id/status | PATCH | User mark the car as sold |
| /api/v1/car/:id | GET | User view the specific car |
| /api/v1/car/available | GET | User view the available cars |
| /api/v1/car/available/range | GET | User view the available cars with price range|
| /api/v1/car/all | GET | User view all cars whether sold or unsold |	
| /api/v1/car/:id | DELETE | Admin can delete a specific car |


## To run The project
For nodemon use ```npm run dev```
For node use ```npm start```

## To Run test
use ```npm test```

## Built With Java script
Node/Express

### Author
HARERIMANA Carlos

### LICENSE
ISC License
Copyright (c) 2019 ```Carlos HARERIMANA```
Open source software
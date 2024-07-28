# Hackndore

**Version:** 1.0.0

**Description:** Let's innovate for a better Indore!

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction
Hackndore is a project aimed at fostering innovation for a better Indore. It leverages modern web technologies to create impactful solutions.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-maddhesiya/hackndore.git
## Features
- User authentication with JWT
- File uploads with Multer
- Image management with Cloudinary
- Data handling with Mongoose
- Email notifications with Nodemailer

## Scripts
- dev: Runs the application in development mode using Nodemon.


## Dependencies
- bcrypt: ^5.1.1
- cloudinary: ^2.3.1
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.19.2
- jsonwebtoken: ^9.0.2
- mongoose: ^8.5.1
- mongoose-aggregate-paginate-v2: ^1.1.2
- multer: ^1.4.5-lts.1
- nodemailer: ^6.9.14
- nodemon: ^3.1.4
- uuid: ^10.0.0

## Create a .env file in the root directory and add the following variables:
```
MONGO_URL="your_mongo_url"
PORT=your_port
CORS_ORIGIN=your_cors_origin

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PASS=your_email_password
EMAIL=your_email

```

# Hackndore Frontend

**Version:** 1.0.0

**Description:** Frontend application for innovating a better Indore!

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction
The Hackndore frontend is built using React to provide a seamless user experience for our innovative solutions in Indore.

## Features
- Responsive design
- Integration with backend API
- User authentication
- Dynamic content rendering
- State management with Redux

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-maddhesiya/hackndore-frontend.git
2. Move to that Dir.
```
cd frontend
```

4. Install this frountend
```
npm install

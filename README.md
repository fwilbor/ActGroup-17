# ActGroup-17

#Kidzsnap

KidzSnap is a secure social media platform for kids, designed to help parents monitor and educate their children on safe online practices. Parents utilize our Dashboad Tool for valuable
information on their kids.  Children are able to utillize a fun messenger with their friends and also send "Snap" images.  Data collection is minimal and constantly
removed from our database, keeping families data safe.  

##Dependencies

The project uses the following dependencies:

"@emotion/react": "^11.10.4",
"@emotion/styled": "^11.10.4",
"@mui/icons-material": "^5.10.9",
"@mui/material": "^5.10.9",
"bcrypt": "^5.0.1",
"body-parser": "^1.20.0",
"cors": "^2.8.5",
"dotenv": "^16.0.2",
"ejs": "^3.1.8",
"express": "^4.18.1",
"gridfs-stream": "^1.1.1",
"js-cookies": "^1.0.4",
"jsonwebtoken": "^8.5.1",
"mongoose": "^6.5.4",
"multer": "^1.4.5-lts.1",
"multer-gridfs-storage": "^5.0.2",
"nodemon": "^2.0.19",
"react-file-base64": "^1.0.3",
"react-webcam": "^7.0.1",
"socket.io": "^4.5.3",
"socket.io-client": "^4.5.3",
"validator": "^13.7.0"

##Getting started
Clone the repository: https://github.com/ActGroup-17
Install the dependencies: npm install
Start the development server: npm run dev

##Available Scripts
In the project directory, you can run:

npm run start
Runs the app in the development mode.

npm run dev
Starts the development server and reloads the page on changes.

##Architecture
The application consists of an express backend server and a react frontend. The server communicates with a MongoDB database using Mongoose as an Object Document Mapper (ODM) library.

##Endpoints
The following endpoints are available in the application:

/uploadimage
/messages
/user
/messengerTest

##Contributions
This is an open-source project, and contributions are welcome.

License
This project is licensed under the ISC license.

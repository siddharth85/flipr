# Mail Scheduler App


Mail Scheduler is basically a web application designed keeping in view the need of a automated and easy to use application that can schedule mails for you to different recipients at different time and dates. This app also provides you with the option of sending recurring mails and keeping track of sent and future scheduled mails in a one go
 

 


## Motivation
 As we know every technology developed in this world is aimed at improving the time and space complexity and to provide comfort to the humans in their work.Our app provides you comfort and speed in a lot of ways.  Now have you ever gone through these problems-
 * Forgetting sending an important mail to a person or a community of people
 * Trouble in handling a lot of user emails 
 * Trouble in finding a safe ,secure and fast method of communicating with your users
 
 
 All these questions were the basis of our Mail Scheduler and we tried to create a one-stop solution for all questions.
 


   



## Tech/framework used
The following tools were used in building this site
* Front-end development
  * React
  * HTML
  * CSS
  * BootStrap 
  
  
* Back-end development
  * Javascript
  * Node.js
  * Express.js
  * jQuery
  
* Database used
  * mongodb
  
* Authorisation/Authentication
  * json web tokens(jwt)

* Scheduling Mails through Database
  * Agenda.js
  * Cron






## Scheduling your first automated email

 Scheduling your first email will require you less than a minute time. The following steps will guide you in creating your first email comfortably:
   * Install our app by following installation procedure
   * Sign in to our app using your email 
   * After sign in Click on import contacts and upload your contacts in a excel file.
   * After uploading the contacts ,click on New Campaign where you can schedule your email by filling in the required date and time

 





## Installation
It is very easy to use install our project if anyone wants. Just follow the steps :

1. Firstly if you are working locally then you need to install the following :
    * React.js
    * Node.js
    * MongoDB
    * VS Code ( recommended , Any other suitable code editor will work )
  
2. Next you need to clone our project's GitHub repository to your desktop 

3. Open command line navigate to the project folder. Then type the following commands twice (once in project/client folder and once in project/server) to install required dependencies :
     ```javascript
     npm install
     ```
  
 4. Your package.json inside client folder should look like this with the following dependencies
   ```javascript
    "dependencies": {
    "@syncfusion/ej2-react-calendars": "^19.1.66",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "bootstrap": "^5.0.2",
    "concurrently": "^6.2.0",
    "react": "^17.0.2",
    "react-datetime-picker": "^3.3.0",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "react-time-picker": "^4.3.0",
    "react-transition-group": "^4.4.2",
    "web-vitals": "^1.1.2",
    "xlsx": "^0.17.0"
  
   }
   ```    
  5. Your package.json inside server folder should look like this with the following dependencies
      ```javascript
         "dependencies": {
         "agenda": "^4.1.3",
         "bcryptjs": "^2.4.3",
          "config": "^3.3.6",
         "cors": "^2.8.5",
         "express": "^4.17.1",
         "express-fileupload": "^1.2.1",
         "express-validator": "^6.11.1",
          "jsonwebtoken": "^8.5.1",
         "mongoose": "^5.12.13",
         "nodemailer": "^6.6.2",
          "xlsx": "^0.17.0"
        }
        }
      ```    
   

     
6. After successful installation run the following command inside client folder to start the application :
      ```javascript
       npm run dev
      ```
   If you see *Server Has Started!!* then you have successfully setup everything and good to go with our application.

































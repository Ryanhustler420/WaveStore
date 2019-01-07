## Waves

##### First Create Server Than React Forntend Side

-   npm init
-   npm install -g nodemon

If you are using NPM copy the "npm" line or the yarn line if you use "yarn".

**YARN:**
```
yarn add bcrypt@2.0.1 body-parser@1.18.3 cloudinary@1.11.0 concurrently@3.6.0 cookie-parser@1.4.3 dotenv@6.0.0 express@4.16.3 
express-formidable@1.0.0 jsonwebtoken@8.3.0 moment@2.22.2 mongoose@5.1.6 multer@1.3.0 
```
**NPM:**
```
npm install bcrypt@2.0.1 body-parser@1.18.3 cloudinary@1.11.0 concurrently@3.6.0 cookie-parser@1.4.3 dotenv@6.0.0 express@4.16.3 
express-formidable@1.0.0 jsonwebtoken@8.3.0 moment@2.22.2 mongoose@5.1.6 multer@1.3.0 --save 
```

-   create '.env' file to the root of the project and add that into .gitignore file

> .env

```
MONGODB_URI=mongodb://localhost:27017/waves || mongodb://<username>:<dbpassword>@ds1490024.mlab.com:49914/waveshoper
SECRET=YOUR_PASSWORD_HERE

CLOUD_NAME=cloudinaryName
CLOUD_API_KEY=cloudinaryApiKey
CLOUD_API_SECRET=cloudinaryPrivateKey

STRIPE_PUBLISHABLE_KEY=pk_test_AQxZm271h68Cq62jeHF5InEV
STRIPE_SECRET_KEY=sk_test_QremTc0bVYJ15G3X9UsMQUQe

EMAIL_PASS=XXXXXXXX99
EMAIL_USER=ownerGmailIdd@gmail.com

```

## client Side

> create-react-app .

If you are using NPM copy the "npm" line or the yarn line if you use "yarn".

**YARN:**
```
    yarn add @fortawesome/fontawesome@1.1.8 @fortawesome/fontawesome-free-solid@5.0.13 @fortawesome/react-fontawesome@0.0.20 
    @material-ui/core@1.2.2 axios@0.18.0 react-images@0.5.17 react-redux@5.0.7 react-router-dom@4.3.1 react-slick@0.23.1 redux@4.0.0 
    redux-promise@0.6.0 redux-thunk@2.3.0 react-dropzone@4.2.12 react-moment@0.7.7 react-paypal-express-checkout@1.0.4 
```
**NPM:**
```
    npm install @fortawesome/fontawesome@1.1.8 @fortawesome/fontawesome-free-solid@5.0.13 @fortawesome/react-fontawesome@0.0.20 
    @material-ui/core@1.2.2 axios@0.18.0 react-images@0.5.17 react-redux@5.0.7 react-router-dom@4.3.1 react-slick@0.23.1 redux@4.0.0 
    redux-promise@0.6.0 redux-thunk@2.3.0 react-dropzone@4.2.12 react-moment@0.7.7 react-paypal-express-checkout@1.0.4 --save 
```
> We will also add to the HTML:

```
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> 
<link href="https://fonts.googleapis.com/css?family=Monoton|Oswald:300,400,500" rel="stylesheet">
<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
```

**If You Got Error Using Proxy Than follow this [Solution](https://stackoverflow.com/questions/52605997/when-specified-proxy-in-package-json-must-be-a-string)**

# Backend Series project 1

This is my first project of professional backend with javascript
- [Model link] (https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

- First create the folder , then add package.json using commands
ADD readme.md
Create repo in git and push the code to git.

1. Create public folder , under public create temp folder.
2. Like we create .gitignore , we have to create .gitkeep file under public/temp/ - .gitkeep file just to track
3. Create .gitignore file in folder of backend its just outside basically --- in market .gitignore generator are there in gooogle , they will auto generate .gitignore file choose langauge like node ,just copy and paste in .gitignore file
4. Now create environment variable file which .env file - whenever we push code to production , these envirenmengt variable will pick from system not fron files bcvz of its security , jisse ye variable secure . If .env push to github , github wil warn , so we also create .env.sample for learning purpose what we do on .env , same paste to .env.sample for saving purpose only
5. Now create soruce folder named src , its upto you put under src all directory files or outside , but we can do here under src it will be more standardizwe.
6. few commands or do manual but use command :
  cd src //go to src folder directly
    ls //will show all files
    touch app.js constants.js index.js///touch will create new files, once i prese enter all files create in 1 go

8. here we introduce nodemon - nodemon is a dev dependency and it will auto start your srver once you save your file, no need to start again .
   command to introduct : npm i -D nodemon ///-D = dev dependency
      "devDependencies": {
        "nodemon": "^3.1.11"
    } //---Its auto added on packge.json
    so we update scirpt on packge.json - 
      "scripts": {
        "dev": "nodemon src/index.js"
    }, //----so nodemon will do start this file when we do npm run dev

9. few folders required so we can run command mkdir:
    mkdir controllers db middlewares models routes utils  //all folders required , we run these folder created basically this also a professional structure of project , every company have diffrnt structure little bit nbut almost same.

** git is not tracking your empty folders.
10. install prettier , its a dev dependency for formatting , not only extensions we have to setting up its setting also in evry project.
    command-  npm i -D prettier
    once prettier , so we have to add few files :
    add .prettierrc //---- configuration of prettier
 add code in .prettierrc file
 {
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth" : 2,
    "trailingComma": "es5",
    "semi" :true
}
---these helps in full project when any dev can do this will help in formatting.

11. now add one more file .prettierignore - whatever files not do anything like .env files...
---- add code
/.vscode  ----not touch vs setting
/node_module ---not touch node module
/.dist ---distribution related not touch

*.env ---environment variabele and files not touch
.env
.env.*


## How to connect database in MERN with debugging-

Database to connect securely , ache s
- Here we are using databse ,mongo db , you can also use docker , fullflegit ...but here we use online mongodb
- go google , search mongo fb atlas,they r giving online shared  database service free
- create acount free, create project free, choose mumbai , create username , pssword, they ask - where u wantto connect choose - my local environment.... add entries to ip list - add in ip address - 0.0.0.0/0. ..finish and close ...it will create....
- in network access tab - you will see your ip addres if not present , add it ...and in production  seetiing you cant choose allow access from anywhere ...but if any testing needed you can for temporirly for 3-6 hrs something , this is very cautious step ... but here we can do since we are testing and learning here
- in database access tab - if yours not added , add new user and fill ur details.
  
- Now go inside database  under deploymnet - click on connect , every options u will find string that we need to connect .

# then go to project directory :

- go to env file: write following PORT=8000 MONGODB_URI= 
- go to constants file , write db name and export it. ....here we add with constant bcz we cant change db name in future by me or sm1....it can be let or any environment variable

# Database connection can be do form 2 ways : 
- 1 approach is all code svae in index file , since we are first executing index file through node or nodemon , jaise h index file load ho wiase hi mera sara code run kra do jo maine database ka code likha hai turnt execute ho jye
-  2 approach is Ek DB name ka folder bnaye uske andr connection ka code function usme likhe and then import. taht funciton on index file and execute kraye ..
- so, pros and cons , if we write separtely code clean and distribute rhega jo ki porfessionally hai

 app.js will do from express
 and index.js connection hoga mongoose k through

# now install few pakages :  npm i mongoose express dotenv 
and check its installed or not on pakcge.json

# * note:
* whenever u want to talk with datase , always use and wrap in try-catch or use promises bcz error aayi to resolve reject s handle ho jyega
* database is always in another continent means like db is in usa and uding here means it takes time so always use try catch and async - await .
  
# lets connnect db from first approach :
using index.js
// function connectDB(){}
// connectDB()
//this is also but we can make it professional so we use efi concept in js , function hai use immediate execute krdo , arrow function ,which execute immediately add async...sometime coders add ; semicoplpn in starting when efe's starting just bcz editor forget to add semicolon in last colon , so basicaaly professional do good pratices and add like this: ;( async () => {})()...here we r not using bcz we dont have any code before

then connect database connection like below syntax:
          mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //
//process.env.MONGODB_URI=process se lo, and name jo diya hai string ...database connect ... uske aage slash and databse ka name bhi dena pdta hai to constant.js m name define kiya hai to use import kra lenge ... add slash and variable name...then database connect
async await is mandatory

/* 2nd approach is professional approach , we take separate file for connection do connection there under any folder like db and import here which is good practice.
*/

# first approach
this is also but we can make it professional so we use efi concept in js , function hai use immediate execute krdo , arrow function ,which execute immediately add async...sometime coders add ; semicoplpn in starting when efe's starting just bcz editor forget to add semicolon in last colon , so basicaaly professional do good pratices and add like this: ;( async () => {})()...here we r not using bcz we dont have any code before
//we can create efe and database me asych await and try ctach used here error bhi handle kiya hai
---- Below code is first approach but we commented bcz index.js file me hi sara code hai --- comment on index.js file

# 2nd approach
- Create index.js file under db folder.
- here we connect db through mongoose and write code in this file 
-  dotenv variables are environment variable hote hai jo as early as possible import and configure all environment variable application m load ho jane chhiye
-  so intead of required dotenv we use import here
-    and in packahge.json me ye add krenge - "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
-  do debugging jb db connect ni ho to node js me import me .js lagana pdega...or jb bhi environment vairabkle m change krenge to restart krna hi pdega npm dev run s
-  bassicllly i connected db succesfully 
-  

### Custom api response and error handling
- app.js - importing express , express s app bnti hai ,app is common name add listen part
- index.js/db add error part and all to handle errors
- few packge required: 
  cookie-parser
  cors ---setting krne deta hai jo hmare cross origin resources h unke liye
- app.use() - will only use jb koi middleware or configuration use krni h
- Install above pckge: npm i cookie-parser cors
- the import in app.js
- setting cors with orgin and creds.
- now setting cookise parswr we ned to use throw expressjson to by limiting to 16kb
- url ka personal encoder hota ha like url m kbhi kbhi % bhi hota hoi uske liye express s configuration krni hoga through app.use with urlencoded
- we want to add one more configuration app.use m static likheneg jo assets like pdf, images , fevicon and all ko stor ekrnge ..under static pass folder name.
# Middleware: -------
- a client will hit your url --- mans seding request ...to maine ek code likh rkha hai (req,res), to hm wahan pr koi res.send  response send krenge ...bcz url pr request to bhut ayengi islie hum uske bech me ek check lagynge ki wo aap cpaable ho ki nhi , usi checking ko middleware bolte hai ....like between both  re and res check lga is user is logged in ...we can add multiple middleware ... inko lagane ka sequence hota hai...
- re,res are not 2 , they r 4 elements = (err,req,res,next) ---next = is a middleware ye ek flag hota hai , jo apna code likh deta hai wo pass krta hai next to second middleware aise hi hoga aage bhi last m final jb koi next ni hoga to response hi hoga waha pr next discard ho juyega.

* async await try catch to mandatory hota hai db s hmesha bat krenge hr case to utilty m file bna lete hai jiska syntax same hota ai hr bar ni likhna pdega to iske generalizer function bna kr wrapper lga le..ye industry comon practice hai ..
1. first method:
   - create asyncHandler.js file in utils and asynchhandler function bnynge ....aynchhandler is a higer order function in js ...those fucntion jo as parameter bhi accpt krte hai and return bhi like variable treat krte hai .
2. prmoise mthod 2nd one here we use 2nd only
* node js api error pdh kr use standardize kr skte h
- Create a apiError.js file under utils wo erro ko handle krenge
- Create a apiresponse.js file under utils also  response ko handle krnge ---statuscode pass krnege usko read krna h errorcode ....
- ------status code actually m less than 400 hone chahiy actually standard set krna h basicclly.... 400 s jyda error m hi bhejne chhaiye
  

## User and video model with hooks and JWT
- create user.models.js file under models
- create video.models.js file under models
- 2 models here - users and video model
- mongo db data save krta h user ko automaticcly id genearte krta hai , bson m data store krt ahai mongo db not in jspon
- avtar and cover image will upload on 3rd party service nd it will provide url to uoload like aws , cloudnarry
* //agr kisi bhi field ko searchable banana hai to index true krdo , taki db ki searching m aane lge
- write model in users and vudeo 
- then baisc db query to likhenge but here we use one packge aggregrate mongoose ka pakcge , ye aggreagration ka query lukhne m help krta hai so we install here  ---- npm install mongoose-aggregate-paginate-v2
use in video.models.js it works like a plug in- 
- install bcrypt ///its a library which helps you hash your password...
- for tokens: jwt library and jsonwebtoken ...cryptographichal algo s bnaye jate hai 
- so install : npm i bcrypt jsonwebtoken
- and import in user.js
- so how to crypt : so we need take help from mongoose hooks: 
  - pre hook : pre is a middleware jaise data hi save hone ja rha hoga usse just phle run kra skte hai...like pasword encrypt krde
- mongoose giving us ki custom methods bhi bana skte hai
## JWT:
- Jwt is a bearer token ....jwebjsontoken library bna kr deti hai 
- Add in .env:
  ACCESS_TOKEN_SECRET= #token to add
  ACCESS_TOKEN_EXPIRY= #1day expiry
  REFRESH_TOKEN_SECRET=#token to add
  REFRESH_TOKEN_EXPIRY=
- like this we can add accesstpoken generate method we can add in user.mode.js file
- then we genrate access and referesh token thorugh function and jwt.
  
# How to upload file in backend | Multer
- create account in clpudianry, cloudinary is a service like aws its also a s3
- install cloudinary and multer: npm i cloudinary multer
- user will upload file, we will upload through multer and take frile from user and tempory store in our local server ..then suing cloudinary us local storage s file lkr multer pr upload kra de... //best prod practices - bcz hm isko apne server m save kr ske bcz its a 2-step we can directluy upload to cloudinary ...but server m local save krte h bcz kbhi kbhi reattempt kr pye agr aisa case h to taki hm use upload kr pye...its a prod practic - 2 steps 
- create cloudinary.js file in utils to store images 
- import fs from "fs" = file system library jo node.js m sath aati hai read and write open path and all
- write uploading code in cloudarny.
- now we need to create a middleware , using multer we can create a middleware...wherever images/file upload required we can add middleware
- create under middleware folder file multer.middleware.js and import multer and add muleter code thorugh express multer doc 

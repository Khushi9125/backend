# Backend Series project 1

This is my first project of professional backend with javascript
- [Model link] (https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

First create the folder , then add package.json using commands
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



#Let's Build a Web App!
In this tutorial, you'll learn to create a web application using [LoopBack](http://loopback.io) as a backend API server, and [Angular](http://) as a front-end framework.

##The Backend
###Pre-Requesite:MySQL
Before getting started with loopback, we're going to first need to first set up  a MySQL database.

If you're using Mac OSX and have brew installed, this is easy. Simply type the command:

```bash
brew install mysql
```

After installing, you should have two new command line utilities:

- mysqld - the actual mysql server
- mysql - an interface for interacting with the server

Start the server by typing:

```bash
mysqld
```

In a new tab, open the myqsl interface. Well pass the -u flag to interface with the default user with the name "root".

```bash
mysql -u root
```

From this interface, create an interface using the 'create database' command. We'll create a database named 'kinetic'

```mysql
create database kinetic;
```
(Note: Don't forget the semicolon at the end)

Once the database is created, you can exit the interface.

```mysql
exit;
```

###Pre-Requesite:Node and npm
Before actually installing loopback, you'll need node and npm installed.

Please visit [nodejs.org](https://nodejs.org) and follow the instructions for installing node. npm will be installed automatically along node.


###Install Strongloop
Loopback is actually part of the strong loop package. In order to install it on your system, type:

```bash
npm install -g strongloop
```

This will install a number of command line utilities, including slc.

###Create application
With loopback installed, navigate to the directory where you want to create your application and type:

```bash
slc loopback
```

###Add MySQL connector

In order to connect to the MySQL server, you'll first need to install the mysql connector for loopback. To do this, type:

```bash
npm install loopback-connector-mysql --save
```

###Add MySQL as a datasource

Create a datasource in your application by typing :

```bash
slc loopback:datasource
```

Give it a name of 'mysql' and select the mysql connector.

This will create in entry in 'server/datasources.json'. The file should look like this:  

```json
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysql": {
    "name": "mysql",
    "connector": "mysql"
  }
}
```

Add necessary attributes to the "mysql" object in order to connect to the database. The files should look something like this:

```json
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysql": {
    "name": "mysql",
    "connector": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "kinetic",
    "username": "root",
    "password": ""
  }
}
```

###Models
Our API is going to have two types of objects or 'models'.

####Program
A program acts as a collection of exercises for the user to preform.
The program model contains three fields:

- id:number (required) - a unique id with which to identify a program
- name:string (required) - the name of the exercise program
- description:string (required) - the description of the exercise program

####Exercise
An exercise is part of a series of exercises associated with a particular program.
The exercise model contains three required fields:

- id:number (required) - a unique id with which to identify an exercise
- programid:number (required) - associated program id
- name:string (required) - the name of the exercise

The program also contains a number of optional fields:

- reps:number - number of reps
- sets:number - number of sets
- pace:number - pace of exercise in seconds per rep
- weight:number - weight amount in kilograms
- duration:number - duration of exercise in minutes

###Creating Models

Create models by typing:

```
slc loopback:model
```

for each model. Be sure to input the proper names of each model ('program' and 'exercise') along with the above listed parameters. You'll be asked to choose a variable type for each as well as whether or not each is required.

This will generate a '.json' file and a '.js' file for each model locate in 'common/models/'.

###Adding MySQL attributes
In each model's associated '.json' file, you'll need to manually add MySQL attributes.

First, add an object with a key of "mysql" to "options" object. Give this a "schema" property with a value of "LOOPBACK" and a "table" property with the name of the model.

For each "property" entry, add an object with a key of "mysql". This object must contain a "columnName" attribute which corresponds to a MySQL column name, and a "dataType" attribute that corresponds to a MySQL data type. If the "dataType" is "VARCHAR", there must be a corresponding "dataLength" value specifying the maximum length of the attribute. Finally, if the attribute is required in the model, there should be a "nullable" attribute with a value of "N" (for "No").

Note: The datatypes don't match up exactly. For values that are numbers, use the MySQL datatype of "INT". For string values, we can use either datatype of "VARCHAR" or "TEXT".

Each '.json' file should look something like this:

```json
{
  "name": "exercise",
  "plural": "exercises",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true,
    "mysql": {
      "schema": "LOOPBACK",
      "table": "exercise"
    }
  },
  "properties": {
    "id": {
      "type": "number",
      "required": true,
      "mysql":{
        "columnName":"ID",
        "dataType":"INT",
        "nullable":"N"
      }
    },
    "programid": {
      "type": "number",
      "required": true,
      "mysql":{
        "columnName":"PROGRAMID",
        "dataType":"INT",
        "nullable":"N"
      }
    },
    ...
    "duration": {
      "type": "number",
      "mysql":{
        "columnName":"DURATION",
        "dataType":"INT"
      }
    }
  },
  ...
}

```
##Adding A Migration file.
It's convenient to add a manual migration file.
Create a bin directory, and place a file named 'automigrate.js'.
Within 'automigrate.js', place the following code:

```javascript
var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mysql;
ds.automigrate(function(err) {
  ds.disconnect();
});
```

Type the following:

```bash
node bin/automigrate.js
```

to create the corresponding tables within your mysql database. You can also type this if you want to reset your databases to an empty state.

###Running the Application

To run the application, type:

```bash
node .
```

Navigate to 'localhost:3000/explorer' to see the swagger interact with the API.

To stop the application, hold the 'control' key and type 'c'.


###Setting up the client

If running, stop the application.

In order to serve local files in your application, open the 'server/middleware.json' and add the following object to the 'files' object:

```json
"loopback#static": {
   "params": "$!../client"
 }
```

Now, all files within the 'client' directory will be accessible.

Create a file named 'index.html' within the client directory and start the application. Navigate to 'localhost:3000/index.html' to view the file you created.

##The Front End

Were going to use bower install front end dependencies.
First create an empty html scaffold like this:

```html
<html>
  <head>
    <title></title>
  </head>
  <body>


  </body>
</html>

```

and save it as 'client/index.html'.


###Dependencies

We'll use bower to manage dependencies. If you haven't already installed bower type:

```bash
npm install -g bower
```

###Dependencies: Angular, Angular Resource

Install Angular, and Angular Resource by navigating into the 'client' directory and typing:

```bash
bower install angular angular-resource
```
Note, don't forget to navigate back to the previous directory after installing by typing:

```bash
cd -
```

Add a script tag with a link to angular as the source to the head of the html file. Putting this in the head is required for some features of angular, such as ng-cloak, to work.

```html
  ...
    <script src = './bower_components/angular/angular.js'></script>
  </head>
```

Add a script tag with a link to angular resource to the end of the body of the html file.

```html
  ...
    <script src = './bower_components/angular-resource/angular-resource.js'></script>
  </body>
```

###Creating the angular service with lb-ng.

When you installed strongloop, it installed a number of command line utilities including lb-ng, that generates an angular service based on your models. Type:

```bash
lb-ng ./server/server.js ./client/ng-kinetic.js
```

to create a javascript file that can be loaded into the html file.

Add a script tag with a link to this file to the end of the body after the last script you inserted.

```html
  ...
    <script src = './bower_components/angular-resource/angular-resource.js'></script>
    <script src = './ng-kinetic.js'></script>
  </body>
```

###Custom script
Create a custom script named 'client/script.js' that will reference the above dependencies. Add a script tag for it after the previous scripts.

```html
  ...
    <script src = './bower_components/angular-resource/angular-resource.js'></script>
    <script src = './ng-kinetic.js'></script>
    <script src = './script.js'></script>
  </body>
```

We'll come back to this later.

###Markup

We're going to want our application to live on the entire page. We'll let our controller live on the entire page as well. As such, we can add angular attributes to signify like so:


####Controller and Application
```html
<!doctype>
<html ng-app="application" ng-controller="controller">
...
```

####The rest...

At this point, I'm not even sure if it makes sense walking through building the application. Just check out the finished product. :p

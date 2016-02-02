##Install Brew...http://brew.sh/
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

##MySql
###Installation
brew install mysql
###Log into mysql
mysql -u root
####Create database
create database kinetic;
exit;

##Install Strongloop
npm install -g strongloop

##Create Application
slc loopback

##Install mysql connector
npm install loopback-connector-mysql --save
##Create mysql datasource
slc loopback:datasource
...
##Create Models
###Create 'program'
slc loopback:model
...
vim common/models/exercise.json
...
###Create 'exercise'
slc loopback:model
...
vim common/models/exercise.json
...
##Create migration file
vim bin/automigrate.js
...
##Add Static Middleware configuration
vim server/middleware.json
...
##Generate angular file
lb-ng ./server/server.js ./client/ng-kinetic.js

##Install angular
cd
vim server/middleware.json
...

##Create Appliciaton
touch client/index.html

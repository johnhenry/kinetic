##Install Brew...

##Install MySql
brew install mysql

##Install Strongloop
npm install -g strongloop
slc loopback

##Install mysql connector
npm install loopback-connector-mysql --save
##Create mysql datasource
slc loopback:datasource

##Log into mysql
mysql -u root
###Create database
create database kinetic

##Create Models
###Create 'program'
slc loopback:model
vim common/models/exercise.json
###Create 'exercise'
slc loopback:model
vim common/models/exercise.json

##Create migration file
vim bim/automigrate.js

# Finer Vision test
### Requirements
* nodejs v10
* php 7.2
* Laravel 5.7
* MySQL


### How To run?
* Clone the project
* Create a database in MySQL named `test`
* Open `.env` file and put appropriate values in `DB_*` configs.
* Run migration for database
```
php artisan migrate
```
* Run the following to install nodejs dependencies
```
npm install
```
 * Build the frontend react app
 ```
 npm run prod
 ```
 * Open the app url in chrome browser

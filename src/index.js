if (process.env.NODE_ENV !== 'production') {
    //Environment Variables
    require('dotenv').config();
}
//Database
require('./database');
//Application
require('./app');

console.log(process.env.NODE_ENV)
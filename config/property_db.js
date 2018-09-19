 //'mongodb://localhost:27017/peopleAPI'

module.exports = {
    "url_conn": 
        {"url": "mongodb://ds163162.mlab.com:63162/people_api",
        "user": process.env.USERDB,
        "password": process.env.PWDB
        }   
};
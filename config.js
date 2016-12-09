exports.DATABASE_URL = "mongodb://<dbuser>:<dbpassword>@ds127928.mlab.com:27928/mongodb-shopping-list-thinkful"

//   process.env.DATABASE_URL || global.DATABASE_URL ||
//                        (process.env.NODE_ENV === 'production' ?
//                             'mongodb://localhost/shopping-list' :
//                             'mongodb://localhost/shopping-list-dev':
//                             )
exports.PORT = process.env.PORT || 8080;


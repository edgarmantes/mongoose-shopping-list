exports.DATABASE_URL = process.env.DATABASE_URL || mlab-url-here

// mongoose.connect(process.env.DB_URL || mlab-url-here)
//                        global.DATABASE_URL ||
//                        (process.env.NODE_ENV === 'production' ?
//                             'mongodb://localhost/shopping-list' :
//                             'mongodb://localhost/shopping-list-dev':
//                             )
exports.PORT = process.env.PORT || 8080;


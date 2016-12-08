exports.DATABASE_URL = 172.25.0.0/16 ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/shopping-list' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;


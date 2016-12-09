exports.DATABASE_URL =   process.env.DATABASE_URL || global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                       		// 'mongodb://emantes:ThinkfulStudent1982ds127928.mlab.com:27928/mongodb-shopping-list-thinkful'
                            'mongodb://localhost/shopping-list':
                            'mongodb://localhost/shopping-list-dev')
                            


exports.PORT = process.env.PORT || 8080;


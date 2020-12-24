const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { graphqlHTTP } = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const log = require('./config/winston'); 
const authMiddleware = require('./middleware/auth.middleware')
 
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Disposition']
}));
app.use(morgan('combined', { stream: log.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    let authToken = req.headers.authorization;
    let operationType = req.body.operationName;
    try {
        if (authToken) {
            let user = await authMiddleware.auth(authToken);
            req.user = user;
            next()
        } else if (operationType == 'login' || operationType == 'createUser') {
            next()
        }
    } catch (err) {
        res.status(500).json({
            error: err.stack ? err.stack : err.message ? err.message : err
        })
    }
})

app.use(
  '/graphql', 
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        customFormatErrorFn: (error) => ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
          })
      })
  );


const runServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/graphql-project", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        .then(() => log.info('MongoDB connected'))
        .catch((error) => { throw 'Error MongoDB conect' })
        app.listen(4000, () => {
            log.info('App is running at http://localhost:4000')
            log.info('Press CTRL-C to stop')
        })
    } catch (error) {
        log.info('MongoDB connection error. Please make sure MongoDB is running => %d', error)
        process.exit(1)
    }
}

runServer();
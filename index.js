const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { graphqlHTTP } = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const log = require('./config/winston'); 
 
const app = express();

app.use(cors({
    exposedHeaders: ['Content-Disposition']
}));
app.use(morgan('combined', { stream: log.stream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  }),
);

const runServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo-graphql", {
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
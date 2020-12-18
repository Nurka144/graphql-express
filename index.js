const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
 
const schema = buildSchema(`
  type Query {
    todo_title: String,
    findOne(id: Int!): findOne,
    findAll: [findAll],
    createOne(title: String!): createOne
  }

  type findOne {
      id: Int,
      title: String
  }

  type findAll {
      id: Int,
      title: String
  }

  type createOne {
      id: Int
      title: String
  }
`);
 
let todos = [{
    id: 1,
    title: 'Learn Graphql'
}, {
    id: 2,
    title: 'Earn money'
}];

const root = { 
    todo_title: () => 'Hello world!',
    findOne: ({id}) => {
        return todos.find(item => item.id == id);
    },
    findAll: () => todos,
    createOne: ({title}) => {
        let index = todos.length + 1
        todos.push({id: index, title})
        return title
    }      
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000);
const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        title: String
        findAll: [Todo] 
    }

    type Todo {
        _id: ID,
        title: String,
        complete: Int
    }

    input TodoInput {
        title: String,
        complete: Int
    }

    type Mutation {
        createTodo(todoData: TodoInput): Todo
    }
`);
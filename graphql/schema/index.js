const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    schema {
        query: Query
        mutation: Mutation
    }

    type User {
        _id: ID,
        login: String,
        password: String,
        token: String,
        create_by: String,
        update_by: String
    }

    type Query {
        title: String
    }

    type Mutation {
        createUser(login: String, password: String): User,
        login(login: String, password: String): User
    }
`);
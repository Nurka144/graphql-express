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

    type Post {
        _id: ID,
        title: String,
        text: String,
        create_user: Int,
        create_date: String,
        update_user: Int,
        update_date: String,
        is_active: Int
    }

    type Likes { 
        _id: ID,
        post_id: Int,
        user_id: Int,
        create_user: Int,
        create_date: String,
        update_user: Int,
        update_date: String,
        is_active: Int
    }

    type Query {
        title: String
    }

    type Mutation {
        createUser(login: String, password: String): User,
        login(login: String, password: String): User,
        createPost(title: String, text: String): Post
    }
`);
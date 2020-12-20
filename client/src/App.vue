<template>
  <div id="app">
    <div>
      {{title}}
    </div>
    <div>
      <!-- <ApolloQuery :query="require('../src/graphql/allTodos.gql')">
          <template v-slot="{result: {loading, error, data}}">
            <div v-if="data">
              <li v-for="todo in data.findAll" :key="todo._id">{{todo.title}}</li>
            </div>
          </template>
      </ApolloQuery> -->
      <li v-for="todo in todos" :key="todo._id">{{todo.title}}</li>
    </div>
    <div>
      <!-- <ApolloMutation
        :mutation="require('../src/graphql/createTodo.gql')"
        :variables="{title: inputTitle, complete: 1}"
        @done="createTodo"
        >
        <template v-slot="{mutate}">
          <form @submit.prevent="mutate()">
            <input type="text" v-model="inputTitle"/>
            <button>создать</button>
          </form>
        </template>
      </ApolloMutation> -->
      <input type="text" v-model="inputTitle"/>
            <button @click="createTodos">создать</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_ALL_TODOS = gql`
  query {
    findAll {
      _id
      title
      complete
  }
 }`;

const GET_TITLE = gql`
  query {
    title
  }
`;

export default {
  name: 'App',
  apollo: {
    title: {
      query: GET_TITLE
    },
    findAll: {
      query: GET_ALL_TODOS,
      error(error) {
        console.log(error)
      }
    }
    
  },
  data() {
    return {
      inputTitle: "",
      test: "",
      todos: ""
    }
  },
  created () {
    this.getList()  
  },
  methods: {
     createTodo(data) {
       alert('Todo create : ID: ' + data.data.createTodo._id)
     },
     createTodos() {
       this.$apollo.mutate({
         mutation: require('../src/graphql/createTodo.gql'),
         variables: {title: this.inputTitle, complete: 1},
         update: (cache, data) => {
           this.getList();
           this.inputTitle = ""
           alert("ID: " + data.data.createTodo._id)
         }
       })
     },
    async getList() {
      await this.$apollo.queries.findAll.refetch()
      .then(data => this.todos = data.data.findAll)
    }
  },
    
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

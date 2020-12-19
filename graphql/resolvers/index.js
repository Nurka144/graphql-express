const Todos = require('../../models/todo');

module.exports = {
    title: () => 'test mongoose',
    findAll: async () => { 
        const findTodos = await Todos.find();
        return findTodos
    },
    createTodo: async args => {
        const todo = args.todoData
        console.log(todo)
    }
}
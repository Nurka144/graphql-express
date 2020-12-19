const Todos = require('../../models/todo');
const log = require('../../config/winston');

module.exports = {
    title: () => 'test mongoose',
    findAll: async () => { 
        try {
            const findTodos = await Todos.find();
            return findTodos   
        } catch (error) {
            log.error(error);
        }
    },
    createTodo: async args => {
        const todo = args.todoData
        console.log(todo)
    }
}
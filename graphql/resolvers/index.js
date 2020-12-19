const Todos = require('../../models/todo');
const log = require('../../config/winston');

module.exports = {
    title: () => 'GraphQl Express',
    findAll: async () => { 
        try {
            const findTodos = await Todos.find();
            return findTodos   
        } catch (error) {
            log.error(error);
        }
    },
    createTodo: async args => {
        try {
            const {title, complete} = args.todoData
            const todo = new Todos({
                title,
                complete
            });
            const newTodo = await todo.save();
            return {_id: newTodo._id}
        } catch (error) {
            log.error(error);
        }
    }
}
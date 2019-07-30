import express from 'express';
import bodyParse from 'body-parser';

declare interface TodoItem {
    id: number;
    text: string;
    done: boolean;
}

const todos = [
    { id: 1, text: '買い物', done: false},
    { id: 2, text: 'ゴミ捨て', done: false},
] as TodoItem[];

const app = express();
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();});
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.get('/', (request, response) => response.status(200).json(todos));
app.get('/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const target = todos.find(x => x.id === id);
    if (!target) {
        response.status(404).send();
        return;
    }

    response.status(200).json(target);
});
app.post('/', (request, response) => {
    const newTodo = request.body as TodoItem;
    newTodo.id = todos.reduce((prev, current) => prev.id < current.id ? current : prev).id + 1;
    todos.push(newTodo);
    response.status(201).json(newTodo);
});
app.put('/:id', (request, response) => {
    const id = parseInt(request.params.id as string);
    const updatedTodo = request.body as TodoItem;
    const target = todos.find((x) => x.id === id);
    if (!target) {
        response.status(404).send();
        return;
    }

    target.text = updatedTodo.text;
    target.done = updatedTodo.done;
    response.status(204).json(target);
});
app.delete('/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const index = todos.findIndex((x) => x.id === id);
    if (index === -1) {
        response.status(404).send();
        return;
    }

    todos.splice(index, 1);
    response.status(200).send();
});

app.listen(9999, () => console.log('listening on port 9999'));
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var todos = [
    { id: 1, text: '買い物', done: false },
    { id: 2, text: 'ゴミ捨て', done: true },
];
var app = express_1.default();
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', function (request, response) { return response.status(200).json(todos); });
app.get('/:id', function (request, response) {
    var id = parseInt(request.params.id);
    var target = todos.find(function (x) { return x.id === id; });
    if (!target) {
        response.status(404).send();
        return;
    }
    response.status(200).json(target);
});
app.post('/', function (request, response) {
    var newTodo = request.body;
    newTodo.id = todos.reduce(function (prev, current) { return prev.id < current.id ? current : prev; }).id + 1;
    todos.push(newTodo);
    response.status(201).json(newTodo);
});
app.put('/:id', function (request, response) {
    var id = parseInt(request.params.id);
    var updatedTodo = request.body;
    var target = todos.find(function (x) { return x.id === id; });
    if (!target) {
        response.status(404).send();
        return;
    }
    target.text = updatedTodo.text;
    target.done = updatedTodo.done;
    response.status(204).json(target);
});
app.delete('/:id', function (request, response) {
    var id = parseInt(request.params.id);
    var index = todos.findIndex(function (x) { return x.id === id; });
    if (index === -1) {
        response.status(404).send();
        return;
    }
    todos.splice(index, 1);
    response.status(200).send();
});
app.listen(9999, function () { return console.log('listening on port 9999'); });
//# sourceMappingURL=index.js.map
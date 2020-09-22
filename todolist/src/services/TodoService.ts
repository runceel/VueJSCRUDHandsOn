import TodoItem from '@/models/TodoItem';
import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: 'http://localhost:9999',
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

class TodoService {
    async getAll(): Promise<TodoItem[]> {
        const response = await axios.get('/');
        return response.data as TodoItem[];
    }

    async add(todoItem: TodoItem): Promise<number> {
        const response = await axios.post('/', todoItem);
        return (<TodoItem>response.data).id;
    }

    async update(todoItem: TodoItem): Promise<void> {
        await axios.put(`/${todoItem.id}`, todoItem);
    }
}

export default new TodoService();

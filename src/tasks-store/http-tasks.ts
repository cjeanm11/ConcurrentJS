import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export const httpTasks = {
    [apiUrl]: async (): Promise<Post> => {
        try {
            const response: AxiosResponse<Post> = await axios.get(apiUrl);
            console.log("Http Response:", response);
            return response.data;
        } catch (error) {
            console.error("Task Error:", error);
            throw error;
        }
    }
};


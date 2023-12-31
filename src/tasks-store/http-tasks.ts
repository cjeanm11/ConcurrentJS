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
            return response.data;
        } catch (error) {
            console.error("Task Error:", error);
            throw error;
        }
    }
};

(async () => {
    try {
        const result = await httpTasks[apiUrl]();
        console.log("Task Result:", result);
    } catch (error) {
        console.error("Task Error:", error);
    }
})();

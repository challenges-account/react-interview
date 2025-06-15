import axiosClient from "../client";

const BASE_URL = "/todolists";

const TodoListsApi = {
  getAll: async (): Promise<TodoList[]> => {
    const response = await axiosClient.get(BASE_URL);
    return response.data;
  },

  getById: async (id: string): Promise<TodoList> => {
    const response = await axiosClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateTodoListDto): Promise<TodoList> => {
    const response = await axiosClient.post(BASE_URL, data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateTodoListDto>,
  ): Promise<TodoList> => {
    const response = await axiosClient.patch(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`${BASE_URL}/${id}`);
  },
};

export default TodoListsApi;

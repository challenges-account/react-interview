import axiosClient from "../../client";

const TodoListItemsApi = {
  getAll: async (todoListId: string): Promise<TodoListItem[]> => {
    const response = await axiosClient.get(`/todolists/${todoListId}/items`);
    return response.data;
  },

  getById: async (
    todoListId: string,
    itemId: string,
  ): Promise<TodoListItem> => {
    const response = await axiosClient.get(
      `/todolists/${todoListId}/items/${itemId}`,
    );
    return response.data;
  },

  create: async (
    todoListId: string,
    data: CreateTodoListItemDto,
  ): Promise<TodoListItem> => {
    const response = await axiosClient.post(
      `/todolists/${todoListId}/items`,
      data,
    );
    return response.data;
  },

  update: async (
    todoListId: string,
    itemId: string,
    data: UpdateTodoListItemDto,
  ): Promise<TodoListItem> => {
    const response = await axiosClient.put(
      `/todolists/${todoListId}/items/${itemId}`,
      data,
    );
    return response.data;
  },

  delete: async (todoListId: string, itemId: string): Promise<void> => {
    await axiosClient.delete(`/todolists/${todoListId}/items/${itemId}`);
  },

  deleteAll: async (todoListId: string): Promise<void> => {
    await axiosClient.delete(`/todolists/${todoListId}/items`);
  },
};

export default TodoListItemsApi;

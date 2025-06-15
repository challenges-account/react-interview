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
    const response = await axiosClient.patch(
      `/todolists/${todoListId}/items/${itemId}`,
      data,
    );
    return response.data;
  },

  delete: async (todoListId: string, itemId: string): Promise<void> => {
    await axiosClient.delete(`/todolists/${todoListId}/items/${itemId}`);
  },

  toggleComplete: async (
    todoListId: string,
    itemId: string,
    completed: boolean,
  ): Promise<TodoListItem> => {
    return TodoListItemsApi.update(todoListId, itemId, { completed });
  },
};

export default TodoListItemsApi;

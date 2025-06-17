import { useMutation, useQuery } from "@tanstack/react-query";
import TodoListItemsApi from "./service";
import queryClient from "../../queryClient";

export const useTodoListItems = (todoListId: string) => {
  return useQuery({
    queryKey: ["todoListItems", todoListId],
    queryFn: () => TodoListItemsApi.getAll(todoListId),
    enabled: !!todoListId,
  });
};

export const useTodoListItem = (todoListId: string, itemId: string) => {
  return useQuery({
    queryKey: ["todoListItem", todoListId, itemId],
    queryFn: () => TodoListItemsApi.getById(todoListId, itemId),
    enabled: !!todoListId && !!itemId,
  });
};

export const useCreateTodoListItem = (todoListId: string) => {
  return useMutation({
    mutationFn: (data: CreateTodoListItemDto) =>
      TodoListItemsApi.create(todoListId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todoListItems", todoListId],
      });
      queryClient.invalidateQueries({ queryKey: ["todoList", todoListId] });
    },
  });
};

export const useUpdateTodoListItem = (todoListId: string, itemId: string) => {
  return useMutation({
    mutationFn: (data: UpdateTodoListItemDto) =>
      TodoListItemsApi.update(todoListId, itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todoListItem", todoListId, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ["todoListItems", todoListId],
      });
    },
  });
};

export const useDeleteTodoListItem = (todoListId: string) => {
  return useMutation({
    mutationFn: (itemId: string) => TodoListItemsApi.delete(todoListId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todoListItems", todoListId],
      });
      queryClient.invalidateQueries({ queryKey: ["todoList", todoListId] });
    },
  });
};

export const useDeleteAllTodoListItems = (todoListId: string) => {
  return useMutation({
    mutationFn: () => TodoListItemsApi.deleteAll(todoListId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todoListItems", todoListId],
      });
      queryClient.invalidateQueries({ queryKey: ["todoList", todoListId] });
    },
  });
};

import { useMutation, useQuery } from "@tanstack/react-query";
import TodoListsApi from "./service";
import queryClient from "../queryClient";

export const useTodoLists = () => {
  return useQuery({
    queryKey: ["todoLists"],
    queryFn: TodoListsApi.getAll,
  });
};

export const useTodoList = (id: string) => {
  return useQuery({
    queryKey: ["todoList", id],
    queryFn: () => TodoListsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTodoList = () => {
  return useMutation({
    mutationFn: (data: CreateTodoListDto) => TodoListsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });
};

export const useUpdateTodoList = (id: string) => {
  return useMutation({
    mutationFn: (data: Partial<CreateTodoListDto>) =>
      TodoListsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      queryClient.invalidateQueries({ queryKey: ["todoList", id] });
    },
  });
};

export const useDeleteTodoList = () => {
  return useMutation({
    mutationFn: (id: string) => TodoListsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
    },
  });
};

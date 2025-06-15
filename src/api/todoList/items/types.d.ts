interface TodoListItem {
  id: string;
  todoListId: string;
  name: string;
  completed: boolean;
}

interface CreateTodoListItemDto {
  name: string;
}

interface UpdateTodoListItemDto {
  name?: string;
  completed?: boolean;
}

import { useRef } from "react";
import { TodoType } from "../../model/list-type";
import { TodoStoreType } from "../../store/todolist_store";
import useText from "./useText";

export type TodoListProps = {
  undoneTask: number;
  setCount: (num: number) => void;
  selectedDate: number;
  todoListStore: TodoStoreType;
  setTodoListStore: (store: TodoStoreType) => void;
};

export default function useTodoListStore({
  selectedDate,
  todoListStore,
  setTodoListStore,
}: TodoListProps) {
  const todoId = useRef<number>(0);
  const { text, onChange, setText } = useText();

  /// OGH: todo list store
  const todoList = todoListStore[selectedDate] ?? [];

  // newTodoList: "오늘" 의 todolist
  function updateTodoListStore(newTodoList: TodoType[]) {
    const newTodoListStore = {
      ...todoListStore,
    };
    newTodoListStore[selectedDate] = newTodoList;
    setTodoListStore(newTodoListStore);
  }
  function handleAppend() {
    const newId = todoId.current;
    todoId.current++;
    const newTodoList = [...todoList, { text: text, id: newId, done: false }];
    updateTodoListStore(newTodoList);
    setText("");
  }
  function handleCheck(index: number, done: boolean) {
    const newTodoList = [...todoList];
    newTodoList[index].done = done;
    updateTodoListStore(newTodoList);
  }
  function handleRemove(index: number) {
    const removedTodoList = todoList.filter(
      (remove) => remove.id !== todoList[index].id
    );
    updateTodoListStore(removedTodoList);
  }

  return {
    handleAppend,
    handleRemove,
    handleCheck,
    todoList,
    text,
    onChange,
  };
}

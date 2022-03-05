import { useEffect, useRef, useState } from "react";
import { TodoType } from "../../model/list-type";
import useText from "./useText";

export type TodoListProps = {
  undoneTask: number;
  setCount: (num: number) => void;
  selectedDate: number;
};

export default function useTodoListStore({ selectedDate }: TodoListProps) {
  const todoId = useRef<number>(0);
  const { text, onChange, setText } = useText();
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const previousDate = useRef<number>(selectedDate);

  useEffect(() => {
    if (!isLoaded || previousDate.current != selectedDate) {
      fetch(`/api/hello?date=${selectedDate}`, {
        method: "GET",
      }).then(async (response) => {
        const body = await response.json();
        const list = body.data;
        console.log("fetch from todolist component");
        previousDate.current = selectedDate;
        setLoaded(true);
        setTodoList(list);
      });
    }
  }, [isLoaded, selectedDate]);

  function handleAppend() {
    const newId = todoId.current;
    todoId.current++;
    const newTodo: TodoType = { text: text, id: newId, done: false };
    // {text: "안녕하세요", id: 0, done: false}
    // => http 통신으로 주고 받을 때, "{text:'안녕하세요',id:0,done:false"
    fetch(`/api/hello?date=${selectedDate}`, {
      method: "POST",
      body: JSON.stringify(newTodo),
    }).then(async (response) => {
      console.log("post from todolist component");
      // 다시 loading 하는 코드
      setLoaded(false);
    });
    setText("");
  }
  // function handleCheck(index: number, done: boolean) {
  //   const newTodoList = [...todoList];
  //   newTodoList[index].done = done;
  //   updateTodoListStore(newTodoList);
  // }
  // function handleRemove(index: number) {
  //   const removedTodoList = todoList.filter(
  //     (remove) => remove.id !== todoList[index].id
  //   );
  //   updateTodoListStore(removedTodoList);
  // }

  return {
    handleAppend,
    // handleRemove,
    // handleCheck,
    todoList,
    text,
    onChange,
  };
}

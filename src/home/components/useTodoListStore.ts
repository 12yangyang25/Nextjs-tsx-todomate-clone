import { useEffect, useRef, useState } from "react";
import { TodoType } from "../../model/list-type";
import useText from "./useText";
import axios from "axios";

export type TodoListProps = {
  wantedDate: number;
};

type APIDataResponse = {
  length: number;
  data: TodoType[];
};

export default function useTodoListStore({ wantedDate }: TodoListProps) {
  const todoId = useRef<number>(0);
  const { text, onChange, setText } = useText();
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const previousDate = useRef<number>(wantedDate);

  // axios.get을 31일치 다 호출해서
  // 배열에 담아둠.
  // [
  //  [Todo, Todo], [Todo, Todo],
  // ]
  // todoList[selectedDay] => 그날의 todoList

  useEffect(() => {
    if (!isLoaded || previousDate.current != wantedDate) {
      console.log(`refetch data for ${wantedDate}`);
      axios.get(`/api/hello?date=${wantedDate}`).then((response) => {
        console.log("refetch day", wantedDate, "data", response.data);
        // response.data => {length: 0, data: TodoType[]};
        const responseData: APIDataResponse = response.data;
        previousDate.current = wantedDate;
        setLoaded(true);
        setTodoList(responseData.data);
      });
    }
  }, [isLoaded, wantedDate]);

  function handleAppend() {
    const newId = todoId.current;
    todoId.current++;

    axios
      .post(`/api/hello?date=${wantedDate}`, {
        text: text,
        id: newId,
        done: false,
      })
      .then((response) => {
        console.log("post from todolist component");
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

import { TodoType } from "../../model/list-type";
import axios from "axios";
import { useMemo, useState } from "react";

interface TodoListService {
  getTodos: (date: number, callback) => void;
  postTodos: (todo: TodoType, date: number, callback) => void;
  todos: { [key: string]: TodoType[] };
}

// ParentComponet => useTodoListService(); 
// 			=> 가지고 있는 것: TodoListService 타입의 객체 
// TodoListService 타입이 하는일. 
//     - getTodos() 로 원하는 날짜의 데이터를 가져오는 것. 
// 		 - postTodos() 로 원하는 날짜에 데이터를 추가하는 것.
//     - todos 객체에 {"1일": [TodoType, TodoType], "2일": [TodoType]} 형태의 데이터를 추가 하는것. 

// <Parent>
// 		<Schedule todoListService={todoListService} />
// </Parent>

// /* Schedule 컴포넌트 */
// const [refresh, setRefresh] = useState<boolean>(false);
// todoListService.getTodos(date, () => setRefresh(!refresh));
// 
// /* TodoList 컴포넌트 */
// const [refresh, setRefresh] = useState<boolean>(false);
// todoListService.getTodos(date, () => setRefresh(!refresh));

type APIDataResponse = {
  length: number;
  data: TodoType[];
};
const useTodoListService = () => {
	const [refresh, setRefresh] = useState<boolean>(false);
  const todoListService: TodoListService = useMemo(() => {
    getTodos: (date: number) => {
      axios.get(`/api/hello?date=${date}`).then((response) => {
        console.log(response.data);
        // response.data => {length: 0, data: TodoType[]};
        const responseData: APIDataResponse = response.data;
      });
    },
    postTodos: (todo: TodoType, date: number) => {
      axios.post(`/api/hello?date=${date}`, todo).then((response) => {});
    },
    todos: {},
  }, []);

  return todoListService;
};

export default useTodoListService;

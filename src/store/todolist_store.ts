import { TodoType } from "../model/list-type";

export type TodoStoreType = {
  // key 값이 날짜이다. 
  // 각 날짜마다, Todo 배열을 가지고 있다. 
  [key: string]: TodoType[];
};

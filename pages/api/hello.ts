// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../src/model/list-type";
import { TodoStoreType } from "../../src/store/todolist_store";

type Data = {
  length: number;
  data: TodoType[];
};

var next_id = 0;

const DailyTodoStore: TodoStoreType = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method?.toUpperCase() === "GET") {
    const date = req.query["date"] as string;
    const todoList = DailyTodoStore[date] ?? [];
    res.status(200).json({
      length: todoList.length,
      data: todoList,
    });
  } else if (req.method?.toUpperCase() === "POST") {
    const date = req.query["date"] as string;
    const todoList = DailyTodoStore[date] ?? [];
    const data = req.body as TodoType;
    if (data === undefined) {
      return res.status(400).end();
    }
    data.id = next_id;
    next_id++;
    todoList.push(data);
    DailyTodoStore[date] = todoList;
    res.status(201).json({
      length: 1,
      data: [data],
    });
  } else if (req.method?.toUpperCase() === "PUT") {
    const date = req.query["date"] as string;
    const todoList = DailyTodoStore[date] ?? [];
    const data = (req.body as TodoType) ?? {};
    const target = todoList.findIndex((todo) => todo.id == data.id);
    if (target === -1) {
      return res.status(404).end();
    }
    todoList[target] = data;
    DailyTodoStore[date] = todoList;
    res.status(200).json({
      length: 1,
      data: [data],
    });
  } else if (req.method?.toUpperCase() === "DELETE") {
    const date = req.query["date"] as string;
    const todoId = parseInt(req.query["todo_id"] as string);
    const todoList = DailyTodoStore[date] ?? [];
    DailyTodoStore[date] = todoList.filter((todo) => todo.id != todoId);
    res.status(200).end();
  }
}

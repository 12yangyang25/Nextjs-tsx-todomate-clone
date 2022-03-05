// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../src/model/list-type";
import { TodoStoreType } from "../../src/store/todolist_store";

type Data = {
  length: number;
  data: TodoType[];
};

const DailyTodoStore: TodoStoreType = {
  today: [{ done: false, id: 0, text: "hi" }],
};

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
    const data = JSON.parse(req.body) as TodoType;

    todoList.push(data);
    DailyTodoStore[date] = todoList;
    res.status(201).end();
  }
}

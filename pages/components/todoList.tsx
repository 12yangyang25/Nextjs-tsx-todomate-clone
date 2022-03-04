import React, { useState, useRef, Dispatch } from "react";
import styled from "styled-components";
import { faCalendarPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Schedule from "./schedule";

export default function TodoList(prop: {
  undoneTask: number;
  setCount: (num: number) => void;
}) {
  type listType = { text: string; id: number; done: false };

  const [todoList, setTodo] = useState<listType[]>([]);
  const [text, setText] = useState<string>("");
  const todoId = useRef<number>(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  function handleAppend() {
    todoId.current === 0
      ? setTodo([{ text: text, id: todoId.current, done: false }])
      : setTodo([...todoList, { text: text, id: todoId.current, done: false }]);
    todoId.current++;

    setText("");
  }

  const undoneTasks: listType[] = todoList.filter((todo) => !todo.done);
  prop.setCount(undoneTasks.length);

  return (
    <Wrapper>
      <FeedWrapper>Feed</FeedWrapper>
      <IconWrapper>
        <InputWrapper
          type="text"
          placeholder="입력"
          value={text}
          onChange={onChange}
        />
        <FontAwesomeIcon
          icon={faCalendarPlus}
          fontSize="20px"
          color="black"
          onClick={handleAppend}
        />
      </IconWrapper>
      <>
        {todoList.map((todo) => {
          return (
            <TodoWrapper>
              <input type="checkbox" />
              <div>{todo.text}</div>
              <TrashCanWrapper>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  fontSize="13px"
                  onClick={() =>
                    setTodo(todoList.filter((remove) => remove.id !== todo.id))
                  }
                />
              </TrashCanWrapper>
            </TodoWrapper>
          );
        })}
      </>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 80px;
  border-left: 1px solid mistyrose;
  height: 500px;
  padding-left: 40px;
`;

const FeedWrapper = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 62px;
  gap: 15px;
`;

const InputWrapper = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  width: 200px;
`;

const TrashCanWrapper = styled.div`
  flex: display;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  color: gray;
  margin-left: 30px;
  &:hover {
    color: lightgray;
  }
  display: none;
`;

const TodoWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 17px;
  &:hover {
    ${TrashCanWrapper} {
      display: initial;
    }
  }
`;

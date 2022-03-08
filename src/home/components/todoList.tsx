import { faCalendarPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import useTodoListStore, { TodoListProps } from "./useTodoListStore";

export default function TodoList(props: TodoListProps) {
  // const { text, onChange, handleAppend, handleRemove, handleCheck, todoList } =
  //   useTodoListStore(props);
  const { text, onChange, todoList, handleAppend } = useTodoListStore(props);
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
        {
          // todoListStore => "1일" : TodoType[]
          //               => "2일" : TodoType[]
          //                 todoListStore["선택한 날 "] => [
          //                           {done, text, id}, {done, text, id}, {done, text, id},
          //                           0                         1             2
          //                           ]
          // todoList = todoListStore["selectedDate"];
        }
        {todoList.map((todo, index) => {
          return (
            <TodoWrapper key={`todolist-${index}-${todo.done}`}>
              <input
                type="checkbox"
                onChange={(event) => {
                  const status = event.target.checked;
                  // handleCheck(index, status);
                }}
                checked={todoList[index].done}
              />
              <div>{todo.text}</div>
              <TrashCanWrapper>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  fontSize="13px"
                  // onClick={() => handleRemove(index)}
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

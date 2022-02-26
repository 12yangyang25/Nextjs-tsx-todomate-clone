import React, { useState } from "react";
import styled from "styled-components";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoList() {
  const [todoList, setTodo] = useState(["할 일"]);

  function HandleClick() {
    setTodo([...todoList, "할 일 추가"]);
  }
  return (
    <Wrapper>
      <FeedWrapper>Feed</FeedWrapper>
      <IconWrapper>
        <FontAwesomeIcon
          icon={faCalendarPlus}
          fontSize="20px"
          color="black"
          onClick={HandleClick}
        />
      </IconWrapper>
      <div>
        {todoList.map((todo) => {
          return (
            <TodoWrapper>
              <input type="checkbox" />
              <div>{todo}</div>
            </TodoWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 44px;
  border-left: 1px solid mistyrose;
  height: 500px;
  padding-left: 40px;
`;

const FeedWrapper = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

const IconWrapper = styled.div`
  margin-top: 62px;
`;

const TodoWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 17px;
`;

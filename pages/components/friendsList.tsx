import styled from "styled-components";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function FriendsList() {
  const [listState, setList] = useState(["Me"]);

  function handleAppend() {
    //친구 추가
    setList([...listState, "New"]);
  }

  return (
    <Wrapper>
      {listState.map((list) => {
        return <Person>{list}</Person>;
      })}
      <Person>
        <FontAwesomeIcon icon={faUserPlus} onClick={handleAppend} />
      </Person>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-left: 10px;
  cursor: pointer;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  font-weight: 600;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  font-size: 12px;
  align-items: center;
`;

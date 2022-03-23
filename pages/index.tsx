import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import FriendsList from "../src/home/components/friendsList";
import MyProfile from "../src/home/components/myProfile";
import Navigationbar from "../src/home/components/navigationBar";
import Schedule from "../src/home/components/schedule";
import TodoList from "../src/home/components/todoList";
import useTodoListStore from "../src/home/components/useTodoListStore";

const useAllTodoListStore = () => {
  // useTodoListStore는 하루하루에대한 관리
  // 지금 hook은 한달 혹은 1주일에 대한 관리.
};

const Home: NextPage = () => {
  const [todoCount, setCount] = useState(0);
  const handleCount = (num: number) => {
    setCount(num);
  };

  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const selectedTodoStore = useTodoListStore({ wantedDate: selectedDate });

  return (
    <>
      <NavWrapper>
        <Navigationbar />
      </NavWrapper>
      <Wrapper>
        <div>
          <FriendsList />
          <MyProfile />
          <Schedule
            undoneTask={todoCount}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTodoStore={selectedTodoStore}
            key={`date-${selectedDate}`}
          />
        </div>
        <TodoList
          wantedDate={selectedDate}
          selectedTodoStore={selectedTodoStore}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 400px 1fr;
`;

const NavWrapper = styled.div`
  height: 100px;
  background: mistyrose;
`;

export default Home;

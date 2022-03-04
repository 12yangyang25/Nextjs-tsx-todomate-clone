import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navigationbar from "./components/navigationBar";
import FriendsList from "./components/friendsList";
import MyProfile from "./components/myProfile";
import Schedule from "./components/schedule";
import TodoList from "./components/todoList";
import styled from "styled-components";
import { useState } from "react";

const Home: NextPage = () => {
  const [todoCount, setCount] = useState(0);
  const handleCount = (num: number) => {
    setCount(num);
  };

  return (
    <>
      <NavWrapper>
        <Navigationbar />
      </NavWrapper>
      <Wrapper>
        <div>
          <FriendsList />
          <MyProfile />
          <Schedule undoneTask={todoCount} />
        </div>
        <TodoList undoneTask={todoCount} setCount={handleCount} />
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

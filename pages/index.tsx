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

const Home: NextPage = () => {
  return (
    <>
      <NavWrapper>
        <Navigationbar />
      </NavWrapper>
      <Wrapper>
        <div>
          <FriendsList />
          <MyProfile />
          <Schedule />
        </div>
        <TodoList />
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
  font-family: "Noto Sans KR", sans-serif;
  font-family: "Outfit", sans-serif;
`;

export default Home;

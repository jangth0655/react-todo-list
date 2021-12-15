import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryState,
  ITodo,
  toDoSelector,
  toDoState,
} from "./atoms";
import CreateToDo, { TODOS_KEY } from "./CreateToDo";
import ToDo from "./ToDo";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 30rem;
  max-width: 30rem;
  margin: auto;
  background-color: #f04d54;
  padding: 2em;
  border-radius: 20px;
`;

const Section = styled.section``;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  h1 {
    font-size: 1.8em;
    margin-right: 0.5em;
  }
  h2 {
    font-size: 1em;
  }
`;

const SubTitle = styled.p`
  margin-bottom: 1rem;
`;

const Line = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #f37f82;
  margin-bottom: 1.5rem;
`;

const ToDolist = styled.ul`
  padding: 0 1rem;
  max-height: 15rem;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
`;

const Selector = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 1rem;
    padding: 0.3em;
    background-color: transparent;
    border: 0;
    color: #ffffff;
    transition: all 0.2s ease-in;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      color: lightpink;
    }
  }
  select {
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0.3em;
    border: 1px solid #ffffff;
    border-radius: 10px;
  }
`;

const Footer = styled.footer``;

const ToDoList = () => {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(+event.currentTarget.value);
  };

  const onClear = () => {
    setToDos([]);
    localStorage.removeItem(TODOS_KEY);
  };

  useEffect(() => {
    const loadedToDos = localStorage.getItem(TODOS_KEY);
    if (loadedToDos !== null) {
      const parsedToDos: ITodo[] = JSON.parse(loadedToDos);
      parsedToDos.forEach((toDo) => {
        setToDos((pre) => {
          return [...pre, toDo];
        });
      });
    }
  }, [setToDos]);

  return (
    <Main>
      <Section>
        <Title>
          <h1>To Do List</h1>
          <h2> {`Total : ${toDos.length}`}</h2>
        </Title>
        <SubTitle>Get things done, one item at a time.</SubTitle>
        <Line></Line>
        <Selector>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
          <button onClick={onClear}>RSET</button>
        </Selector>

        <ToDolist>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDolist>
      </Section>
      <Footer>
        <CreateToDo />
      </Footer>
    </Main>
  );
};

export default ToDoList;

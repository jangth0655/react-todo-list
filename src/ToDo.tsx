import { useSetRecoilState } from "recoil";
import { Categories, ITodo, toDoState } from "./atoms";
import { TODOS_KEY } from "./CreateToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const Li = styled.li`
  padding: 0 0.5em;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.p`
  font-size: 1rem;
`;

const CategoryBtn = styled.div`
  button {
    font-size: 0.8rem;
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
  button:nth-child(2) {
    margin: 0 0.5em;
  }
  button:nth-child(3) {
  }
`;

const Line = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #f37f82;
  margin-bottom: 1.5rem;
`;

function ToDo({ text, id, category }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = (id: number) => {
    setToDos((currentToDo) => {
      const newToDos = currentToDo.filter((toDo) => toDo.id !== id);
      const saveToDos = () => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      };
      saveToDos();
      return newToDos;
    });
  };

  return (
    <>
      <Li>
        <Text>{text} </Text>
        <CategoryBtn>
          {category !== Categories.DOING && (
            <button onClick={() => onClick(Categories.DOING)}>
              <FontAwesomeIcon icon={faHourglassStart} />
            </button>
          )}
          {category !== Categories.TO_DO && (
            <button onClick={() => onClick(Categories.TO_DO)}>
              <FontAwesomeIcon icon={faListOl} />
            </button>
          )}
          {category !== Categories.DONE && (
            <button onClick={() => onClick(Categories.DONE)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
          <button onClick={() => onDelete(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </CategoryBtn>
      </Li>
      <Line />
    </>
  );
}

export default ToDo;

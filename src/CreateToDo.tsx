import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TODOS_KEY = "toDos";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  margin-top: 1.5em;
  input,
  button {
    border-radius: 5px;
    height: 2rem;
    color: #fffdfd;
    border: 0;
  }
  input {
    padding: 0.5em;
    color: black;
    width: 80%;
  }
  button {
    margin-left: 0.3rem;
    width: 20%;
    border: 1px solid #f37f82;
    background-color: transparent;
    transition: all 0.2s ease-in;
    &:hover {
      cursor: pointer;
      background-color: lightpink;
    }
  }
`;

function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();

  const handleValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => {
      const newToDos = [
        ...oldToDos,
        { text: toDo, category, id: Date.now() },
      ].reverse();
      const saveToDos = () => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      };
      saveToDos();
      return newToDos;
    });
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <button>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </Form>
  );
}

export default CreateToDo;

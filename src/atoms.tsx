import { atom, selector } from "recoil";

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

//type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

import { Action, ActionKind, State } from "./index";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.ADD_ITEM:
      // @ts-ignore
      let newPeople = [...state.people, action.payload];
      return {
        ...state,
        people: newPeople,
        isModalOpen: true,
        modalContent: "item added",
      };
    case ActionKind.NO_VALUE:
      return {
        ...state,
        isModalOpen: true,
        modalContent: "please enter value",
      };
    case ActionKind.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case ActionKind.REMOVE_ITEM:
      // @ts-ignore
      newPeople = state.people.filter(
        // @ts-ignore
        (person) => person.id !== action.payload
      );
      // @ts-ignore
      return { ...state, people: newPeople };
    default:
      throw new Error("no matching action type");
  }
};

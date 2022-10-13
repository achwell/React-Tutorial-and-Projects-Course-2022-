import React, { useState, useReducer, FormEvent } from "react";
import Modal from "./Modal";
import { reducer } from "./reducer";

export enum ActionKind {
  ADD_ITEM = "ADD_ITEM",
  NO_VALUE = "NO_VALUE",
  CLOSE_MODAL = "CLOSE_MODAL",
  REMOVE_ITEM = "CLOSE_MODAL",
}

export type Action =
  | { type: ActionKind.ADD_ITEM; payload: Person }
  | { type: ActionKind.NO_VALUE }
  | { type: ActionKind.CLOSE_MODAL }
  | { type: ActionKind.REMOVE_ITEM; payload: string };

interface Person {
  id: string;
  name: string;
}

export interface State {
  people: Person[];
  isModalOpen: boolean;
  modalContent: string;
}

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    people: [],
    isModalOpen: false,
    modalContent: "",
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: ActionKind.ADD_ITEM, payload: newItem });
      setName("");
    } else {
      dispatch({ type: ActionKind.NO_VALUE });
    }
  };
  const closeModal = () => {
    dispatch({ type: ActionKind.CLOSE_MODAL });
  };
  return (
    <>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">add </button>
      </form>
      {state.people.map((person) => {
        return (
          <div key={person.id} className="item">
            <h4>{person.name}</h4>
            <button
              onClick={() =>
                dispatch({ type: ActionKind.REMOVE_ITEM, payload: person.id })
              }
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Index;

import React, { useState, useContext, createContext } from "react";
import { data } from "../data";

interface DataType {
  id: number;
  name: string;
}

interface ContextType {
  people: DataType[];
  removePerson: (id: number) => void;
}

const PersonContext = createContext<ContextType>({
  people: [],
  removePerson: (id) => {},
});

const ContextAPI = () => {
  const [people, setPeople] = useState(data);
  const removePerson = (id: number) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  return (
    <PersonContext.Provider value={{ removePerson, people }}>
      <h3>Context API / useContext</h3>
      <List />
    </PersonContext.Provider>
  );
};

const List = () => {
  const mainData = useContext(PersonContext);
  console.log(mainData);
  return (
    <>
      {mainData.people.map((person) => {
        return <SinglePerson key={person.id} {...person} />;
      })}
    </>
  );
};

const SinglePerson = ({ id, name }: DataType) => {
  const { removePerson } = useContext(PersonContext);

  return (
    <div className="item">
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>remove</button>
    </div>
  );
};

export default ContextAPI;

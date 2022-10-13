import data from "./data";
import SingleQuestion from "./Question";
import { useState } from "react";
import QuestionType from "./QuestionType";
function App() {
  const [questions, setQuestions] = useState<QuestionType[]>(data);
  return (
    <main>
      <div className="container">
        <h3>questions and answers about login</h3>
        <section className="info">
          {questions.map((question) => {
            return (
              <SingleQuestion key={question.id} {...question}></SingleQuestion>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;

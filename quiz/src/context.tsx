import {
  ChangeEvent,
  createContext,
  FC,
  FormEvent,
  useContext,
  useState,
} from "react";
import Result from "./types/Result";
import axios from "axios";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

interface IContext {
  waiting: boolean;
  loading: boolean;
  questions: Result[];
  index: number;
  correct: number;
  error: boolean;
  isModalOpen: boolean;
  quiz: {
    amount: number;
    category: string;
    difficulty: string;
  };
  nextQuestion: () => void;
  checkAnswer: (_: boolean) => void;
  closeModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AppContext = createContext<IContext>({
  waiting: false,
  loading: false,
  questions: [],
  correct: 0,
  error: false,
  isModalOpen: false,
  quiz: { amount: 0, category: "", difficulty: "" },
  index: 0,
  nextQuestion(): void {},
  checkAnswer(_: boolean): void {},
  closeModal(): void {},
  handleChange(_): void {},
  handleSubmit(_): void {},
});

const AppProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Result[]>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url: string) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value: boolean) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    // @ts-ignore
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

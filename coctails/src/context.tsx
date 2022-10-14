import {
  useCallback,
  useContext,
  useState,
  useEffect,
  createContext,
  FC,
} from "react";
import Drink from "./Drink";
import ICocktail from "./ICocktail";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

interface IContext {
  loading: boolean;
  cocktails: ICocktail[];
  searchTerm: string;
  setSearchTerm: (t: string) => void;
}

const AppContext = createContext<IContext>({
  loading: false,
  cocktails: [],
  searchTerm: "",
  setSearchTerm: (t: string) => {},
});

const AppProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item: Drink) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = item;
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          return {
            id,
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
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

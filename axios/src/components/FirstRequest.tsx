import { useEffect } from "react";
import axios from "axios";

const url = "https://course-api.com/react-store-products";

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  description: string;
  category: string;
  shipping: boolean;
  featured?: boolean;
}

const FirstRequest = () => {
  const fetchData = async () => {
    try {
      const response = await axios<IProduct[]>(url);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <h2 className="text-center">first request</h2>;
};

export default FirstRequest;

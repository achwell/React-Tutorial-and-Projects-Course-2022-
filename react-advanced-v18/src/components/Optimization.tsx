import React, { FC, useCallback, useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Product, { Fields } from "../Product";

const url = "https://course-api.com/javascript-store-products";

const calculateMostExpensive = (data: Product[]) => {
  return (
    data.reduce((total, item) => {
      const price = item.fields.price;
      if (price >= total) {
        total = price;
      }
      return total;
    }, 0) / 100
  );
};

const Optimization = () => {
  const { products } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const addToCart = useCallback(() => {
    setCart(cart + 1);
  }, [cart]);
  const mostExpensive = useMemo(
    () => calculateMostExpensive(products),
    [products]
  );
  return (
    <>
      <h1>Count : {count}</h1>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: "3rem" }}>cart : {cart}</h1>
      <h1>Most Expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  );
};

const BigList: FC<{ products: Product[]; addToCart: () => void }> = ({
  products,
  addToCart,
}) => {
  return (
    <section className="products">
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        );
      })}
    </section>
  );
};

const SingleProduct: FC<{ fields: Fields; addToCart: () => void }> = ({
  fields,
  addToCart,
}) => {
  let { name, price } = fields;
  price = price / 100;
  const image = fields.image[0].url;

  // useEffect(() => {
  //   console.count('hello from product');
  // });
  return (
    <article className="product">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
};
export default Optimization;

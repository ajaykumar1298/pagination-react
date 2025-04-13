import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  let [data, setData] = useState([]);

  let getData = async () => {
    let data = await fetch("https://dummyjson.com/products?limit=500");
    let json = await data.json();
    // console.log(json.products);
    setData(json.products);
  };

  useEffect(() => {
    getData();
  }, []);
  let handleClickPageNumber = (n) => {
    setPageNumber(n);
  };

  let totalProduct = data.length;
  let onePageProduct = 10;
  let numberOfPages = Math.ceil(totalProduct / onePageProduct);
  let [pageNumber, setPageNumber] = useState(0);
  let startPage = pageNumber * onePageProduct;
  let endPage = startPage + onePageProduct;

  let handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  let handlePrevPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  if (data.length < 1) return <div>No Product Found</div>;
  return (
    <>
      <h1>pagination</h1>
      <div className="pages">
        <button
          disabled={pageNumber == 0}
          className="page-number"
          onClick={handlePrevPage}
        >
          prev
        </button>

        {[...Array(numberOfPages).keys()].map((n) => (
          <span
            className={`page-number ${pageNumber == n ? "active" : ""}`}
            key={n}
            onClick={() => {
              handleClickPageNumber(n);
            }}
          >
            {n}
          </span>
        ))}

        <button
          disabled={pageNumber == numberOfPages - 1}
          className="page-number"
          onClick={handleNextPage}
        >
          next
        </button>
      </div>
      <div className="product-container">
        {data.slice(startPage, endPage).map((p) => (
          <ProductCard key={p.id} title={p.title} img={p.thumbnail} />
        ))}
      </div>
    </>
  );
}

export default App;

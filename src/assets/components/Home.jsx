import { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "./BookItem";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const copyBook = structuredClone(books);

  useEffect(() => {
    setLoading(true);
    const FetchData = async () => {
      try {
        const response = await axios.get("/api");
        const data = response.data;
        const result = Object.values(data);
        console.log(result);
        setBooks(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    };
    FetchData();
    console.log(typeof books);
  }, []);

  return (
    <div className="container my-5">
      <div className="dropdown d-flex justify-content-end mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By...
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            onClick={() => setBooks(copyBook.sort((a, b) => a.id - b.id))}
            className="dropdown-item"
          >
            Oldest
          </button>
          <button
            onClick={() => setBooks(copyBook.sort((a, b) => b.id - a.id))}
            className="dropdown-item"
          >
            Newest
          </button>
          <button
            onClick={() =>
              setBooks(copyBook.sort((a, b) => (a.score < b.score ? -1 : 1)))
            }
            className="dropdown-item"
          >
            Rating (low to high)
          </button>
          <button
            onClick={() =>
              setBooks(copyBook.sort((a, b) => (a.score > b.score ? -1 : 1)))
            }
            className="dropdown-item"
          >
            Rating (high to low)
          </button>
        </div>
      </div>
      <div className="row justify-content-center gap-5 h-100">
        <div className="col-lg-12">
          <h1 className="pb-2">My Post</h1>
          {loading && <div className="loader"></div>}
          {errorMessage && <div>{errorMessage}</div>}
          {!loading &&
            books.map((book) => {
              return <BookItem key={book.id} book={book} />;
            })}
        </div>
      </div>
    </div>
  );
}

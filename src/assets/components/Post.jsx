import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function Post() {
  const api_Url = "https://simple-book-api.onrender.com";
  const params = useParams();
  const [book, setBook] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const date = moment(book.dates).format("DD/MM/YYYY");

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(`${api_Url}/api/${params.id}`);
        const data = response.data;
        setBook(data);
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    };
    FetchData();
  }, []);

  const handleRemove = async () => {
    try {
      await axios.post(`${api_Url}/remove/${book.id}`);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container my-5">
      {errorMsg && <div className="alert alert-danger w-75">{errorMsg}</div>}
      <div className="row">
        <article className="blog-post col-md-6 col-lg-7 col-xl-8">
          <div>Book Add Date: {date}</div>
          <hr />
          <h1 className="display-3 mb-1">{book.title}</h1>
          <h3 className="fw-normal">Score: {book.score}/10</h3>
          <p>ISBN: {book.isbn}</p>
          <p>
            Info URL:
            {book.info_url ? <a href={book.info_url}>{book.info_url}</a> : " -"}
          </p>
          <p>
            Preview URL:
            {book.preview_url ? (
              <a href={book.preview_url}>{book.preview_url}</a>
            ) : (
              " -"
            )}
          </p>
          <p>{book.review}</p>
        </article>
        <div className="col-md-6 col-lg-3 col-xl-4 img-fluid">
          <img
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            alt={`${book.title} cover`}
          />
        </div>
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3 my-4">
        <Link
          to={`/edit/${book.id}`}
          className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
        >
          Edit
        </Link>

        <button
          onClick={() => void handleRemove()}
          className="btn btn-outline-danger btn-lg px-4 me-md-2 fw-bold"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

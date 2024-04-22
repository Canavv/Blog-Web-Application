import { Link } from "react-router-dom";
import moment from "moment";

export default function BookItem({ book }) {
  const date = moment(book.dates).format("DD/MM/YYYY");

  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-primary-emphasis">
          Score: {book.score}/10
        </strong>
        <h3 className="mb-0"> {book.title}</h3>
        <div className="mb-1 text-body-secondary">{date}</div>
        <div className="card-text truncate">{book.review}</div>
        <Link to={`/post/${book.id}`} state={book}>
          Continue reading
        </Link>
      </div>

      <div className="col-auto d-none d-lg-block">
        <img
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
          width="200"
          height="250"
          alt={`${book.title} cover`}
        />
      </div>
    </div>
  );
}

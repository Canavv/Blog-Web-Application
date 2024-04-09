import logo from "../images/book-svgrepo-com.svg"

export default function Navbar() {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
        
          <a
            href="/"
            className="navbar-brand d-flex align-items-center"
          >
          <img
            className="bi me-2"
            width="40"
            height="32"
            src={logo}
            alt="Book Icon"
          />
            <span className="fs-4">Book Notes</span>
          </a>

          <a href="/form" className="btn btn-primary" aria-current="page">Add Review</a>
        </div>
      </div>
    </header>
  );
}

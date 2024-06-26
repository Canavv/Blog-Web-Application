import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Form() {
  const api_Url = "https://simple-book-api.onrender.com";
  const navigate = useNavigate();
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState();
  const [form, setForm] = useState({
    title: "",
    score: "",
    review: "",
    isbn: "",
  });

  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(`${api_Url}/api/${params.id}`);
      setForm(response.data);
    };
    if (params.id) FetchData();
  }, []);

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const emptyError = () => {
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      try {
        const response = await axios.post(
          `${api_Url}/update/${params.id}`,
          form
        );
        if (response.data === "Book not found.") {
          setErrorMsg("Book not found.");
        } else {
          navigate(`/post/${params.id}`);
        }
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    } else {
      try {
        await axios.post(`${api_Url}/update`, form);
        navigate("/");
      } catch (error) {
        setErrorMsg(error.response.data.error);
      }
    }
  };
  return (
    <>
      <main className="container my-5">
        {errorMsg && <div className="alert alert-danger w-75">{errorMsg}</div>}
        <div className="row g-5">
          <div className="col-12">
            <h1 className="mb-3 pb-2">Book Review</h1>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleInput}
                    onFocus={emptyError}
                    value={form.title}
                    required=""
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="isbn" className="form-label">
                    ISBN-10 or ISBN-13
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    name="isbn"
                    onChange={handleInput}
                    onFocus={emptyError}
                    value={form.isbn}
                    required=""
                    maxLength="13"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="review" className="form-label">
                    Review
                  </label>
                  <textarea
                    className="form-control"
                    id="review"
                    name="review"
                    style={{ height: "300px" }}
                    onChange={handleInput}
                    onFocus={emptyError}
                    value={form.review}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="score" className="form-label">
                    Rating (between 1 and 10)
                  </label>
                  <input
                    type="number"
                    id="score"
                    name="score"
                    min="1"
                    max="10"
                    onChange={handleInput}
                    onFocus={emptyError}
                    value={form.score}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

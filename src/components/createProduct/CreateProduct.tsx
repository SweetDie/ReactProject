import { useState } from "react";
import http from "../../http_common";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newProduct = {
      name: name,
      detail: detail,
    };

    http.post("/api/products/create", newProduct).then((resp) => {
        dispatch({ type: "PRODUCT_CREATE", payload: resp.data });
    });
  }

  return (
    <>
      <h1 className="mt-3">Create product</h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control w-50"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="detail">
            Detail
          </label>
          <input
            type="text"
            id="detail"
            className="form-control w-50"
            onChange={(event) => setDetail(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Create
        </button>
      </form>
    </>
  );
};

export default CreateProduct;

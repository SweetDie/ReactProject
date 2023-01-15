import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Link, useSearchParams } from "react-router-dom";
import { IProductSearch } from "./store/types";
import classNames from "classnames";
import qs from "qs";
import { useFormik } from "formik";

const HomePage = () => {
  const { list, count_pages, current_page, total } = useTypedSelector(
    (store) => store.product
  );
  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<IProductSearch>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
  });

  useEffect(() => {
    GetProductList(search);
  }, [search]);

  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  const buttons = [];
  for (let i = 1; i <= count_pages; i++) {
    buttons.push(i);
  }

  function filterNonNull(obj: IProductSearch) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  const pagination = buttons.map((page) => (
    <li key={page} className="page-item">
      <Link
        className={classNames("page-link", { active: current_page === page })}
        onClick={() => setSearch({ ...search, page })}
        to={"?" + qs.stringify(filterNonNull({ ...search, page }))}
      >
        {page}
      </Link>
    </li>
  ));

  const onSubmit = (values: IProductSearch) => {
    const filter = {...values, page:1};
    setSearchParams(qs.stringify(filterNonNull(filter)));
    setSearch(filter);
  }
  const formik = useFormik({
    initialValues: search,
    onSubmit: onSubmit,
  }); 

  const {handleSubmit, values, handleChange} = formik;

  return (
    <>
      <h1 className="text-center">Main Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <h4>
        Total products <strong>{total}</strong>
      </h4>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
      <nav>
        <ul className="pagination">{pagination}</ul>
      </nav>
    </>
  );
};

export default HomePage;

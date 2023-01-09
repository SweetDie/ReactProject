import { useEffect, useState } from "react";
import http from "../../http_common";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const HomePage = () => {
  const { list } = useTypedSelector((store) => store.product);
  const dispatch = useDispatch();
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  function buttonClickHandler(id: number) {
    http.delete(`/api/products/${id}`).then((resp) => {
      dispatch({ type: "PRODUCT_DELETE", payload: resp.data });
      window.location.reload();
    });
  }

  function selectPage(page: number) {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
      http.get<any>(`/api/products?page=${currentPage}`).then((resp) => {
        setLastPage(resp.data.last_page);
        dispatch({ type: "PRODUCT_LIST", payload: resp.data.data });
      });
    }
  }

  useEffect(() => {
    http.get<any>("/api/products").then((resp) => {
      setLastPage(resp.data.last_page);
      dispatch({ type: "PRODUCT_LIST", payload: resp.data.data });
    });
  }, []);

  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => buttonClickHandler(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(
      <li key={i} className="page-item">
        <a className="page-link" onClick={() => selectPage(i)}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <>
      <h1 className="text-center">Main page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination pg-blue">
          <li className="page-item">
            <a className="page-link" onClick={() => selectPage(currentPage - 1)}>Previous</a>
          </li>
          {pages}
          <li className="page-item">
            <a className="page-link" onClick={() => selectPage(currentPage + 1)}>Next</a>
          </li>
        </ul>
        <span>current page {currentPage}</span>
      </nav>
    </>
  );
};

export default HomePage;

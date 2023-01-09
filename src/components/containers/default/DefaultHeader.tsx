import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import http from "../../../http_common";

const DefaultHeader = () => {
  const { list } = useTypedSelector((store) => store.product);
  const dispatch = useDispatch();

  function search(event : React.ChangeEvent<HTMLInputElement>) {
    http.get<any>(`/api/products?name=${event.target.value}`).then((resp) => {
      dispatch({ type: "PRODUCT_LIST", payload: resp.data.data });
    });
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Магазинчик
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Головна
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/createProduct"
                >
                  Додати продукт
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
            <li>
              <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={search}
                  />
                </form>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/register">
                  Реєстрація
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">
                  Вхід
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DefaultHeader;

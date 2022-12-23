import { useEffect } from "react";
import http from "../../http_common";
import { useDispatch } from "react-redux";
import { IProductItem } from "./store/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const HomePage = () => {
  const { list } = useTypedSelector((store) => store.product);
  const dispatch = useDispatch();

  function buttonClickHandler (id: number) {    
    http.delete(`/api/products/${id}`).then((resp) => {      
      dispatch({ type: "PRODUCT_DELETE", payload: resp.data });
    });
  };

  useEffect(() => {
    http.get<Array<IProductItem>>("/api/products").then((resp) => {
      dispatch({ type: "PRODUCT_LIST", payload: resp.data });
    });
  }, []);

  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
      <td><button className="btn btn-danger" onClick={() => buttonClickHandler(product.id)}>Delete</button></td>
    </tr>
  ));

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
    </>
  );
};

export default HomePage;

import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Loader from "../loader";

interface IProduct {
  id: number;
  name: string;
  detail: string;
  created_at: string;
  updated_at: string;
}

const HomePage = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://laravel.pv016.com/api/products")
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h1>Main page</h1>
      <div className="posts-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Create date</th>
            </tr>
          </thead>

          {data.map((product, index) => (
            <tbody key={product.id}>
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.detail}</td>
                <td>{product.created_at}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default HomePage;

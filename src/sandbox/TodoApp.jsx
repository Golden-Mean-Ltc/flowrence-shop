import React, { useEffect } from "react";
import fakeApi from "../_api/fakeApi";

// # Dave Gray RTK Query Example
const TodoApp = () => {
   useEffect(() => {
      const getProducts = async () => {
        const response = await fakeApi("/products");
        console.log(response);
        return response;
      };
      getProducts();
    },
    []);


  return <div>TodoList</div>;
};

export default TodoApp;

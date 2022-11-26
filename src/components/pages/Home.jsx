import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  ResetProductsObjectState,
  GetAllProducts,
} from "@/store/slice/ProductStore";
// import { GetAllProducts } from "src/store/slice/ProductStore";
import { useEffect } from "react";
import { RequestStatus } from "@/utils/config";
import Products from "@/components/products/Products";

function Home() {
  const { ProductsObject } = useSelector((state) => state.ProductStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ProductsObject.Status === RequestStatus.idle) {
      dispatch(GetAllProducts());
    }
  }, [ProductsObject.Status]);

  console.log("Products: ", ProductsObject);
  return <Products />;
}

export default Home;

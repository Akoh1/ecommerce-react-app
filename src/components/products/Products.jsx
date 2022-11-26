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
import { useEffect } from "react";
import { RequestStatus } from "@/utils/config";
import LargeSpinner from "@/components/ui/LargeSpinner";

function Products() {
  const { ProductsObject } = useSelector((state) => state.ProductStore);
  const is_data_loaded = ProductsObject.Status === RequestStatus.succeeded;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (ProductsObject.Status === RequestStatus.idle) {
  //     dispatch(GetAllProducts());
  //   }
  //   // dispatch(GetAllProducts());
  // }, [ProductsObject.Status]);

  return (
    <MDBContainer fluid className="my-5 ms-5">
      <div className="d-flex flex-wrap justify-content-evenly">
        {is_data_loaded ? (
          ProductsObject.Response.results.map((el, id) => (
            <MDBCard className="product-card" key={el.id}>
              <MDBCardImage
                src={el.image}
                position="top"
                alt="Laptop"
                className="product-image"
              />
              <MDBCardBody>
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a href="#!" className="text-muted">
                      No Category
                    </a>
                  </p>
                  <p className="small text-danger">
                    <s>$1099</s>
                  </p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">{el.title}</h5>
                  <h5 className="text-dark mb-0">₦ {el.price}</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted mb-0">
                    Available: <span className="fw-bold">{el.stock}</span>
                  </p>

                  <MDBBtn color="danger" className=" ms-2 product-buy-button">
                    Add To Cart
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          ))
        ) : (
          <LargeSpinner />
        )}
        {/* <MDBCard className="product-card">
          
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
            position="top"
            alt="Laptop"
            className="product-image"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1099</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">HP Notebook</h5>
              <h5 className="text-dark mb-0">$999</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">6</span>
              </p>
              
              <MDBBtn color="danger" className=" ms-2 product-buy-button">
                Buy now
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="product-card">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp"
            position="top"
            alt="Laptop"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1199</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">HP Envy</h5>
              <h5 className="text-dark mb-0">$1099</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">7</span>
              </p>
              <div className="ms-auto text-warning">
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon far icon="star" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="product-card">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
            position="top"
            alt="Gaming Laptop"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1399</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">Toshiba B77</h5>
              <h5 className="text-dark mb-0">$1299</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">5</span>
              </p>
              <div className="ms-auto text-warning">
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star-half-alt" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="product-card">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
            position="top"
            alt="Gaming Laptop"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1399</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">Toshiba B77</h5>
              <h5 className="text-dark mb-0">$1299</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">5</span>
              </p>
              <div className="ms-auto text-warning">
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star-half-alt" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="product-card">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
            position="top"
            alt="Gaming Laptop"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1399</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">Toshiba B77</h5>
              <h5 className="text-dark mb-0">$1299</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">5</span>
              </p>
              <div className="ms-auto text-warning">
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star-half-alt" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="product-card">
          <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp"
            position="top"
            alt="Gaming Laptop"
          />
          <MDBCardBody>
            <div className="d-flex justify-content-between">
              <p className="small">
                <a href="#!" className="text-muted">
                  Laptops
                </a>
              </p>
              <p className="small text-danger">
                <s>$1399</s>
              </p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">Toshiba B77</h5>
              <h5 className="text-dark mb-0">$1299</h5>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Available: <span className="fw-bold">5</span>
              </p>
              <div className="ms-auto text-warning">
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star" />
                <MDBIcon fas icon="star-half-alt" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard> */}
      </div>
    </MDBContainer>
  );
}

export default Products;

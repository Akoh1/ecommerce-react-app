import React, { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup,
  MDBBadge,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoutAuth, ResetAuthenticatingState } from "@/store/slice/AuthStore";
import { RequestStatus } from "@/utils/config";

const Header = () => {
  const { isAuth, Authenticating } = useSelector((state) => state.AuthStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(LogoutAuth());
  };
  useEffect(() => {
    if (Authenticating.Status === RequestStatus.succeeded) {
      navigate("/");
      setTimeout(() => {
        dispatch(ResetAuthenticatingState());
      }, 3000);
    }
    if (Authenticating.Status === RequestStatus.failed) {
      dispatch(ResetAuthenticatingState());
    }
  }, [isAuth, Authenticating]);

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarNav right className="mb-2 mb-lg-0">
            <MDBNavbarItem active className="navbar-item">
              <MDBNavbarBrand href="#">
                <Link to="/">Online Store</Link>
              </MDBNavbarBrand>
            </MDBNavbarItem>
            <MDBNavbarItem className="navbar-item-input">
              <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
                <input
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  type="Search"
                />
                <MDBBtn rippleColor="dark">
                  <MDBIcon icon="search" />
                </MDBBtn>
              </MDBInputGroup>
            </MDBNavbarItem>

            <MDBNavbarItem className="navbar-item-dropdown">
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link">
                  <MDBIcon fas icon="user" style={{ marginRight: "10px" }} />{" "}
                  Account
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {isAuth ? (
                    <>
                      <MDBDropdownItem link>Action 1</MDBDropdownItem>
                      <MDBDropdownItem onClick={Logout}>Logout</MDBDropdownItem>
                    </>
                  ) : (
                    <Link to="/login">
                      <MDBDropdownItem link>Login</MDBDropdownItem>
                    </Link>
                  )}

                  {/* <Link to="/login">Login</Link> */}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {isAuth ? (
              <MDBNavbarItem>
                <Link to="/cart-summary">
                  <MDBNavbarLink>
                    <MDBBadge pill color="danger">
                      !
                    </MDBBadge>
                    <span>
                      <MDBIcon fas icon="shopping-cart"></MDBIcon>
                    </span>
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            ) : null}
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default Header;

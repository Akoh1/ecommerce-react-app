import React, { useEffect, useRef, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateUser,
  LoginAuth,
  ResetCreateUserObjectState,
  ResetAuthenticatingState,
  setAuth,
} from "@/store/slice/AuthStore";
import { RequestStatus } from "@/utils/config";
import { useLocation, useNavigate } from "react-router";
import Account from "@/api/Account";
import ErrorHandler from "@/utils/ErrorHandler";

const initialFormData = Object.freeze({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
});

const errorFormData = Object.freeze({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
});

const RegistrationForm = () => {
  const [formData, updateFormData] = useState(initialFormData);
  const [errorData, updateErrorData] = useState(errorFormData);
  const [agreement, setAgreement] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { csrftoken, CreateUserObject, Authenticating } = useSelector(
    (state) => state.AuthStore
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const EnableSubmit = () => {
    let canSubmit = !Object.values(formData).some(
      (x) => x === null || x === ""
    );
    canSubmit && agreement ? setEnableBtn(true) : setEnableBtn(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const bodyLoad = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };

  const HandleRegistration = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    dispatch(CreateUser(bodyLoad));
  };

  useEffect(() => {
    if (CreateUserObject.Status === RequestStatus.succeeded) {
      setCreateLoading(false);
      setLoginLoading(true);
      dispatch(
        LoginAuth({
          email: CreateUserObject.Response.email,
          password: bodyLoad.password,
        })
      );
    }

    if (CreateUserObject.Status === RequestStatus.failed) {
      setCreateLoading(false);
      setError(true);
      console.log("Reg error response", CreateUserObject.Response);
      let keys = Object.keys(CreateUserObject.Response);

      keys.forEach((elem) => {
        updateErrorData({
          ...errorData,
          [elem]: CreateUserObject.Response[elem][0],
        });
      });

      setTimeout(() => {
        dispatch(ResetCreateUserObjectState());
      }, 3000);
    }
  }, [CreateUserObject]);

  useEffect(() => {
    if (Authenticating.Status === RequestStatus.succeeded) {
      setLoginLoading(false);

      navigate("/");
      setTimeout(() => {
        dispatch(ResetAuthenticatingState());
      }, 3000);
    }
    if (Authenticating.Status === RequestStatus.failed) {
      setLoginLoading(false);
      setError(true);
      dispatch(ResetAuthenticatingState());
    }
  }, [Authenticating]);

  useEffect(() => {
    EnableSubmit();
  }, [formData, agreement]);

  return (
    <>
      <MDBInput
        wrapperClass="mb-4"
        label="First Name"
        type="text"
        name="first_name"
        onChange={handleChange}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Last Name"
        type="text"
        name="last_name"
        onChange={handleChange}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Username"
        type="text"
        name="username"
        onChange={handleChange}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        type="email"
        name="email"
        onChange={handleChange}
      />
      {errorData.email !== "" ? (
        <small className="field-error">{errorData.email}</small>
      ) : null}

      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />

      <div className="d-flex justify-content-center mb-4">
        <MDBCheckbox
          name="flexCheck"
          id="flexCheckDefault"
          label="I have read and agree to the terms"
          checked={agreement}
          onChange={() => setAgreement(!agreement)}
        />
      </div>

      {enableBtn && !createLoading && !loginLoading ? (
        <MDBBtn className="mb-4 w-100" onClick={HandleRegistration}>
          Sign up
        </MDBBtn>
      ) : null}
      {!enableBtn && !createLoading && !loginLoading ? (
        <MDBBtn className="mb-4 w-100" disabled>
          Sign up
        </MDBBtn>
      ) : null}

      {createLoading && loginLoading ? (
        <MDBBtn disabled className="mb-4 w-100">
          <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
          Loading...
        </MDBBtn>
      ) : null}
    </>
  );
};

export default RegistrationForm;

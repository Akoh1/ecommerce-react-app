import React from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import RegistrationForm from "./RegistrationForm";
import { useState, useEffect } from "react";
import {
  LoginAuth,
  GetUser,
  ResetUserObjectState,
  ResetAuthenticatingState,
} from "@/store/slice/AuthStore";
import { useSelector, useDispatch } from "react-redux";
import { RequestStatus } from "@/utils/config";
import { useLocation, useNavigate } from "react-router";
import LargeSpinner from "@/components/ui/LargeSpinner";
import { AlertDanger } from "@/components/ui/Alerts";

const initialFormData = Object.freeze({
  email: "",
  password: "",
});

const Login = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [formData, updateFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const { UserObject, Authenticating } = useSelector(
    (state) => state.AuthStore
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
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
    email: formData.email,
    password: formData.password,
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(LoginAuth(bodyLoad));
  };

  useEffect(() => {
    if (Authenticating.Status === RequestStatus.succeeded) {
      setLoading(true);
      dispatch(GetUser());
      setTimeout(() => {
        dispatch(ResetAuthenticatingState());
      }, 2000);
    }
    if (Authenticating.Status === RequestStatus.failed) {
      setLoading(false);
      setError(true);
      Authenticating.Response === undefined || Authenticating.Response === null
        ? setErrorMessage("Wrong email/password")
        : setErrorMessage(Authenticating.Response);

      setTimeout(() => {
        dispatch(ResetAuthenticatingState());
      }, 2000);
    }
  }, [Authenticating]);

  useEffect(() => {
    if (UserObject.Status === RequestStatus.succeeded) {
      setLoading(false);
      setError(false);
      let { from } = location.state || { from: { pathname: "/" } };
      navigate(from);
      setTimeout(() => {
        dispatch(ResetUserObjectState());
      }, 3000);
    }

    if (UserObject.Status === RequestStatus.failed) {
      setLoading(false);
      setError(true);
      dispatch(ResetUserObjectState());
    }
  }, [UserObject]);

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      {error ? (
        <AlertDanger close={() => setError(false)} message={errorMessage} />
      ) : null}
      {loading ? (
        <LargeSpinner />
      ) : (
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              name="password"
              onChange={handleChange}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" onClick={HandleLogin}>
              Sign in
            </MDBBtn>
            <p className="text-center">
              Not a member?{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </span>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <RegistrationForm />
          </MDBTabsPane>
        </MDBTabsContent>
      )}
    </MDBContainer>
  );
};

export default Login;

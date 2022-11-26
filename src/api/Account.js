import axios from "axios";

const root = "/api";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const Register = async (body) => {
  // try {
  //   const { data } = await axios.post(`${root}/register`, body);
  //   return data;
  // } catch (error) {
  //   return error;
  // }
  const { data } = await axios.post(`${root}/register`, body);

  return data;
};

const Login = async (body) => {
  const { data } = await axios.post(`${root}/login`, body);

  return data;
};

const Logout = async () => {
  const data = await axios.post(`${root}/logout`);
  return data;
};

const GetUser = async () => {
  const data = await axios.get(`${root}/user`);
  return data;
};

const Account = {
  Register,
  Login,
  Logout,
  GetUser,
};

export default Account;

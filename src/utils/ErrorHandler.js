//handle response error from server
const ResponseError = (e) =>
  (e.response && e.response.data) || e.message || e.message.toString();

const ErrorHandler = {
  ResponseError,
};

export default ErrorHandler;

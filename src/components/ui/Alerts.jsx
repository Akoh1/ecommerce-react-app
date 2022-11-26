export const AlertDanger = ({ close, message }) => {
  // const closeAlert = (e) => {
  //   e.currentTarget.style.display = "none";
  // };
  return (
    <div className="alert-danger">
      <span className="alert-closebtn" onClick={close}>
        &times;
      </span>
      {message}...
    </div>
  );
};

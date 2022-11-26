import { MDBSpinner } from "mdb-react-ui-kit";

const LargeSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <MDBSpinner color="primary" role="status" className="Spinner">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default LargeSpinner;

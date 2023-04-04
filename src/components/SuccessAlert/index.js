import React from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = ({ show }) => {

  return (
    <div>
      <Alert
        show={show}
        variant="success"
      >
        <Alert.Heading>You have successfully logged in!</Alert.Heading>
      </Alert>
    </div>
  );
};

export default SuccessAlert;

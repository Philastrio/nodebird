import React from "react";
import PropTypes from "prop-types";

const User = () => {
  return <div>user</div>;
};

User.getInitialProps = async context => {
  console.log("user getInitialProps", context.query.id);
  return { id: parseInt(context.query.id, 10) };
};

User.propTypes = {
  id: PropTypes.number.isRequired
};

export default User;

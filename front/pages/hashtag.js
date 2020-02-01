import React from "react";
import PropTypes from "prop-types";

const Hashtag = ({ tag }) => {
  return <div>Hashtag {tag}</div>;
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired
};

Hashtag.getInitialProps = async context => {
  console.log("hashtag getInitialProps", context.query.tag);
  return { tag: context.query.tag };
};

export default Hashtag;

import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const Hashtag = () => {
  const router = useRouter();
  /* const { tag } = router.query; */
  console.log(router);
  return <div>Hashtag {router.query.tag}</div>;
};

/* Hashtag.propTypes = {
  tag: PropTypes.string.isRequired
}; */

export default Hashtag;

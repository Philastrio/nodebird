import React from "react";
import Head from "next/head";
import AppLayout from "../component/AppLayout";
import PropTypes from "prop-types";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType //jsx에 들어갈 수 있는 모든 것을 node라 한다
};

export default NodeBird;

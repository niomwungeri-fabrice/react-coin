import React from "react";
import "./Loading.css";
const Loading = props => {
  return <div className="Loading" style={{ ...props }} />;
};
Loading.defaultProps = {
  width: "24px",
  height: "24px"
};
export default Loading;

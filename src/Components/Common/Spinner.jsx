import React from "react";
import CircleLoader from "react-spinners/ClipLoader";
import "./Spinner.css";

const Spinner = (color, loading, css, size) => {
  return (
    <div>
      <div className="overlay">
        <div className="Positioning">
          <CircleLoader color={"red"} loading={loading} css={css} size={size} />
        </div>
      </div>
    </div>
  );
};
export default Spinner;

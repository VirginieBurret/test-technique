import React from "react";

const Vessel = () => {
  return (
    <div className="vessel">
      <img
        style={{ width: "3rem" }}
        src={`${process.env.PUBLIC_URL}/rover.png`}
      />
    </div>
  );
};

export default Vessel;

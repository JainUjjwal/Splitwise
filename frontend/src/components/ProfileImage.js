import React from "react";

const ProfileImage = (props) => {
  return (
    <div className="col-sm">
      <img
        src={props.url}
        alt="not found"
        style={{
          height: "100%",
          maxHeight: "300px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {props.text}
      </img>
    </div>
  );
};
export default ProfileImage;

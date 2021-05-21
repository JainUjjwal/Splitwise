import React from "react";

const DataRow = (props) => {
  return (
    <div key={props.id} className="row pt-4">
      <div className="col">
        {props.payer} added <b>"{props.discription}"</b> in{" "}
        <b>"{props.group}"</b> at {props.timeStamp}
      </div>
      {props.status ? (
        <div style={{ color: "green" }}>You get back: ${props.amount}</div>
      ) : (
        <div style={{ color: "red" }}>You owe: ${props.amount}</div>
      )}
    </div>
  );
};

export default DataRow;

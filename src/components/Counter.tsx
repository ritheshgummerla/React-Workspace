/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React from "react";

function Counter(props:any) {
  console.log(props.text);
  
  return (
    <h4>
      {props.text}:{props.number}
    </h4>
  );
}

export default React.memo(Counter)

import React from "react";
import axios from "axios";

const Test = () => {
  const handleClick = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGUyOGQ3ODNjNWVhYjI3MjhkMGM4YyIsImlhdCI6MTYzNjgyMTM4NSwiZXhwIjoxNjM2ODI0OTg1fQ.PKorX0STQt8mPA4tHfN5JBG_HPMGgIvDI3mRf-pJ4TA";

    const res = await axios({
      method: "POSt",
      url: "api/users/test",
      data: { name: "sha", password: "123" },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    //console.log(res);
  };
  return (
    <div>
      <button onClick={handleClick}>Hello\</button>
    </div>
  );
};

export default Test;

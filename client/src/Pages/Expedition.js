import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Expedition() {
  const [admin, setAdmin] = useState(false);
  React.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/expedition",
    }).then(async (res) => {
      if (res.data.type === 1) {
        setAdmin(true);
      }
    });
  }, []);

  return (
    <div>
      {admin ? <div>Add here</div> : <></>}
      Expedition
    </div>
  );
}

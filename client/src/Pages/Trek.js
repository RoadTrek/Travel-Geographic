import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Trek() {
  const [admin, setAdmin] = useState(false);
  const [details,setDetails]=useState([{
      _id:"",
      imageUrl:""
  }]);
useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/trek",
    }).then( (res) => {
        console.log(res.data);
      if (res.data.type === 1) {
        setAdmin(true);
      }
      setDetails([res.data.image]);

    });
  }, []);

  return (
    <div>
      {admin ? <div>Add here</div> : <></>}
      Trek
    </div>
  );
}

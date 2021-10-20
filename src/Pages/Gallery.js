import Image from "../Image/background.jpg";
import { Card, CardGroup } from "react-bootstrap";

export default function Gallery() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
}

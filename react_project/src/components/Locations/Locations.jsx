import { useState } from "react";
import { locations } from "./LocationsData";
import { Stack } from "@mui/material";
function Locations() {
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.9287551324496!2d33.81933177422874!3d27.09554225221189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144d7fdfa1ad441f%3A0xc40143d93a5d442e!2sSenzo%20Mall!5e0!3m2!1sen!2seg!4v1725882364119!5m2!1sen!2seg"
  );

  // Function to handle location change
  const handleLocationChange = (e) => {
    setMapSrc(e.target.value);
  };

  return (
    <Stack
      style={{ display: "flex", p: "1rem" }}
      direction={"row"}
      alignItems={"center"}
    >
      <div style={{ width: "20%", paddingRight: "20px", textAlign: "left" }}>
        <h3>Select Location</h3>
        {locations.map((location, index) => (
          <div key={index}>
            <input
              type="radio"
              id={location.name}
              name="location"
              value={location.value}
              onChange={handleLocationChange}
              defaultChecked={index === 0}
            />
            <label htmlFor={location.name} style={{ marginLeft: "10px" }}>
              {location.name}
            </label>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div style={{ width: "80%", textAlign: "center" }}>
        <h1>Our Locations</h1>
        <iframe
          src={mapSrc}
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Stack>
  );
}

export default Locations;

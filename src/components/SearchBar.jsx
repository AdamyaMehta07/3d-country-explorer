import { useState } from "react";
import axios from "axios";

function SearchBar({ setCountryPosition }) {

  const [country, setCountry] = useState("");

  const searchCountry = async () => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );

      const lat = res.data[0].latlng[0];
      const lng = res.data[0].latlng[1];

      console.log("LAT:", lat);
      console.log("LNG:", lng);

      setCountryPosition({ lat, lng });

      console.log(res.data[0]);

    } catch (err) {
      console.log("Country not found");
    }
  };

  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: 10
    }}>
      <input
        type="text"
        placeholder="Search country..."
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <button onClick={searchCountry}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
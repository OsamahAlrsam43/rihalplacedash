import React from "react";
import "./style.scss";

import CarouseHotels from "./CarouseHotels";
import Hotelsalse from "./Hotelsalse";

import Search from "./Search";

const Hotels = () => {
  

  return (
    <div>
     
        <Search/>
      
      <div style={{ padding: "5px 10px" }}>
        <h2 style={{ fontWeight: 600 }}> استكشف مناطق العراق ....</h2>
        <CarouseHotels />

        <h2 style={{fontweight: 600,marginTop:10}}> عروض الفنادق</h2>

        <Hotelsalse/>
        

      </div>
    </div>
  );
};

export default Hotels;

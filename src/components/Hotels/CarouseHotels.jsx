import React from "react";

import { Carousel } from "antd";

const CarouseHotels = () => {


  return (
    <Carousel autoplay>
      <div className="contentStyle" style={{ display: "flex" }}>
        <h1 className="title_imag_slider">بغداد</h1>
        <img
          src={window.location.origin + "/img/bgw.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%"
          alt="1"
        />
      </div>
      <div className="contentStyle" style={{ display: "flex" }}>
        <h1 className="title_imag_slider">اربيل</h1>
        <img
          src={window.location.origin + "/img/ebl.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%" alt="1"
        />
      </div>
      <div className="contentStyle">
        <h1 className="title_imag_slider">النجف</h1>
        <img
          src={window.location.origin + "/img/njf.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%" alt="1"
        />
      </div>
      <div className="contentStyle">
        <h1 className="title_imag_slider">السيلمانية</h1>
        <img
          src={window.location.origin + "/img/sul.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%" alt="1"
        />
      </div>
      <div className="contentStyle">
        <h1 className="title_imag_slider">كربلاء</h1>
        <img
          src={window.location.origin + "/img/kbr.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%" alt="1"
        />
      </div>

      <div className="contentStyle">
        <h1 className="title_imag_slider">البصرة</h1>
        <img
          src={window.location.origin + "/img/bsr.jpg"}
          style={{ border: "5px solid #1f1f1c54" }}
          height="200px"
          width="100%" alt="1"
        />
      </div>
    </Carousel>
  );
};

export default CarouseHotels;

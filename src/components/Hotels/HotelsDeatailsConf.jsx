import {  Col, Row, Rate, message } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { AiFillCar, AiOutlineWifi } from "react-icons/ai";
import { GiHeatHaze } from "react-icons/gi";
import { SiApacheairflow } from "react-icons/si";
import { MdSystemUpdateAlt, MdUpdate } from "react-icons/md";
import DetailsRoom from "./DetailsRoom";
import { useLocation } from "react-router";
import { Hotels } from "../../agent";

const HotelsDeatailsConf = () => {
  const location = useLocation().search;
  const IdHotelFromSerch = location.substring(1);

 /*
  const [Hotel_Email, setHotel_Email] = useState("");
  const [Hotel_Image, setHotel_Image] = useState("");
  const [Hotel_Offcenter, setHotel_Offcenter] = useState("");
  const [Hotel_Phone, setHotel_Phone] = useState("");
  
  const [Hotel_State, setHotel_State] = useState("");
  const [Hotel_city, setHotel_city] = useState("");
  const [Hotel_location_ln, setHotel_location_ln] = useState("");
  const [Hotel_location_lo, setHotel_location_lo] = useState("");
  */
   const [Hotel_name, setHotel_name] = useState("");
  const [Hotel_Address, setHotel_Address] = useState("");
  const [Hotel_RateStar, setHotel_RateStar] = useState("");

  const [Services, setServices] = useState([{
    "Jakozi": true,
    "Takef": true,
    "Trans": true,
    "Wifi": true
  }]);
  const [ImagesHotel, setImagesHotel] = useState([{original: "",thumbnail:"" }]);
  const [RoomsHotel, setRoomsHotel] = useState([{
    Rooms_Name: "", Rooms_Images: "", Rooms_bedtype: "", Rooms_Space: "",
    Rooms_Services:"",Rooms_priceAdult:"",Rooms_priceChild:"",Rooms_ID:"",Price_Amla:""
  
  }]);

  /*
0:

ImagesHotel: []
Messages: []
Notification: []
Reservations: []
Reviews: []
Rooms: [{…}]
Services: [{
Jakozi: true
Takef: true
Trans: true
Wifi: true
…}]
  */

  useEffect(() => {
    const HotelDetails = async (IdHotelFromSerch) => {
      const datahotel = await Hotels.getHotelById(IdHotelFromSerch);

      console.log(datahotel)
      if (datahotel.status === 200) {
        setHotel_name(datahotel.data[0].Hotel_name);
        setHotel_RateStar(datahotel.data[0].Hotel_RateStar);
        setHotel_Address(datahotel.data[0].Hotel_Address);
        setServices(datahotel.data[0].Services);
        setImagesHotel(datahotel.data[0].ImagesHotel);
         setRoomsHotel(datahotel.data[0].Rooms);
      }

      else {
        message.warning("هناك مشكلة ")
      }
    
    };

    HotelDetails(IdHotelFromSerch);

  }, [IdHotelFromSerch]);

  


  return (
    <div>
      <Row>
        <Col
          style={{
            padding: 5,
          }}
          xs={24}
          md={16}
          lg={16}
          xl={16}
        >
          <div className="deatailsConf_namehotel">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontWeight: 800 }}>{Hotel_name}</h2>
              <h5 style={{ margin: "0 10px" }}>
                <Rate disabled value={Hotel_RateStar} />{" "}
              </h5>
            </div>
            <div
              style={{ display: "flex", textAlign: "center", marginTop: 10 }}
            >
              <h3>{ Hotel_Address}</h3>
              <span style={{margin:"0 5px"}}>- </span>
              <a style={{ margin: "0" }}>الموقع</a>
            </div>
          </div>

          <div
            className="deatailsConf_namehotel"
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              color: "#138116",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
          
              {Services[0].Trans ?
              <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AiFillCar size={20} />
              <p>تنقلات</p>
            </div>:""
            }
            
 {Services[0].Wifi ?
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AiOutlineWifi size={20} />
              <p>واي فاي مجاني</p>
            </div>:""
            }
 {Services[0].Jakozi ?
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GiHeatHaze size={20} />
              <p>جاكوزي</p>
             </div>:""
            }
 {Services[0].Takef ?
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SiApacheairflow size={20} />
              <p>تكييف</p>
             </div>:""
            }
          </div>

          <div
            className="deatailsConf_namehotel"
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              color: "#138116",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdSystemUpdateAlt size={25} />
              <h4>تسجيل الوصول</h4>
              <h3 style={{ direction: "ltr" }}>2021-04-10</h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdUpdate size={25} />
              <h4>تسجيل المغادرة</h4>
              <h3 style={{ direction: "ltr" }}>2021-04-11</h3>
            </div>
          </div>
        </Col>

        <Col
          style={{
            padding: 5,
          }}
          xs={24}
          md={8}
          lg={8}
          xl={8}
        >
          <ImageGallery items={ImagesHotel} isRTL />
        </Col>

        <Col
          style={{
            padding: 5,
          }}
          xs={24}
          md={24}
          lg={24}
          xl={24}
        >
          <div
            className="deatailsConf_namehotel"
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <h3 style={{ fontWeight: 800 }}>خيارات الغرف</h3>
            <div className="getdetailsroom">

              {RoomsHotel.map((res, i)=>
              
              <DetailsRoom  key={i} {...res} />
             )
             }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HotelsDeatailsConf;

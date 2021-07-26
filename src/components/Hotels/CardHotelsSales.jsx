import React, { useEffect, useState } from "react";
import { Card, Col, Row, Rate } from "antd";


import { OfferHotel } from '../../agent';
import { useHistory } from "react-router";

const CardHotelsSales = () => {
  const { Meta } = Card;

  const History = useHistory();
  
  const [Hotel_Address, setHotel_Address] = useState("");
  const [Hotel_Image, setHotel_Image] = useState("");
  const [Hotel_OfferState, setHotel_OfferState] = useState("");
  const [Hotel_PriceAmla, setHotel_PriceAmla] = useState("");
  const [Hotel_PriceBefore, setHotel_PriceBefore] = useState("");
  const [Hotel_PriceNow, setHotel_PriceNow] = useState("");
  const [Hotel_RateStar, setHotel_RateStar] = useState("");
  const [Hotel_name, setHotel_name] = useState("");

    const [DataOfferHotels, setDataOfferHotels] = useState([]);



  useEffect(() => {
    const fetdata = async () => {
      const DateOfferHotels = await OfferHotel.getAllOfferHotel();
      setDataOfferHotels(DateOfferHotels.data)
   

    }

    fetdata();
  })

   /*
Hotel_Address: "النجف"
Hotel_ID: "1"
Hotel_Image: "https://cf.bstatic.com/images/hotel/max500/637/63770488.jpg"
Hotel_OfferState: "فعال"
Hotel_PriceAmla: "IQD"
Hotel_PriceBefore: "100,000"
Hotel_PriceNow: "50,000"
Hotel_RateStar: "4"
Hotel_name: "OSAMAH"

   */

  const GoToHotelSelect = (HotelId) => {
 
          History.push({
            pathname: `HotelsDeatailsConf`,
            search: `${HotelId}`,
           hotelid:`${HotelId}`
       });
  }

  return (
    <div>
      <Row>

        {DataOfferHotels.map((res, i) =>
         <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={24} md={6} lg={6} xl={6}>
            <Card
              onClick={()=>GoToHotelSelect(res.Hotel_ID)}
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "3px solid #febb02"}}
            cover={
              <img
              width="230px"
              height="290px"
                alt="example"
                src={res.Hotel_Image}
              />
            }
          >
              <Meta title={res.Hotel_name} description={<div> <h4>{res.Hotel_Address}</h4>   <p>
                <Rate disabled defaultValue={res.Hotel_RateStar} /> </p>
                <span style={{ textDecoration: "line-through", textDecorationColor: "red" }}>
                  السعر السابق : {res.Hotel_PriceBefore} {res.Hotel_PriceAmla}
                
                </span>
                <h3>السعر الحالي : {res.Hotel_PriceNow} {res.Hotel_PriceAmla}</h3>
              </div>} />
          </Card>
        </Col>
        )}
       
      </Row>
    </div>
  );
};

export default CardHotelsSales;

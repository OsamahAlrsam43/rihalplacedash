import { Col, Divider, Row } from 'antd';
import React from 'react'
import { FaFacebookSquare, FaLocationArrow, FaTelegram, FaTwitterSquare, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { IoLocation, IoMail, IoPhoneLandscape } from 'react-icons/io5';
import "./style.scss";
const Footer = () => {
    return (
        <div className="footer_main">
         

            
          <div style={{width:"100%"}}>
          <Row>
          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent:"center"
              }} xs={24} md={12} lg={12} xl={12}>
          <div >  <div className="mune_sid_iconsoshial">
            <FaFacebookSquare
              size={25}
              style={{ marginLeft: 10, fill: "#fff",cursor:"pointer" }}
            />
            <FaTwitterSquare
              size={25}
              style={{ marginLeft: 10, fill: "#fff",cursor:"pointer" }}
            />
            <FaYoutube size={25} style={{ marginLeft: 10, fill: "#fff",cursor:"pointer"}} />
            <FaTelegram
              size={25}
              style={{ marginLeft: 10, fill: "#fff",cursor:"pointer" }}
            />
            <FaWhatsapp size={25} style={{ marginLeft: 5, fill: "#fff",cursor:"pointer" }} />
            
          </div >
         
            </div>
            </Col>
          

          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                userSelect:"none"
              }} xs={24} md={12} lg={12} xl={12}>
          <div style={{flexBasis: "100%",display:"flex",placeContent:"center"}}>  <h1>
            CS <span>code</span>
          </h1></div>
          </Col>

          </Row>


          </div>


          <Divider plain style={{color:"rgb(128 125 125)",borderColor:"rgb(107 107 107)"}}>للتواصل معنا </Divider>



          <div style={{width:"50%"}}>
          <Row>
          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                marginBottom:10,
                userSelect:"none"
              }} xs={24} md={8} lg={8} xl={8}>
                <div style={{width:"100%"}}>
                <IoLocation size={25} style={{ marginLeft: 5, fill: "#fff",cursor:"pointer" }} />
                <h3>موقع الشركة</h3>
                <span style={{display:"flex",placeContent:"center"}}>العراق - بغداد </span>
                </div>
          

</Col>

<Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                marginBottom:10,
                userSelect:"none"
              }} xs={24} md={8} lg={8} xl={8}>
                <div style={{width:"100%"}}>
                <IoIosCall size={25} style={{ marginLeft: 5, fill: "#fff",cursor:"pointer" }} />
                <h3>اتصل بنا</h3>
                <span style={{display:"flex",placeContent:"center"}} dir="ltr">+964 7810094624</span>
                </div>
          

</Col>


<Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                marginBottom:10,
                userSelect:"none"
              }} xs={24} md={8} lg={8} xl={8}>
                <div style={{width:"100%"}}>
                <IoMail size={25} style={{ marginLeft: 5, fill: "#fff",cursor:"pointer" }} />
                <h3>البريد الألكتروني</h3>
                <span style={{display:"flex",placeContent:"center"}}>osamaaalrsam43@outlook.com</span>
                </div>
          

</Col>

</Row>
</div>

<Divider plain style={{color:"rgb(128 125 125)",borderColor:"rgb(107 107 107)"}}></Divider>
          <div><h3>جميع الحقوق محفوظة © 2021 لصالح شركة </h3>
          <h3>cs code</h3>
          </div>

        </div>
    )
}

export default Footer

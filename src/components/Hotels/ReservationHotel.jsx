import { Button, Rate } from 'antd';
import React from 'react'
import DeatailsReaservation from './DeatailsReaservation';
import "./style.scss";
import {MdSystemUpdateAlt,MdUpdate } from 'react-icons/md';
import { useHistory } from 'react-router';

const ReservationHotel = () => {

    const History = useHistory();
    const gotoresult = () => {
        History.push("resultshotels")
    }
    return (
        <div className="mainReservationHotel">
        
            <div  className="deatailsConf_namehotel fb70">
                <DeatailsReaservation cont={1}/>
                <DeatailsReaservation cont={2} />
                  <div onClick={gotoresult} className="showbtnres" style={{width:"100%"}}>
                     <Button  style={{padding:"0 50px",fontWeight:800,background:"#20962f",marginTop:0}} size="large" type="primary" block>
      احـجـز
    </Button>
                </div>
            </div >
           
            <div className=" fb30">
                  <div className="deatailsConf_namehotel bordno" >
                       
                        <div style={{ display: "flex",alignItems:"center"}}>
                              <img
                              style={{margin:"0 10px"}}
              width="150px"
              height="100px"
                alt="example"
                src="https://cf.bstatic.com/images/hotel/max1280x900/154/154047353.jpg"
              />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                  <h3 style={{ fontWeight: 800 }}>فندق ديفان اربيل</h3>
                                <h5 style={{ margin: "0 0px" }}><Rate disabled defaultValue={4} /> </h5>
                                  <div style={{ display: "flex",textAlign:'center',marginTop:5 }}>
              <h3>اربيل -شارع 60</h3>
               <a href="/"  style={{margin:"0 5px"}}>الموقع</a>
            </div>
                          </div>

                            </div>
          
           
          </div>

                 <div className="deatailsConf_namehotel bordno" >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                         <h3 className="details_price">
                            السعر النهائي: 70,000 IQD

                        </h3>

                        <div style={{ display: "flex",justifyContent:"center",alignItems:"center"}}>
                            <h2 style={{ fontWeight: 600 }}>1 ليلة</h2>
                            <span style={{margin:"0 5px"}}>-</span>
                                  <h2 style={{fontWeight:600}}>1 غرفة</h2>
 <span style={{margin:"0 5px"}}>-</span>
                                         <h2 style={{fontWeight:600}}>1 بالغ</h2>
 <span style={{margin:"0 5px"}}>-</span>
                                         <h2 style={{fontWeight:600}}>1 طفل</h2>
              </div>

                        <div  style={{ display: "flex", flexDirection: "column", lineHeight: 1, alignItems: "center", justifyContent: "center" }}>
               <MdSystemUpdateAlt size={25}/>
              <h4 className="details_price" style={{background:"#5dad05"}}>تسجيل الوصول</h4>
               <h3 style={{direction:"ltr"}}>2021-04-10 12:15 am</h3>
             
            </div>

              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, alignItems: "center", justifyContent: "center" }}>
               <MdUpdate size={25}/>
              <h4 className="details_price" style={{background:"#8f0926"}}>تسجيل المغادرة</h4>
               <h3 style={{direction:"ltr"}}>2021-04-11 12:15 pm</h3>
             
            </div>

                       
            </div>
          
           
                </div>
                    <div onClick={gotoresult} className="showbtnres1" style={{width:"100%"}}>
                     <Button  style={{padding:"0 50px",fontWeight:800,background:"#20962f",marginTop:0}} size="large" type="primary" block>
      احـجـز
    </Button>
                </div>
            </div>

        </div>
    )
}

export default ReservationHotel

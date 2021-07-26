import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useHistory } from 'react-router-dom';

import HeaderDashBoard from "./HeaderDashBoard";

import { AiFillSetting ,AiFillNotification} from 'react-icons/ai';
import {  MdLocalOffer,MdLocationCity} from 'react-icons/md';
import { FaUsersCog, } from 'react-icons/fa';
import Cookies from 'universal-cookie/es6';
import { Places,Offer,NotiFiction,NotiFictionUser,Users,AuthUser} from "../../agent";
import axios from "../../utils/API"
const DashBoradAdmin = () => {

   const cookies = new Cookies();

  const [IdUser, setIdUser] = useState(cookies.get("userid"));
    const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );
  const isAuthenticated = cookies.get("isAuthenticated");

    const [PlaceLength, setPlaceLength] = useState(0);
    const [OfferLength, setOfferLength] = useState(0);

    const [UserLength, setUserLength] = useState(0);
  const [NotiPlaceLength, setNotiPlaceLength] = useState(0);
    const [NotiUserLengh, setNotiUserLengh] = useState(0);


 

  useEffect(() => {
     const authuserstoken = async () => {
 
    try {
      const res = await axios.post("/auth")
      if (res.status === 203)
      {
        cookies.set("isAuthenticated",false);
        setTimeout(() => {
             history.push("LoginAdmin");
              window.location.reload(false)
        }, 500);
     

        
         }

      else {
     Places.GetAllPlace().then((res) => setPlaceLength(res.data.data.length));
   Offer.GetAllOffer().then((res) => setOfferLength(res.data.data.length));
   
     Users.getAll(IdUser).then((res) => setUserLength(res.data.data.length));
   NotiFiction.GetNotiAllPlace().then((res) => setNotiPlaceLength(res.data.data.length));
     NotiFictionUser.GetNotiAllPlace().then((res) => setNotiUserLengh(res.data.data.length));
         }
    
    }
    catch (error) {
       

       console.log(error)

    }
    
  
    
    }
    
     authuserstoken()
  },[])

   
       
    
    const history = useHistory();
    const GoToCompanySetting = () => {
      history.push("CompanySetting");
      window.location.reload(false)
    }

  
     const GoToOfferPlace = () => {
       history.push("OfferPlaceMange");
        window.location.reload(false)
  }
  
   const GoToManageAllUser = () => {
     history.push("ManageAllUser");
      window.location.reload(false)
    }

   const GoToNotiFictionPlace = () => {
     history.push("NotiPlaceMamange");
      window.location.reload(false)
    }
   const GoToNotiFictionUsers = () => {
     history.push("NotiUsersMange");
      window.location.reload(false)
    }
  

    const GoToplaceSetting = () => {
      history.push("PlaceMange");
       window.location.reload(false)
    }

    
  

    
    return (
          <div>
        
            <HeaderDashBoard/>
            <div className="dashboard_main" >
                
                <div className="dashboard_main_card boxmain main" onClick={GoToCompanySetting}>
                
                   
                    <div className="divmain">
                         <AiFillSetting size={50} />
                     <span style={{ marginTop: 10 }}>الاعدادت الشركة</span>
                    
                    </div>
                    <div style={{ fontSize: 50, color:"#ffffff8a"}}>1</div>
                   
                  

                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}>معلومات الشركة</h5>
                        <h5 style={{ marginTop: 10 }}> الفئات</h5>
                        <h5 style={{marginTop:10}}>المحافظات</h5>
                   </div>
                </div>


                  <div className="dashboard_main_card boxmain amaken" onClick={GoToplaceSetting}>
                    <div className="divmain">
                        
                  
                    <MdLocationCity size={50} />
                     <span style={{ marginTop: 10 }}>أدارة الأماكن</span>
                        </div>
                     <div style={{ fontSize: 50, color:"#ffffff8a"}}>{PlaceLength}</div>
                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}>الفنادق</h5>
                        <h5 style={{ marginTop: 10 }}>الشركات</h5>
                        <h5 style={{ marginTop: 10 }}>المنازل</h5>
                   </div>
                </div>

                
                   <div className="dashboard_main_card boxmain offerbox" onClick={GoToOfferPlace}>
                 <div className="divmain">
                    <MdLocalOffer size={50} />
                      <span style={{ marginTop: 10 }}>أدارة العروض</span>
                        </div>
                     <div style={{ fontSize: 50, color:"#ffffff8a"}}>{OfferLength}</div>
                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}> عروض الفنادق</h5>
                        <h5 style={{ marginTop: 10 }}>عروض الشركات</h5>
                        <h5 style={{ marginTop: 10 }}>عروض المنازل</h5>
                   </div>
                </div>

                   

                 <div  className="dashboard_main_card boxmain usersmain" onClick={GoToManageAllUser}>
                  <div className="divmain">
                    <FaUsersCog size={50} />
                    <span style={{ marginTop: 10 }}>أدارة المستخدمين</span>
                      
                        </div>
                     <div style={{ fontSize: 50, color:"#ffffff8a"}}>{UserLength}</div>
                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}>معلومات المستخدم</h5>
                        <h5 style={{ marginTop: 10 }}>المنشورات</h5>
                        <h5 style={{ marginTop: 10 }}>حجوزات المستخدم</h5>
                   </div>
                </div>



                <div className="dashboard_main_card boxmain notimain" onClick={GoToNotiFictionPlace}>
                
                   
                    <div className="divmain">
                         <AiFillNotification size={50} />
                     <span style={{ marginTop: 10 }}>ادارة اشعارات الاماكن</span>
                    
                    </div>
                    <div style={{ fontSize: 50, color:"#ffffff8a"}}>{NotiPlaceLength}</div>
                   
                  

                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}>اشعار الاماكن</h5>
              <h5 style={{ marginTop: 10 }}>اشعار الفنادق</h5>
              <h5 style={{ marginTop: 10 }}>اشعار الشركات</h5>
                   </div>
                </div>

               <div className="dashboard_main_card boxmain notimainuser" onClick={GoToNotiFictionUsers}>
                
                   
                    <div className="divmain">
                         <AiFillNotification size={50} />
                     <span style={{ marginTop: 10 }}>ادارة اشعارات المستخدمين</span>
                    
                    </div>
            <div style={{ fontSize: 50, color: "#ffffff8a" }}>{NotiUserLengh}</div>
                   
                  

                    <div className="boaxlight">
                        <h5 style={{ marginTop: 10 }}>اشعار مستخدمين الموبايل</h5>
                        <h5 style={{ marginTop: 10 }}>اشعار مستخدمين الموقع</h5>
                   </div>
                </div>

             
                
            </div>

            
        </div>
    )
}

export default DashBoradAdmin

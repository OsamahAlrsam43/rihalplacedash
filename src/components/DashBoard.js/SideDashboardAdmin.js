import React, { useState } from 'react'
import { Image} from "antd";
import Cookies from "universal-cookie";

import { useHistory } from 'react-router-dom';
import {
  FaHome, FaUserCog, FaCommentDots, FaUserEdit, FaCertificate, FaMapMarkedAlt, FaClinicMedical,
FaCrown,FaCubes,FaDonate,FaMeteor,FaMixer
} from 'react-icons/fa';

import { baseURLImg } from "../../utils/API";

const SideDashboardAdmin = () => {
      const cookies = new Cookies();

  const photouser = cookies.get("PhotoUser");
  const phoneuser = cookies.get("Phone");
  const NameUser = cookies.get("NameUser");

  const history = useHistory();

  const LogOut = () => {
 cookies.remove("token");
cookies.remove("IdAppPlace");
cookies.remove("userid");
cookies.remove("isAuthenticated",false);

    history.push("LoginAdmin")

  }

  const datamenue = [
    {
      Name: "الصفحة الرئيسية",
      Icon :<FaHome size={25}/>,
      Path:"DashBoradAdmin"
    },
    {
      Name: " ادارة المستخدمين",
      Icon :<FaUserCog size={25}/>,
      Path:"AdminManage"
    }
    ,
    {
      Name: "اضافة Admin جديد",
      Icon :<FaUserEdit size={25}/>,
      Path:"AddAdmin"
    }
    ,
    {
      Name: "ادارة Contact Us",
      Icon :<FaCommentDots size={25}/>,
      Path:"ContactMange"
    }

     ,
    {
      Name: "ادارة الفئات",
      Icon :<FaCubes size={25}/>,
      Path:"Category"
    }
     ,
    {
      Name: " ادارة المحافظات",
      Icon :<FaCertificate size={25}/>,
      Path:"ProvinceManage"
    }
     ,
    {
      Name: " ادارة الاماكن",
      Icon :<FaMapMarkedAlt size={25}/>,
      Path:"PlaceMange"
    },
      ,
    {
      Name: "اضافة مكان جديد",
      Icon :<FaClinicMedical size={25}/>,
      Path:"AddPlace"
    }
    ,
    {
      Name: " ادارة العروض",
      Icon :<FaCrown size={25}/>,
      Path:"OfferPlaceMange"
    },
      ,
    {
      Name: "اضافة عرض جديد",
      Icon :<FaDonate size={25}/>,
      Path:"AddNewOffer"
    },
    {
      Name: " ادارة اشعارت الاماكن",
      Icon :<FaMeteor size={25}/>,
      Path:"NotiPlaceMamange"
    }
  ]

  const [Places_Image, setPlaces_Image] = useState(`${baseURLImg}${ photouser }`);



    return (
        <div className="SideDashboardAdmin">
            <div className="SideDashboardAdmin_header">
             
       
            
          <div style={{position:"absolute",top:15,right:5,width:"60%"}}>
  <Image style={{ width:"40%",borderRadius:"50%"}} 
            src={Places_Image} />
          </div>
            
          <div style={{display:"flex",alignItems:"flex-end",flexDirection:"column",width:"100%"}}>
            <p style={{ margin: 0 }}>{NameUser}</p>
            <p style={{ margin: 0 }}>{phoneuser}</p>
              <p onClick={LogOut} style={{margin:0,cursor:"pointer"}}>تسجيل الخروج</p>
               </div>
         
          
            </div>
          
        <div>
          {datamenue.map((res, i) => 
            <div className="btnslider" key={i} onClick={() => history.push(res.Path)} >{res.Icon} <span style={{margin:"0 5px"}}></span> {res.Name}</div>
          )}

        </div>
        <div onClick={LogOut}  className="logout" onClick={() => history.push("")} >تسجيل الخروج <FaMixer size={25}/> </div>
        </div>
    )
}

export default SideDashboardAdmin

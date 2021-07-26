import React from "react";
import { useHistory } from "react-router-dom";

import {
  FaHome,
  FaUserCog,
  FaCommentDots,
  FaUserEdit,
  FaCertificate,
  FaMapMarkedAlt,
  FaClinicMedical,
  FaCrown,
  FaCubes,
  FaDonate,
  FaMeteor,
  FaMixer,
} from "react-icons/fa";

import { AiTwotoneNotification } from 'react-icons/ai';
import { MdNotificationsActive } from 'react-icons/md';



import Cookies from "universal-cookie";

const SideBarDashboradPlace = ({ShowMenu}) => {
  const history = useHistory();
      const cookies = new Cookies();

  const datamenue = [
    {
      Name: "الصفحة الرئيسية",
      Icon: <FaHome size={20} />,
      Path: "DashBoradAdmin",
    },
    {
      Name: " ادارة المستخدمين",
      Icon: <FaUserCog size={20} />,
      Path: "ManageAllUser",
    },
    {
      Name: "اضافة Admin جديد",
      Icon: <FaUserEdit size={20} />,
      Path: "AddAdmin",
    },
    {
      Name: "ادارة Contact Us",
      Icon: <FaCommentDots size={20} />,
      Path: "ContactMange",
    },

    {
      Name: "ادارة الفئات",
      Icon: <FaCubes size={20} />,
      Path: "Category",
    },
    {
      Name: " ادارة المحافظات",
      Icon: <FaCertificate size={20} />,
      Path: "ProvinceManage",
    },
    {
      Name: " ادارة الاماكن",
      Icon: <FaMapMarkedAlt size={20} />,
      Path: "PlaceMange",
    },
    ,
    {
      Name: "اضافة مكان جديد",
      Icon: <FaClinicMedical size={20} />,
      Path: "AddPlace",
    },
    {
      Name: " ادارة العروض",
      Icon: <FaCrown size={20} />,
      Path: "OfferPlaceMange",
    },
    ,
    {
      Name: "اضافة عرض جديد",
      Icon: <FaDonate size={20} />,
      Path: "AddNewOffer",
    },
    {
      Name: " ادارة اشعارت الاماكن",
      Icon: <MdNotificationsActive size={20} />,
      Path: "NotiPlaceMamange",
    },
     {
      Name: " اشعارت المستخدمين",
      Icon: <AiTwotoneNotification size={20} />,
      Path: "NotiUsersMange",
    },
  ];


   const LogOut = () => {
 cookies.set("token","");
cookies.set("IdAppPlace","");
cookies.set("userid","");
cookies.set("isAuthenticated",false);
setTimeout(() => {
  history.push("LoginAdmin")

}, 500);

  }

 

  return (
    <div>
      <div style={{display:"grid",placeItems:"center",borderBottom: "1px solid #c3c3c3"}}>
        <img
          width={"70%"}
          src={window.location.origin + "/img/logorehal.png"}
          alt="Rehal"
        />
      </div>
      {datamenue.map((res, i) => (
        <div
          className="btnindash"
          key={i}
          onClick={() => history.push(res.Path)}
          style={{color:"#000"}}
        >
          {res.Icon} <span style={{ margin: "0 5px" }}></span> {res.Name}
        </div>
      ))}
     <div   onClick={LogOut}  className="btnindash logout" ><FaMixer size={25}/> <span style={{ margin: "0 5px" }}></span> تسجيل الخروج</div>
    </div>
  );
};

export default SideBarDashboradPlace;

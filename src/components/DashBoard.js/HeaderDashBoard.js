import React, { useEffect, useState } from "react";
import "./styledashboardplace.scss";
import { useHistory } from "react-router-dom";
import SideBarDashboradPlace from "./SideBarDashboradPlace";

import { AiFillSetting, AiFillNotification } from "react-icons/ai";
import { MdLocalOffer,MdNotificationsActive } from "react-icons/md";
import {  FaUsersCog } from "react-icons/fa";
import {BsFillHouseFill} from "react-icons/bs";
import { CgMenuRight } from 'react-icons/cg';


import Cookies from "universal-cookie/es6";
import {
  Places,
  Offer,
  NotiFiction,
  NotiFictionUser,
  Users,
  AuthUser,
} from "../../agent";
import axios, { baseURLImg } from "../../utils/API";
import { Avatar, Badge, Modal,Popover ,Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
const HeaderDashBoard = ({Title="لوحة التحكم",ShowMenu=true,Titlepath}) => {

     
      const cookies = new Cookies();

  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const [IdAppPlace, setIdAppPlace] = useState(cookies.get("IdAppPlace"));
  const isAuthenticated = cookies.get("isAuthenticated");
  const photouser = cookies.get("PhotoUser");
  const phoneuser = cookies.get("Phone");
  const NameUser = cookies.get("NameUser");
  
  const logoutuser = () => {
    
  
    cookies.set("isAuthenticated",false);
  history.push("LoginAdmin")

  
  }
  
      const [Places_Image, setPlaces_Image] = useState(`${baseURLImg}${ photouser }`);

         const [SideBarDashBoardOpen, setSideBarDashBoardOpen] = useState(false)


     const OpenSideBarDashBoard = () => {
        setSideBarDashBoardOpen(!SideBarDashBoardOpen);
    }

   const history = useHistory();
    const GoToHome = () => {
        history.push("DashBoradAdmin")
    }
    //Model  in Mobail

    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  const text = <span>{NameUser}</span>;
const content = (
  <div>
    <p>{phoneuser}</p>
    <h3 style={{cursor:"pointer"}} onClick={logoutuser}>تسجيل الخروج</h3>
  </div>
);


    const [showmenue, setshowmenue] = useState(false);


const buttonWidth = 70;
    
    return (

         
        
       <div className="HeaderBody_Dash_Admin">
               
       
            {showmenue &&
                <>
            <div className="menuside" >
                   <SideBarDashboradPlace />
                   
                  </div>
                <div className="overmenuside" onClick={()=>setshowmenue(!showmenue)}></div>
                </>
            }

            
            {ShowMenu &&
                <div className="d-flexmenu">
          <CgMenuRight onClick={() => setshowmenue(!showmenue)} size={30} style={{ cursor: "pointer" }} />
 <h3 style={{ marginRight: 10, color: "#fff" }}>{Title}</h3>
         
                </div>
            }
            {!ShowMenu &&
                <div className="d-flexmenu">
                    <CgMenuRight size={30} style={{ cursor: "pointer" }} />
 <h3 style={{ marginRight: 10, color: "#fff" }}>{Title}</h3>

                </div>
            }

                <div className="d-flexmenu_mobail">
                    <CgMenuRight onClick={showModal} size={30} style={{ cursor: "pointer" }} />
                    <h3 style={{ marginRight: 10, color: "#fff" }}>{Title}</h3>
                </div>
           
            <Modal visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                   <SideBarDashboradPlace />
           </Modal>

                  <Popover placement="bottomLeft"  title={text} content={content} trigger="click">
                        <Avatar style={{ background: "rgb(43 34 33)",cursor: "pointer",marginRight: 5 }} src={Places_Image} />
                  </Popover>

        <div onClick={GoToHome}>
          <Avatar  style={{ background: "rgb(43 34 33)",cursor: "pointer",marginRight: 5 }}  icon={<BsFillHouseFill/>} />
          </div>
            
                       

                  
              </div>
    )
}

export default HeaderDashBoard

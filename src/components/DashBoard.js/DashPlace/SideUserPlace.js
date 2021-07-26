import React, { useEffect, useState } from "react";
import { Avatar, Image, Tooltip ,Modal} from "antd";

//icon
import {
  MdNotificationsActive,
  MdOpenInBrowser,
  MdSettings,
  MdPeople,
  MdWhatshot,
  MdChromeReaderMode,
  MdPowerSettingsNew,
  MdNotifications,
  MdRoomService,
  MdImage,
} from "react-icons/md";
import { FaAlignCenter, FaRegAddressCard, FaRestroom } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { NotiFiction, Places, Users } from "../../../agent";
import { baseURLImg } from "../../../utils/API";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export const SideUserPlace = () => {
  const cookies = new Cookies();

  const history = useHistory();
  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const [IdAppPlace, setIdAppPlace] = useState(cookies.get("IdAppPlace"));
  const isAuthenticated = cookies.get("isAuthenticated");

  const [phoneuser, setphoneuser] = useState("");
  const [photouser, setphotouser] = useState("");
  const [NameUser, setNameUser] = useState("");

  const [nameplace, setnameplace] = useState("");
  const [typeplace, settypeplace] = useState("");
  const [Places_Image, setPlaces_Image] = useState(``);

  const UpdateState = (e) => {
    history.push("Updatausermyplace");
    cookies.set("iduserupdate", IdUser);
        localStorage.setItem("indexclass",2)

  };

   const GoToNoti = (e) => {
  

     NotiFiction.ReadNotiplace(IdAppPlace);
     setTimeout(async () => {
      
  history.push("MangeNotifictionMyPlace");
        localStorage.setItem("indexclass",9)
    }, 1000);
  };

  useEffect(() => {
    const getnameplace = async () => {
      const res = await Places.GetPlaceByIdApp(IdAppPlace);
      setnameplace(res.data.data[0].Places_name_ar);
      settypeplace(res.data.data[0].Places_name_ar);

      const resUsers = await Users.GetOneUserByIdUser(IdUser);
      setNameUser(
        resUsers.data.data[0].FirstNameUser +
          " " +
          resUsers.data.data[0].LastNameUser
      );
      setphotouser(resUsers.data.data[0].PhotoUser);
      setphoneuser(resUsers.data.data[0].Phone);
      setPlaces_Image(`${baseURLImg}${resUsers.data.data[0].PhotoUser}`);
    };
    getnameplace();
  }, [IdUser]);


  const [activeclass, setactiveclass] = useState(localStorage.getItem("indexclass")===""?0:localStorage.getItem("indexclass"))
  const datamenue = [
    {
      Name: "الرئيسية",
      Icon: <MdOpenInBrowser className="Header_Icon_body" size={25} />,
      Path: "DashUserPlace",
    },
    {
      Name: "المعلومات الاساسية",
      Icon: <MdChromeReaderMode className="Header_Icon_body" size={25} />,
      Path: "MangeMyPlace",
    },

    {
      Name: "ادارة المستخدمين",
      Icon: <MdPeople className="Header_Icon_body" size={25} />,
      Path: "MangeUserMyPlace",
    },

    {
      Name: "ادارة الصور",
      Icon: <MdImage className="Header_Icon_body" size={25} />,
      Path: "MangeImagesMyPlace",
    },

    {
      Name: "ادارة الخدمات",
      Icon: <MdRoomService className="Header_Icon_body" size={25} />,
      Path: "MangeServiceMyPlace",
    },
    {
      Name: "ادارة الطوابق",
      Icon: <FaAlignCenter className="Header_Icon_body" size={25} />,
      Path: "MangeFloorMyPlace",
    },
    {
      Name: "ادارة الغرف",
      Icon: <FaRestroom className="Header_Icon_body" size={25} />,
      Path: "MangeAllRoom",
    },
    {
      Name: " ادارة الحجـوزات",
      Icon: <FaRegAddressCard className="Header_Icon_body" size={25} />,
      Path: "MangeResMyPlace",
    },
    {
      Name: "ادارة العـروض",
      Icon: <MdWhatshot className="Header_Icon_body" size={25} />,
      Path: "MangeOfferMyPlace",
    },
    {
      Name: "الاشعارات",
      Icon: <MdNotifications className="Header_Icon_body" size={25} />,
      Path: "MangeNotifictionMyPlace",
    },
  ];

  const [menue, setsetmenue] = useState(false)
  const ClickBtn = (path, i) => {
    
    if (path === "MangeNotifictionMyPlace") {
       NotiFiction.ReadNotiplace(IdAppPlace);
     setTimeout(async () => {
      
   localStorage.setItem("indexclass",i)
    history.push(path);
    }, 1000);
     
    }
    else {
      localStorage.setItem("indexclass",i)
    history.push(path);
    }

  };

  const logoutuser = () => {
    cookies.set("isAuthenticated", false);
    history.push("LoginPlace");
    localStorage.setItem("indexclass",0)

  };


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
  return (
    <div>

      <div   className="meueslider">
        <HiOutlineMenuAlt3 onClick={showModal} size={30} style={{color:"#69546de3"}}/>
        <div className="divmenu">
          <Avatar size={25} src={<Image src={Places_Image} />} style={{border:"1px solid #69546de3"}}/>

 <Tooltip placement="bottomRight" title={"الاشعارات"}>
            <MdNotificationsActive
              onClick={GoToNoti}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
          <Tooltip placement="bottom" title={"الاعدادات"}>
            <MdSettings
              onClick={UpdateState}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"تسجيل الخروج"}>
            <MdPowerSettingsNew
              onClick={logoutuser}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
        </div>
                

  <Modal className="modelshow" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <div className="SideUserPlacemenue">
      <div className="SideUserPlace_Header">
        <Avatar size={64} src={<Image src={Places_Image} />} style={{border:"1px solid #69546de3"}}/>

        <h4 style={{ fontWeight: 800, marginTop: 5 }}>{NameUser}</h4>
        <p className="pnameplace">{nameplace}</p>

        <div className="SideUserPlace_Header_Icon">
         
          <Tooltip placement="bottomRight" title={"الاشعارات"}>
            <MdNotificationsActive
              onClick={GoToNoti}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
          <Tooltip placement="bottom" title={"الاعدادات"}>
            <MdSettings
              onClick={UpdateState}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"تسجيل الخروج"}>
            <MdPowerSettingsNew
              onClick={logoutuser}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
        </div>
      </div>
      <div className="SideUserPlace_Body"></div>
      {datamenue.map((res, i) => (
        <div
          key={i}
          onClick={() => ClickBtn(res.Path,i)}
           className={`${i == activeclass ? "SideUserPlace_Body_Button vist" :"SideUserPlace_Body_Button"}`}
        >
          {" "}
          {res.Icon}
          <span style={{ margin: "0 3px" }}></span>{" "}
          <h4 style={{ margin: 0 }}>{res.Name}</h4>{" "}
        </div>
      ))}
    </div>
           </Modal>
     
      </div>

    
    <div className="SideUserPlace">
      <div className="SideUserPlace_Header">
        <Avatar size={64} src={<Image src={Places_Image} />} style={{border:"1px solid #69546de3"}}/>

        <h4 style={{ fontWeight: 800, marginTop: 5 }}>{NameUser}</h4>
        <p className="pnameplace">{nameplace}</p>

        <div className="SideUserPlace_Header_Icon">
         
          <Tooltip placement="bottomRight" title={"الاشعارات"}>
            <MdNotificationsActive
              onClick={GoToNoti}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
          <Tooltip placement="bottom" title={"الاعدادات"}>
            <MdSettings
              onClick={UpdateState}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"تسجيل الخروج"}>
            <MdPowerSettingsNew
              onClick={logoutuser}
              className="Header_Icon"
              size={25}
            />
          </Tooltip>
        </div>
      </div>
      <div className="SideUserPlace_Body"></div>
      {datamenue.map((res, i) => (
        <div
          key={i}
          onClick={() => ClickBtn(res.Path,i)}
           className={`${i == activeclass ? "SideUserPlace_Body_Button vist" :"SideUserPlace_Body_Button"}`}
        >
          {" "}
          {res.Icon}
          <span style={{ margin: "0 3px" }}></span>{" "}
          <h4 style={{ margin: 0 }}>{res.Name}</h4>{" "}
        </div>
      ))}
      </div>
       </div>
  );
};

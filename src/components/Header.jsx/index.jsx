import React, { useEffect, useState } from "react";
import "./style.scss";
import Flags from 'country-flag-icons/react/3x2'



import { RiHotelFill } from "react-icons/ri";
import { MdCardTravel } from "react-icons/md";
import {
  FaHotel,
  FaMoon,
  FaHandHoldingUsd,
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutube,
  FaTelegram,
 
  FaWhatsapp,
} from "react-icons/fa";
import { BiMapAlt, BiSupport } from "react-icons/bi";
import { FiMenu, FiSun } from "react-icons/fi";
import { GiCommercialAirplane } from "react-icons/gi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import {
  BsQuestionSquareFill,
  BsFillExclamationOctagonFill,
  BsBagFill,
} from "react-icons/bs";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdContacts } from "react-icons/io";

import { Select, Switch, Tooltip } from "antd";
import { useHistory } from 'react-router-dom';
import Modal from "antd/lib/modal/Modal";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

const Header = () => {




  const { t } = useTranslation();

  


  const { Option } = Select;


  

  const [openmenumobail, setopenmenumobail] = useState(false);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const [btnactive, setbtnactive] = useState(1);
  const valuesnav = [
    {
      id: 1,
      text: "الفنادق",
      icon: <RiHotelFill size={20} style={{ marginLeft: 5 }} />,
      href:"/Hotels"
    },
    {
      id: 2,
      text: "الشقق والشاليهات",
      icon: <FaHotel size={20} style={{ marginLeft: 5 }} />,
      href:"/Shqaq"
    },
    {
      id: 3,
      text: "الشركات السياحية",
      icon: <MdCardTravel size={20} style={{ marginLeft: 5 }} />,
      href:"/ComanyTravel"
    },
    {
      id: 4,
      text: "البرامج والمجاميع السياحية",
      icon: <BiMapAlt size={20} style={{ marginLeft: 5 }} />,
      href:"/TravelProgram"
    },
  ];

  const ValueMenuSide = [
    {
      id: 1,
      text: "تصفح عروض الفنادق",
      icon: <RiHotelFill size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 2,
      text: "تصفح عروض الشركات السياحية",
      icon: <FaHotel size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 3,
      text: "السياحة داخل العراق",
      icon: <BsBagFill size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 4,
      text: "البرامج والمجاميع السياحية",
      icon: <GiCommercialAirplane size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 5,
      text: "المشاركات والأراء",
      icon: <IoChatbubbleEllipsesSharp size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 5,
      text: "تغير الوضع",
      icon: <FaMoon size={20} style={{ marginLeft: 5 }} />,
      btn:<Switch defaultChecked style={{ marginRight: 5 }}/>,
      moon:<FaMoon style={{ marginRight: 5 }}/>,
      sun:<FiSun/>
    },
    {
      id: 6,
      text: "الدعم الفني",
      icon: <BiSupport size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 7,
      text: "التسويق بالعمولة",
      icon: <FaHandHoldingUsd size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 8,
      text: "الأسئلة الشائعة",
      icon: <BsQuestionSquareFill size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 9,
      text: "سياسة الخصوصية",
      icon: <SiGnuprivacyguard size={20} style={{ marginLeft: 5 }} />,
    },
    {
      id: 10,
      text: t("شروط الأستخدام"),
      icon: (
        <BsFillExclamationOctagonFill size={20} style={{ marginLeft: 5 }} />
      ),
    },
    {
      id: 11,
      text:t("تواصل معنا") ,
      icon: <IoMdContacts size={20} style={{ marginLeft: 5 }} />,
    },
  ];

  const history = useHistory();

  const  GoToLogin = () => {
    history.push("/login", { from: "UplodeFile" });
  }


  const [langweb, setlangweb] = useState("العربية");
  const [amlaweb, setamlaweb] = useState("IQD");

  const [lang, setlang] = useState("ar");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleamla, setisModalVisibleamla] = useState(false);

  const [lanugefromdata, setlanugefromdata] = useState([
    {
      key:1,
      langtext:"العربية",
      langcode:"ar",
      flag:<Flags.IQ  title="العراق" className="divlang_flag" />,
    },
    {
      key:1,
      langtext:"English",
      langcode:"en",
      flag:<Flags.US  title="USA" className="divlang_flag" />,
    },
    {
      key:1,
      langtext:"Kurdî",
      langcode:"ku",
      flag: <img
      src={window.location.origin + "/img/Kurdstanflag.png"}
      className="divlang_flag"
    />,
    }
    
  ]);
  

  function handleClick(lan) {
    i18next.changeLanguage(lan)
  }


  const showModal = () => {
    setIsModalVisible(true);
  };

 

  const handleOk = (codelang,textlang) => {
   

    i18next.changeLanguage(codelang);
    setIsModalVisible(false);
    setlangweb(textlang)
    //changeLanguage
   // setlangweb()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalAmla = () => {
    setisModalVisibleamla(true);
  };

  const handleOkAmla = () => {
    setisModalVisibleamla(false);
  };

  const handleCancelAmla = () => {
    setisModalVisibleamla(false);
  };
  
  const handelsetbtn =(id,href)=>{
    setbtnactive(id);
    history.push(href, { from: "Home" });
  }


  useEffect(() => {
   if(langweb==="العربية"){
     localStorage.setItem("langweb","rtl")
   }

   else{
    localStorage.setItem("langweb","ltr")
   }
  },[langweb])


  console.log(localStorage.getItem("langweb"))


  return (
    <div className="header">
      <div className="header_top">
      <Tooltip title={<>اسم الشركة مالتنة &#128540;</>} >
      <div className="header_right_logo">
          <h1>
            CS <span>code</span>
          </h1>
        </div>
      </Tooltip>
    
        <div className="header_left_detailsweb">
          <div className="div_btn">
          <div className="divlang">
          <Tooltip title="اللغة" >
            <span onClick={showModal} style={{cursor:"pointer"}}>{langweb}</span>
          
          </Tooltip>
         <Tooltip title="اللغة">
           
         <Flags.IQ  title="العراق" className="divlang_flag" onClick={showModal}/>
         </Tooltip>
         <Modal  title="اختيار لغة الموقع" okText=""
          cancelText="الغاء" visible={isModalVisible}    onCancel={handleCancel}>

{lanugefromdata.map((res,i)=>

<div className="choos_lang" key={i}  onClick={()=>handleOk(res.langcode,res.langtext)}>{res.langtext} {res.flag}</div>
)}
     
      </Modal>
         
         <div style={{cursor:"pointer"}}>
         <Tooltip title="العملة">
        <span onClick={showModalAmla}>{amlaweb}</span>
  </Tooltip>

  <Modal title="اختيار العملة" okText="نعم"
          cancelText="الغاء" visible={isModalVisibleamla}  onCancel={handleCancelAmla}>
        <div className="choos_lang">IQD الدينار العراقي <Flags.IQ  title="العراق" className="divlang_flag" /></div>
        <div className="choos_lang">USD الدولار<Flags.US  title="United States" className="divlang_flag" /></div>
      </Modal>
           </div>

         </div>
          </div>

          <div className="div_btn">
          <Tooltip title="التسجيل في الموقع" > <div className="btn_sginup">سجل الان</div></Tooltip>
           

            <Tooltip title="الدخول الى صفحة المستخدم" >
            <div className="btn_sginup" style={{ marginRight: 10 }} onClick={GoToLogin}>
              تسجيل الدخول
            </div>
            </Tooltip>
          </div>
        </div>
      
     
        <div
          className="menu_mobail"
         
        >
          <div className="btn_sginup signin btn_signin" onClick={GoToLogin}>دخـول</div>
          <FiMenu size={30} style={{cursor:"pointer"}}  onClick={() => setopenmenumobail(!openmenumobail)}/>
        </div>
      </div>

      <div className="header_Bottom">
        {valuesnav.map((res, i) => (
          <div
            key={i}
            className={
              btnactive === res.id
                ? "header_nav_bottom_active header_nav_bottom"
                : "header_nav_bottom"
            }
            onClick={() =>handelsetbtn(res.id,res.href)}
          >
            {res.icon} {res.text}
          </div>
        ))}
      </div>

      <div className="header_Bottom_menu">
        <Select
          defaultValue="الفنادق"
          showSearch
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="يرجى اختيار القسم"
          optionFilterProp="children"
          onChange={e=>handelsetbtn(1,e)}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {valuesnav.map((res, i) => (
            <Option key={i} value={res.href} >
              {res.text}
            </Option>
          ))}
        </Select>
      </div>

      {/*Side Menu Mobail */}

      <div>
        <div
          className={
            openmenumobail
              ? "menu_mobail_overflow"
              : "menu_mobail_overflow_close"
          }
          onClick={() => setopenmenumobail(false)}
        ></div>
        <div
          className={
            openmenumobail
              ? "menu_mobail_side "
              : "menu_mobail_side menu_mobail_side_close"
          }
        >
         <div className="divlang">
         <Tooltip title="اللغة" >
            <span onClick={showModal} style={{cursor:"pointer"}}>{langweb}</span>
          
          </Tooltip>
         <Tooltip title="اللغة">
         <Flags.IQ  title="العراق" className="divlang_flag" onClick={showModal}/>
         </Tooltip>
         <Modal title="اختيار لغة الموقع" okText="نعم"
          cancelText="الغاء" visible={isModalVisible}  onCancel={handleCancel}>

            
      
{lanugefromdata.map((res,i)=>

<div className="choos_lang" key={i}  onClick={()=>handleOk(res.langcode,res.langtext)}>{res.langtext} {res.flag}</div>
)}
      </Modal>
         
         <div style={{cursor:"pointer"}}>
         <Tooltip title="العملة">
        <span onClick={showModalAmla}>{amlaweb}</span>
  </Tooltip>

  <Modal title="اختيار العملة" okText="نعم"
          cancelText="لا" visible={isModalVisibleamla} onOk={handleOkAmla} onCancel={handleCancelAmla}>
        <div className="choos_lang">IQD الدينار العراقي <Flags.IQ  title="العراق" className="divlang_flag" /></div>
        <div className="choos_lang">USD الدولار<Flags.US  title="United States" className="divlang_flag" /></div>
      </Modal>
           </div>

         </div>
         <div >
         {ValueMenuSide.map((res, i) => (
            <div key={i} className="btn_menu_side">
              {res.icon} {res.text} <div className="div_btn_switch"> {res.sun} {res.btn} {res.moon} </div>
            </div>
          ))}
         </div>
          
          <div className="mune_sid_iconsoshial">
            <FaFacebookSquare
              size={25}
              style={{ marginLeft: 5, fill: "#0f2e91" }}
            />
            <FaTwitterSquare
              size={25}
              style={{ marginLeft: 5, fill: "rgb(9 139 239)" }}
            />
            <FaYoutube size={25} style={{ marginLeft: 5, fill: "#d9363e" }} />
            <FaTelegram
              size={25}
              style={{ marginLeft: 5, fill: "#fff" }}
            />
            <FaWhatsapp size={25} style={{ marginLeft: 5, fill: "#37890f" }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>شركة cs code</h3>
            <h4>العراق - بغداد</h4>
            <h4 dir="ltr">+964 781094624</h4>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Header;

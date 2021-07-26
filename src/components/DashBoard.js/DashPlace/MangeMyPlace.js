import { Col, Row, Image, message, Spin, Tag ,Modal,Tooltip} from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from ".././HeaderDashBoard";
import axios, { baseURLImg, IdAppCompany } from "../../../utils/API.js";
import { Places,Category,StateContry,Reservation,Review,Floor,Users,NotiFiction,Offer,ImagePlacs,Service,Rooms } from "../../../agent";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BiMessageAltAdd } from 'react-icons/bi';
import { MdRateReview } from 'react-icons/md';
import { RiChatDeleteFill ,RiArrowGoBackFill} from 'react-icons/ri';
import { AiTwotoneSave,AiOutlineDollarCircle} from 'react-icons/ai';
import { FaAlignCenter,FaUserCheck,FaServicestack,FaRestroom,FaShoppingBag,FaImages,FaAddressCard} from 'react-icons/fa';

import { IoNotifications} from 'react-icons/io5';
import { ImMenu3 } from 'react-icons/im';
import Cookies from "universal-cookie";
import { SideUserPlace } from "./SideUserPlace";


const UpdatePlace = () => {
    const [menuemobail, setmenuemobail] = useState(false);
       const cookies = new Cookies();

  const [IdUser, setIdUser] = useState(cookies.get("userid"));
    const [IdAppPlace, setIdAppPlace] = useState(cookies.get("IdAppPlace"));
  //const [IdAppPlace, setIdAppPlace] = useState("7ce5b612-4c72-43f2-9755-0e88672eae6b"); 

  const [ReserLength, setReserLength] = useState(0);
  const [ReviewLength, setReviewLength] = useState(0);
  const [NotiLength, setNotiLength] = useState(0);
const [OfferLength, setOfferLength] = useState(0);
const [FloorLength, setFloorLength] = useState(0);
const [UsersLength, setUsersLength] = useState(0);

const [RoomLength, setRoomLength] = useState(0);
const [ServiceLength, setServiceLength] = useState(0);
const [ImagesLength, setImagesLength] = useState(0);


 useEffect(() => {
 /*
    Rooms.GetAllRooms(IdAppPlace).then(res=>setRoomLength(res.data.data[0].Rooms.length))
   Service.GetAllService(IdAppPlace).then(res=>setServiceLength(res.data.data[0].Services.length));
  ImagePlacs.GetAllImageImagePlacs(IdAppPlace).then(res=>setImagesLength(res.data.data[0].ImagesPlaces.length));


  Reservation.GetAllReservation(IdAppPlace).then(res=>setReserLength(res.data.data[0].Reservations.length))
   Review.GetAllReviewplace(IdAppPlace).then(res=>setReviewLength(res.data.data[0].Reviews.length));
  Floor.GetAllFloor(IdAppPlace).then(res=>setFloorLength(res.data.data[0].Floor.length));

   Offer.GetAllOfferOnePlace(IdAppPlace).then(res=>setOfferLength(res.data.data.length));


 Users.GetAllUsersInplace(IdAppPlace,IdUser).then(res=>setUsersLength(res.data.data.length));
 NotiFiction.GetAllNotiOnePace(IdAppPlace).then(res=>setNotiLength(res.data.data[0].Notification.filter(ress=>ress.Noti_State==="NoRead").length));
*/
 }, [])
  function destroyAll() {
  Modal.destroyAll();
}

  const { confirm } = Modal;
  
  function showConfirm() {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا المكان ؟ ",
        okText:"نعم",cancelText:"لا",
        onOk() {
        axios.delete('/Places', {data:{"IdApp":IdAppPlace}});
          message.success("Delete");
           history.push("PlaceMange");
        },
        onCancel() {
         
        },
      });
    },500);
  
  }
  
const history = useHistory();

  
    const [CategoryCompany, setCategoryCompany] = useState([]);
    const [StateCompany, setStateCompany] = useState([]);

    const GoToMangePlaces = (e) => {
    history.push("PlaceMange");
  };
    const GoToReservationPlace = (e) => {
    history.push("ReservatinPlaceMange");
  };
    const GoToReviewPlaceManage = (e) => {
    history.push("ReviewPlaceManage");
  };
  
   const GoToRoomManage = (e) => {
    history.push("RoomManage");
  };
    const GoToAddImageToPlace = (e) => {
    history.push("AddImageToPlace");
  };

    const GoToOfferPlaceMangePlace = (e) => {
    history.push("OfferPlaceMangePlace");
  };

  const GoToFloorManage = (e) => {
    history.push("FloorManage");
    
  };

const GoToNotiFictionplace = (e) => {
   
    NotiFiction.ReadNotiplace(IdAppPlace);
     setTimeout(async () => {
      
               history.push("NotiPlace");

    }, 500);
  };
  
  const GOToServicesManage = (e) => {
    history.push("ServicesManage");
    
  };

     const GoToManageUserInPlace = (e) => {
    history.push("ManageUserInPlace");
    cookies.set("usercat",Catagory)

  };

    const GoToPlaceMange = (e) => {
    history.push("PlaceMange");
   
  };

    useEffect(() => {
        const Categoryaasync = async () => {
            const datacat = await Category.GetAllCategory(IdAppCompany)
            setCategoryCompany(datacat.data.data[0].CategoryPlaces);
        }

         const StateContryasync = async () => {
            const datastate = await StateContry.GetAllStateContry(IdAppCompany)
            setStateCompany(datastate.data.data[0].StateContry);
      }

        Categoryaasync();
        StateContryasync();
    }, [])



  const [Places_Image, setPlaces_Image] = useState({ file: "" });

  const [Places_Imageupload, setPlaces_Imageupload] = useState({
   file: window.location.origin + "/img/Noimage.jpg",
  });



  const [Places_name_ar, setPlaces_name_ar] = useState("");
  const [Places_name_en, setPlaces_name_en] = useState("");
  const [Places_name_ku, setPlaces_name_ku] = useState("");
  const [Places_Address_ar, setPlaces_Address_ar] = useState("");
  const [Places_Address_en, setPlaces_Address_en] = useState("");
  const [Places_Address_ku, setPlaces_Address_ku] = useState("");
  const [Places_RateStar, setPlaces_RateStar] = useState("");
  const [Places_city_ar, setPlaces_city_ar] = useState("");
  const [Places_city_en, setPlaces_city_en] = useState("");
  const [Places_city_ku, setPlaces_city_ku] = useState("");
  const [Places_Email, setPlaces_Email] = useState("");
  const [Places_Phone, setPlaces_Phone] = useState("");
  const [Places_Offcenter, setPlaces_Offcenter] = useState("");
  const [Places_location_ln, setPlaces_location_ln] = useState("");
  const [Places_location_lo, setPlaces_location_lo] = useState("");
  const [Places_State, setPlaces_State] = useState("");
  const [Catagory, setCatagory] = useState("");
  const [Places_Description_ar, setPlaces_Description_ar] = useState("");
  const [Places_Description_en, setPlaces_Description_en] = useState("");
  const [Places_Description_ku, setPlaces_Description_ku] = useState("");
  const [Places_Price, setPlaces_Price] = useState("");
  const [Places_Price_Currency, setPlaces_Price_Currency] = useState("");
  const [Places_Favorite, setPlaces_Favorite] = useState("");

  const UpdateDetailsPlaceAndUpload = (file) => {
    const url = "/Places";
    const formData = new FormData();
    formData.append("Places_Image", Places_Image.file);
    formData.append("IdApp", IdAppPlace);

    formData.append("Places_name_ar", Places_name_ar);
    formData.append("Places_name_en", Places_name_en);
    formData.append("Places_name_ku", Places_name_ku);

    formData.append("Places_Address_ar", Places_Address_ar);
    formData.append("Places_Address_en", Places_Address_en);
    formData.append("Places_Address_ku", Places_Address_ku);

    formData.append("Places_RateStar", Places_RateStar);

    formData.append("Places_city_ar", Places_city_ar);
    formData.append("Places_city_en", Places_city_en);
    formData.append("Places_city_ku", Places_city_ku);

    formData.append("Places_Email", Places_Email);
    formData.append("Places_Phone", Places_Phone);

    formData.append("Places_Offcenter", Places_Offcenter);
    formData.append("Places_location_ln", Places_location_ln);
    formData.append("Places_location_lo", Places_location_lo);

    formData.append("Places_State", Places_State);
    formData.append("Catagory", Catagory);

    formData.append("Places_Description_ar", Places_Description_ar);
    formData.append("Places_Description_en", Places_Description_en);
    formData.append("Places_Description_ku", Places_Description_ku);

    formData.append("Places_Price", Places_Price);
    formData.append("Places_Price_Currency", Places_Price_Currency);
    formData.append("Places_Favorite", Places_Favorite);
    formData.append("IdUser", IdUser);

    return axios.put(url, formData);
  };

  const handleChangeImage = (event) => {
    setPlaces_Imageupload({
      file: URL.createObjectURL(event.target.files[0]),
    });

    setPlaces_Image({
      file: event.target.files[0],
    });
  };

  const UpdateDetailsPlace = async (e) => {
    try {
      if (Places_Imageupload.file === "") {
      message.error("error");
    } else {
      e.preventDefault();

      UpdateDetailsPlaceAndUpload(Places_Imageupload.file).then(
        (response) => {}
      );
      message.success("Save");
    }
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    const GetDataPlaces = async (IdAppPlace) => {
      const dataPlace = await Places.GetPlaceByIdApp(IdAppPlace);
      setPlaces_name_ar(dataPlace.data.data[0].Places_name_ar);
      setPlaces_name_en(dataPlace.data.data[0].Places_name_en);
      setPlaces_name_ku(dataPlace.data.data[0].Places_name_ku);

      setPlaces_Address_ar(dataPlace.data.data[0].Places_Address_ar);
      setPlaces_Address_en(dataPlace.data.data[0].Places_Address_en);
      setPlaces_Address_ku(dataPlace.data.data[0].Places_Address_ku);

      setPlaces_RateStar(dataPlace.data.data[0].Places_RateStar);

      setPlaces_city_ar(dataPlace.data.data[0].Places_city_ar);
      setPlaces_city_en(dataPlace.data.data[0].Places_city_en);
      setPlaces_city_ku(dataPlace.data.data[0].Places_city_ku);

      setPlaces_Email(dataPlace.data.data[0].Places_Email);
      setPlaces_Phone(dataPlace.data.data[0].Places_Phone);

      setPlaces_Offcenter(dataPlace.data.data[0].Places_Offcenter);
      setPlaces_location_ln(dataPlace.data.data[0].Places_location_ln);
      setPlaces_location_lo(dataPlace.data.data[0].Places_location_lo);

      setPlaces_State(dataPlace.data.data[0].Places_State);
      setCatagory(dataPlace.data.data[0].Catagory);

      setPlaces_Description_ar(dataPlace.data.data[0].Places_Description_ar);
      setPlaces_Description_en(dataPlace.data.data[0].Places_Description_en);
      setPlaces_Description_ku(dataPlace.data.data[0].Places_Description_ku);

      setPlaces_Price(dataPlace.data.data[0].Places_Price);
      setPlaces_Price_Currency(dataPlace.data.data[0].Places_Price_Currency);
      setPlaces_Favorite(dataPlace.data.data[0].Places_Favorite);


      setPlaces_Imageupload({
        file: `${baseURLImg}${dataPlace.data.data[0].Places_Image}`,
      });

      setPlaces_Image({
        file: `${baseURLImg}${dataPlace.data.data[0].Places_Image}`,
      });

    };

    GetDataPlaces(IdAppPlace);
  }, [IdAppPlace]);


  //Model Add Category

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [ModelCategory, setModelCategory] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    Category.AddNewCategory(IdAppCompany, ModelCategory);
    setConfirmLoading(true);
    setTimeout(async () => {
      
           const datacat = await Category.GetAllCategory(IdAppCompany)
            setCategoryCompany(datacat.data.data[0].CategoryPlaces);
      
       setVisible(false);
        setConfirmLoading(false);
      message.success("Add");
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  //Model Add State

  const [visibleState, setVisibleState] = useState(false);
  const [confirmLoadingState, setConfirmLoadingState] = useState(false);
  const [modalTexStatet, setModalTextState] = useState('Content of the modal');
  const [ModelStateAr, setStateAr] = useState('');
  const [ModelStateEn, setStateEn] = useState('');
  const [ModelStateKu, setStateKu] = useState('');


  const showModalState = () => {
    setVisibleState(true);
  };

  const handleOkState = async () => {
    StateContry.AddNewState(IdAppCompany, ModelStateAr,ModelStateEn,ModelStateKu);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
            const datastate = await StateContry.GetAllStateContry(IdAppCompany)
            setStateCompany(datastate.data.data[0].StateContry);
      setStateAr("");
  setStateEn("");
  setStateKu("");
     setVisibleState(false);
      setConfirmLoadingState(false);
      message.success("Add");
    }, 2000);
  };

  const handleCancelState = () => {
    setVisibleState(false);
  };


  
const titelplace = cookies.get("titelplace")
  return (
    <div>
          <form style={{display:"flex",width:"100%"}} onSubmit={(e) => UpdateDetailsPlace(e)}>
               <SideUserPlace />
            <div  className="widiv" >
        {Places_name_ar === "" && ( 
          <Spin
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100%",
              background: "#ffffffc1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 75454,
            }}
            tip="Loading..."
          ></Spin>
        )}
        <div className="dashboard_main" style={{ justifyContent: "center" }}>
          <Row>

            <Col
              style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              xs={24}
              md={24}
              lg={18}
              xl={20}
            >
              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المكان عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_ar}
                    onChange={(e) => setPlaces_name_ar(e.target.value)}
                    required
                                      placeholder="Enter Name Place Arabic"
                                      disabled
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المكان بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_en}
                    onChange={(e) => setPlaces_name_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_name_en" disabled
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المكان بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_ku}
                    onChange={(e) => setPlaces_name_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_name_ku" disabled
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>تصنيف المكان/عدد النجوم</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_RateStar}
                    onChange={(e) => setPlaces_RateStar(e.target.value)}
                    required
                    placeholder="Please Enter Places_RateStar" disabled
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالعربي</label>
                    
                  </div>

                    <select
                    style={{ padding: 5 }}
                    className="inputtext"
                    type="text" disabled
                    value={Places_city_ar}
                    onChange={(e) => setPlaces_city_ar(e.target.value)}
                    required
                    placeholder="Please Enter Places_city_ar"
                  > {StateCompany.map((res, i) => 
                                          <option key={i}>{res.NameState_ar} </option>
                                      )}
                                     
                   
                  </select>
                  
                  
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالانكليزي</label>
                   
                  </div>

                    <select
                    style={{ padding: 5 }}
                    className="inputtext"
                    type="text" disabled
                    value={Places_city_en}
                    onChange={(e) => setPlaces_city_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_city_en"
                  > {StateCompany.map((res, i) => 
                                          <option key={i}>{res.NameState_en} </option>
                                      )}
                                     
                   
                  </select>

                 
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput" >
                    <label>المحافظة بالكردي</label>
                  
                  </div>

                   <select
                    style={{ padding: 5 }}
                    className="inputtext"
                    type="text" disabled
                    value={Places_city_ku}
                    onChange={(e) => setPlaces_city_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_city_ku"
                  > {StateCompany.map((res, i) => 
                                          <option key={i}>{res.NameState_ku} </option>
                                      )}
                                     
                   
                  </select>

                </div>
              </Col>


              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العنوان بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Address_ar} disabled
                    onChange={(e) => setPlaces_Address_ar(e.target.value)}
                    required
                    placeholder="Please Enter Places_Address_ar"
                  />
                </div>
              </Col>

                          <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العنوان بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Address_en} disabled
                    onChange={(e) => setPlaces_Address_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_Address_en"
                  />
                </div>
                          </Col>
                          
                          <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العنوان بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Address_ku} disabled
                    onChange={(e) => setPlaces_Address_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_Address_ku"
                  />
                </div>
              </Col>
              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>البريد الالكتروني للمكان</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Email} disabled
                    onChange={(e) => setPlaces_Email(e.target.value)}
                    required
                    placeholder="Please Enter Places_Email"
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>رقم الهاتف للمكان</label>
                  </div>

                  <input
                    className="inputtext"
                    type="number"
                    value={Places_Phone}
                    onChange={(e) => setPlaces_Phone(e.target.value)}
                    required disabled
                    placeholder="Please Enter Places_Phone"
                  />
                </div>
              </Col>

           
            </Col>

            <Col
              style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
              xs={24}
              md={18}
              lg={4}
              xl={4}
            >
              <div className="containerimag">
                <span className="lableinput">الصورة الرئيسية</span>
               
                <Image style={{ maxHeight: "300px" }} width={"100%"} height={"100%"}
                  src={Places_Imageupload.file} />

                <input
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                  multiple
                  style={{ background: "#ffeb3b", border: "1px solid black" }}
                  id="fileup"
                  hidden 
                  accept="image/*"
                />
              
              </div>
            </Col>
            <Col
              style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              xs={24}
              md={24}
              lg={18}
              xl={20}
            >
              
              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>وصف المكان بالعربي</label>
                  </div>

                  <textarea
                    style={{ height: 120 }}
                    className="inputtext"
                    value={Places_Description_ar} disabled
                    onChange={(e) => setPlaces_Description_ar(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_ar"
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>وصف المكان بالانكليزي</label>
                  </div>

                  <textarea
                    style={{ height: 120 }}
                    className="inputtext"
                    value={Places_Description_en} disabled
                    onChange={(e) => setPlaces_Description_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_en"
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 5,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                xs={24}
                md={8}
                lg={8}
                xl={8}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>وصف المكان بالكردي</label>
                  </div>

                  <textarea
                    style={{ height: 120 }}
                    className="inputtext"
                    value={Places_Description_ku} disabled
                    onChange={(e) => setPlaces_Description_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_ku"
                  />
                </div>
              </Col>

              
            </Col>
          
          </Row>
        </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlace;

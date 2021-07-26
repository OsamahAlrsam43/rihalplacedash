import { Col, Row, Image, message, Tag ,Modal,Select} from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import axios, { baseURLImg, IdAppCompany } from "../../utils/API.js";
import {Offer,Category, Places} from "../../agent";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';


import { RiChatDeleteFill ,RiArrowGoBackFill} from 'react-icons/ri';
import { AiTwotoneSave} from 'react-icons/ai';
import { FaImages} from 'react-icons/fa';

import Cookies from "universal-cookie";

const UpdateUserToPlace = () => {

       const cookies = new Cookies();

    const CatPlace = cookies.get("usercat");
  const { Option } = Select;

  //const [IdUser, setIdUser] = useState(localStorage.getItem("userid"));
  const [IdUser, setIdUser] = useState(cookies.get("userid"));

  
    const [IdAppPlace, setIdAppPlace] = useState(
    
  );

   const [IdOffer, setIdOffer] = useState(
    cookies.get("IdOffer")
  );

  function destroyAll() {
  Modal.destroyAll();
}


const [CategoryCompany, setCategoryCompany] = useState([]);
const [Place, setPlace] = useState([]);

    useEffect(() => {
        const Categoryaasync = async () => {
            const datacat = await Category.GetAllCategory(IdAppCompany)
            setCategoryCompany(datacat.data.data[0].CategoryPlaces);
        }

          const Placesaasync = async () => {
                     Places.GetAllPlace().then((res) => setPlace(res.data.data));

        }

        Placesaasync();
        Categoryaasync();
    }, [])
  
  
  const { confirm } = Modal;
  
  function showConfirm() {
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا العرض ؟ ",
        okText:"نعم",cancelText:"لا",
     async   onOk() {
          const res = await axios.delete('/OfferPlaces/', { data: { "IdUser": IdUser, "IdOffer": IdOffer } })
     
          if (res.status != 200) {
            message.error(res.data.message)
          }
          else {
            setTimeout(async () => {
              history.push("OfferPlaceMange");

              message.success("Delete");
           
            }, 1000);
          
          }
        },
        onCancel() {
         
        },
      });
    },500);
  
  }
  
const history = useHistory();


  const GoToMangePlaces = (e) => {

    history.push(cookies.get("locationback"));
  };




  const GoToAddImageToPlace = (e) => {
    history.push("ImageOffer");
    
  };

  const [Places_Image, setPlaces_Image] = useState({ file: "" });

  const [PhotoUser, setPhotoUser] = useState({
   file: window.location.origin + "/img/Noimage.jpg",
  });



  const [Places_name_ar, setPlaces_name_ar] = useState("");
  const [Places_name_en, setPlaces_name_en] = useState("");
  const [Places_name_ku, setPlaces_name_ku] = useState("");
  const [Places_Address_ar, setPlaces_Address_ar] = useState("");
  const [Places_Address_en, setPlaces_Address_en] = useState("");
  const [Places_Address_ku, setPlaces_Address_ku] = useState("");
  const [Places_RateStar, setPlaces_RateStar] = useState("");
  const [Places_PriceBefore, setPlaces_PriceBefore] = useState("");
  const [Places_Price_Currency, setPlaces_Price_Currency] = useState("USD");
  const [Places_OfferState, setPlaces_OfferState] = useState("");
  const [Places_OfferNewOrNo, setPlaces_OfferNewOrNo] = useState("");
  const [Places_OfferCatagory, setPlaces_OfferCatagory] = useState("Hotels");
  const [Places_IdApp, setPlaces_IdApp] = useState("");
  const [OfferStartDate, setOfferStartDate] = useState("");
  const [OfferEndDate, setOfferEndDate] = useState("");
  
  const [Places_PriceNow, setPlaces_PriceNow] = useState("");
  const [Places_discountPrice, setPlaces_discountPrice] = useState("");
  const [Places_Imageupload, setPlaces_Imageupload] = useState({
    file: window.location.origin + "/img/Noimage.jpg",
  });

   const [Places_Description_ar, setPlaces_Description_ar] = useState("");
  const [Places_Description_en, setPlaces_Description_en] = useState("");
  const [Places_Description_ku, setPlaces_Description_ku] = useState("");
  const [Places_Phone, setPlaces_Phone] = useState("");
  const [Name_PlaceByIdApp, setName_PlaceByIdApp] = useState("");

  const UpdateDetailsPlaceAndUpload = (file) => {
   const url = "/OfferPlaces";
    const formData = new FormData();
    formData.append("Places_Image", Places_Image.file);
    formData.append("Places_IdApp", Places_IdApp);
      formData.append("IdUser", IdUser);
      
    formData.append("Places_name_ar", Places_name_ar);
    formData.append("Places_name_en", Places_name_en);
      formData.append("Places_name_ku", Places_name_ku);

         formData.append("Places_Address_ar", Places_Address_ar);
    formData.append("Places_Address_en", Places_Address_en);
      formData.append("Places_Address_ku", Places_Address_ku);

      formData.append("Places_RateStar", Places_RateStar);
    formData.append("Places_PriceBefore", Places_PriceBefore);
      formData.append("Places_PriceNow", Places_PriceNow);

    
      formData.append("Places_Description_ar", Places_Description_ar);
    formData.append("Places_Description_en", Places_Description_en);
      formData.append("Places_Description_ku", Places_Description_ku);
    formData.append("Places_Phone", Places_Phone);
    
            formData.append("Places_discountPrice", Places_discountPrice);
    formData.append("Places_Price_Currency", Places_Price_Currency);
      formData.append("Places_OfferState", Places_OfferState);

     formData.append("Places_OfferNewOrNo", Places_OfferNewOrNo);

     formData.append("Places_OfferCatagory", Places_OfferCatagory);
    formData.append("OfferStartDate", OfferStartDate);
      formData.append("OfferEndDate", OfferEndDate);

      formData.append("IdOffer", IdOffer);

    return axios.put(url, formData);
  };

  const UpdateRestPass =async () => {
   
    await axios.put("/users/restpwsuser",{"Places_Address_ar":Places_Address_ar,"IdUser":IdUser});
  };




     useEffect(() => {
    const GetDataPlaces = async (IdOffer) => {
      const dataPlace = await Offer.GetOneOffer(IdOffer)
      const GetNamePlaceByIdApp = await (await Places.GetPlaceByIdApp(dataPlace.data.data[0].Places_IdApp)).data.data[0].Places_name_ar
      setName_PlaceByIdApp(GetNamePlaceByIdApp)
      setPlaces_name_ar(dataPlace.data.data[0].Places_name_ar);
      setPlaces_name_en(dataPlace.data.data[0].Places_name_en);
      setPlaces_name_ku(dataPlace.data.data[0].Places_name_ku);

      setPlaces_Address_ar(dataPlace.data.data[0].Places_Address_ar);
      setPlaces_Address_en(dataPlace.data.data[0].Places_Address_en);
      setPlaces_Address_ku(dataPlace.data.data[0].Places_Address_ku);

      setPlaces_RateStar(dataPlace.data.data[0].Places_RateStar);

      setPlaces_PriceBefore(dataPlace.data.data[0].Places_PriceBefore);
      setPlaces_PriceNow(dataPlace.data.data[0].Places_PriceNow);
     setPlaces_discountPrice(dataPlace.data.data[0].Places_discountPrice );

       setPlaces_Price_Currency(dataPlace.data.data[0].Places_Price_Currency);
      setPlaces_OfferState(dataPlace.data.data[0].Places_OfferState);
     setPlaces_OfferNewOrNo(dataPlace.data.data[0].Places_OfferNewOrNo);

      setPlaces_OfferCatagory(dataPlace.data.data[0].Places_OfferCatagory);
      setPlaces_IdApp(dataPlace.data.data[0].Places_IdApp);
      setOfferStartDate(dataPlace.data.data[0].OfferStartDate);

      setOfferEndDate(dataPlace.data.data[0].OfferEndDate);

    
      setPlaces_Description_ar(dataPlace.data.data[0].Places_Description_ar);
      setPlaces_Description_en(dataPlace.data.data[0].Places_Description_en);
      setPlaces_Description_ku(dataPlace.data.data[0].Places_Description_ku);

      setPlaces_Phone(dataPlace.data.data[0].Places_Phone);

      

      setPlaces_Imageupload({
        file: `${baseURLImg}${dataPlace.data.data[0].Places_Image}`,
      });
      setPhotoUser({
        file: `${baseURLImg}${dataPlace.data.data[0].Places_Image}`,
      });
    };

    GetDataPlaces(IdOffer);
     }, [IdOffer]);
    
  const handleChangeImage = (event) => {
    setPhotoUser({
      file: URL.createObjectURL(event.target.files[0]),
    });

    setPlaces_Image({
      file: event.target.files[0],
    });
  };


  const UpdateDetailsPlace = async (e) => {
    try {
      if (PhotoUser.file === "") {
      message.error("error");
    } 
        else {
                e.preventDefault();

        const res = await UpdateDetailsPlaceAndUpload(PhotoUser.file);
        console.log("res"+res)
        if (res.status!=200) {
          message.error(res.data.message)
        }
        else {
           setTimeout(async() => {
      message.success("Update");
          }, 500);
        }
        }
  
    
    } catch (error) {
      console.log(error)
    }
    
  };


//  const [Places_discountPrice, setPlaces_discountPrice] = useState([{read:true,update:true,delete:true,add:true}]);

    //check box auth
    const OnchangeRead = (e) => {
        setPlaces_discountPrice({...Places_discountPrice, read: e })
    }

    const OnchangeDealte = (e) => {
        setPlaces_discountPrice({...Places_discountPrice, delete: e })
    }

    const OnchangeUpdate = (e) => {
        setPlaces_discountPrice({...Places_discountPrice, update: e })
    }

    const OnchangeAdd = (e) => {
        setPlaces_discountPrice({...Places_discountPrice, add: e })
  }
  
  //password reset

  const [resetpsw, setresetpsw] = useState(false)
  const [resetpswText, setresetpswText] = useState("Password Reset")
  const RestPsw =async () => {
    if (resetpsw==false) {
      setresetpsw(true);
    setPlaces_Address_ar("");
    setresetpswText('Cancel')
    }
    else {
      setresetpsw(false);
      const dataPlace = await Offer.GetOneUserByIdUser(IdUser);
      setPlaces_Address_ar(dataPlace.data.data[0].Places_Address_ar);
      setresetpswText('Password Reset')
    }
  

  }

const titelplace = cookies.get("titeloffer")

  return (
        <div >
      <form onSubmit={(e) => UpdateDetailsPlace(e)}>
      <HeaderDashBoard Title={`${ titelplace} / تعديل تفاصيل العرض `} />
        
        <div className="dashboard_main" style={{ justifyContent: "center"}}>
          <Row>

              <Col
              style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",justifyContent:"space-between",background:"rgb(229 233 234)"
              }}
              xs={24}
              md={24}
              lg={24}
              xl={24}
            >
              <button   style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }} className="btnsavecompany" type="submit">
                حفظ
                <AiTwotoneSave size={20} />
              </button>

            <div className="acton"  style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",justifyContent:"space-between"
              }}>
               
                 <Tag
               onClick={GoToAddImageToPlace}
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="blue"
            >
              
                  ادارة صور العرض
                    <FaImages size={20} style={{margin:"0 5px 0 0"}}/>
                              </Tag>


               <Tag
               onClick={showConfirm}
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="red"
            >
              
                  حذف
                    <RiChatDeleteFill size={20} style={{margin:"0 5px 0 0"}}/>
            </Tag>

              <Tag
               onClick={GoToMangePlaces}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                 الرجوع الى اعدادت العروض
                   <RiArrowGoBackFill size={20} style={{margin:"0 5px 0 0"}}/>
                </Tag>
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
                                     <label>Id App</label>

                  </div>

                                  <Select
                                      
              size="large"
              showSearch
              style={{ width: "100%" }}
              placeholder="يرجى تحديد المكان"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.indexOf(input) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.localeCompare(optionB.children)
              }
              value={Places_IdApp}
              onChange={(e) => setPlaces_IdApp(e)}
                      >
                          {Place.map((res, i) =>
                              <Option  key={i} value={res.IdApp}>{res.Places_name_ar}</Option>
                          )}
             
                                  </Select>
                                  
                  
                  
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
                    <label>اسم العرض بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_ar}
                    onChange={(e) => setPlaces_name_ar(e.target.value)}
                    required
                    placeholder="ُEnter Places_name_ar"
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 10,
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
                    <label>اسم العرض بالانكليزي </label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_en}
                    onChange={(e) => setPlaces_name_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_name_en"
                  />
                </div>
              </Col>

              <Col
                style={{
                  padding: 10,
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
                    <label>اسم العرض بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_ku}
                    onChange={(e) => setPlaces_name_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_name_ku"
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
                    <label>العنوان بالعربي</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="text"
                    value={Places_Address_ar}
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
                    value={Places_Address_en}
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
                    value={Places_Address_ku}
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
                    <label>رقم الهاتف</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="number"
                    value={Places_Phone}
                    onChange={(e) => setPlaces_Phone(e.target.value)}
                    required
                    placeholder="Please Enter Places_Phone"
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
                    <label>تصنيف العرض</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="number"
                    value={Places_RateStar}
                    onChange={(e) => setPlaces_RateStar(e.target.value)}
                    required
                    placeholder="Please Enter Places_RateStar"
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>السعر القديم</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="number"
                    value={Places_PriceBefore}
                    onChange={(e) => setPlaces_PriceBefore(e.target.value)}
                    required
                    placeholder="Please Enter Places_PriceBefore"
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>مبلغ الخصم</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="number"
                    value={Places_discountPrice}
                    onChange={(e) => setPlaces_discountPrice(e.target.value)}
                    required
                    placeholder="Please Enter Places_discountPrice"
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>السعر الحالي</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="number"
                    value={Places_PriceNow}
                    onChange={(e) => setPlaces_PriceNow(e.target.value)}
                    required
                    disabled
                    placeholder="Please Enter Places_PriceNow"
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                

                     <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Places_Price_Currency}
                    onChange={(e) => setPlaces_Price_Currency(e.target.value)}
                    required
                    placeholder="Please Enter Places_Price_Currency"
                  >
                    <option>USD</option>
                    <option>IQD</option>
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
                    <label>حالة العرض</label>
                  </div>

                   <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Places_OfferState}
                    onChange={(e) => setPlaces_OfferState(e.target.value)}
                    required
                    placeholder="Please Enter Places_OfferState"
                  >
                    <option>Active</option>
                    <option>InActive</option>
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
                    <label>العرض جديد/لا</label>
                  </div>

                
                    <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Places_OfferNewOrNo}
                    onChange={(e) =>setPlaces_OfferNewOrNo(e.target.value)}
                    required
                    placeholder="Please Enter Places_OfferNewOrNo"
                  >
                    <option>Yes</option>
                    <option>No</option>
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
                    <label> فئة العرض</label>
                  </div>


 <select
                    style={{ padding: 8 }}
                    className="inputtext"
                    type="text"
                    value={Places_OfferCatagory}
                    onChange={(e) => setPlaces_OfferCatagory(e.target.value)}
                    required
                    placeholder="Please Enter Catagory"
                  > {CategoryCompany.map((res, i) => 
                                          <option key={i}>{res.Name} </option>
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>تاريخ بدء العرض</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="date"
                    value={OfferStartDate}
                    onChange={(e) => setOfferStartDate(e.target.value)}
                    required
                    placeholder="Please Enter OfferStartDate"
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
                md={4}
                lg={4}
                xl={4}
              >
                <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>تاريخ انتهاء العرض</label>
                  </div>

                  <input
                    
                    className="inputtext"
                    type="date"
                    value={OfferEndDate}
                    onChange={(e) => setOfferEndDate(e.target.value)}
                    required
                    placeholder="Please Enter OfferEndDate"
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
                    <label>الوصف بالعربي</label>
                  </div>

                 
                  <textarea
                     style={{ height: 70 }}
                    className="inputtext"
                    type="text"
                    value={Places_Description_ar}
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
                    <label>الوصف بالانكليزي</label>
                  </div>

                
                  <textarea
                     style={{ height: 70 }}
                    
                    className="inputtext"
                    type="text"
                    value={Places_Description_en}
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
                    <label>الوصف بالكردي</label>
                  </div>

                                     
 

                  <textarea
                     style={{ height: 70 }}
                    className="inputtext"
                    type="text"
                    value={Places_Description_ku}
                    onChange={(e) => setPlaces_Description_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_ku"
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
                <span className="lableinput">الصورة الرئيسية للعرض</span>
                <Image style={{maxHeight:"300px"}} width={"100%"} height={"100%"} src={PhotoUser.file} />

                <input
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                  multiple
                  style={{ background: "#ffeb3b", border: "1px solid black" }}
                  id="fileup"
                  hidden
                  accept="image/*"
                />
                <label className="selectfile " htmlFor="fileup">
                  اضغط هنا ليتم اختيار الصورة
                </label>
              </div>
            </Col>
          
          
          </Row>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserToPlace;

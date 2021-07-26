import { Col, Row, Image, message, Tag,Tooltip,Modal } from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import axios, { baseURLImg, IdAppCompany } from "../../utils/API.js";
import { Places,Category ,StateContry} from "../../agent";
import { useHistory } from "react-router-dom";
import { BiMessageAltAdd } from 'react-icons/bi';
import { RiArrowGoBackFill} from 'react-icons/ri';
import { AiTwotoneSave} from 'react-icons/ai';
import Cookies from "universal-cookie/es6";


const AddPlace = () => {

        const cookies = new Cookies();
    const [IdUser, setIdUser] = useState(cookies.get("userid"));

const histiry = useHistory();
const [CategoryCompany, setCategoryCompany] = useState([]);
const [StateCompany, setStateCompany] = useState([]);
  const GoToMangePlaces = (e) => {
    histiry.push("PlaceMange");
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

  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

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
  const [Places_city_ar, setPlaces_city_ar] = useState("بغداد");
  const [Places_city_en, setPlaces_city_en] = useState("Baghdad");
  const [Places_city_ku, setPlaces_city_ku] = useState("Baghdad");
  const [Places_Email, setPlaces_Email] = useState("");
  const [Places_Phone, setPlaces_Phone] = useState("");
  const [Places_Offcenter, setPlaces_Offcenter] = useState("");
  const [Places_location_ln, setPlaces_location_ln] = useState("");
  const [Places_location_lo, setPlaces_location_lo] = useState("");
  const [Places_State, setPlaces_State] = useState("Active");
  const [Catagory, setCatagory] = useState("Hotels");
  const [Places_Description_ar, setPlaces_Description_ar] = useState("");
  const [Places_Description_en, setPlaces_Description_en] = useState("");
  const [Places_Description_ku, setPlaces_Description_ku] = useState("");
  const [Places_Price, setPlaces_Price] = useState("");
  const [Places_Price_Currency, setPlaces_Price_Currency] = useState("USD");
  const [Places_Favorite, setPlaces_Favorite] = useState("No");

    const UpdateDetailsPlaceAndUpload = (file) => {
      try {
          
      
    const url = "/Places";
    const formData = new FormData();
    formData.append("Places_Image", Places_Image.file);
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

    return axios.post(url, formData);

    } catch (error) {
          console.log(error)
      }
  };


  const handleChangeImage = (event) => {
    setPlaces_Imageupload({
      file: URL.createObjectURL(event.target.files[0]),
    });

    setPlaces_Image({
      file: event.target.files[0],
    });
  };

  const [disable, setDisable] = useState(false);

  const UpdateDetailsPlace = async (e) => {
    try {
          setDisable(true)
 message.loading("loading")
     
      e.preventDefault();

      UpdateDetailsPlaceAndUpload(Places_Imageupload.file).then(
        (response) => {

          setTimeout(() => {
              message.success("Save");
           setDisable(false)
          }, 1000);
          
        setTimeout(() => {
            histiry.push("PlaceMange")
         
          }, 1500);

        }
      );
      
    
    } catch (error) {
      console.log(error)
    }
    
  };

  

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


  return (
    <div>
      <form onSubmit={(e) => UpdateDetailsPlace(e)}>
        <HeaderDashBoard Title="اضافة مكان جديد" />
       
        <div className="dashboard_main" style={{ justifyContent: "center" }}>
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
             <button  disabled={disable}   style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }} className="btnsavecompany" type="submit">
                حفظ
                <AiTwotoneSave size={20} />
              </button>

                 <Tag
               onClick={GoToMangePlaces}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                  العودة الى اعددات الاماكن
                   <RiArrowGoBackFill size={20} />
                </Tag>
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
                    <label>اسم المكان عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_name_ar}
                    onChange={(e) => setPlaces_name_ar(e.target.value)}
                    required
                    placeholder="Enter Name Place Arabic"
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
                    <label>اسم المكان بالانكليزي</label>
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
                   <label>اسم المكان بالكردي</label>
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
                    <label>تصنيف المكان/عدد النجوم</label>
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
                      <label>اسم المحافظة بالعربي</label>
                     <Tooltip placement="top" title={"اضافة محافظة جديدة"}>
                      <BiMessageAltAdd onClick={showModalState} style={{fill:"#e4560c",cursor:"pointer"}} size={20}/>
                        </Tooltip>

                          <Modal
        title="Add New Province"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add State"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم المحافظة بالعربي"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateEn}
                    onChange={(e) => setStateEn(e.target.value)}
                    required
                    placeholder="Please Enter NameState_en"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateKu}
                    onChange={(e) => setStateKu(e.target.value)}
                    required
                    placeholder="Please Enter NameState_ku"
                  />
                </div>
      </Modal>

        <Modal
        title="Add New Province"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add State"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المحافظة بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم المحافظة بالعربي"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateEn}
                    onChange={(e) => setStateEn(e.target.value)}
                    required
                    placeholder="Please Enter NameState_en"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateKu}
                    onChange={(e) => setStateKu(e.target.value)}
                    required
                    placeholder="Please Enter NameState_ku"
                  />
                </div>
      </Modal>

                      <Modal
        title="Add New Province"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add State"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المحافظة بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم المحافظة بالعربي"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateEn}
                    onChange={(e) => setStateEn(e.target.value)}
                    required
                    placeholder="Please Enter NameState_en"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>المحافظة بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateKu}
                    onChange={(e) => setStateKu(e.target.value)}
                    required
                    placeholder="Please Enter NameState_ku"
                  />
                </div>
      </Modal>
                  </div>

                    <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
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
                     <label>المحافظة بالانكليزي</label>
                     <Tooltip placement="top" title={"Add New State"}>
                      <BiMessageAltAdd onClick={showModalState} style={{fill:"#e4560c",cursor:"pointer"}} size={20}/>
                          </Tooltip>
                  </div>

                    <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
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
                    <Tooltip placement="top" title={"Wilayetek nû lê zêde bike"}>
                      <BiMessageAltAdd onClick={showModalState} style={{fill:"#e4560c",cursor:"pointer"}} size={20}/>
                          </Tooltip>

                    
                  </div>

                   <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
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
                   <label>البريد الالكتروني للمكان</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Email}
                    onChange={(e) => setPlaces_Email(e.target.value)}
                    required
                    placeholder="Please Enter Places_Email"
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
                    <label>رقم الهاتف للمكان</label>
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
                   <label>البعد عن المركز</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_Offcenter}
                    onChange={(e) => setPlaces_Offcenter(e.target.value)}
                    required
                    placeholder="Please Enter Places_Offcenter"
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
                   <label>الموقع / latitude </label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_location_ln}
                    onChange={(e) => setPlaces_location_ln(e.target.value)}
                    required
                    placeholder="Please Enter Places_location_ln"
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
                    <label>الموقع / longitude </label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Places_location_lo}
                    onChange={(e) => setPlaces_location_lo(e.target.value)}
                    required
                    placeholder="Please Enter Places_location_lo"
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
                <span className="lableinput">الصورة الرئيسية للمكان</span>
               
               <Image style={{maxHeight:"300px"}} width={"100%"} height={"100%"} src={Places_Imageupload.file} />
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
                    <label>حالة المكان</label>
                  </div>
                  <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Places_State}
                    onChange={(e) => setPlaces_State(e.target.value)}
                    required
                    placeholder="Please Enter Places_State"
                  >
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
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
                    <label>فئة المكان</label>
                        <Tooltip placement="top" title={"Add New Catagory"}>
                      <BiMessageAltAdd onClick={showModal} style={{fill:"#e4560c",cursor:"pointer"}} size={20}/>
                          </Tooltip>
                             <Modal
        title="Add New Catagory"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Add Category"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>فئة المكان</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelCategory}
                    onChange={(e) => setModelCategory(e.target.value)}
                    required
                    placeholder="Please Enter Name Category"
                  />
                </div>
      </Modal>
                  </div>
              
                <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Catagory}
                    onChange={(e) => setCatagory(e.target.value)}
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
                    <label>اضافة للمفضلة</label>
                  </div>

                  <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Places_Favorite}
                    onChange={(e) => setPlaces_Favorite(e.target.value)}
                    required
                    placeholder="Please Enter Places_Favorite"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
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
                    <label>وصف المكان بالعربي</label>
                  </div>

                  <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Places_Description_ar}
                    onChange={(e) => setPlaces_Description_ar(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_ar"
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
                    <label>وصف المكان بالانكليزي</label>
                  </div>

                  <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Places_Description_en}
                    onChange={(e) => setPlaces_Description_en(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_en"
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
                    <label>وصف المكان بالكردي</label>
                  </div>

                  <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Places_Description_ku}
                    onChange={(e) => setPlaces_Description_ku(e.target.value)}
                    required
                    placeholder="Please Enter Places_Description_ku"
                  />
                </div>
              </Col>

             

            
            </Col>
           
          </Row>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;

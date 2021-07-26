import { Col, Row, Image, message, Tag,Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import axios, { baseURLImg, IdAppCompany } from "../../utils/API.js";
import { Rooms,Category ,StateContry} from "../../agent";
import { useHistory } from "react-router-dom";
import { BiMessageAltAdd } from 'react-icons/bi';
import { RiArrowGoBackFill} from 'react-icons/ri';
import { AiTwotoneSave} from 'react-icons/ai';
import Cookies from "universal-cookie/es6";


const AddNewRoom = () => {
        const cookies = new Cookies();

const histiry = useHistory();
    const [IdUser, setIdUser] = useState(cookies.get("userid"));
const [CategoryCompany, setCategoryCompany] = useState([]);
const [StateCompany, setStateCompany] = useState([]);
  const GoToMangePlaces = (e) => {
    histiry.push("RoomManage");
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

  const [Rooms_Name_ar, setRooms_Name_ar] = useState("");
  const [Rooms_Name_en, setRooms_Name_en] = useState("");
  const [Rooms_Name_ku, setRooms_Name_ku] = useState("");
  const [Rooms_bedtype_ar, setRooms_bedtype_ar] = useState("");
  const [Rooms_bedtype_en, setRooms_bedtype_en] = useState("");
  const [Rooms_bedtype_ku, setRooms_bedtype_ku] = useState("");
  const [Rooms_Space, setRooms_Space] = useState("");
  const [Rooms_Services_ar, setRooms_Services_ar] = useState("");
  const [Rooms_Services_en, setRooms_Services_en] = useState("");
  const [Rooms_Services_ku, setRooms_Services_ku] = useState("");
  const [Rooms_priceAdult, setRooms_priceAdult] = useState("");
  const [Rooms_priceChild, setRooms_priceChild] = useState("");
  const [Price_Currency, setPrice_Currency] = useState("USD");


    const UpdateDetailsPlaceAndUpload = (file) => {
      try {
          
      Rooms.AddNewRooms(IdAppPlace,Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency)
    const url = `/Roomplace/${IdAppPlace}`;
    const formData = new FormData();
    formData.append("Rooms_Name_ar", Rooms_Name_ar);
    formData.append("Rooms_Name_en", Rooms_Name_en);
    formData.append("Rooms_Name_ku", Rooms_Name_ku);

    formData.append("Rooms_bedtype_ar", Rooms_bedtype_ar);
    formData.append("Rooms_bedtype_en", Rooms_bedtype_en);
    formData.append("Rooms_bedtype_ku", Rooms_bedtype_ku);

    formData.append("Rooms_Space", Rooms_Space);

    formData.append("Rooms_Services_ar", Rooms_Services_ar);
    formData.append("Rooms_Services_en", Rooms_Services_en);
    formData.append("Rooms_Services_ku", Rooms_Services_ku);

    formData.append("Rooms_priceAdult", Rooms_priceAdult);
    formData.append("Rooms_priceChild", Rooms_priceChild);

    formData.append("Price_Currency", Price_Currency);
   
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

      
     Rooms.AddNewRooms(IdAppPlace,Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency);
      message.success("Save");
 setDisable(false)
         } catch (error) {
      console.log(error)
       setDisable(false)
    }
  };

    const titelplace = cookies.get("titelplace")

  return (
    <div>
      <form onSubmit={(e) => UpdateDetailsPlace(e)}>
                   <HeaderDashBoard Title={`${ titelplace} / اضافة غرفة جديدة `} />

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
             <button disabled={disable}   style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }} className="btnsavecompany" type="submit">
                حفظ
                <AiTwotoneSave size={20} />
              </button>

                 <Tag
               onClick={GoToMangePlaces}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                  العودة الى اعددات الغرف
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
                    <label>اسم الغرفة عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_Name_ar}
                    onChange={(e) => setRooms_Name_ar(e.target.value)}
                    required
                    placeholder="Please Enter Rooms Name Arabic"
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
                    <label>اسم الغرفة بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_Name_en}
                    onChange={(e) => setRooms_Name_en(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Name_en"
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
                    <label>اسم الغرفة بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_Name_ku}
                    onChange={(e) => setRooms_Name_ku(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Name_ku"
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
                    <label>خدمات الغرفة بالعربي</label>
                    
                  </div>

                    
   <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Rooms_Services_ar}
                    onChange={(e) => setRooms_Services_ar(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Services_ar"
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
                    <label>خدمات الغرفة بالانكليزي</label>
                     
                  </div>
                   
   <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Rooms_Services_en}
                    onChange={(e) => setRooms_Services_en(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Services_en"
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
                  <div className="lableinput" >
                    <label>خدمات الغرفة بالكردي</label>
                

                    
                  </div>

                  <textarea
                    style={{ height: 70 }}
                    className="inputtext"
                    value={Rooms_Services_ku}
                    onChange={(e) => setRooms_Services_ku(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Services_ku"
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
                    <label>مساحة الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_Space}
                    onChange={(e) => setRooms_Space(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_Space"
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
                    <label>نوع وعدد الاسره بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_bedtype_ar}
                    onChange={(e) => setRooms_bedtype_ar(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_bedtype_ar"
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
                    <label>عدد  ونوع الاسرة بالانكليزي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_bedtype_en}
                    onChange={(e) => setRooms_bedtype_en(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_bedtype_en"
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
                    <label>عدد ونوع الاسرة بالكردي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_bedtype_ku}
                    onChange={(e) => setRooms_bedtype_ku(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_bedtype_ku"
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
                    <label>سعر البالغ</label>
                  </div>

                  <input
                    className="inputtext"
                    type="number"
                    value={Rooms_priceAdult}
                    onChange={(e) => setRooms_priceAdult(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_priceAdult"
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
                    <label>سعر الطفل</label>
                  </div>

                  <input
                    className="inputtext"
                    type="number"
                    value={Rooms_priceChild}
                    onChange={(e) => setRooms_priceChild(e.target.value)}
                    required
                    placeholder="Please Enter Rooms_priceChild"
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
                    <label>العملة</label>
                  </div>


                   <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Price_Currency}
                    onChange={(e) => setPrice_Currency(e.target.value)}
                    required
                    placeholder="Please Enter Price_Currency"
                                  >
                    <option>USD</option>
                    <option>IQD</option>
                  </select>
                </div>
              </Col>

            

             
            </Col>

         
           
          </Row>
        </div>
      </form>
    </div>
  );
};

export default AddNewRoom;

import { Col, Row, message, Tag,Modal } from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import axios, {  IdAppCompany } from "../../utils/API.js";
import { Rooms,Category ,StateContry} from "../../agent";
import { useHistory } from "react-router-dom";
import { AiTwotoneSave} from 'react-icons/ai';
import { RiArrowGoBackFill,RiChatDeleteFill,RiImageFill} from 'react-icons/ri';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Cookies from "universal-cookie";


const UpdateRoom = () => {
         const cookies = new Cookies();

const histiry = useHistory();
  const [IdUser, setIdUser] = useState(cookies.get("userid"));
const [CategoryCompany, setCategoryCompany] = useState([]);
const [StateCompany, setStateCompany] = useState([]);
  const GoToMangePlaces = (e) => {
    histiry.push("RoomManage");
  };

  const GoToImageRoom = (e) => {
    histiry.push("ImageRoom");
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

    const [Rooms_ID, setRooms_ID] = useState(
    cookies.get("Rooms_ID")
  );

  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

    
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



  useEffect(() => {
    const GetDataPlaces = async (IdAppPlace,Rooms_ID) => {
      const dataPlace = await Rooms.GetOneRooms(IdAppPlace,Rooms_ID);
      setRooms_Name_ar(dataPlace.data.data[0].Rooms_Name_ar);
      setRooms_Name_en(dataPlace.data.data[0].Rooms_Name_en);
      setRooms_Name_ku(dataPlace.data.data[0].Rooms_Name_ku);

      setRooms_bedtype_ar(dataPlace.data.data[0].Rooms_bedtype_ar);
      setRooms_bedtype_en(dataPlace.data.data[0].Rooms_bedtype_en);
      setRooms_bedtype_ku(dataPlace.data.data[0].Rooms_bedtype_ku);

      setRooms_Space(dataPlace.data.data[0].Rooms_Space);

      setRooms_Services_ar(dataPlace.data.data[0].Rooms_Services_ar);
      setRooms_Services_en(dataPlace.data.data[0].Rooms_Services_en);
      setRooms_Services_ku(dataPlace.data.data[0].Rooms_Services_ku);

      setRooms_priceAdult(dataPlace.data.data[0].Rooms_priceAdult);
      setRooms_priceChild(dataPlace.data.data[0].Rooms_priceChild);

      setPrice_Currency(dataPlace.data.data[0].Price_Currency);
     
    };

    GetDataPlaces(IdAppPlace,Rooms_ID);
  }, [IdAppPlace,Rooms_ID]);

  

  const UpdateDetailsPlace = async (e) => {

    try {
        
    e.preventDefault();

      
     Rooms.UpdateRooms(IdAppPlace,Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_ID);
      message.success("Update");

         } catch (error) {
        console.log(error)
    }
  };

  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه الغرفة ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete(`/Roomplace/${IdAppPlace}`, {
            data: {
              "Rooms_ID":Rooms_ID
            }
            
          });
         
          
          setTimeout(async() => {
               
             histiry.push("RoomManage");
          }, 1000);
     

      // window.location.reload(false);

            
             
           
        },
        onCancel() {
         
        },
         
      });
       
    },1000);
  
      
   
  }


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
               onClick={GoToImageRoom}
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="blue"
            >
              
                  ادارة صور الغرفة
                    <RiImageFill size={20} style={{margin:"0 5px 0 0"}}/>
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
                 الرجوع الى اعدادت الغرف
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
                    <label>اسم الغرفة عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Rooms_Name_ar}
                    onChange={(e) => setRooms_Name_ar(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم الغرفة بالعربي "
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
                    <label>Rooms_Name_en</label>
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
                    <label>Rooms_Name_ku</label>
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
                    <label>Rooms_Services_ar</label>
                    
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
                    <label>Rooms_Services_en</label>
                     
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
                  <div className="lableinput">
                    <label>Rooms_Space</label>
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
                  <div className="lableinput" >
                    <label>Rooms_Services_ku</label>
                

                    
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
                    <label>Rooms_bedtype_ar</label>
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
                    <label>Rooms_bedtype_en</label>
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
                    <label>Rooms_bedtype_ku</label>
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
                    <label>Rooms_priceAdult</label>
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
                    <label>Rooms_priceChild</label>
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
                    <label>Price_Currency</label>
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

export default UpdateRoom;

import { Col, Row, Image, message, Spin, Tag ,Modal,Tooltip,Checkbox, Divider} from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import axios, { baseURLImg, IdAppCompany } from "../../utils/API.js";
import { Places,Category,StateContry } from "../../agent";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BiMessageAltAdd } from 'react-icons/bi';
import { MdRateReview } from 'react-icons/md';
import { RiChatDeleteFill ,RiArrowGoBackFill} from 'react-icons/ri';
import { AiTwotoneSave,AiOutlineDollarCircle} from 'react-icons/ai';
import { FaUserCheck,FaServicestack,FaRestroom,FaShoppingBag,FaImages,FaAddressCard} from 'react-icons/fa';

import { IoNotifications} from 'react-icons/io5';
import Cookies from "universal-cookie/es6";


const AddUserToPlace = () => {

    const cookies = new Cookies();

    const CatPlace = cookies.get("usercat");

  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  
    const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

  function destroyAll() {
  Modal.destroyAll();
}

  const [Places_Imageupload, setPlaces_Imageupload] = useState({
    file: window.location.origin + "/img/Noimage.jpg",
  });
 
  
const history = useHistory();

  
    const [CategoryCompany, setCategoryCompany] = useState([]);
    const [StateCompany, setStateCompany] = useState([]);

    const GoToMangePlaces = (e) => {
    history.push("ManageUserInPlace");
  };

    useEffect(() => {
        const Categoryaasync = async () => {
            const datacat = await Category.GetAllCategory(IdAppCompany)
            setCategoryCompany(datacat.data.data[0].CategoryPlaces);
        }

       

        Categoryaasync();
      
    }, [])



  const [Places_Image, setPlaces_Image] = useState({ file: "" });

  const [PhotoUser, setPhotoUser] = useState({
   file: window.location.origin + "/img/Noimage.jpg",
  });



  const [FirstNameUser, setFirstNameUser] = useState("");
  const [LastNameUser, setLastNameUser] = useState("");
  const [Email, setEmail] = useState("");
  const [Passowrd, setPassowrd] = useState("");
  const [Address, setAddress] = useState("");
  const [Role, setRole] = useState("Admin");
  const [Phone, setPhone] = useState("");
  const [TypeUser, setTypeUser] = useState(CatPlace);
  const [state, setstate] = useState("Active");
  const [UserPermissions, setUserPermissions] = useState({
                "read": "true",
                "add": "true",
                "update": "true",
                "delete": "true"
            });

  const UpdateDetailsPlaceAndUpload = (file) => {
    const url = "/users";
    const formData = new FormData();
    formData.append("PhotoUser", Places_Image.file);
    formData.append("IdApp", IdAppPlace);

    formData.append("FirstNameUser", FirstNameUser);
    formData.append("LastNameUser", LastNameUser);
    formData.append("Email", Email);
    formData.append("Phone", Phone);
    formData.append("Passowrd", Passowrd);
    formData.append("Address", Address);
    formData.append("Role", Role);
    formData.append("TypeUser", TypeUser);
    formData.append("state", state);
     formData.append("IdUser", IdUser);

   
    formData.append("UserPermissions",JSON.stringify(UserPermissions));
    return axios.post(url, formData);
  };

  const handleChangeImage = (event) => {
    setPhotoUser({
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
      if (PhotoUser.file === "") {
        message.error("error");
                     setDisable(false)

    } else {
      e.preventDefault();

        const response = await UpdateDetailsPlaceAndUpload(PhotoUser.file)
        if (response.status===200) {
          message.success("Save");
                       setDisable(false)

        }
        else {
          message.warning(response.data.message);
                       setDisable(false)

        }
     
    }
    } catch (error) {
      console.log(error)
    }
    
  };


//  const [UserPermissions, setUserPermissions] = useState([{read:true,update:true,delete:true,add:true}]);

    //check box auth
    const OnchangeRead = (e) => {
        setUserPermissions({...UserPermissions, read: e })
    }

    const OnchangeDealte = (e) => {
        setUserPermissions({...UserPermissions, delete: e })
    }

    const OnchangeUpdate = (e) => {
        setUserPermissions({...UserPermissions, update: e })
    }

    const OnchangeAdd = (e) => {
        setUserPermissions({...UserPermissions, add: e })
    }

  return (
        <div >
      <form onSubmit={(e) => UpdateDetailsPlace(e)}>
        <HeaderDashBoard Title="اضافة مستخدم جديد الى المكان" />
        
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
               onClick={GoToMangePlaces}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                 الرجوع الى اعدادت المستخدمين
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
                    <label>الاسم الاول</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={FirstNameUser}
                    onChange={(e) => setFirstNameUser(e.target.value)}
                    required
                    placeholder="ُEnter FirstNameUser"
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
                    <label>الاسم الاخير</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={LastNameUser}
                    onChange={(e) => setLastNameUser(e.target.value)}
                    required
                    placeholder="Please Enter LastNameUser"
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
                    <label>البريد الالكتروني</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Please Enter Email"
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
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Please Enter Phone"
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
                    <label>كلمة المرو</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Passowrd}
                    onChange={(e) => setPassowrd(e.target.value)}
                    required
                    placeholder="Please Enter Password"
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
                    <label>العنوان</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Please Enter Address"
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
                    <label>صلاحية المستخدم</label>
                  </div>

                   <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    placeholder="Please Enter Role User"
                  >
                    <option>Admin</option>
                    <option>User</option>
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
                    <label>نوع المستخدم</label>
                  </div>
                     <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={TypeUser}
                    onChange={(e) => setTypeUser(e.target.value)}
                    required
                    placeholder="Please Enter TypeUser"
                  >
                                      <option>{CatPlace}</option>
                
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
                    <label>حالة المستخدم</label>
                  </div>
                  <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                    required
                    placeholder="Please Enter state"
                  >
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
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
                <span className="lableinput">صورة المستخدم</span>
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
            <Col
              style={{
                padding: "10px 15px",
                textAlign: "center",
                display: "flex",
                              alignItems: "flex-start",
                flexDirection:"column"
                
              }}
              xs={24}
              md={24}
              lg={18}
              xl={20}
            >
            <div style={{ margin:"0 0 15px 0" }}>صلاحيات المستخدم</div>
                          <div>
                              
          
                  <Checkbox checked={UserPermissions.read} onChange={(e)=>OnchangeRead(e.target.checked)}>قراءة</Checkbox>
                   <Checkbox checked={UserPermissions.delete} onChange={(e)=>OnchangeDealte(e.target.checked)}>حذف</Checkbox>
                          <Checkbox checked={UserPermissions.update} onChange={(e) => OnchangeUpdate(e.target.checked)}>تعديل</Checkbox>
                           <Checkbox checked={UserPermissions.add} onChange={(e)=>OnchangeAdd(e.target.checked)}>اضافة</Checkbox>
                             </div>
            </Col>
          
          </Row>
        </div>
      </form>
    </div>
  );
};

export default AddUserToPlace;

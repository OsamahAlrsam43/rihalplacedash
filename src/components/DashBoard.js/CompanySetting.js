import { Col, Row, Image, message , Tag} from "antd";
import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { CompanySet } from "../../agent";
import axios, { baseURLImg, IdAppCompany } from "../../utils/API.js";
import { RiGovernmentFill} from 'react-icons/ri';
import { AiTwotoneSave } from 'react-icons/ai';
import { GrDuplicate,GrContact} from 'react-icons/gr';
import { useHistory } from "react-router-dom";

import { FaUsersCog } from 'react-icons/fa';
import { ImMenu3 } from 'react-icons/im';
import Cookies from "universal-cookie";


const CompanySetting = () => {

      const cookies = new Cookies();

   const history = useHistory();
  const GoToProvince = (e) => {
    history.push("ProvinceManage");
  };

   const GoToCategory = (e) => {
    history.push("Category");
  };

  const GoToContact = (e) => {
    history.push("ContactMange");
  };
  const GoToAdminManage = (e) => {
    history.push("AdminManage");
  };
  
  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const [imagepath, setimagepath] = useState({ file: "" });

  const [imagepathupload, setimagepathupload] = useState({
    file: window.location.origin + "/img/Noimage.jpg",
  });
  const [NameCompany_ar, setNameCompany_ar] = useState("");
  const [NameCompany_en, setNameCompany_en] = useState("");
  const [NameCompany_ku, setNameCompany_ku] = useState("");

  const [email1, setemail1] = useState("");
  const [email2, setemail2] = useState("");
  const [email3, setemail3] = useState("");

  const [phone1, setphone1] = useState("");
  const [phone2, setphone2] = useState("");
  const [phone3, setphone3] = useState("");

  const [address_ar, setaddress_ar] = useState("");
  const [address_en, setaddress_en] = useState("");
  const [address_ku, setaddress_ku] = useState("");

  const [Description_ar, setDescription_ar] = useState("");
  const [Description_en, setDescription_en] = useState("");
  const [Description_ku, setDescription_ku] = useState("");

  const SaveCompany = async (e) => {
    try {
      e.preventDefault();

      const savedata = await CompanySet.SaveCompany(
        NameCompany_ar,
        NameCompany_en,
        NameCompany_ku,
        imagepathupload.file,
        email1,
        email2,
        email3,
        phone1,
        phone2,
        phone3,
        address_ar,
        address_en,
        address_ku,
        Description_ar,
        Description_en,
        Description_ku,
        IdUser,
        IdAppCompany
      );

      if (savedata.status === 200) {
        message.success("Save");
      }
    } catch (error) {
      //console.log(error);
      message.error(error);
    }
  };

  //console.log(imagepath.file)

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const fileUpload = (file) => {
    const url = "/Company/";
    const formData = new FormData();
    formData.append("IdUser", IdUser);

    formData.append("imglogo", imagepath.file);
    formData.append("IdApp", IdAppCompany);

    formData.append("NameCompany_ar", NameCompany_ar);
    formData.append("NameCompany_en", NameCompany_en);
    formData.append("NameCompany_ku", NameCompany_ku);

    formData.append("Email", email1);
    formData.append("Email2", email2);
    formData.append("Email3", email3);

    formData.append("Phone1", phone1);
    formData.append("Phone2", phone2);
    formData.append("Phone3", phone3);

    formData.append("Address_ar", address_ar);
    formData.append("Address_en", address_en);
    formData.append("Address_ku", address_ku);

    formData.append("Company_Description_ar", Description_ar);
    formData.append("Company_Description_en", Description_en);
    formData.append("Company_Description_ku", Description_ku);

    return axios.put(url, formData);
  };

  const handleChangeImage = (event) => {
    setimagepathupload({
      file: URL.createObjectURL(event.target.files[0]),
    });

    setimagepath({
      file: event.target.files[0],
    });
  };

  const upload = async (e) => {
    if (imagepathupload.file === "") {
      message.error("error");
    } else {
      e.preventDefault();

      fileUpload(imagepathupload.file).then((response) => {console.log(response)});
      message.success("Save");
    }
  };

  useEffect(() => {
    const getdatacompany = async (IdUser) => {
      const dataComapany = await CompanySet.GetDetailsCompanyBiId(
        IdAppCompany,
        IdUser
      );
      setNameCompany_ar(dataComapany.data.data[0].NameCompany_ar);
      setNameCompany_en(dataComapany.data.data[0].NameCompany_en);
      setNameCompany_ku(dataComapany.data.data[0].NameCompany_ku);

      setemail1(dataComapany.data.data[0].Email);
      setemail2(dataComapany.data.data[0].Email2);
      setemail3(dataComapany.data.data[0].Email3);

      setphone1(dataComapany.data.data[0].Phone1);
      setphone2(dataComapany.data.data[0].Phone2);
      setphone3(dataComapany.data.data[0].Phone3);

      setaddress_ar(dataComapany.data.data[0].Address_ar);
      setaddress_en(dataComapany.data.data[0].Address_en);
      setaddress_ku(dataComapany.data.data[0].Address_ku);

      setDescription_ar(dataComapany.data.data[0].Company_Description_ar);
      setDescription_en(dataComapany.data.data[0].Company_Description_en);
      setDescription_ku(dataComapany.data.data[0].Company_Description_ku);
      setimagepathupload({
        file: `${baseURLImg}${dataComapany.data.data[0].Logo}`,
      });
      setimagepath({ file: `${baseURLImg}${dataComapany.data.data[0].Logo}` });
    };

    getdatacompany(IdUser);
  }, [IdUser]);

    const [menuemobail, setmenuemobail] = useState(false);

  return (
    <div>
      <form onSubmit={(e) => upload(e)}>
        <HeaderDashBoard Title="اعدادات الشركة" />
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

                <div className="menu" onClick={()=>setmenuemobail(!menuemobail)}><ImMenu3 style={{margin:"0 5px 0 5px"}} size={30} /> اضغط هنا لفتح القائمة</div>

                <div className={menuemobail?"tagmobail":"tagmobailnone"}>
                   
              <Tag
             
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="red"
                onClick={GoToAdminManage}
            >
              
                  ادارة المستخدمين
                    <FaUsersCog size={20} />
                </Tag>

 <Tag
             
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="blue"
                onClick={GoToContact}
            >
              
                  Contact Management
                    <GrContact size={20} />
                </Tag>
                
               <Tag
             
                             style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}

              className="Tagclass"
              color="default"
                onClick={GoToCategory}
            >
              
                 ادارة مجاميع الاصناف
                    <GrDuplicate size={20} />
            </Tag>

              <Tag
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
                  color="green"
                  onClick={GoToProvince}
            >
                  ادارة المحافظات
                  <RiGovernmentFill size={20} />
                </Tag>
              
                </div>
              
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
                    <label>اسم الشركة عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={NameCompany_ar}
                    onChange={(e) => setNameCompany_ar(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم الشركة بالعربي "
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
                    <label>Name Company En</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={NameCompany_en}
                    onChange={(e) => setNameCompany_en(e.target.value)}
                    required
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
                    <label>Name Company Ku</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={NameCompany_ku}
                    onChange={(e) => setNameCompany_ku(e.target.value)}
                    required
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
                    <label>Email 1</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={email1}
                    onChange={(e) => setemail1(e.target.value)}
                    required
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
                    <label>Email 2</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={email2}
                    onChange={(e) => setemail2(e.target.value)}
                    required
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
                    <label>Email 3</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={email3}
                    onChange={(e) => setemail3(e.target.value)}
                    required
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
                    <label>Phone 1</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={phone1}
                    onChange={(e) => setphone1(e.target.value)}
                    required
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
                    <label>Phone 2</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={phone2}
                    onChange={(e) => setphone2(e.target.value)}
                    required
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
                    <label>Phone 3</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={phone3}
                    onChange={(e) => setphone3(e.target.value)}
                    required
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
                    <label>العنوان عربي</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={address_ar}
                    onChange={(e) => setaddress_ar(e.target.value)}
                    required
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
                    <label>Address En</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={address_en}
                    onChange={(e) => setaddress_en(e.target.value)}
                    required
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
                    <label>Address ku</label>
                  </div>

                  <input
                    className="inputtext"
                    type="text"
                    value={address_ku}
                    onChange={(e) => setaddress_ku(e.target.value)}
                    required
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
                <span className="lableinput">Logo</span>
                <Image width={"100%"} src={imagepathupload.file} />

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
                    <label>وصف الشركة عربي</label>
                  </div>

                  <textarea
                    style={{ height: 80 }}
                    className="inputtext"
                    type="text"
                    value={Description_ar}
                    onChange={(e) => setDescription_ar(e.target.value)}
                    required
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
                    <label>Company Description En</label>
                  </div>

                  <textarea
                    style={{ height: 80 }}
                    className="inputtext"
                    type="text"
                    value={Description_en}
                    onChange={(e) => setDescription_en(e.target.value)}
                    required
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
                    <label>Company Description ku</label>
                  </div>
                  <textarea
                    style={{ height: 80 }}
                    className="inputtext"
                    type="text"
                    value={Description_ku}
                    onChange={(e) => setDescription_ku(e.target.value)}
                    required
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

export default CompanySetting;

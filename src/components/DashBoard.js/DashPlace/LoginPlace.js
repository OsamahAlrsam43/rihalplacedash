import React, { useEffect, useState } from "react";
import { Col, Row, Input, message, Spin ,Button} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "../../../utils/API";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginPlace = () => {
  // Encrypt
  var CryptoJS = require("crypto-js");

  const cookies = new Cookies();

  const [PhoneUser, setPhoneUser] = useState("");
  const [PassUser, setPassUser] = useState("");
  const history = useHistory();

  function getRandomString(length) {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
  const isAuthenticated = cookies.get("isAuthenticated");
  
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated==="true") {
      history.push("DashUserPlace");
      window.location.reload(false);
    } else {
      history.push("LoginPlace");
    }
  }, []);

  

  const LoginUser = async (e) => {
    try {
      e.preventDefault();
      if (PhoneUser === "") {
        message.info("رقم الهاتف مطلوب");
      } else if (PassUser === "") {
        message.info("كلمة المرور مطلوبة");
      } else {
        const res = await axios.post(`/users/login`, {
          Phone: PhoneUser,
          Password: PassUser,
        });

        if (res.status !== 200) {
          message.error(res.data.message);
        } else if (res.data.TypeUser === "user") {
          message.error("لا تمتلك صلاحية الدخول ");
            setTimeout(() => {
                window.location.reload(false);
            }, 300);
        } else {
         // setLoading(true);
         enterLoading(0)
          // message.loading("Loading");
          if (res.data.TypeUser !== "SuperAdmin") {

            setTimeout(() => {
             
              cookies.set("isAuthenticated", true);
              var ciphertext = CryptoJS.AES.encrypt(
                JSON.stringify(getRandomString(100) + res.data.token),
                "cscode2021"
              ).toString();

              cookies.set("token", ciphertext);
              cookies.set("IdAppPlace", res.data.IdApp);
              cookies.set("userid", res.data.IdUser);
              cookies.set("PhotoUser", res.data.PhotoUser);
              cookies.set("Phone", res.data.Phone);
              cookies.set("NameUser", res.data.NameUser);
              history.push("DashUserPlace");
              localStorage.setItem("indexclass",0)

             // setLoading(false);
              window.location.reload(false);

            }, 300);
          } else {
            message.error("لا تمتلك صلاحية الدخول ");
            setTimeout(() => {
                window.location.reload(false);
            }, 300);
          }
        }
      }
    } catch (error) {
      message.error(error);
    }
  };

  const [state, setState] = useState({
    loadings: [],
  })
   const enterLoading = (index)=> {

    setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;
        return {
          loadings: newLoadings,
           
        };
      
      });

          

      
    }, 200);
  };

  const { loadings } = state;
  

  return (
    <div>
      {Loading && (
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

      <Row style={{ height: "100vh" }}>
        <Col
          style={{
            padding: 15,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          xs={24}
          md={24}
          lg={24}
          xl={24}
        >
          <form className="_6luv" onSubmit={(e) => LoginUser(e)}>
            <img
              width={"50%"}
              src={window.location.origin + "/img/logorehal.png"}
              alt="Rehal"
            />
            <h3 className="prehal">
              رحال هو اول دليل سياحي داخل العراق يمكنك من خلاله حجز الفنادق و
              مشاهدة عروض الشركات السياحية و معرفة المناطق السياحية و الاثرية
              داخل العراق
            </h3>
            <input
              className="inputtextlogin"
              type="number"
              placeholder="رقم الهاتف"
              value={PhoneUser}
              onChange={(e) => setPhoneUser(e.target.value)}
            />

            <Input.Password
              value={PassUser}
              onChange={(e) => setPassUser(e.target.value)}
              placeholder="كلمة المرور"
              style={{
                boxShadow: "0 2px 6px 0 #d4cfcf",
                padding: "8px 5px",
                border: "solid rgb(11 173 65)",
                width: "95%",
                borderWidth: "1px 1px 1px 9px",
                fontWeight: "700",
                outline: "none",
                textaLign: "center",
                marginTop: "10px",
              }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />

            <Button style={{ background: "linear-gradient(45deg,rgb(11 173 65), rgb(32, 159, 216))", height: 40, fontSize: 16, fontWeight: 700 }} className="_55r1 _6lth" type="primary" htmlType="submit" loading={loadings[0]}
            >
           تسجيل الدخول
            </Button>
            
          
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPlace;

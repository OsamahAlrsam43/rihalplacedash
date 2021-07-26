import React, { useEffect, useState } from "react";
import "./styledashboardplace.scss";
import { useHistory } from "react-router-dom";
import SideBarDashboradPlace from "./SideBarDashboradPlace";

import { AiFillSetting, AiFillNotification } from "react-icons/ai";
import { MdLocalOffer,MdNotificationsActive } from "react-icons/md";
import {  FaUsersCog } from "react-icons/fa";
import {BsFillHouseFill} from "react-icons/bs";
import { CgMenuRight } from 'react-icons/cg';
import { SearchOutlined } from "@ant-design/icons";


import Cookies from "universal-cookie/es6";
import {
  Places,
  Offer,
  NotiFiction,
  NotiFictionUser,
  Users,
  AuthUser,
} from "../../agent";
import axios, { baseURLImg } from "../../utils/API";
import { Avatar, Badge,Popover,Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message,Select,Image} from "antd";
import Highlighter from "react-highlight-words";

import { UserOutlined } from '@ant-design/icons';
import HeaderDashBoard from "./HeaderDashBoard";
import { Line,Bar} from 'react-chartjs-2';
import moment from "moment";

const DashboradPlace = ({ Title }) => {
    
    //Table

       const FORMAT = "YYYY ddd MMM DD HH:mm";

  const data = [];
  const data1 = [];

  const [dataProvince, setdataProvince] = useState([]);
  const [dataProvince1, setdataProvince1] = useState([]);

  useEffect(() => {
    try {
       Users.GetAllPostUser().then((res) => setdataProvince(res.data.data));
         Users.GetAllReservation().then((res) => setdataProvince1(res.data.data));
    } catch (error) {
      
    }
    
  },[]);



   if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      UserNameAddPost: "",
      UserIdAddPost: "",
      Post_Object: "",
      Post_Date: "",
      Post_Image: "",
      Post_Like: [],
      Posts_Comment: []
        
    
    })
  }
  else {
    dataProvince.map((res, i) =>
      data.push({
     
      
        key: res.Post_ID,
        //no:  i + 1,
        UserNameAddPost: res.UserNameAddPost,
        UserIdAddPost: res.UserIdAddPost,
        Post_Object: res.Post_Object,
        Post_Date: moment(res.Post_Date).format(FORMAT),
        Post_Image: `${baseURLImg}${res.Post_Image}`,
        Post_Like: res.Post_Like.length,
        Posts_Comment: res.Posts_Comment.length,
        Post_Like1: res.Post_Like,
        Posts_Comment1: res.Posts_Comment,
      })
    );
  }
    

   if (dataProvince1.length < 0) {
    data1.push({
      key: "0",
      no: "0",
      Places_Name: "",
      IdApp: "",
      username: "",
      Date_Dep: "",
     createdAt:"",
      Date_Arr: "",
        Rooms_Name: "",
        Night_No: "",
        ReservationState:""
    })
  }
  else {
    dataProvince1.map((res, i) =>
      data1.push({
     
      
        key: res.IdUser,
        //no: i+1,
        Places_Name: res.Places_Name,
        IdApp: res.IdApp,
        username: res.username,
        Date_Dep: res.Date_Dep,
        createdAt: moment(res.createdAt).format(FORMAT),
        Date_Arr: res.Date_Arr,
        Rooms_Name: res.Rooms_Name,
        Night_No: res.Night_No,
        ReservationState:res.ReservationState
        
      })
    );
    }
    
  
    const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      searchInput,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {}}
          Provinceholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  
   //Model Add State

  const [visibleState, setVisibleState] = useState(false);
  const [confirmLoadingState, setConfirmLoadingState] = useState(false);
  const [modalTexStatet, setModalTextState] = useState('Content of the modal');
  const [ModelStateAr, setStateAr] = useState('');
  const [ModelStateEn, setStateEn] = useState('');
  const [ModelStateKu, setStateKu] = useState('');


  const GoToAddUser = () => {
    history.push("AddUserToPlace");
   

  };


  const handleCancelState = () => {
    setVisibleState(false);
  };


    //Model Update State

  const [visibleState2, setVisibleState2] = useState(false);
  const [confirmLoadingState2, setConfirmLoadingState2] = useState(false);
  const [modalTexStatet2, setModalTextState2] = useState('Content of the modal');
  const [ModelStateAr2, setStateAr2] = useState('');
  const [ModelStateEn2, setStateEn2] = useState('');
  const [ModelStateKu2, setStateKu2] = useState('');
  const [State_ID, setState_ID] = useState('');



 


  const handleCancelState2 = () => {
    setVisibleState2(false);
  };


  const UpdateState = (e) => {
    cookies.set("IdUserReservation",e.key)
    cookies.set("titeusername",e.username)

    
        history.push("ReservationUser");

  };

  const [datalike, setdatalike] = useState([[{ UserName: "", DateLike: "",UserNameAddComment:"",Comment_Object:"" }]])

  const GetLikePost = (e) => {
    setdatalike(data.filter(ref => ref.key === e.key).map(res => res.Post_Like1))
    setVisibleState(true)
  }
 const GetCommentPost = (e) => {
    setdatalike(data.filter(ref => ref.key === e.key).map(res => res.Posts_Comment1))
    setVisibleState2(true)
  }


 const columns = [
   
     
   {
      title: "اسم المستخدم",
      dataIndex: "UserNameAddPost",
      key: "UserNameAddPost",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("UserNameAddPost"),
    },
    {
      title: "الموضوع",
      dataIndex: "Post_Object",
      key: "Post_Object",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Object"),
    },
    {
      title: "تاريخ النشر",
      dataIndex: "Post_Date",
      key: "Post_Date",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Date"),
    },
    {
      title: "عدد Like",
      dataIndex: "Post_Like",
      key: "Post_Like",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Like"),
    },
     {
      title: "عدد Comment",
      dataIndex: "Posts_Comment",
      key: "Posts_Comment",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Posts_Comment"),
    }
    ,
      {
      title: "الصورة",
      dataIndex: "Post_Image",
      key: "Post_Image",

      render: (text, record) => (
        <div style={{ display: "flex" }}>
            <Image style={{ maxHeight: "300px" }} width={"50px"} height={"50px"}
                  src={text} />
      
          </div>
      ),
    },
    {
      title: "Manage",
      dataIndex: "Post_Image",
      key: "Post_Image",

      render: (text, record) => (
        <div style={{ display: "flex" }}>
       
        <div className="divwsel" onClick={() => GetLikePost(record)}>
          <Tag color="blue">Like Details</Tag>
        </div>
       
              <div className="divwsel" onClick={() => GetCommentPost(record)}>
          <Tag color="green">Comment Details</Tag>
          </div>

      
          </div>
      ),
    },
  ];

    
    const columns1 = [
   
    {
      title: "المستخدم",
      dataIndex: "username",
      key: "username",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("username"),
    },
   {
      title: "نوع الحجز",
      dataIndex: "Rooms_Name",
      key: "Rooms_Name",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Name"),
        },
    {
      title: "تاريخ الدخول",
      dataIndex: "Date_Dep",
      key: "Date_Dep",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Date_Dep"),
        },
     {
      title: "تاريخ الخروج",
      dataIndex: "Date_Arr",
      key: "Date_Arr",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Date_Arr"),
      },
     {
      title: "عدد الليالي",
      dataIndex: "Night_No",
      key: "Night_No",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Night_No"),
    },
    {
      title: "تاريخ الحجز",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "حالة الحجز",
      dataIndex: "ReservationState",
      key: "ReservationState",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("ReservationState"),
    },
     {
      title: "Manage",
      dataIndex: "ReservationState",
      key: "ReservationState",

      render: (Status, record) => (
        <div style={{ display: "flex" }}>
        

          <div className="divwsel" onClick={() => UpdateState(record)}>
            <Tag color="blue">Details</Tag>
          </div>
        </div>
      ),
    },
    
  ];

    
    //chart
    /*
    const data1 = {
  labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Total User',
      data: [12, 19, 3, 5, 2, 3,50],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options1 = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

*/
    ///
  const cookies = new Cookies();

  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const [IdAppPlace, setIdAppPlace] = useState(cookies.get("IdAppPlace"));
  const isAuthenticated = cookies.get("isAuthenticated");

  const [PlaceLength, setPlaceLength] = useState(0);
  const [OfferLength, setOfferLength] = useState(0);

  const [UserLength, setUserLength] = useState(0);
  const [NotiPlaceLength, setNotiPlaceLength] = useState(0);
  const [NotiUserLengh, setNotiUserLengh] = useState(0);

  useEffect(() => {
    const authuserstoken = async () => {
      try {

          if(isAuthenticated==="true")
          {

          
        const res = await axios.post("/auth");
              if (res.status === 203) {
                  cookies.set("isAuthenticated", false);
                  setTimeout(() => {
                      history.push("LoginAdmin");
                      window.location.reload(false);
                  }, 500);
              } else {
                  Places.GetAllPlace().then((res) =>
                      setPlaceLength(res.data.data.length)
                  );
                  Offer.GetAllOffer().then((res) =>
                      setOfferLength(res.data.data.length)
                  );

                  Users.getAll(IdUser).then((res) =>
                      setUserLength(res.data.data.length)
                  );
                  NotiFiction.GetNotiAllPlace().then((res) =>
                      setNotiPlaceLength(res.data.data.length)
                  );
                  NotiFictionUser.GetNotiAllPlace().then((res) =>
                      setNotiUserLengh(res.data.data.length)
                  );
              }
            

            
              
              
        }

          else {
               history.push("LoginAdmin");
              }
      } catch (error) {
        console.log(error);
      }
    };

    authuserstoken();
  }, []);

  const history = useHistory();
  const GoToCompanySetting = () => {
    history.push("CompanySetting");
    window.location.reload(false);
  };

  const GoToOfferPlace = () => {
    history.push("OfferPlaceMange");
    window.location.reload(false);
  };

  const GoToManageAllUser = () => {
    history.push("ManageAllUser");
    window.location.reload(false);
  };

  const GoToNotiFictionPlace = () => {
    history.push("NotiPlaceMamange");
    window.location.reload(false);
  };
  const GoToNotiFictionUsers = () => {
    history.push("NotiUsersMange");
    window.location.reload(false);
  };

  const GoToplaceSetting = () => {
    history.push("PlaceMange");
    window.location.reload(false);
    };
    


    
  return (
    <div className="Main_Dash_Admin">
      <div className="SideBar_Dash_Admin">
              <SideBarDashboradPlace />
      </div>
      <div className="Body_Dash_Admin">
              <HeaderDashBoard />
              

             
              
              <div className="BoddyBody_Dash_Admin">
                  
                   
            
                  
                  <div className="boxmaindashplace">

               
                      
            <div
              className="dashboard_main_card boxmain_dashplace main"
              onClick={GoToCompanySetting}
            >
              <div className="divmain_dashplace">
                <AiFillSetting size={20} />
                <span>الاعدادت الشركة</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                1
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>المعلومات</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>الفئات</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>المحافظات</h5>
              </div>
            </div>
          </div>

          <div className="boxmaindashplace">
            <div
              className="dashboard_main_card boxmain_dashplace amaken"
              onClick={GoToplaceSetting}
            >
              <div className="divmain_dashplace">
                <MdLocalOffer size={20} />
                <span>أدارة الأماكن</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                {PlaceLength}
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>الفنادق</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>الشركات</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>المنازل</h5>
              </div>
            </div>
          </div>

          <div className="boxmaindashplace">
            <div
              className="dashboard_main_card boxmain_dashplace offerbox"
              onClick={GoToOfferPlace}
            >
              <div className="divmain_dashplace">
                <MdLocalOffer size={20} />
                <span>أدارة العروض</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                {OfferLength}
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>الفنادق</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>الشركات</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>المنازل</h5>
              </div>
            </div>
          </div>

          <div className="boxmaindashplace">
            <div
              className="dashboard_main_card boxmain_dashplace usersmain"
              onClick={GoToManageAllUser}
            >
              <div className="divmain_dashplace">
                <FaUsersCog size={20} />
                <span>أدارة المستخدمين</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                {UserLength}
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>المعلومات</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>الحجوزات</h5>
              </div>
            </div>
          </div>

          <div className="boxmaindashplace">
            <div
              className="dashboard_main_card boxmain_dashplace notimain"
              onClick={GoToNotiFictionPlace}
            >
              <div className="divmain_dashplace">
                <AiFillNotification size={20} />
                <span>اشعارات الاماكن</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                {NotiPlaceLength}
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>فنادق</h5>
                <h5 style={{ color: "#e6e6e6e3" }}>الاماكن</h5>
              </div>
            </div>
          </div>

          <div className="boxmaindashplace">
            <div
              className="dashboard_main_card boxmain_dashplace notimainuser"
              onClick={GoToNotiFictionUsers}
            >
              <div className="divmain_dashplace">
                <AiFillNotification size={20} />
                <span>اشعار المستخدم</span>
              </div>
              <div style={{ fontSize: 15, color: "#ffffff8a", marginTop: 10 }}>
                {NotiUserLengh}
              </div>
              <div className="boaxlight_dashplace">
                <h5 style={{ color: "#e6e6e6e3" }}>اشعار المستخدمين</h5>
              </div>
            </div>
                  </div>
                  <div className="chartone" style={{width:"95%",marginTop:10,overflow:"auto"}}>
                              <h5>حجوزات المستخدمين</h5>    
        <Table
            locale
            bordered
            columns={columns1}
            dataSource={data1.reverse()}
            pagination={{ pageSize: 5 }}
            key={1}
            
          />   
                  </div>


      <Modal
            title="Likes Details/ تفاصيل الاعجابات"
            visible={visibleState}
            confirmLoading={confirmLoadingState}
            onCancel={handleCancelState}
            okText="Update"
            width={1000}
            footer={[
              <div>
                <Button key="Cancel0" onClick={handleCancelState}>
                  Cancel
                </Button>
              </div>,
            ]}
      >
        <div className="contanerAddRommFloor">
          {datalike[0].map((res, i)=>
            <div className="contanerAddRommFloor" style={{width:"100%"}} key={i}>
             <div style={{ width: "60%" }}>
                <div className="lableinput">
                  <label>اسم المستخدم</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.UserName}
                
                  
                  type="text"
                />

          </div>
           <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>التاريخ</label>
                </div>

                 <input
                  className="inputtext"
                  value={moment(res.DateLike).format(FORMAT) }
               
                  
                  type="text"
                />

              </div>
              </div>
          )}
              
         </div>
          </Modal>

                
      <Modal
            title="Comments Details/ تفاصيل التعليقات"
            visible={visibleState2}
            confirmLoading={confirmLoadingState2}
            onCancel={handleCancelState2}
            okText="Update"
            width={1000}
            footer={[
              <div>
                <Button key="Cancel0" onClick={handleCancelState2}>
                  Cancel
                </Button>
              </div>,
            ]}
      >
        <div className="contanerAddRommFloor">
          {datalike[0].map((res, i)=>
            <div className="contanerAddRommFloor" style={{width:"100%"}} key={i}>
             <div style={{ width: "25%" }}>
                <div className="lableinput">
                  <label>اسم المستخدم</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.UserNameAddComment}
                
                  
                  type="text"
                />

              </div>
               <div style={{ width: "50%" }}>
                <div className="lableinput">
                  <label>التعليق</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.Comment_Object}
                
                  
                  type="text"
                />

          </div>
           <div style={{ width: "25%" }}>
                <div className="lableinput">
                  <label>التاريخ</label>
                </div>

                 <input
                  className="inputtext"
                  value={moment(res.DateComment).format(FORMAT) }
               
                  
                  type="text"
                />

              </div>
              </div>
          )}
              
         </div>
          </Modal>

                   <div className="chartone" style={{width:"95%",marginTop:5,overflow:"auto"}}>
                            <h5>منشورات المستخدمين</h5>  
        <Table
            locale
            bordered
            columns={columns}
            dataSource={data.reverse()}
            pagination={{ pageSize: 5 }}
              key={1}
           
            
          />   
                  </div>
               
                  
        </div>
      </div>
    </div>
  );
};

export default DashboradPlace;

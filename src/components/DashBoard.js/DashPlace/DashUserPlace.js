import React, { useEffect, useState } from 'react'
import { SideUserPlace } from './SideUserPlace'
import moment from 'moment';
import { Places,Category,StateContry,Reservation,Review,Floor,Users,NotiFiction,Offer,ImagePlacs,Service,Rooms } from "../../../agent";

import Cookies from "universal-cookie/es6";
import { Avatar, Badge,Popover,Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message,Select,Image} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { baseURLImg } from '../../../utils/API';
import { useHistory } from "react-router-dom";
import { AiFillSetting } from 'react-icons/ai';
import { IoNotifications} from 'react-icons/io5';
import { FaAlignCenter,FaUserCheck,FaServicestack,FaRestroom,FaShoppingBag,FaImages,FaAddressCard, FaUser} from 'react-icons/fa';
const DashUserPlace = () => {
       const FORMAT = "YYYY ddd MMM DD HH:mm";

  const cookies = new Cookies();
  const history = useHistory();

    



    const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const [IdAppPlace, setIdAppPlace] = useState(cookies.get("IdAppPlace"));
 

  const data = [];
  const data1 = [];

  const [dataProvince, setdataProvince] = useState([]);
  const [dataProvince1, setdataProvince1] = useState([]);

  
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
 
    Rooms.GetAllRooms(IdAppPlace).then(res=>setRoomLength(res.data.data[0].Rooms.length))
   Service.GetAllService(IdAppPlace).then(res=>setServiceLength(res.data.data[0].Services.length));
  ImagePlacs.GetAllImageImagePlacs(IdAppPlace).then(res=>setImagesLength(res.data.data[0].ImagesPlaces.length));


  Reservation.GetAllReservation(IdAppPlace).then(res=>setReserLength(res.data.data[0].Reservations.length))
   Review.GetAllReviewplace(IdAppPlace).then(res=>setReviewLength(res.data.data[0].Reviews.length));
  Floor.GetAllFloor(IdAppPlace).then(res=>setFloorLength(res.data.data[0].Floor.length));

   Offer.GetAllOfferOnePlace(IdAppPlace).then(res=>setOfferLength(res.data.data.length));


 Users.GetAllUsersInplace(IdAppPlace,IdUser).then(res=>setUsersLength(res.data.data.length));
 NotiFiction.GetAllNotiOnePace(IdAppPlace).then(res=>setNotiLength(res.data.data[0].Notification.filter(ress=>ress.Noti_State==="NoRead").length));
Reservation.GetAllReservation(IdAppPlace).then(res=> setdataProvince1(res.data.data[0].Reservations))
 }, [IdAppPlace])
  
   


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
     
      
        key: res.Reservations_ID,
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
    history.push("UpdateUserAll");
    cookies.set("userid",e.key)
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

   const GoToNoti = (e) => {
  

     NotiFiction.ReadNotiplace(IdAppPlace);
     setTimeout(async () => {
      
  history.push("MangeNotifictionMyPlace");
        localStorage.setItem("indexclass",9)
    }, 500);
  };

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
    
  ];

    


  // end table reservation users 
    return (
        <div style={{display:"flex",width:"100%"}}>
            <SideUserPlace />
            <div className="widiv" style={{padding:"10px 20px"}}>
             <div className="SideUserPlace_Body_Box">

         

                     <div
              className=" boxmain_dashplace SideUserPlace_Body_Boxmain "
              onClick={()=>history.push("MangeResMyPlace")}
            >
              <div className="divmain_dashplace">
                <FaShoppingBag size={30} style={{ color: "rgb(17 46 178)" }}/>
                <span  style={{ fontSize: 20, color: "rgb(17 46 178)",fontWeight: 700 }}>الحجوزات</span>
              </div>
              <div style={{ fontSize: 35, color: "#fff", fontWeight: 600 }}>
                {ReserLength}
              </div>
           
            </div>

              <div
              className=" boxmain_dashplace SideUserPlace_Body_Boxmain " style={{ background: "linear-gradient(45deg,#dcd4ff21, rgb(32 159 216))" }}
                onClick={()=>history.push("MangeUserMyPlace")}
            >
              <div className="divmain_dashplace" >
                <FaUser size={30} style={{ color: "rgb(17 46 178)" }}/>
                <span  style={{ fontSize: 20, color: "rgb(17 46 178)",fontWeight: 700 }}>المستخدمين</span>
              </div>
              <div style={{ fontSize: 35, color: "#fff", fontWeight: 600 }}>
                {UsersLength}
              </div>
           
            </div>


             <div
              className=" boxmain_dashplace SideUserPlace_Body_Boxmain "
              style={{background: "linear-gradient(45deg, rgb(255 255 255 / 13%), rgb(255 210 2))"}}
           onClick={()=>history.push("MangeFloorMyPlace")}
           >
              <div className="divmain_dashplace">
                <FaAddressCard size={30} style={{ color: "rgb(17 46 178)" }}/>
                <span  style={{ fontSize: 20, color: "rgb(17 46 178)",fontWeight: 700 }}>الطوابق</span>
              </div>
              <div style={{ fontSize: 35, color: "#fff", fontWeight: 600 }}>
                {FloorLength}
              </div>
           
            </div>

             <div
              className=" boxmain_dashplace SideUserPlace_Body_Boxmain "
              style={{ background: "linear-gradient(45deg, rgb(255 255 255 / 13%),rgb(255 50 90))" }}
                 onClick={()=>history.push("MangeAllRoom")}
            >
              <div className="divmain_dashplace">
                <AiFillSetting size={30} style={{ color: "rgb(17 46 178)" }}/>
                <span  style={{ fontSize: 20, color: "rgb(17 46 178)",fontWeight: 700 }}>الغرف</span>
              </div>
              <div style={{ fontSize: 35, color: "#fff", fontWeight: 600 }}>
                {RoomLength}
              </div>
           
            </div>


             <div
              className=" boxmain_dashplace SideUserPlace_Body_Boxmain "
              style={{ background: "linear-gradient(45deg, rgb(255 255 255 / 13%),rgb(192 75 255))" }}
                 onClick={GoToNoti}
            >
              <div className="divmain_dashplace">
                <IoNotifications size={30} style={{ color: "rgb(17 46 178)" }}/>
                <span  style={{ fontSize: 20, color: "rgb(17 46 178)",fontWeight: 700 }}>الاشعارات</span>
              </div>
              <div style={{ fontSize: 35, color: "#fff", fontWeight: 600 }}>
                {NotiLength}
              </div>
           
            </div>


          </div>

         



             <div className="chartone" style={{width:"95%",margin:10,overflow:"auto"}}>
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
            </div>
        </div>
    )
}

export default DashUserPlace

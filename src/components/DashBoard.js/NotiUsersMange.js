import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { NotiFictionUser ,Places,Users} from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message,Select} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd,BiDoorOpen } from 'react-icons/bi';
import axios from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill,RiChatDeleteFill} from 'react-icons/ri';
import Cookies from "universal-cookie";
import moment from "moment";


const NotiUsersMange = () => {
    const cookies = new Cookies();

  
  const [IdUser, setIdUser] = useState(cookies.get("userid"));


   const FORMAT = "YYYY ddd MMM DD HH:mm";

   const { Option } = Select;

  const history = useHistory();
  
      const [player_ids, setplayer_ids] = useState("");

    const [IdAppPlace, setIdAppPlace] = useState("");
    const [NameUser, setNameUser] = useState("osamah");
    const [NameApp, setNameApp] = useState("");
        const [IdUserNoti, setIdUserNoti] = useState("");

const [Place, setPlace] = useState([]);

    console.log("player id "+player_ids)
    useEffect(() => {
     
          const Placesaasync = async () => {
                     Users.getAll(IdUser).then((res) => setPlace(res.data.data));

        }

       
         const GetNameApp = async (IdUserNoti) => {
                     Users.getAll(IdUser).then((res) => setNameApp(res.data.data.filter(ress=>ress.IdUser===IdUserNoti)[0].FirstNameUser + "-"+ res.data.data.filter(ress=>ress.IdUser===IdUserNoti)[0].LastNameUser));
                       
           setplayer_ids((await Users.GetOneUserByIdUser(IdUserNoti)).data.data[0].include_player_ids)
         }


        Placesaasync();
         if (IdAppPlace!=="") {
             GetNameApp(IdAppPlace)
        }
       
    }, [IdUser,IdAppPlace])

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("DashBoradAdmin");
  };

  const GoToRoomFloor = (e) => {
    cookies.set("IdFloor",e.key)
    cookies.set("NameFloor",e.Floor_Name_ar)
     history.push("RoomFloor");
  }
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
                   NotiFictionUser.GetNotiAllPlace().then((res) => setdataProvince(res.data.data));


    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
     data.push({
      key: "0",
      no: "0",
      Noti_Title: "",
       Noti_Subject: "",
        Noti_State: "",
      UserAddNoti: "",
       User_IdAddNoti: "",
    DateAdd: "",
         DateUpdate: "",
    AppName:""
      
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.Noti_Id,
      no: i + 1,
     Noti_Title: res.Noti_Title,
       Noti_Subject: res.Noti_Subject,
        Noti_State: res.Noti_State,
      UserAddNoti:res.UserAddNoti,
        User_IdAddNoti: res.User_IdAddNoti,
    createdAt:moment(res.createdAt).format(FORMAT) ,
    updatedAt:moment(res.updatedAt).format(FORMAT) ,
     AppName:res.UserName
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا الاشعار ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete(`/Floorplace/${IdAppPlace}/`, {
            data: {
              "Floors_ID": e
            }
            
          });
         
          
          setTimeout(async() => {
                                NotiFictionUser.GetNotiAllPlace().then((res) => setdataProvince(res.data.data));

             message.success("Delete");
           
          }, 1000);
     

      // window.location.reload(false);

            
             
           
        },
        onCancel() {
         
        },
         
      });
       
    },1000);
  
      
   
  }

  const UpdateData = () => {
                        NotiFictionUser.GetNotiAllPlace().then((res) => setdataProvince(res.data.data));

  };
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

  const columns = [
   
    {
      title: "العنوان",
      dataIndex: "Noti_Title",
      key: "Noti_Title",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_Title"),
    },
      {
      title: "الموضوع",
      dataIndex: "Noti_Subject",
      key: "Noti_Subject",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_Subject"),
    },

 {
      title: "اسم المستخدم",
      dataIndex: "AppName",
      key: "AppName",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("AppName"),
    }
      ,
     {
      title: "الحالة",
      dataIndex: "Noti_State",
      key: "Noti_State",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_State"),
    },
    ,
     {
      title: "تاريخ الاضافة",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("createdAt"),
    },
   
  ];


   //Model Add State

   const [visibleState, setVisibleState] = useState(false);
   const [confirmLoadingState, setConfirmLoadingState] = useState(false);  
   
    const [visibleState2, setVisibleState2] = useState(false);
   const [confirmLoadingState2, setConfirmLoadingState2] = useState(false);  
   
    const [Noti_Title, setNoti_Title] = useState('');
    const [Noti_Subject, setNoti_Subject] = useState('');
    const [Floors_Name_ku, setFloors_Name_ku] = useState('');
   
   const [Floor_State, setFloor_State] = useState('فعال');



  const showModalState = () => {
    setVisibleState(true);
    setNoti_Subject("");
    setNoti_Title("");

  };
const showModalState2 = () => {
    setVisibleState2(true);
    setNoti_Subject("");
    setNoti_Title("");

  };
    const handleOkState = async () => {
       
    NotiFictionUser.AddNewNotiToPlace(IdAppPlace,Noti_Title,Noti_Subject,NameUser,IdUser,NameApp).then(res=>{})

     setTimeout(() => {
        var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic OGMyNjI2ZmQtN2NiNi00MmY4LTkyYjgtZmUxNmVlNDliNjQ2");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "app_id": "19258adf-db93-41e7-9ea8-685580ec5756",
  "include_player_ids": [player_ids],
  "data": {
    "foo": "bar"
  },
  "contents": {"en": Noti_Subject},
  "headings":{"en":Noti_Title}
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://onesignal.com/api/v1/notifications", requestOptions)
  .then(response => response.text())
  .then(result =>{})
  .catch(error => console.log('error', error));
     }, 1000);
      
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
        NotiFictionUser.GetNotiAllPlace().then((res) => setdataProvince(res.data.data));

     setVisibleState(false);
    setNoti_Subject("");
    setNoti_Title("");
      setConfirmLoadingState(false);
      message.success("Add");
    }, 2000);
  };

  
    const handleOkState2 = async () => {
      Place.map(res =>
        
         NotiFictionUser.AddNewNotiToPlace(res.IdUser,Noti_Title,Noti_Subject,NameUser,IdUser,(res.FirstNameUser +"-" +res.LastNameUser )).then(res=>{})
            )
   
      setTimeout(() => {
        var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic OGMyNjI2ZmQtN2NiNi00MmY4LTkyYjgtZmUxNmVlNDliNjQ2");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "app_id": "19258adf-db93-41e7-9ea8-685580ec5756",
  "included_segments": [
    "Subscribed Users"
  ],
  "data": {
    "foo": "bar"
  },
  "contents": {"en": Noti_Subject},
  "headings":{"en":Noti_Title}
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://onesignal.com/api/v1/notifications", requestOptions)
  .then(response => response.text())
  .then(result =>{})
  .catch(error => console.log('error', error));
      }, 1000);
      
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
        NotiFictionUser.GetNotiAllPlace().then((res) => setdataProvince(res.data.data));

     setVisibleState2(false);
    setNoti_Subject("");
    setNoti_Title("");
      setConfirmLoadingState2(false);
      message.success("Add");
    }, 2000);
    };
    
  const handleCancelState = () => {
    setVisibleState(false);
  };

 const handleCancelState2 = () => {
    setVisibleState2(false);
  };
  

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
      <HeaderDashBoard Title="ادارة اشعارت المستخدمين" />
      {dataProvince.length < 0 && (
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
      <div
        className="dashboard_main"
        style={{ justifyContent: "space-between",background:"rgb(229, 233, 234)",margin:5,padding:"0px 5px" }}
      >
        <div
          style={{ padding: 5, display: "flex", justifyContent: "flex-start" }}
         
        >
          <Tag
            style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="orange"
              onClick={showModalState}
          >
 اشعار مستخدم                <BiMessageSquareAdd size={20} />
            
          </Tag>

                    <Tag
            style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="blue"
              onClick={showModalState2}
          >
 اشعار كل المستخدمين                <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New NotiFictionUser one user"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العنوان</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Noti_Title}
                    onChange={(e) => setNoti_Title(e.target.value)}
                    required
                    placeholder="Enter Title NotiFictionUser"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>الموضوع</label>
                  </div>
                     <textarea
                    style={{ height: 80 }}
                    className="inputtext"
                    value={Noti_Subject}
                    onChange={(e) => setNoti_Subject(e.target.value)}
                    required
                    placeholder="Enter Subject NotiFictionUser"
                  />
                
                      </div>
                

              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                                     <label>أسم المستخدم</label>

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
              value={IdAppPlace}
              onChange={(e) => setIdAppPlace(e)}
                      >
                          {Place.map((res, i) =>
                              <Option  key={i} value={res.IdUser}>{res.FirstNameUser}</Option>
                          )}
             
                                  </Select>
                                  
                  
                  
                </div>

             
      </Modal>
  <Modal
        title="Add New NotiFictionUser All Place"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العنوان</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Noti_Title}
                    onChange={(e) => setNoti_Title(e.target.value)}
                    required
                    placeholder="Enter Title NotiFictionUser"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>الموضوع</label>
                  </div>
                     <textarea
                    style={{ height: 100 }}
                    className="inputtext"
                    value={Noti_Subject}
                    onChange={(e) => setNoti_Subject(e.target.value)}
                    required
                    placeholder="Enter Subject NotiFictionUser"
                  />
                
                      </div>
                

             
                                  
                  
                  
             

             
      </Modal>
        </div>

        <div
          style={{ padding: 5, display: "flex", justifyContent: "flex-start" }} className="acton"
        >
          <div 
            onClick={UpdateData}
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Tag
              style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="orange"
            >
             
              تحديث البيانات
               <HiRefresh size={20} />
            </Tag>
          </div>

          <div
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Tag  className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="green">
              العدد الكلي : {data.length}
            </Tag>
          </div>

 <div
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >

         
           <Tag
               onClick={GoToMangeCompany}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="default"
            >
                  العودة الى الرئيسية
                   <RiArrowGoBackFill size={20} />
          </Tag>
           </div>
          

        

        </div>

         
        
      </div>

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",overflow:"auto" }}>
          <Table
            locale
            bordered
            columns={columns}
            dataSource={data.reverse()}
            pagination={{ pageSize: 8 }}
            key={123}
          />
        </div>
     
    </div>
  );
};

export default NotiUsersMange;

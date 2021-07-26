import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { Floor } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd,BiDoorOpen } from 'react-icons/bi';
import axios from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill,RiChatDeleteFill} from 'react-icons/ri';
import Cookies from "universal-cookie/es6";


const FloorManage = () => {

         const cookies = new Cookies();

  const history = useHistory();
  
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

  const GoToMangeCompany = (e) => {
   // cookies.setItem("IdAppProvince", "");
    history.push("UpdatePlace");
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
          Floor.GetAllFloor(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Floor));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      Floor_Name_ar: "0",
      Floor_Name_en: "0",
      Floor_Name_ku: "0",
      Floor_State: "0",
      RoomsFloor: "0"
      
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.Floor_ID,
      no: i + 1,
        Floor_Name_ar: res.Floor_Name_ar,
       Floor_Name_en: res.Floor_Name_en,
        Floor_Name_ku: res.Floor_Name_ku,
        Floor_State: res.Floor_State,
       RoomsFloor: res.RoomsFloor
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذ الطابق ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete(`/Floorplace/${IdAppPlace}/`, {
            data: {
              "Floors_ID": e
            }
            
          });
         
          
          setTimeout(async() => {
               const datastate = await Floor.GetAllFloor(IdAppPlace)
            setdataProvince(datastate.data.data[0].Floor);
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
     Floor.GetAllFloor(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Floor));
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
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Name"),
      },
     {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Price"),
      },
      {
      title: "Currency",
      dataIndex: "Currency",
      key: "Currency",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Currency"),
    },
    {
      title: "Manage",
      dataIndex: "Manage",
      key: "Manage",

      render: (text, record) => (
        <div style={{display:"flex"}}>
        <div className="divwsel" onClick={() => UpdateState(record)}>
          <Tag color="green">Update</Tag>
        </div>
         <div className="divwsel" onClick={() => showConfirm(record)}>
          <Tag color="red">Delete</Tag>
          </div>
          </div>
      ),
    },
  ];


   //Model Add State

   const [visibleState, setVisibleState] = useState(false);
   const [confirmLoadingState, setConfirmLoadingState] = useState(false);  
   
   
    const [Floors_Name_ar, setFloors_Name_ar] = useState('');
    const [Floors_Name_en, setFloors_Name_en] = useState('');
    const [Floors_Name_ku, setFloors_Name_ku] = useState('');
   
   const [Floor_State, setFloor_State] = useState('فعال');



  const showModalState = () => {
    setVisibleState(true);
    setFloors_Name_ku("");
    setFloors_Name_en("");
    setFloors_Name_ar("");

  };

  const handleOkState = async () => {
      Floor.AddNewFloor(IdAppPlace, Floors_Name_ar,Floors_Name_en,Floors_Name_ku,Floor_State)
      ;
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
             Floor.GetAllFloor(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Floor))
     setVisibleState(false);
    setFloors_Name_ku("");
    setFloors_Name_en("");
    setFloors_Name_ar("");
      setConfirmLoadingState(false);
      message.success("Add");
    }, 2000);
  };

  const handleCancelState = () => {
    setVisibleState(false);
  };


    //Model Update State

  const [visibleState2, setVisibleState2] = useState(false);
  const [confirmLoadingState2, setConfirmLoadingState2] = useState(false);
   const [Floors_Name_ar2, setFloors_Name_ar2] = useState('');
    const [Floors_Name_en2, setFloors_Name_en2] = useState('');
    const [Floors_Name_ku2, setFloors_Name_ku2] = useState('');
   
   const [Floor_State2, setFloor_State2] = useState('فعال');;
  const [State_ID, setState_ID] = useState('');
  


   const handleOkState2 = async () => {
    Floor.UpdateFloor(IdAppPlace,Floors_Name_ar2,Floors_Name_en2,Floors_Name_ku2,Floor_State2,State_ID)
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
             Floor.GetAllFloor(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Floor));
   setFloors_Name_ku2("");
    setFloors_Name_en2("");
    setFloors_Name_ar2("");
     
     setVisibleState2(false);
      setConfirmLoadingState2(false);
      message.success("Update");
    }, 2000);
  };

  const handleCancelState2 = () => {
    setVisibleState2(false);
  };

  const UpdateState = (e) => {

   setVisibleState2(true);
    setFloors_Name_ku2(e.Floor_Name_ku);
    setFloors_Name_en2(e.Floor_Name_en);
    setFloors_Name_ar2(e.Floor_Name_ar);
    setFloor_State2(e.Floor_State)
    setState_ID(e.key);
  };
    const titelplace = cookies.get("titelplace")

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
      <HeaderDashBoard Title={`${ titelplace} / اعدادات الطوابق `} />

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
اضافة طابق جديد              <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New Floor"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_ar</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_ar}
                    onChange={(e) => setFloors_Name_ar(e.target.value)}
                    required
                    placeholder="Floors_Name_ar"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_en</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_en}
                    onChange={(e) => setFloors_Name_en(e.target.value)}
                    required
                    placeholder="Floors_Name_en"
                  />
                      </div>
                       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_ku</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_ku}
                    onChange={(e) => setFloors_Name_ku(e.target.value)}
                    required
                    placeholder="Floors_Name_ku"
                  />
                </div>

              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floor_State</label>
                  </div>

                          <select  className="inputtext"
                    value={Floor_State}
                    onChange={(e) => setFloor_State(e.target.value)}
                    required
                              placeholder="Floor_State">
                                 <option>فعال</option>
                              <option>غير فعال</option>
                              <option>محجوز بالكامل</option>
                             
                            </select>
                 
                </div>

             
      </Modal>
 <Modal
        title="Update Floor"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_ar</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_ar2}
                    onChange={(e) => setFloors_Name_ar2(e.target.value)}
                    required
                    placeholder="Floors_Name_ar"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_en</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_en2}
                    onChange={(e) => setFloors_Name_en2(e.target.value)}
                    required
                    placeholder="Floors_Name_en"
                  />
                      </div>
                       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floors_Name_ku</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Floors_Name_ku2}
                    onChange={(e) => setFloors_Name_ku2(e.target.value)}
                    required
                    placeholder="Floors_Name_ku"
                  />
                </div>

              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Floor_State</label>
                  </div>

                          <select  className="inputtext"
                    value={Floor_State2}
                    onChange={(e) => setFloor_State2(e.target.value)}
                    required
                              placeholder="Floor_State2">
                                 <option>فعال</option>
                              <option>غير فعال</option>
                              <option>محجوز بالكامل</option>
                             
                            </select>
                 
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
                  العودة الى اعددات المكان
                   <RiArrowGoBackFill size={20} />
          </Tag>
           </div>
          

        

        </div>

         
        
      </div>

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",display:"flex",flexWrap:"wrap" }}>

        {data.map((res, i) => 
          <div  key={i} className={res.Floor_State==="محجوز بالكامل" ?"roomres":"floorcontainer"   && res.Floor_State==="غير فعال" ?"roomresclose":"floorcontainer"} >
          <div>اسم الطابق : {res.Floor_Name_ar}</div>
            <div> حالة الطابق : {res.Floor_State}</div>
            <div>عدد الغرف : {res.RoomsFloor.length}</div>
            <div className="boxfloor">

 <Tag
              onClick={()=>GoToRoomFloor(res)}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                 Open
                   <BiDoorOpen size={15} />
          </Tag>

            <Tag
               onClick={()=>UpdateState(res)}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="blue"
            >
                 Update
                   <HiRefresh size={15} />
          </Tag>
          <Tag
               onClick={() => showConfirm(res.key)}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="red"
            >
                Delete
                   <RiChatDeleteFill size={15} />
          </Tag>
            </div>
            </div>
         )}
        
        </div>
     
    </div>
  );
};

export default FloorManage;

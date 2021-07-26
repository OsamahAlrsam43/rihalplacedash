import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { Rooms } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import axios from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill} from 'react-icons/ri';
import Cookies from "universal-cookie";


const RoomManage = () => {

       const cookies = new Cookies();

  const history = useHistory();
  
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("UpdatePlace");
  };

    const GoToAddNewRoom = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("AddNewRoom");
  };

  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          Rooms.GetAllRooms(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Rooms));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      Rooms_Name_ar: "0",
      Rooms_bedtype_ar: "0",
      Rooms_Space: "0",
      Rooms_Services_ar:"",
      Rooms_priceAdult: "0",
      Rooms_priceChild: "0",
      Price_Currency:""
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.Rooms_ID,
      no: i + 1,
        Rooms_Name_ar: res.Rooms_Name_ar,
       Rooms_bedtype_ar: res.Rooms_bedtype_ar,
        Rooms_Space: res.Rooms_Space,
       Rooms_Services_ar:res.Rooms_Services_ar,
         Rooms_priceAdult: res.Rooms_priceAdult,
      Rooms_priceChild: res.Rooms_priceChild,
      Price_Currency:res.Price_Currency
    })
  );
  }
 
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
              "Rooms_ID": e.key
            }
            
          });
         
          
          setTimeout(async() => {
               const datastate = await Rooms.GetAllRooms(IdAppPlace)
            setdataProvince(datastate.data.data[0].Rooms);
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
     Rooms.GetAllRooms(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Rooms));
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
      title: "اسم الغرفة عربي",
      dataIndex: "Rooms_Name_ar",
      key: "Rooms_Name_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Name_ar"),
      },
     {
      title: "عدد الاسرة ",
      dataIndex: "Rooms_bedtype_ar",
      key: "Rooms_bedtype_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_bedtype_ar"),
      },
      {
      title: "مساحة الغرفة",
      dataIndex: "Rooms_Space",
      key: "Rooms_Space",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Space"),
    },
      {
      title: "خدمات الغرفة",
      dataIndex: "Rooms_Services_ar",
      key: "Rooms_Services_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Services_ar"),
    },
      {
      title: "سعر البالغ",
      dataIndex: "Rooms_priceAdult",
      key: "Rooms_priceAdult",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_priceAdult"),
    },
      {
      title: "سعر الطفل",
      dataIndex: "Rooms_priceChild",
      key: "Rooms_priceChild",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_priceChild"),
    },
      {
      title: "العملة",
      dataIndex: "Price_Currency",
      key: "Price_Currency",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Price_Currency"),
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
  const [modalTexStatet, setModalTextState] = useState('Content of the modal');
  const [ModelStateAr, setStateAr] = useState('');
  const [ModelStateArPrice, setStateArPrice] = useState('0');
  const [ModelStateArCurncy, setStateArCurncy] = useState('USD');



  const showModalState = () => {
    setVisibleState(true);
    setStateAr("");
      setStateArPrice(0);
      setStateArCurncy("USD");

  };

  const handleOkState = async () => {
      Rooms.AddNewRooms(IdAppPlace, ModelStateAr, ModelStateArPrice, ModelStateArCurncy);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
             Rooms.GetAllRooms(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Rooms));
      
       setStateAr("");
      setStateArPrice("");
      setStateArCurncy("");
     setVisibleState(false);
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
  const [modalTexStatet2, setModalTextState2] = useState('Content of the modal');
    const [ModelStateAr2, setStateAr2] = useState('');
      const [ModelStateArPrice2, setStateArPrice2] = useState('0');
  const [ModelStateArCurncy2, setStateArCurncy2] = useState('USD');
  const [State_ID, setState_ID] = useState('');
  


   const handleOkState2 = async () => {
    Rooms.UpdateRooms(IdAppPlace, ModelStateAr2,ModelStateArPrice2,ModelStateArCurncy2,State_ID);
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
             Rooms.GetAllRooms(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Rooms));
      setStateAr2("");
      setStateArPrice2("");
      setStateArCurncy2("");

     setVisibleState2(false);
      setConfirmLoadingState2(false);
      message.success("Update");
    }, 2000);
  };

  const handleCancelState2 = () => {
    setVisibleState2(false);
  };

  const UpdateState = (e) => {

      
    cookies.set("Rooms_ID", e.key)

    history.push("UpdateRoom");
  };
    const titelplace = cookies.get("titelplace")

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
            <HeaderDashBoard Title={`${ titelplace} / اعدادات الغرف `} />

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
              onClick={GoToAddNewRoom}
          >
            اضافة غرفة جديدة 
              <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New Rooms"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم الغرفة </label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="Name Rooms"
                  />
                </div>
 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateArPrice}
                    onChange={(e) => setStateArPrice(e.target.value)}
                    required
                              placeholder="Price Rooms"
                    type="number"
                  />
                </div>
              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                          <select  className="inputtext"
                    value={ModelStateArCurncy}
                    onChange={(e) => setStateArCurncy(e.target.value)}
                    required
                              placeholder="Price Rooms">
                              <option>USD</option>
                              <option>IQD</option>
                            </select>
                 
                </div>

             
      </Modal>

            <Modal
        title="Update Rooms"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr2}
                    onChange={(e) => setStateAr2(e.target.value)}
                    required
                    placeholder="Name Rooms"
                  />
                </div>
 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>سعر الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateArPrice2}
                    onChange={(e) => setStateArPrice2(e.target.value)}
                    required
                              placeholder="Price Rooms"
                    type="number"
                  />
                </div>
              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                          <select  className="inputtext"
                    value={ModelStateArCurncy2}
                    onChange={(e) => setStateArCurncy2(e.target.value)}
                    required
                              placeholder="Price Rooms">
                              <option>USD</option>
                              <option>IQD</option>
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

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",overflow:"auto" }}>
          <Table
            locale
            bordered
            columns={columns}
            dataSource={data.reverse()}
            pagination={{ pageSize: 8 }}
            key={1}
          />
        </div>
     
    </div>
  );
};

export default RoomManage;

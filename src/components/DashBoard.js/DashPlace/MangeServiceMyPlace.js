import React, { useEffect, useState } from "react";
import { Service } from "../../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import axios from "../../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill} from 'react-icons/ri';
import Cookies from "universal-cookie";
import { SideUserPlace } from "./SideUserPlace";


const MangeServiceMyPlace = () => {

        const cookies = new Cookies();

  const history = useHistory();
  
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("UpdatePlace");
  };

  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          Service.GetAllService(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Services));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      Name: "0",
      Price: "0",
      Currency: "0",
      
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.ServicePlaces_ID,
      no: i + 1,
        Name: res.Name,
       Price: res.Price,
        Currency: res.Currency,
     
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه الخدمة ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete('/ServicePlaces', {
            data: {
              "IdAppCompany": IdAppPlace,
              "ServicePlaces_ID": e.key
            }
            
          });
         
          
          setTimeout(async() => {
               const datastate = await Service.GetAllService(IdAppPlace)
            setdataProvince(datastate.data.data[0].Services);
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
     Service.GetAllService(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Services));
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
      Service.AddNewService(IdAppPlace, ModelStateAr, ModelStateArPrice, ModelStateArCurncy);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
             Service.GetAllService(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Services));
      
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
    Service.UpdateService(IdAppPlace, ModelStateAr2,ModelStateArPrice2,ModelStateArCurncy2,State_ID).then(res=>console.log(res));
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
             Service.GetAllService(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Services));
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

   setVisibleState2(true);
     setStateAr2(e.Name);
      setStateArPrice2(e.Price);
      setStateArCurncy2(e.Currency);
  setState_ID(e.key);
  };
    const titelplace = cookies.get("titelplace")

  return (
     <div style={{ display: "flex", width: "100%" }} >
          <SideUserPlace />
          <div  className="widiv"  style={{ display: "flex",flexDirection:"column"}}>

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
            اضافة خدمة جديدة 
              <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New Services"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Name Services</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="Name Services"
                  />
                </div>
 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Price Services</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateArPrice}
                    onChange={(e) => setStateArPrice(e.target.value)}
                    required
                              placeholder="Price Services"
                    type="number"
                  />
                </div>
              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Currency Services</label>
                  </div>

                          <select  className="inputtext"
                    value={ModelStateArCurncy}
                    onChange={(e) => setStateArCurncy(e.target.value)}
                    required
                              placeholder="Price Services">
                              <option>USD</option>
                              <option>IQD</option>
                            </select>
                 
                </div>

             
      </Modal>

            <Modal
        title="Update Services"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Name Services</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr2}
                    onChange={(e) => setStateAr2(e.target.value)}
                    required
                    placeholder="Name Services"
                  />
                </div>
 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Price Services</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateArPrice2}
                    onChange={(e) => setStateArPrice2(e.target.value)}
                    required
                              placeholder="Price Services"
                    type="number"
                  />
                </div>
              <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>Currency Services</label>
                  </div>

                          <select  className="inputtext"
                    value={ModelStateArCurncy2}
                    onChange={(e) => setStateArCurncy2(e.target.value)}
                    required
                              placeholder="Price Services">
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
            <Tag className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="green">
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

         
           </div>
          

        

        </div>

         
        
      </div>

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",overflow:'auto' }}>
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
    </div>
  );
};

export default MangeServiceMyPlace;

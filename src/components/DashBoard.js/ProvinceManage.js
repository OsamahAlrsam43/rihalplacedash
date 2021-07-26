import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { StateContry } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import axios,{ IdAppCompany } from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill} from 'react-icons/ri';

import Cookies from "universal-cookie";

const ProvinceManage = () => {
       const cookies = new Cookies();
  const [IdUser, setIdUser] = useState(cookies.get("userid"));

 
  const history = useHistory();
  
  

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("CompanySetting");
  };

  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          StateContry.GetAllStateContry(IdAppCompany).then((res) => setdataProvince(res.data.data[0].StateContry));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      NameState_ar: "0",
      NameState_en: "0",
      NameState_ku: "0"
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.StateContry_ID,
      no: i + 1,
      NameState_ar: res.NameState_ar,
      NameState_en: res.NameState_en,
      NameState_ku: res.NameState_ku
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه المحافظة ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete('/StateContry', {
            data: {
              "IdAppCompany": IdAppCompany,
              "State_ID": e.key,
              "IdUser":IdUser
            }
            
          });
     
           
 setTimeout(async() => {
               const datastate = await StateContry.GetAllStateContry(IdAppCompany)
            setdataProvince(datastate.data.data[0].StateContry);
              message.success("Delete");

           
          }, 1000);

            
             
           
        },
        onCancel() {
         
        },
         
      });
       
    },1000);
  
   
  }

  const UpdateData = () => {
     StateContry.GetAllStateContry(IdAppCompany).then((res) => setdataProvince(res.data.data[0].StateContry));
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
      title: "اسم المحافظة بالعربي",
      dataIndex: "NameState_ar",
      key: "NameState_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("NameState_ar"),
    },
    {
      title: "Province En",
      dataIndex: "NameState_en",
      key: "NameState_en",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("NameState_en"),
      responsive: ["xl"],
    },
    {
      title: "Province Ku",
      dataIndex: "NameState_ku",
      key: "NameState_ku",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("NameState_ku"),
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
  const [ModelStateEn, setStateEn] = useState('');
  const [ModelStateKu, setStateKu] = useState('');


  const showModalState = () => {
    setVisibleState(true);
    setStateAr("");
  setStateEn("");
  setStateKu("");
  };

  const handleOkState = async () => {
    StateContry.AddNewState(IdAppCompany, ModelStateAr,ModelStateEn,ModelStateKu);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
             StateContry.GetAllStateContry(IdAppCompany).then((res) => setdataProvince(res.data.data[0].StateContry));
      setStateAr("");
  setStateEn("");
  setStateKu("");
     setVisibleState(false);
      setConfirmLoadingState(false);
      message.success("Update");
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
  const [ModelStateEn2, setStateEn2] = useState('');
  const [ModelStateKu2, setStateKu2] = useState('');
  const [State_ID, setState_ID] = useState('');



 

  const handleOkState2 = async () => {
    StateContry.UpdateState(IdAppCompany, ModelStateAr2,ModelStateEn2,ModelStateKu2,State_ID);
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
             StateContry.GetAllStateContry(IdAppCompany).then((res) => setdataProvince(res.data.data[0].StateContry));
      setStateAr2("");
  setStateEn2("");
  setStateKu2("");
     setVisibleState2(false);
      setConfirmLoadingState2(false);
      message.success("Add");
    }, 2000);
  };

  const handleCancelState2 = () => {
    setVisibleState2(false);
  };

  const UpdateState = (e) => {

   setVisibleState2(true);
     setStateAr2(e.NameState_ar);
  setStateEn2(e.NameState_en);
  setStateKu2(e.NameState_ku);
  setState_ID(e.key);
  };

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
      <HeaderDashBoard Title="اعدادات المحافظات" />
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
            اضافة محافظة 
              <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New Province"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المحافظة بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم المحافظة بالعربي"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>NameState_en</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateEn}
                    onChange={(e) => setStateEn(e.target.value)}
                    required
                    placeholder="Please Enter NameState_en"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>NameState_ku</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateKu}
                    onChange={(e) => setStateKu(e.target.value)}
                    required
                    placeholder="Please Enter NameState_ku"
                  />
                </div>
      </Modal>

          
           <Modal
        title="Update Province"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
      >
       <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>اسم المحافظة بالعربي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr2}
                    onChange={(e) => setStateAr2(e.target.value)}
                    required
                    placeholder="يرجى ادخال اسم المحافظة بالعربي"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>NameState_en</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateEn2}
                    onChange={(e) => setStateEn2(e.target.value)}
                    required
                    placeholder="Please Enter NameState_en"
                  />
                </div>

                 <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>NameState_ku</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateKu2}
                    onChange={(e) => setStateKu2(e.target.value)}
                    required
                    placeholder="Please Enter NameState_ku"
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
            <Tag    className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="green">
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
                  العودة الى اعددات الشركة
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

export default ProvinceManage;

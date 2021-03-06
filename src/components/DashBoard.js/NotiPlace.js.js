import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { NotiFiction } from "../../agent";
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

import moment from "moment";

const NotiPlace = () => {
   const FORMAT = "YYYY ddd MMM DD HH:mm";

         const cookies = new Cookies();

   
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );
  
  const history = useHistory();
  
  

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("UpdatePlace");
  };

  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          NotiFiction.GetAllNotiOnePace(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Notification));

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
    DateAdd: moment(res.DateAdd).format(FORMAT),
    DateUpdate: moment(res.DateUpdate).format(FORMAT),
     
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "???? ?????? ?????????? ???? ?????? ?????? ???????????????? ?? ",
        okText:"??????",cancelText:"????",
      async  onOk() {
          axios.delete(`/NotiFictionPlace/`, {
            data: {

    "Places_IdApp":IdAppPlace,
    "Noti_Id": e.key

            }
            
          });
         
          
          setTimeout(async() => {
              NotiFiction.GetAllNotiOnePace(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Notification));
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
        NotiFiction.GetAllNotiOnePace(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Notification));
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
      title: "??????????????",
      dataIndex: "Noti_Title",
      key: "Noti_Title",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_Title"),
    },
      {
      title: "??????????????",
      dataIndex: "Noti_Subject",
      key: "Noti_Subject",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_Subject"),
    },
     {
      title: "????????????",
      dataIndex: "Noti_State",
      key: "Noti_State",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Noti_State"),
    },
    ,
     {
      title: "?????????? ??????????????",
      dataIndex: "DateAdd",
      key: "DateAdd",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("DateAdd"),
    },
   
   
  ];


   //Model Add State

  const [visibleState, setVisibleState] = useState(false);
  const [confirmLoadingState, setConfirmLoadingState] = useState(false);
  const [modalTexStatet, setModalTextState] = useState('Content of the modal');
  const [ModelStateAr, setStateAr] = useState('');



  const showModalState = () => {
    setVisibleState(true);
    setStateAr("");

  };

  const handleOkState = async () => {
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
          NotiFiction.GetAllNotiOnePace(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Notification));
      setStateAr("");
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
  const [State_ID, setState_ID] = useState('');



   const handleOkState2 = async () => {
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
              NotiFiction.GetAllNotiOnePace(IdAppPlace).then((res) => setdataProvince(res.data.data[0].Notification));
      setStateAr2("");

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
  setState_ID(e.key);
  };

    const titelplace = cookies.get("titelplace")

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
            <HeaderDashBoard Title={`${ titelplace} / ??????????????????`} />

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
                    <label>Name Cetogry</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr}
                    onChange={(e) => setStateAr(e.target.value)}
                    required
                    placeholder="Please Enter Name Cetogry"
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
                    <label>Name Cetgory</label>
                  </div>

                  <input
                    className="inputtext"
                    value={ModelStateAr2}
                    onChange={(e) => setStateAr2(e.target.value)}
                    required
                    placeholder="Please Enter Name Cetgory"
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
             
              ?????????? ????????????????
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
              ?????????? ?????????? : {data.length}
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
                  ???????????? ?????? ???????????? ????????????
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

export default NotiPlace;

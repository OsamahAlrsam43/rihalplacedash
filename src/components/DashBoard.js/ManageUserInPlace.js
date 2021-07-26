import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { StateContry,Users } from "../../agent";
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


const ManageUserInPlace = () => {

         const cookies = new Cookies();

   const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );
  const [IdUser, setIdUser] = useState(cookies.get("userid"));
  const history = useHistory();
  
  

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("UpdatePlace");
  };


  
  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          Users.GetAllUsersInplace(IdAppPlace,IdUser).then((res) => setdataProvince(res.data.data));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
       FirstNameUser: "",
      LastNameUser: "",
      Phone:"",
       Role:"",
       State:""
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.IdUser,
      no: i + 1,
      FirstNameUser: res.FirstNameUser,
      LastNameUser: res.LastNameUser,
      Phone: res.Phone,
       Role: res.Role,
       State: res.state
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا المستخدم ؟ ",
        okText:"نعم",cancelText:"لا",
        async onOk() {
        axios.delete('/users/', {data:{"IdUser":e.key}});
        
     
           
 setTimeout(async() => {
     Users.GetAllUsersInplace(IdAppPlace,IdUser).then((res) => setdataProvince(res.data.data));
     message.success("Delete");

           
          }, 1000);

            
             
           
        },
        onCancel() {
         
        },
         
      });
       
    },1000);
  
   
  }

  const UpdateData = () => {
      Users.GetAllUsersInplace(IdAppPlace,IdUser).then((res) => setdataProvince(res.data.data));
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
      title: "FirstNameUser",
      dataIndex: "FirstNameUser",
      key: "FirstNameUser",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("FirstNameUser"),
    },
    {
      title: "LastNameUser",
      dataIndex: "LastNameUser",
      key: "LastNameUser",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("LastNameUser"),
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Phone"),
    },
     {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Role"),
    },
     {
      title: "State",
      dataIndex: "State",
      key: "State",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("State"),
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


  const GoToAddUser = () => {
    history.push("AddUserToPlace");
   

  };

  const handleOkState = async () => {
    StateContry.AddNewState(IdAppCompany, ModelStateAr,ModelStateEn,ModelStateKu);
    setConfirmLoadingState(true);
    setTimeout(async () => {
        Users.GetAllUsersInplace(IdAppPlace,IdUser).then((res) => setdataProvince(res.data.data));
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
      
              Users.GetAllUsersInplace(IdAppPlace,IdUser).then((res) => setdataProvince(res.data.data));
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

    history.push("UpdateUserToPlace");
     cookies.set("iduserupdate",e.key)
  };
    const titelplace = cookies.get("titelplace")

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
                 <HeaderDashBoard Title={`${ titelplace} / اعدادات المستخدمين  `} />

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
              onClick={GoToAddUser}
          >
            اضافة مستخدم جديد 
              <BiMessageSquareAdd size={20} />
            
          </Tag>

          
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

export default ManageUserInPlace;

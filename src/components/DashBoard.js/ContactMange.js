import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { ContactUs } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import axios,{ IdAppCompany } from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill} from 'react-icons/ri';
import moment from "moment";


const ContactMange = () => {

   const FORMAT = "YYYY ddd MMM DD HH:mm";

  const history = useHistory();
  
  

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppContactUs", "");
    history.push("CompanySetting");
  };

  
  const data = [];
  const [dataContactUs, setdataContactUs] = useState([]);

  useEffect(() => {
    try {
          ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));

    } catch (error) {
      
    }
    
  }, []);



  if (dataContactUs.length < 0) {
    data.push({
      key: "0",
      no: "0",
        Name: "0",
      Email: "0",
      Subject: "0",
       Message: "0",
      Status: "0",
      DateAddconatct: "0",
    UpdateContact: "0",
  })
  }
  else {
     dataContactUs.map((res, i) =>
    data.push({
       key: res.Contact_ID,
      no: i+1,
        Name: res.Name,
        Phone:res.Phone,
      Email:  res.Email,
      Subject:  res.Subject,
       Message:  res.Message,
      Status:  res.Status,
      DateAddconatct: moment(res.DateAddconatct).format(FORMAT),
    UpdateContact: res.UpdateContact===""?"": moment(res.UpdateContact).format(FORMAT),
     
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه المجموعة ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete('/Contact/', {
            data: {
              "IdAppCompany": IdAppCompany,
              "Contact_ID": e.key
            }
            
          });
         
          
          setTimeout(async() => {
               const datastate = await ContactUs.GetAllContactUs(IdAppCompany)
            setdataContactUs(datastate.data.data[0].Contact);
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
     ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));
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
          ContactUsholder={`Search ${dataIndex}`}
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
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Phone"),
      },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Email"),
      },
     {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Subject"),
      },
       {
      title: "Message",
      dataIndex: "Message",
      key: "Message",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Message"),
      },
      {
          title: "State",
          key: "Status",
          dataIndex: "Status",
          ...getColumnSearchProps("Status"),
          responsive: ["xl"],
          render: (Status) => (
              <>
                  {Status === "NoRead" ?
                   <Tag color="red" key={Status}>
                              {Status}
                      </Tag>
                      :
                       <Tag color="green" key={Status}>
                              {Status}
                    </Tag>
                }
                
              </>
          )
      },
         {
      title: "DateAddconatct",
      dataIndex: "DateAddconatct",
      key: "DateAddconatct",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("DateAddconatct"),
      },
         {
      title: "UpdateContact",
      dataIndex: "UpdateContact",
      key: "UpdateContact",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("UpdateContact"),
    },
    {
      title: "Manage",
      dataIndex: "Status",
      key: "Manage",

      render: (Status, record) => (

         
                <div style={{display:"flex"}}>
                  {Status === "NoRead" ?
                   <div className="divwsel" onClick={() => UpdateStateRead(record)}>
          <Tag color="green">Read</Tag>
        </div>
                      :
                       <div className="divwsel" onClick={() => UpdateStateNoRead(record)}>
          <Tag color="red">NoRead</Tag>
          </div>
                }
                </div>
            
          
      
       
        
              
            
      ),
    },
  ];


   //Model Add State

  const [visibleState, setVisibleState] = useState(false);
  const [confirmLoadingState, setConfirmLoadingState] = useState(false);
  const [modalTexStatet, setModalTextState] = useState('Content of the modal');
  const [ModelStateAr, setStateAr] = useState('');



  const showAllContact = () => {
     ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));

  };

   const showNoReadContact = () => {
     ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact.filter(res=>res.Status=== "NoRead")));

  };

   const showReadContact = () => {
    ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact.filter(res=>res.Status=== "Read")));
  };

  const handleOkState = async () => {
    ContactUs.AddNewContactUs(IdAppCompany,ModelStateAr);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
             ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));
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
    ContactUs.UpdateContactUs(IdAppCompany, ModelStateAr2,State_ID,"");
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
             ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));
      setStateAr2("");

     setVisibleState2(false);
      setConfirmLoadingState2(false);
      message.success("Update");
    }, 2000);
  };

  const handleCancelState2 = () => {
    setVisibleState2(false);
  };

  const UpdateStateRead = (e) => {
   ContactUs.UpdateStatusReadConatct(IdAppCompany,e.key)
 setTimeout(() => {
                ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));

        }, 500);  };


    const UpdateStateNoRead = (e) => {
        ContactUs.UpdateStatusNoReadConatct(IdAppCompany, e.key)
        setTimeout(() => {
                ContactUs.GetAllContactUs(IdAppCompany).then((res) => setdataContactUs(res.data.data[0].Contact));

        }, 500);
    };
    
  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
      <HeaderDashBoard Title="اعدادات ContactUs" />
      {dataContactUs.length < 0 && (
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
              color="default"
              onClick={showAllContact}
          >
           الكل
              <BiMessageSquareAdd size={20} />
            
          </Tag>

             <Tag
            style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="blue"
              onClick={showReadContact}
          >
           المقروءة
              <BiMessageSquareAdd size={20} />
            
          </Tag>

                     <Tag
            style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="red"
              onClick={showNoReadContact}
          >
           الغير المقروءة
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

export default ContactMange;

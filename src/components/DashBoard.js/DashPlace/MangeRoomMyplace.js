import React, { useEffect, useState } from "react";
import { Floor,Rooms } from "../../../agent";
import { Table, Input, Button, Space, Tag, Spin,Tooltip,Col,Modal ,message} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd ,BiDoorOpen,BiMessageAltAdd} from 'react-icons/bi';
import axios from "../../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill,RiChatDeleteFill} from 'react-icons/ri';
import Cookies from "universal-cookie";
import { SideUserPlace } from "./SideUserPlace";


const MangeRoomMyplace = () => {
      const cookies = new Cookies();

    const [IdFloor, setIdFloor] = useState(cookies.get("IdFloor"))
     const [NameFloor, setNameFloor] = useState(cookies.get("NameFloor"))
 

  const history = useHistory();
  
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );

  

  
  const GoToAddNewTypeRoom = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("AddNewRoom");
  };

  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("MangeFloorMyPlace");
  };

  const GoToMangeRoomMyplace = (e) => {
    cookies.set("IdFloor",e)
     history.push("MangeRoomMyplace");
  }
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);
const [dataRoom, setdataRoom] = useState([]);
  
  useEffect(() => {
    try {
      setTimeout(() => {
        Floor.GetAllRoomInFloor(IdAppPlace, IdFloor).then((res) => setdataProvince(res.data.data));
         Rooms.GetAllRooms(IdAppPlace).then((res) => setdataRoom(res.data.data[0].Rooms));

      }, 1000);
         

    } catch (error) {
      
    }
    
  }, [IdFloor]);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      Rooms_Name_ar: "0",
      Rooms_Name_en: "0",
      Rooms_Name_ku: "0",
      Rooms_bedtype_ar: "0",
      Rooms_bedtype_en: "0",
      Rooms_bedtype_ku:"",
      Rooms_Space: "",
      Rooms_Services_ar: "",
      Rooms_Services_en: "",
      Rooms_Services_ku: "",
      Rooms_priceAdult: "",
      Rooms_priceChild: "",
      Price_Currency: "",
      Rooms_ImageMain: "",
      Rooms_State: "",
      Rooms_ResDate: "",
      Rooms_ArvDate: "",
      Rooms_ResNumberNight: "",
      Romms_PersonNumber: "",
      Rooms_Note: "",
      RoomsNumber: "",
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.RoomsId,
      no: i + 1,
      Rooms_Name_ar:res.Rooms_Name_ar,
      Rooms_Name_en:res.Rooms_Name_en,
      Rooms_Name_ku:res.Rooms_Name_ku,
      Rooms_bedtype_ar:res.Rooms_bedtype_ar,
      Rooms_bedtype_en:res.Rooms_bedtype_en,
      Rooms_bedtype_ku:res.Rooms_bedtype_ku,
      Rooms_Space:res.Rooms_Space,
      Rooms_Services_ar:res.Rooms_Services_ar,
      Rooms_Services_en:res.Rooms_Services_en,
      Rooms_Services_ku:res.Rooms_Services_ku,
      Rooms_priceAdult:res.Rooms_priceAdult,
      Rooms_priceChild:res.Rooms_priceChild,
      Price_Currency:res.Price_Currency,
      Rooms_ImageMain:res.Rooms_ImageMain,
      Rooms_State:res.Rooms_State,
      Rooms_ResDate:res.Rooms_ResDate,
      Rooms_ArvDate:res.Rooms_ArvDate,
      Rooms_ResNumberNight:res.Rooms_ResNumberNight,
      Romms_PersonNumber:res.Romms_PersonNumber,
      Rooms_Note:res.Rooms_Note,
      RoomsNumber:res.RoomsNumber
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه الغرفة؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete(`/MangeRoomMyplaceplace/${IdAppPlace}&${IdFloor}`, {
            data: {
              "RoomsId": e
            }
            
          }).then(res => {
            console.log(res)
          });
         
          
          setTimeout(async() => {
               const datastate = await Floor.GetAllRoomInFloor(IdAppPlace,IdFloor)
            setdataProvince(datastate.data.data);
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
     Floor.GetAllRoomInFloor(IdAppPlace,IdFloor).then((res) => setdataProvince(res.data.data));
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
      title: "Rooms_Name_ar",
      dataIndex: "Rooms_Name_ar",
      key: "Rooms_Name_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Name_ar"),
      },
     {
      title: "Rooms_bedtype_ar",
      dataIndex: "Rooms_bedtype_ar",
      key: "Rooms_bedtype_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_bedtype_ar"),
      },
      {
      title: "Rooms_Space",
      dataIndex: "Rooms_Space",
      key: "Rooms_Space",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Space"),
    },
     {
      title: "Rooms_Services_ar",
      dataIndex: "Rooms_Services_ar",
      key: "Rooms_Services_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Services_ar"),
    },
      {
      title: "Rooms_priceAdult",
      dataIndex: "Rooms_priceAdult",
      key: "Rooms_priceAdult",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_priceAdult"),
    },
      {
      title: "Rooms_priceChild",
      dataIndex: "Rooms_priceChild",
      key: "Rooms_priceChild",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_priceChild"),
    },
    {
      title: "Price_Currency",
      dataIndex: "Price_Currency",
      key: "Price_Currency",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Price_Currency"),
    },
     {
      title: "Rooms_ImageMain",
      dataIndex: "Rooms_ImageMain",
      key: "Rooms_ImageMain",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_ImageMain"),
    },
    {
      title: "Rooms_State",
      dataIndex: "Rooms_State",
      key: "Rooms_State",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_State"),
    },
     {
      title: "Rooms_ResDate",
      dataIndex: "Rooms_ResDate",
      key: "Rooms_ResDate",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_ResDate"),
    },
    {
      title: "Rooms_ArvDate",
      dataIndex: "Rooms_ArvDate",
      key: "Rooms_ArvDate",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_ArvDate"),
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
   

  //Person In Room 
  const [visibleState4, setVisibleState4] = useState(false);
   const [confirmLoadingState4, setConfirmLoadingState4] = useState(false); 

   
const[GenderPerson, setGenderPerson]=useState("Mr."); 
const[NamePerson ,setNamePerson ] =useState("");
const[JensiaPerson ,setJensiaPerson] =useState("");
const [DTBPerson ,setDTBPerson ] =useState("");
const [IdPassport ,setIdPassport ] =useState("");


  const showModalState4 = () => {
setVisibleState4(true)
  }

   const handleOkState4 = async () => {
      Floor.AddNewRoomToFloor(IdAppPlace,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber);
    setConfirmLoadingState4(true);
    setTimeout(async () => {
      
       Floor.GetAllRoomInFloor(IdAppPlace,IdFloor).then((res) => setdataProvince(res.data.data));
  
     setVisibleState4(false);
      setConfirmLoadingState4(false);
      message.success("Add");
    }, 2000);
    
  };

  const handleCancelState4 = () => {
    setVisibleState4(false);
  };


   //Model Add State

   const [visibleState, setVisibleState] = useState(false);
   const [confirmLoadingState, setConfirmLoadingState] = useState(false);  
    const [Rooms_Name_ar, setRooms_Name_ar] = useState('غرفة مفردة');
    const [Rooms_Name_en, setRooms_Name_en] = useState('');
    const [Rooms_Name_ku, setRooms_Name_ku] = useState('');
     const [Rooms_bedtype_ar, setRooms_bedtype_ar] = useState('');
    const [Rooms_bedtype_en, setRooms_bedtype_en] = useState('');
    const [Rooms_bedtype_ku, setRooms_bedtype_ku] = useState('');
     const [Rooms_Space, setRooms_Space] = useState('');
    const [Rooms_Services_ar, setRooms_Services_ar] = useState('');
    const [Rooms_Services_en, setRooms_Services_en] = useState('');
     const [Rooms_Services_ku, setRooms_Services_ku] = useState('');
    const [Rooms_priceAdult, setRooms_priceAdult] = useState('');
    const [Rooms_priceChild, setRooms_priceChild] = useState('');
    const [Rooms_ImageMain, setRooms_ImageMain] = useState('');
    const [Rooms_State, setRooms_State] = useState('غير محجوزة');
   const [Price_Currency, setPrice_Currency] = useState('USD');
    const [Rooms_ResDate, setRooms_ResDate] = useState('');
    const [Rooms_ArvDate, setRooms_ArvDate] = useState('');
     const [Rooms_ResNumberNight, setRooms_ResNumberNight] = useState('');
    const [Romms_PersonNumber, setRomms_PersonNumber] = useState('');
    const [Rooms_Note, setRooms_Note] = useState('');
  const [RoomsNumber, setRoomsNumber] = useState('');
  
  const showModalState = () => {
    setVisibleState(true);
    setRooms_Name_ar("");
    setRooms_bedtype_ar("");
    setRooms_Space("");

    setRooms_Services_ar("");
    setRooms_priceAdult("");
    setRooms_priceChild("");
    setRooms_State('غير محجوزة');
    setPrice_Currency("USD")
    setRooms_ResDate("");


    setRooms_ArvDate("");
    setRooms_ResNumberNight("");
    setRomms_PersonNumber("");

    setRooms_Note("");
    const datalengh = data.map(res => res.RoomsNumber)
    

    const roomnumber = Math.max.apply(Math, datalengh).toString();

    
       setRoomsNumber(roomnumber==="-Infinity"?1:parseInt(roomnumber)+1);

   
  };

  
  const handleOkState = async () => {
      Floor.AddNewRoomToFloor(IdAppPlace,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber);
    setConfirmLoadingState(true);
    setTimeout(async () => {
      
       Floor.GetAllRoomInFloor(IdAppPlace,IdFloor).then((res) => setdataProvince(res.data.data));
  
     setVisibleState(false);
      setConfirmLoadingState(false);
      message.success("Add");
    }, 2000);
    
  };

  const handleCancelState = () => {
    setVisibleState(false);
  };


  const DataPerson=[{"index":0}]
  useEffect(() => {
   
    
    
  },[Romms_PersonNumber])
    //Model Update State
const dt = parseInt(Romms_PersonNumber)
     for (let index = 1; index <dt; index++) {
       
       DataPerson.push({ dt: index })
    
     }
  
  const [visibleState2, setVisibleState2] = useState(false);
  const [confirmLoadingState2, setConfirmLoadingState2] = useState(false);
   
    const [RoomsId, setRoomsId] = useState('');
  


   const handleOkState2 = async () => {
     Floor.UpdateRoomToFloor(IdAppPlace,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber,RoomsId);
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      
       Floor.GetAllRoomInFloor(IdAppPlace,IdFloor).then((res) => setdataProvince(res.data.data));
  
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
    setRooms_Name_ar(e.Rooms_Name_ar);
       setRooms_bedtype_ar(e.Rooms_bedtype_ar);
 setRooms_Space(e.Rooms_Space);

     setRooms_Services_ar(e.Rooms_Services_ar);
       setRooms_priceAdult(e.Rooms_priceAdult);
 setRooms_priceChild(e.Rooms_priceChild);

   setRooms_State(e.Rooms_State);
       setPrice_Currency(e.Price_Currency);
 setRooms_ResDate(e.Rooms_ResDate);


   setRooms_ArvDate(e.Rooms_ArvDate);
       setRooms_ResNumberNight(e.Rooms_ResNumberNight);
 setRomms_PersonNumber(e.Romms_PersonNumber);

    setRooms_Note(e.Rooms_Note);
       setRoomsNumber(e.RoomsNumber);

    setRoomsId(e.key);

  };
   
  
    //Model Update State

  const [visibleState3, setVisibleState3] = useState(false);
  const [confirmLoadingState3, setConfirmLoadingState3] = useState(false);
   
  


   const handleOkState3 = async () => {
     Floor.UpdateRoomToFloor(IdAppPlace,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber,RoomsId);
    setConfirmLoadingState3(true);
    setTimeout(async () => {
      
       Floor.GetAllRoomInFloor(IdAppPlace,IdFloor).then((res) => setdataProvince(res.data.data));
  
     setVisibleState3(false);
      setConfirmLoadingState3(false);
      message.success("Update");
    }, 2000);
  };

  const handleCancelState3 = () => {
    setVisibleState3(false);
  };

  const UpdateState3 = (e) => {

   setVisibleState3(true);
    setRooms_Name_ar(e.Rooms_Name_ar);
       setRooms_bedtype_ar(e.Rooms_bedtype_ar);
 setRooms_Space(e.Rooms_Space);

     setRooms_Services_ar(e.Rooms_Services_ar);
       setRooms_priceAdult(e.Rooms_priceAdult);
 setRooms_priceChild(e.Rooms_priceChild);

   setRooms_State(e.Rooms_State);
       setPrice_Currency(e.Price_Currency);
 setRooms_ResDate(e.Rooms_ResDate);


   setRooms_ArvDate(e.Rooms_ArvDate);
       setRooms_ResNumberNight(e.Rooms_ResNumberNight);
 setRomms_PersonNumber(e.Romms_PersonNumber);

    setRooms_Note(e.Rooms_Note);
       setRoomsNumber(e.RoomsNumber);

    setRoomsId(e.key);

  };

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
اضافة غرفة جديدة              <BiMessageSquareAdd size={20} />
            
          </Tag>

          
           <Modal
        title="Add New Room / اضافة غرفة جديدة"
        visible={visibleState}
        onOk={handleOkState}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
            width={1000}
           

      >
        <div   className="contanerAddRommFloor">

      

       <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>نوع الغرفة</label>
                  </div>

   <select
                    style={{ padding: 6 }}
                    className="inputtext"
                    type="text"
                    value={Rooms_Name_ar}
                    onChange={(e) => setRooms_Name_ar(e.target.value)}
                    required
                    placeholder="Room Type"
                  > {dataRoom.map((res, i) => 
                                          <option key={i}>{res.Rooms_Name_ar} </option>
                                      )}
                                     
                   
                </select>
                
               
                </div>


              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>رقم الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={RoomsNumber}
                    onChange={(e) => setRoomsNumber(e.target.value)}
                    required
                    placeholder="RoomsNumber"
                   type="number"
                  />
            </div>

  <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاسره</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_bedtype_ar}
                    onChange={(e) => setRooms_bedtype_ar(e.target.value)}
                    required
                    placeholder="Rooms bedtype"
                     type="number"
                  />
            </div>
            

   <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>مساحة الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Space}
                    onChange={(e) => setRooms_Space(e.target.value)}
                    required
                    placeholder="Rooms_Space"
                  />
            </div>

              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>خدمات الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Services_ar}
                    onChange={(e) => setRooms_Services_ar(e.target.value)}
                    required
                    placeholder="Rooms Services"
                    
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاشخاص</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Romms_PersonNumber}
                    onChange={(e) => setRomms_PersonNumber(e.target.value)}
                    required
                    placeholder="Romms_PersonNumber"
                     type="number"
                   
                  />
            </div>
            <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر البالغ</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceAdult}
                    onChange={(e) => setRooms_priceAdult(e.target.value)}
                    required
                    placeholder="Rooms_priceAdult"
                    type="number"
                  />
            </div>

             <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر الطفل</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceChild}
                    onChange={(e) => setRooms_priceChild(e.target.value)}
                    required
                    placeholder="Rooms_priceChild"
                    type="number"
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                          <select  className="inputtext"
                    value={Price_Currency}
                    onChange={(e) => setPrice_Currency(e.target.value)}
                    required
                              placeholder="Price Currency">
                                                          <option>USD</option>
                                <option>IQD</option>
                             
                            </select>
                 
                </div>




                  <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>ملاحظات</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Note}
                    onChange={(e) => setRooms_Note(e.target.value)}
                    required
                    placeholder="Rooms_Note"
                   
                  />
            </div>
  </div>
             
          </Modal>

           <Modal
        title="Update Room / تعديل تفاصيل الغرفة"
        visible={visibleState3}
        onOk={handleOkState3}
        confirmLoading={confirmLoadingState3}
        onCancel={handleCancelState3}
        okText="Update"
            width={1000}
           

      >
        <div   className="contanerAddRommFloor">

      

       <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>نوع الغرفة</label>
                      <Tooltip placement="top" title={"اضافة نوع غرفة جديدة"}>
                    <BiMessageAltAdd  onClick={GoToAddNewTypeRoom} style={{fill:"#e4560c",cursor:"pointer"}} size={20}/>
                          </Tooltip>
                  </div>

                   <select  className="inputtext"
                    value={Rooms_Name_ar}
                    onChange={(e) => setRooms_Name_ar(e.target.value)}
                    required
                              placeholder="Room Type">
                                {dataRoom.map((res,i)=>
                                  <option>{res.Rooms_Name_ar}</option>
                                )}
                                                        
                             
                </select>
                </div>


              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>رقم الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={RoomsNumber}
                    onChange={(e) => setRoomsNumber(e.target.value)}
                    required
                    placeholder="RoomsNumber"
                   type="number"
                  />
            </div>

  <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاسره</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_bedtype_ar}
                    onChange={(e) => setRooms_bedtype_ar(e.target.value)}
                    required
                    placeholder="Rooms bedtype"
                     type="number"
                  />
            </div>
            

   <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>مساحة الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Space}
                    onChange={(e) => setRooms_Space(e.target.value)}
                    required
                    placeholder="Rooms_Space"
                  />
            </div>

              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>خدمات الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Services_ar}
                    onChange={(e) => setRooms_Services_ar(e.target.value)}
                    required
                    placeholder="Rooms Services"
                    
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاشخاص</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Romms_PersonNumber}
                    onChange={(e) => setRomms_PersonNumber(e.target.value)}
                    required
                    placeholder="Romms_PersonNumber"
                     type="number"
                   
                  />
            </div>
            <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر البالغ</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceAdult}
                    onChange={(e) => setRooms_priceAdult(e.target.value)}
                    required
                    placeholder="Rooms_priceAdult"
                    type="number"
                  />
            </div>

             <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر الطفل</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceChild}
                    onChange={(e) => setRooms_priceChild(e.target.value)}
                    required
                    placeholder="Rooms_priceChild"
                    type="number"
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                          <select  className="inputtext"
                    value={Price_Currency}
                    onChange={(e) => setPrice_Currency(e.target.value)}
                    required
                              placeholder="Price Currency">
                                                          <option>USD</option>
                                <option>IQD</option>
                             
                            </select>
                 
                </div>




                  <div style={{ width: "100%" }}>
                  <div className="lableinput">
                    <label>ملاحظات</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Note}
                    onChange={(e) => setRooms_Note(e.target.value)}
                    required
                    placeholder="Rooms_Note"
                   
                  />
            </div>
  </div>
             
          </Modal>
          
          <Modal
        title="Person Details In The Room/ بيانات النزلاء في الغرفة"
        visible={visibleState4}
        onOk={handleOkState4}
        confirmLoading={confirmLoadingState4}
        onCancel={handleCancelState4}
        okText="Update"
            width={1000}
            footer={[
              <div >

                 <Button key="Cancel1"   onClick={handleCancelState4}>
              Cancel
            </Button>,
 
         
            <Button key="update3"  type="primary" 
            loading={confirmLoadingState2}
>
              Update
            </Button>,
        </div>
          ]}

      >
      

      
              {DataPerson.map((res, ii) =>

                 <div   className="contanerAddRommFloor">
                
                  <div style={{ width: "10%" }}>
                    <div className="lableinput">
                      <label>النوع</label>
                    </div>

                    <select className="inputtext"
                      value={GenderPerson}
                      onChange={(e) => setGenderPerson(e.target.value)}
                      required
                      placeholder="Room Type">
                           
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Chd.</option>
                    </select>
                  </div>


                  <div style={{ width: "30%" }}>
                    <div className="lableinput">
                      <label> <label>الاسم الثلاثي للشخص </label></label>
                    </div>

                    <input
                      className="inputtext"
                      value={NamePerson}
                      onChange={(e) => setNamePerson(e.target.value)}
                      required
                      placeholder="NamePerson"
                      type="text"
                   
                    />
                  </div>

                  <div style={{ width: "18%" }}>
                    <div className="lableinput">
                      <label> <label>رقم الهوية / الجواز</label></label>
                    </div>

                    <input
                      className="inputtext"
                      value={IdPassport}
                      onChange={(e) => setIdPassport(e.target.value)}
                      required
                      placeholder="NamePerson"
                      type="text"
                   
                    />
                  </div>

                  <div style={{ width: "16%" }}>
                    <div className="lableinput">
                      <label> <label>الجنسية</label></label>
                    </div>

                    <input
                      className="inputtext"
                      value={JensiaPerson}
                      onChange={(e) => setJensiaPerson(e.target.value)}
                      required
                      placeholder="NamePerson"
                      type="text"
                   
                    />
                  </div>
                  <div style={{ width: "16%" }}>
                    <div className="lableinput">
                      <label> <label>المواليد</label></label>
                    </div>

                    <input
                      className="inputtext"
                      value={DTBPerson}
                      onChange={(e) => setDTBPerson(e.target.value)}
                      required
                      placeholder="NamePerson"
                      type="date"
                   
                    />
                  </div>

                 
                </div>
              )}

             </Modal>
          
           <Modal
        title="Reservation Room/ حجز الغرفة"
        visible={visibleState2}
        onOk={handleOkState2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
            width={1000}
            footer={[
              <div className="ant-modal-footere">

                 <Button key="Cancel0"   onClick={handleCancelState2}>
              Cancel
            </Button>,
              <Button key="Cancel01" type="primary" style={{background: "#1f1f1f",
    color: "#fff"}}   onClick={showModalState4}>
              بيانات النزلاء
            </Button>,
              <Button key="Malia312" style={{background: "#246807",
    color: "#fff"}}  onClick={handleCancelState2}>
              مالية الغرفة
            </Button>,

         
            <Button key="update456"  type="primary" onClick={handleOkState2} 
            loading={confirmLoadingState2}
>
              Update
            </Button>,
        </div>
          ]}

      >
        <div   className="contanerAddRommFloor">

      

       <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>نوع الغرفة</label>
                  </div>

                 <select  className="inputtext"
                    value={Rooms_Name_ar}
                    onChange={(e) => setRooms_Name_ar(e.target.value)}
                    required
                              placeholder="Room Type">
                                {dataRoom.map((res,i)=>
                                  <option>{res.Rooms_Name_ar}</option>
                                )}
                                                        
                             
                </select>
                </div>


              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>رقم الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={RoomsNumber}
                    onChange={(e) => setRoomsNumber(e.target.value)}
                    required
                    placeholder="RoomsNumber"
                   type="number"
                   disabled
                  />
            </div>

  <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاسره</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_bedtype_ar}
                    onChange={(e) => setRooms_bedtype_ar(e.target.value)}
                    required
                    placeholder="Rooms bedtype"
                     type="number"
                     
                  />
            </div>
            

   <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>مساحة الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Space}
                    onChange={(e) => setRooms_Space(e.target.value)}
                    required
                    placeholder="Rooms_Space"
                    disabled
                  />
            </div>

              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>خدمات الغرفة</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Services_ar}
                    onChange={(e) => setRooms_Services_ar(e.target.value)}
                    required
                    placeholder="Rooms Services"
                    
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الاشخاص</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Romms_PersonNumber}
                    onChange={(e) => setRomms_PersonNumber(e.target.value)}
                    required
                    placeholder="Romms_PersonNumber"
                     type="number"
                   
                  />
            </div>
            <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر البالغ</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceAdult}
                    onChange={(e) => setRooms_priceAdult(e.target.value)}
                    required
                    placeholder="Rooms_priceAdult"
                    type="number"
                  />
            </div>

             <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>سعر الطفل</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_priceChild}
                    onChange={(e) => setRooms_priceChild(e.target.value)}
                    required
                    placeholder="Rooms_priceChild"
                    type="number"
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>العملة</label>
                  </div>

                          <select  className="inputtext"
                    value={Price_Currency}
                    onChange={(e) => setPrice_Currency(e.target.value)}
                    required
                              placeholder="Price Currency">
                                                          <option>USD</option>
                                <option>IQD</option>
                             
                            </select>
                 
                </div>



             <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>تاريخ الدخول</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_ResDate}
                    onChange={(e) => setRooms_ResDate(e.target.value)}
                    required
                    placeholder="Rooms_ResDate"
                   type="datetime-local"
                  />
            </div>

 <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>تاريخ الخروج</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_ArvDate}
                    onChange={(e) => setRooms_ArvDate(e.target.value)}
                    required
                    placeholder="Rooms_ArvDate"
                   type="datetime-local"
                  />
            </div>

             <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>عدد الليالي</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_ResNumberNight}
                    onChange={(e) => setRooms_ResNumberNight(e.target.value)}
                    required
                    placeholder="Rooms_ResNumberNight"
                   type="number"
                  />
            </div>

             

            


              <div style={{ width: "30%" }}>
                  <div className="lableinput">
                    <label>حالة الغرفة</label>
                  </div>

                          <select  className="inputtext"
                    value={Rooms_State}
                    onChange={(e) => setRooms_State(e.target.value)}
                    required
                              placeholder="Rooms_State">
                                                          <option>غير محجوزة</option>
                                <option>محجوزة</option>
                              <option>مغلقة</option>
                            </select>
                 
                </div>

                  <div style={{ width: "65%" }}>
                  <div className="lableinput">
                    <label>ملاحظات</label>
                  </div>

                  <input
                    className="inputtext"
                    value={Rooms_Note}
                    onChange={(e) => setRooms_Note(e.target.value)}
                    required
                    placeholder="Rooms_Note"
                   
                  />
            </div>
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
                  العودة الى اعددات الطوابق
                   <RiArrowGoBackFill size={20} />
          </Tag>
           </div>
          

        

        </div>

         
        
      </div>

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",display:"flex",flexWrap:"wrap" }}>

        {data.map((res, i) => 
          <div onClick={() => GoToMangeRoomMyplace(res.key)} key={i}  className={res.Rooms_State==="محجوزة" ?"roomres":"floorcontainer"   && res.Rooms_State==="مغلقة" ?"roomresclose":"floorcontainer"}>
            <div style={{fontWeight:800}}>رقم الغرفة :  {res.RoomsNumber}</div>
            <div>نوع الغرفة : {res.Rooms_Name_ar}</div>
             <div>عدد الاسره : {res.Rooms_bedtype_ar} سرير</div>
            <div> حالة الغرفة : {res.Rooms_State}</div>
            <div className="boxfloor">
<Tag onClick={()=>UpdateState(res)}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="green"
            >
                 Open
                   <BiDoorOpen size={15} />
          </Tag>
            <Tag
               onClick={() => UpdateState3(res)}
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
    </div>
  );
};

export default MangeRoomMyplace;

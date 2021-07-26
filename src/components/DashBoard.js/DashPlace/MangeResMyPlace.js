import React, { useEffect, useState } from "react";
import { Reservation } from "../../../agent";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Spin,
  Row,
  Col,
  Modal,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from "react-icons/hi";

import axios from "../../../utils/API";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { RiArrowGoBackFill } from "react-icons/ri";
import Cookies from "universal-cookie";
import { SideUserPlace } from "./SideUserPlace";

const MangeResMyPlace = () => {
  //const [IdUser, setIdUser] = useState(localStorage.getItem("userid"));
      const cookies = new Cookies();

  const [IdUser, setIdUser] = useState(cookies.get("userid"));

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
    history.push("AddNewReservation");
  };

  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
      Reservation.GetAllReservation(IdAppPlace).then((res) =>
        setdataProvince(res.data.data[0].Reservations)
      );
    } catch (error) {}
  }, []);

  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      Places_Name: "",
      IdApp: "",
      Rooms_Name: "",
      Rooms_ID: "",
      Room_No: "",
      Night_No: "",
      Adult_No: "",
      Chd_NO: "",
      Date_Arr: "",
      Date_Dep: "",
      Price_Res: "",
      State_Res: "",
      Adult_No: "",
      Person_FirstName: "",
      Person_LastName: "",
      Person_Email: "",
      Person_Phone: "",
      Person_DateOfBirth: "",
      Person_City: "",
      Person_IdPassport: "",
      Person_nationalidentity: "",
      ReservationState: "",
      IdAppUser: "",
      Price_Currency:""
    });
  } else {
    dataProvince.map((res, i) =>
      data.push({
        key: res.Reservations_ID,
        no: i + 1,
        Places_Name: res.Places_Name,
        Rooms_Name: res.Rooms_Name,
        Room_No: res.Room_No,
        Night_No: res.Night_No,
        Adult_No: res.Adult_No,
        Chd_NO: res.Chd_NO,
        Date_Arr: res.Date_Arr,
        Date_Dep: res.Date_Dep,
        Price_Res: res.Price_Res,
        Adult_No: res.Adult_No,
        ReservationState: res.ReservationState,
        IdAppUser: res.IdAppUser,
        IdApp: res.IdApp,
        Person_nationalidentity: res.Person_nationalidentity,
        Person_IdPassport: res.Person_IdPassport,
        Person_City: res.Person_City,
        Person_DateOfBirth: res.Person_DateOfBirth,
        Person_Phone: res.Person_Phone,
        Person_Email:res.Person_Email,
        Person_FirstName:res.Person_FirstName,
        Person_LastName:res.Person_LastName,
        Price_Currency:res.Price_Currency
      })
    );
  }

  const { confirm } = Modal;

  async function showConfirm(e) {
    setTimeout(async () => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا الحجز ؟ ",
        okText: "نعم",
        cancelText: "لا",
        async onOk() {
          const res = await axios.delete(`/ReservationPlaces/`, {
            data: { IdUser: IdUser, IdReservation: e.key },
          });

          if (res.status != 200) {
            message.error(res.data.message);
          } else {
            setTimeout(async () => {
              Reservation.GetAllReservation(IdAppPlace).then((res) =>
                setdataProvince(res.data.data[0].Reservations)
              );
              message.success("Delete");
            }, 1000);
          }
        },
        onCancel() {},
      });
    }, 1000);
  }

  const UpdateStatusActive = (e) => {
    Reservation.UpdateStatusActive(IdAppPlace, e.IdAppUser, e.key);
    setTimeout(() => {
      Reservation.GetAllReservation(IdAppPlace).then((res) =>
        setdataProvince(res.data.data[0].Reservations)
      );
    }, 500);
  };

  const UpdateStatusResCancel = (e) => {
    Reservation.UpdateStatusResCancel(IdAppPlace, e.IdAppUser, e.key);
    setTimeout(() => {
      Reservation.GetAllReservation(IdAppPlace).then((res) =>
        setdataProvince(res.data.data[0].Reservations)
      );
    }, 500);
  };

  const UpdateStatusInActive = (e) => {
    Reservation.UpdateStatusInActive(IdAppPlace, e.IdAppUser, e.key);
    setTimeout(() => {
      Reservation.GetAllReservation(IdAppPlace).then((res) =>
        setdataProvince(res.data.data[0].Reservations)
      );
    }, 500);
  };

  const UpdateData = () => {
    Reservation.GetAllReservation(IdAppPlace).then((res) =>
      setdataProvince(res.data.data[0].Reservations)
    );
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
          value={selectedKeys}
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
                searchText: selectedKeys,
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
      searchText: selectedKeys,
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const columns = [
   
    {
      title: "رقم الحجز",
      dataIndex: "key",
      key: "key ",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("key"),
    },
    {
      title: "اسم المكان",
      dataIndex: "Places_Name",
      key: "Places_Name ",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_Name"),
    },
    {
      title: "نوع الغرفة",
      dataIndex: "Rooms_Name",
      key: "Rooms_Name",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Rooms_Name"),
    },
    {
      title: "عدد الغرف",
      dataIndex: "Room_No",
      key: "Room_No",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Room_No"),
    },
    {
      title: "عدد الليالي",
      dataIndex: "Night_No",
      key: "Night_No",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Night_No"),
    },
    {
      title: "عدد البالغ",
      dataIndex: "Adult_No",
      key: "Adult_No",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Adult_No"),
    },
    ,
    {
      title: "عدد الاطفال",
      dataIndex: "Chd_NO",
      key: "Chd_NO",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Chd_NO"),
    },
    {
      title: "تاريخ الدخول",
      dataIndex: "Date_Arr",
      key: "Date_Arr",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Date_Arr"),
    },
    {
      title: "تاريخ الخروج",
      dataIndex: "Date_Dep",
      key: "Date_Dep",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Date_Dep"),
    },
    {
      title: "السعر الكلي",
      dataIndex: "Price_Res",
      key: "Price_Res",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Price_Res"),
    },
    {
      title: "العملة",
      dataIndex: "Price_Currency",
      key: "Price_Currency",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Price_Currency"),
    },
    {
      title: "حالة الحجز",
      dataIndex: "ReservationState",
      key: "ReservationState",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("ReservationState"),
    },
    {
      title: "Manage",
      dataIndex: "ReservationState",
      key: "ReservationState",

      render: (Status, record) => (
        <div style={{ display: "flex" }}>
         

          <div className="divwsel" onClick={() => UpdateState(record)}>
            <Tag color="blue">Details</Tag>
          </div>
        </div>
      ),
    },
  ];

  //Model Add State

  //Model Add State

  const [visibleState, setVisibleState] = useState(false);
  const [confirmLoadingState, setConfirmLoadingState] = useState(false);

 const [Person_FirstName, setPerson_FirstName] = useState("");
  
  const [Person_LastName, setPerson_LastName] = useState("");
  const [Person_Email, setPerson_Email] = useState("");
  const [Person_Phone, setPerson_Phone] = useState("");
  const [Person_DateOfBirth, setPerson_DateOfBirth] = useState("");
  const [Person_City, setPerson_City] = useState("");
  const [Person_IdPassport, setPerson_IdPassport] = useState("");
  const [Person_nationalidentity, setPerson_nationalidentity] = useState("");
  const [ReservationState, setReservationState] = useState("");
  const [Adult_No, setAdult_No] = useState("");
  const [Price_Res, setPrice_Res] = useState("");
  const [Date_Dep, setDate_Dep] = useState("");
  const [Date_Arr, setDate_Arr] = useState("");
  const [Chd_NO, setChd_NO] = useState("غير محجوزة");
 // const [Adult_No, setAdult_No] = useState("");
  const [Night_No, setNight_No] = useState("");
  const [Room_No, setRoom_No] = useState("");

    
      
  const [Rooms_Name, setRooms_Name] = useState("");
  const [Places_Name, setPlaces_Name] = useState("");
    const [Peron_City, setPeron_City] = useState("");
 const [Reservations_ID, setResrvations_ID] = useState("");
  

  const showModalState = () => {
    setVisibleState(true);
    setPerson_LastName("");
    setPerson_Phone("");
    setPerson_IdPassport("");

    setPerson_nationalidentity("");
    setPrice_Res("");
    setDate_Dep("");
    setChd_NO("");
    setAdult_No("");
    setNight_No("");

    setRoom_No("");
    setRooms_Name("");
    setPlaces_Name("");
     setPeron_City("");
    setResrvations_ID("");
   
  };

  const handleOkState = async () => {};

  const handleCancelState = () => {
    setVisibleState(false);
  };

  const UpdateState = (e) => {
    setVisibleState(true);
    setPerson_FirstName(e.Person_FirstName)
    setPerson_LastName(e.Person_LastName);
    setPerson_Phone(e.Person_Phone);
    setPerson_IdPassport(e.Person_IdPassport);

    setPerson_nationalidentity(e.Person_nationalidentity);
    setPrice_Res(e.Price_Res);
    setDate_Dep(e.Date_Dep);

    setChd_NO(e.Chd_NO);
    setAdult_No(e.Adult_No);
    setNight_No(e.Night_No);

    setRoom_No(e.Room_No);
    setRooms_Name(e.Rooms_Name);
    setPlaces_Name(e.Places_Name);

  setPeron_City(e.Person_City)
    setResrvations_ID(e.key);
  };

    const titelplace = cookies.get("titelplace")


  return (
   <div style={{ display: "flex", width: "100%" }} >
   <SideUserPlace />
          <div  className="widiv"  style={{ display: "flex",flexDirection:"column" }}>

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
        style={{
          justifyContent: "space-between",
          background: "rgb(229, 233, 234)",
          margin: 5,
          padding: "0px 5px",
        }}
      >
        <div
          style={{ padding: 5, display: "flex", justifyContent: "flex-start" }}
        >
          <Modal
            title="Reservation Details/ تفاصيل الحجز"
            visible={visibleState}
            onOk={handleOkState}
            confirmLoading={confirmLoadingState}
            onCancel={handleCancelState}
            okText="Update"
            width={1000}
            footer={[
              <div>
                <Button key="Cancel0" onClick={handleCancelState}>
                  Cancel
                </Button>
              </div>,
            ]}
          >
            <div className="contanerAddRommFloor">

               <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>الاسم الاول</label>
                </div>

                 <input
                  className="inputtext"
                  value={Person_FirstName}
                  onChange={(e) => setPerson_FirstName(e.target.value)}
                  
                  type="text"
                />

              </div>

              <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>الاسم الاخير</label>
                </div>
 <input
                  className="inputtext"
                  value={Person_LastName}
                  onChange={(e) => setPerson_LastName(e.target.value)}
                  
                  type="text"
                />
              
              </div>


              <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>رقم الهاتف</label>
                </div>

                <input
                  className="inputtext"
                  value={Person_Phone}
                 
                />
              </div>

              <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>رقم الهوية/الجواز</label>
                </div>

                <input
                  className="inputtext"
                  value={Person_IdPassport}
                 
                  
                />
              </div>

              <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>جنسية الشخص</label>
                </div>

                <input
                  className="inputtext"
                  value={Person_nationalidentity}
               
                                  />
              </div>

              <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>عنوان الشخص</label>
                </div>

                <input
                  className="inputtext"
                  value={Person_City}
                
                />
              </div>
             

           
            </div>
          </Modal>
        </div>

        <div
          style={{ padding: 5, display: "flex", justifyContent: "flex-start" }}
          className="acton"
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
              style={{
                padding: 10,
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
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
            <Tag  className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="red">
              حجز ملغي :{" "}
              {data.filter((res) => res.ReservationState === "Cancel").length}
            </Tag>
          </div>
          
          <div
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Tag  className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="blue">
              حجز نشط :{" "}
              {data.filter((res) => res.ReservationState === "Active").length}
            </Tag>
          </div>

          <div
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Tag  className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="yellow">
              حجز غير نشط :{" "}
              {data.filter((res) => res.ReservationState === "InActive").length}
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

      <div style={{ width: "100%", padding: "10px 15px",overflow:'auto'}}>
        <Table
          locale
          bordered
          columns={columns}
            dataSource={data.reverse()}
          pagination={{ pageSize: 3 }}
          key={1}
        />
      </div>
       </div>
    </div>
  );
};

export default MangeResMyPlace;

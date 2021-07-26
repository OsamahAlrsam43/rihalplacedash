import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { Offer } from "../../agent";
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
import { BiMessageSquareAdd } from "react-icons/bi";
import axios from "../../utils/API";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { RiArrowGoBackFill } from "react-icons/ri";
import Cookies from "universal-cookie";

const OfferPlaceMangePlace = () => {
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
    history.push("AddNewOffer");
  };

  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
      Offer.GetAllOfferOnePlace(IdAppPlace).then((res) =>
        setdataProvince(res.data.data)
      );
    } catch (error) {}
  }, []);

  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      Places_IdApp: "",
      no: "0",
      Places_name_ar: "0",
      Places_Address_ar: "0",
      Places_PriceBefore: "0",
      Places_discountPrice: "",
      Places_PriceNow: "0",
      Places_Price_Currency: "0",
      Places_OfferCatagory: "",
      OfferStartDate: "",
      OfferEndDate: "",
      Places_OfferState: "",
      Places_Price_Currency: "",
      Places_Description_ar: "",
      Places_Phone:""
      
    });
  } else {
    dataProvince.map((res, i) =>
      data.push({
        key: res.IdOffer,
        Places_IdApp: res.Places_IdApp,
        no: i + 1,
        Places_name_ar: res.Places_name_ar,
        Places_Address_ar: res.Places_Address_ar,
        Places_PriceBefore: res.Places_PriceBefore,
        Places_discountPrice: res.Places_discountPrice,
        Places_PriceNow: res.Places_PriceNow,

        Places_OfferCatagory: res.Places_OfferCatagory,
        OfferStartDate: res.OfferStartDate,
        OfferEndDate: res.OfferEndDate,
        Places_OfferState: res.Places_OfferState,
        Places_Price_Currency: res.Places_Price_Currency,
         Places_Description_ar: res.Places_Description_ar,
      Places_Phone:res.Places_Phone
      })
    );
  }

  const { confirm } = Modal;

  async function showConfirm(e) {
    setTimeout(async () => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا العرض ؟ ",
        okText: "نعم",
        cancelText: "لا",
        async onOk() {
          const res = await axios.delete(`/OfferPlaces/`, {
            data: { IdUser: IdUser, IdOffer: e.key },
          });

          if (res.status != 200) {
            message.error(res.data.message);
          } else {
            setTimeout(async () => {
              Offer.GetAllOfferOnePlace(IdAppPlace).then((res) =>
                setdataProvince(res.data.data)
              );
              message.success("Delete");
            }, 1000);
          }
        },
        onCancel() {},
      });
    }, 1000);
  }

  const UpdateData = () => {
    Offer.GetAllOfferOnePlace(IdAppPlace).then((res) =>
      setdataProvince(res.data.data)
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
      title: "اسم المكان",
      dataIndex: "Places_name_ar",
      key: "Places_name_ar ",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_name_ar "),
    },
    {
      title: "العنوان",
      dataIndex: "Places_Address_ar",
      key: "Places_Address_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_Address_ar"),
    },
    {
      title: "السعر الاصلي",
      dataIndex: "Places_PriceBefore",
      key: "Places_PriceBefore",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_PriceBefore"),
    },
    {
      title: "الخصم ",
      dataIndex: "Places_discountPrice",
      key: "Places_discountPrice",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_discountPrice"),
    },
    {
      title: "السعر الحالي",
      dataIndex: "Places_PriceNow",
      key: "Places_PriceNow",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_PriceNow"),
    },
    ,
    {
      title: "العملة",
      dataIndex: "Places_Price_Currency",
      key: "Places_Price_Currency",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_Price_Currency"),
    },
    {
      title: "المجموعة",
      dataIndex: "Places_OfferCatagory",
      key: "Places_OfferCatagory",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_OfferCatagory"),
    },
    {
      title: "تاريخ البدء",
      dataIndex: "OfferStartDate",
      key: "OfferStartDate",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("OfferStartDate"),
    },
    {
      title: "تاريخ الانتهاء",
      dataIndex: "OfferEndDate",
      key: "OfferEndDate",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("OfferEndDate"),
    },
    {
      title: "الحالة",
      dataIndex: "Places_OfferState",
      key: "Places_OfferState",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_OfferState"),
    },
    {
      title: "Manage",
      dataIndex: "Manage",
      key: "Manage",

      render: (text, record) => (
        <div style={{ display: "flex" }}>
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
  const [modalTexStatet, setModalTextState] = useState("Content of the modal");
  const [ModelStateAr, setStateAr] = useState("");
  const [ModelStateArPrice, setStateArPrice] = useState("0");
  const [ModelStateArCurncy, setStateArCurncy] = useState("USD");

  const showModalState = () => {
    setVisibleState(true);
    setStateAr("");
    setStateArPrice(0);
    setStateArCurncy("USD");
  };

  const handleOkState = async () => {
    Offer.AddNewOffer(
      IdAppPlace,
      ModelStateAr,
      ModelStateArPrice,
      ModelStateArCurncy
    );
    setConfirmLoadingState(true);
    setTimeout(async () => {
      Offer.GetAllOfferOnePlace(IdAppPlace).then((res) =>
        setdataProvince(res.data.data)
      );

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
  const [modalTexStatet2, setModalTextState2] = useState(
    "Content of the modal"
  );
  const [ModelStateAr2, setStateAr2] = useState("");
  const [ModelStateArPrice2, setStateArPrice2] = useState("0");
  const [ModelStateArCurncy2, setStateArCurncy2] = useState("USD");
  const [State_ID, setState_ID] = useState("");

  const handleOkState2 = async () => {
    Offer.UpdateOffer(
      IdAppPlace,
      ModelStateAr2,
      ModelStateArPrice2,
      ModelStateArCurncy2,
      State_ID
    );
    setConfirmLoadingState2(true);
    setTimeout(async () => {
      Offer.GetAllOfferOnePlace(IdAppPlace).then((res) =>
        setdataProvince(res.data.data)
      );
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
    cookies.set("IdOffer", e.key);
    cookies.set("locationback", window.location.pathname);

    history.push("UpdateOffer");
  };
    const titelplace = cookies.get("titelplace")

  return (
    <div style={{ background: "#eef8fe", height: "100vh" }}>
            <HeaderDashBoard Title={`${ titelplace} / اعدادات العروض `} />
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
            onClick={GoToAddNewRoom}
          >
            اضافة عرض جديد
            <BiMessageSquareAdd size={20} />
          </Tag>

          <Modal
            title="Add New Offer"
            visible={visibleState}
            onOk={handleOkState}
            confirmLoading={confirmLoadingState}
            onCancel={handleCancelState}
            okText="Add"
          >
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Name Offer</label>
              </div>

              <input
                className="inputtext"
                value={ModelStateAr}
                onChange={(e) => setStateAr(e.target.value)}
                required
                placeholder="Name Offer"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Price Offer</label>
              </div>

              <input
                className="inputtext"
                value={ModelStateArPrice}
                onChange={(e) => setStateArPrice(e.target.value)}
                required
                placeholder="Price Offer"
                type="number"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Currency Offer</label>
              </div>

              <select
                className="inputtext"
                value={ModelStateArCurncy}
                onChange={(e) => setStateArCurncy(e.target.value)}
                required
                placeholder="Price Offer"
              >
                <option>USD</option>
                <option>IQD</option>
              </select>
            </div>
          </Modal>

          <Modal
            title="Update Offer"
            visible={visibleState2}
            onOk={handleOkState2}
            confirmLoading={confirmLoadingState2}
            onCancel={handleCancelState2}
            okText="Update"
          >
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Name Offer</label>
              </div>

              <input
                className="inputtext"
                value={ModelStateAr2}
                onChange={(e) => setStateAr2(e.target.value)}
                required
                placeholder="Name Offer"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Price Offer</label>
              </div>

              <input
                className="inputtext"
                value={ModelStateArPrice2}
                onChange={(e) => setStateArPrice2(e.target.value)}
                required
                placeholder="Price Offer"
                type="number"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div className="lableinput">
                <label>Currency Offer</label>
              </div>

              <select
                className="inputtext"
                value={ModelStateArCurncy2}
                onChange={(e) => setStateArCurncy2(e.target.value)}
                required
                placeholder="Price Offer"
              >
                <option>USD</option>
                <option>IQD</option>
              </select>
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
            <Tag  className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="blue">
              عرض نشط :{" "}
              {data.filter((res) => res.Places_OfferState === "Active").length}
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
              عرض غير نشط :{" "}
              {
                data.filter((res) => res.Places_OfferState === "InActive")
                  .length
              }
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
              style={{
                padding: 10,
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="Tagclass"
              color="default"
            >
              الرجوع الى اعدادت المكان
              <RiArrowGoBackFill size={20} />
            </Tag>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", padding: "10px 15px" ,overflow:"auto" }}>
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

export default OfferPlaceMangePlace;

import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { Places } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import Cookies from "universal-cookie";


const PlaceMange = () => {
    const cookies = new Cookies();

  const history = useHistory();
  const GoToUpdatePlace = (e) => {
    cookies.set("IdAppPlace", e.key);
    cookies.set("titelplace", e.Places_name_ar);

    
    history.push("UpdatePlace");
  };

  const GoToAddPlace = (e) => {
    cookies.set("IdAppPlace", "");
    history.push("AddPlace");
  };

  
  const data = [];
  const [dataplace, setdataplace] = useState([]);

  useEffect(() => {
    try {
          Places.GetAllPlace().then((res) => setdataplace(res.data.data));

    } catch (error) {
      
    }
    
  }, []);



  if (dataplace.length<0) {
    data.push({ key: "0",
      no: "0",
      Places_name_ar: "0",
      Places_name_en: "0",
      Places_city_ar: "0",
      Places_city_en: "0",
      Places_Phone: "0",
      Places_Email: "0",
      Catagory: "0",
      tags: ["Active","InActive"]})
  }
  else {
     dataplace.map((res, i) =>
    data.push({
      key: res.IdApp,
      no: i + 1,
      Places_name_ar: res.Places_name_ar,
      Places_name_en: res.Places_name_en,
      Places_city_ar: res.Places_city_ar,
      Places_city_en: res.Places_city_en,
      Places_Phone: res.Places_Phone,
      Places_Email: res.Places_Email,
      Catagory: res.Catagory,
      tags: [res.Places_State],
    })
  );
  }
 

  const UpdateData = () => {
    Places.GetAllPlace().then((res) => setdataplace(res.data.data));
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
          placeholder={`Search ${dataIndex}`}
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
      title: "الاسم بالعربي",
      dataIndex: "Places_name_ar",
      key: "Places_name_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_name_ar"),
    },
    {
      title: "Places Name",
      dataIndex: "Places_name_en",
      key: "Places_name_en",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_name_en"),
      responsive: ["xl"],
    },
    {
      title: "المحافظة",
      dataIndex: "Places_city_ar",
      key: "Places_city_ar",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_city_ar"),
    },
    {
      title: "المدينة",
      dataIndex: "Places_city_en",
      key: "Places_city_en",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_city_en"),
      responsive: ["xl"],
    },
    {
      title: "الهاتف",
      dataIndex: "Places_Phone",
      key: "Places_Phone",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Places_Phone"),
      responsive: ["xl"],
    },
    {
      title: "Email",
      dataIndex: "Places_Email",
      key: "Places_Email",
      render: (text) => <div>{text}</div>,
      responsive: ["xl"],
    },

    {
      title: "الفئة",
      key: "Catagory",
      dataIndex: "Catagory",
      ...getColumnSearchProps("Catagory"),
      responsive: ["xl"],
      render: (Catagory) => (
        <>
          <Tag color="default" key={Catagory}>
            {Catagory}
          </Tag>
        </>
      ),
    },
    {
      title: "الحالة",
      key: "tags",
      dataIndex: "tags",
      ...getColumnSearchProps("Tags"),
      responsive: ["xl"],
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = "green";
            if (tag === "InActive") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Manage",
      dataIndex: "Manage",
      key: "Manage",

      render: (text, record) => (
        <div className="divwsel" onClick={() => GoToUpdatePlace(record)}>
          <Tag color="red">Manage</Tag>
        </div>
      ),
    },
  ];

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
      <HeaderDashBoard Title="اعدادات الاماكن" />
      {dataplace.length < 0 && (
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
          onClick={GoToAddPlace}
        >
          <Tag
            style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="orange"
          >
            اضافة مكان جديد
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
               className="Tagclass"
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
            }}className="Tagclass"
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
            }} className="Tagclass"
          >
            <Tag  className="Tagclass"style={{ padding: 10, fontWeight: 700 }} color="blue">
              مكان نشط : {data.filter((res) => res.tags[0] === "Active").length}
            </Tag>
          </div>

          <div
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "flex-start",
            }} className="Tagclass"
          >
            <Tag className="Tagclass" style={{ padding: 10, fontWeight: 700 }} color="yellow">
              مكان غير نشط :{" "}
              {data.filter((res) => res.tags[0] === "InActive").length}
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

export default PlaceMange;

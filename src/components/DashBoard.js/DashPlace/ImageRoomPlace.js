import React, { useEffect, useState } from "react";
import { ImageRooms } from "../../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message,Image} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd,BiDoorOpen } from 'react-icons/bi';
import axios ,{baseURLImg}from "../../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill,RiChatDeleteFill} from 'react-icons/ri';
import Cookies from "universal-cookie";
import { SideUserPlace } from "./SideUserPlace";


const ImageRoomPlace = () => {

           const cookies = new Cookies();

  const history = useHistory();
  
  const [Rooms_ID, setRooms_ID] = useState(
    cookies.get("Rooms_ID")
  );


  
  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );


  const GoToMangeCompany = (e) => {
   // localStorage.setItem("IdAppProvince", "");
    history.push("UpdateRoommyplace");
  };

  const GoToRoomImageRooms = (e) => {
    cookies.set("IdImageRooms",e.key)
    cookies.set("NameImageRooms",e.ImageRooms_Name_ar)
     history.push("RoomImageRooms");
  }
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
          ImageRooms.GetAllImageRooms(IdAppPlace,Rooms_ID).then((res) => setdataProvince(res.data.data));

    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      ImagesRoom_path: "",
     
      
    
  })
  }
  else {
     dataProvince.map((res, i) =>
    data.push({
      key: res.ImagesRoom_ID,
      no: i + 1,
        ImagesRoom_path: res.ImagesRoom_path,
       
     
    })
  );
  }
 
  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذه  الصورة ؟ ",
        okText:"نعم",cancelText:"لا",
      async  onOk() {
          axios.delete(`/ImageRoomplace/${IdAppPlace}`, {
            data: {
                "Rooms_ID": Rooms_ID,
              "ImagesRoom_ID": e
            }
            
          });
         
          
          setTimeout(async() => {
               const datastate = await ImageRooms.GetAllImageRooms(IdAppPlace,Rooms_ID)
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
     ImageRooms.GetAllImageRooms(IdAppPlace,Rooms_ID).then((res) => setdataProvince(res.data.data));
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
      title: "ImagesRoom_path",
      dataIndex: "ImagesRoom_path",
      key: "ImagesRoom_path",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("ImagesRoom_path"),
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


   const [Places_Image, setPlaces_Image] = useState({ file: "" });

  const [Places_Imageupload, setPlaces_Imageupload] = useState({
   file: window.location.origin + "/img/Noimage.jpg",
  });
    
    const handleChangeImage = (event) => {
    setPlaces_Imageupload({
      file: URL.createObjectURL(event.target.files[0]),
    });

    setPlaces_Image({
      file: event.target.files[0],
    });
  };

  
  const UpdateDetailsPlaceAndUpload = (file) => {
    const url = `/ImageRoomplace/addimageroom/${IdAppPlace}`;
    const formData = new FormData();
    formData.append("Rooms_ID", Rooms_ID);
    formData.append("Room_image", Places_Image.file);

    

    return axios.post(url, formData);
  };


  
  const UpdateDetailsPlace = async (e) => {
    try {
      if (Places_Imageupload.file === "") {
      message.error("error");
    } else {
      e.preventDefault();

      UpdateDetailsPlaceAndUpload(Places_Imageupload.file).then(
        (response) => {}
      );

        setConfirmLoadingState(true);
    setTimeout(async () => {
      
             ImageRooms.GetAllImageRooms(IdAppPlace,Rooms_ID).then((res) => setdataProvince(res.data.data))
     setVisibleState(false);
      setConfirmLoadingState(false);
      message.success("Add");
    }, 1000);
          
    }
    } catch (error) {
      console.log(error)
    }
    
  };


   const [visibleState, setVisibleState] = useState(false);
   const [confirmLoadingState, setConfirmLoadingState] = useState(false);  
   
  const showModalState = () => {
      setVisibleState(true);
      setPlaces_Imageupload({ file: window.location.origin + "/img/Noimage.jpg" })
  };

  const handleCancelState = () => {
    setVisibleState(false);
  };

const [ImagesRoom_ID, setImagesRoom_ID] = useState("")

    //Model Update State
  
  const UpdateDetailsPlaceAndUpload2 = (e) => {
    const url = `/ImageRoomplace/${IdAppPlace}`;
    const formData = new FormData();
    formData.append("Rooms_ID", Rooms_ID);
    formData.append("ImagesRoom_ID", ImagesRoom_ID);
    formData.append("Room_image", Places_Image.file);

    

    return axios.put(url, formData);
  };

   const UpdateState = (e) => {

   setVisibleState2(true);
   
       setImagesRoom_ID(e.key);
        setPlaces_Imageupload({
      file: `${baseURLImg}/${ e.ImagesRoom_path}`
    });

    setPlaces_Image({
      file: `${baseURLImg}/${ e.ImagesRoom_path}`
    });
      // handleChangeImage(e.ImagesRoom_path)
      
    };
    
  const UpdateDetailsPlace2 = async (e) => {
    try {
      if (Places_Imageupload.file === "") {
      message.error("error");
    } else {
    setConfirmLoadingState2(true);

      UpdateDetailsPlaceAndUpload2(e).then(()=>
        setTimeout(async () => {
      
             ImageRooms.GetAllImageRooms(IdAppPlace,Rooms_ID).then((res) => setdataProvince(res.data.data))
     setVisibleState2(false);
      setConfirmLoadingState2(false);
      message.success("Update");
    }, 500)
      );

   
          
    }
    } catch (error) {
      console.log(error)
    }
    
  };


   const [visibleState2, setVisibleState2] = useState(false);
   const [confirmLoadingState2, setConfirmLoadingState2] = useState(false);  
   
  const showModalState2 = () => {
      setVisibleState2(true);
      setPlaces_Imageupload({ file: window.location.origin + "/img/Noimage.jpg" })
  };

  const handleCancelState2 = () => {
    setVisibleState2(false);
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
اضافة صورة جديدة               <BiMessageSquareAdd size={20} />
            
          </Tag>

           <Modal
        title="Add New ImageRooms"
        visible={visibleState}
        onOk={UpdateDetailsPlace}
        confirmLoading={confirmLoadingState}
        onCancel={handleCancelState}
        okText="Add"
      >
      
  <div className="containerimag">
                <span className="lableinput">Room Image</span>
                <Image style={{maxHeight:"300px"}} width={"100%"} height={"100%"} src={Places_Imageupload.file} />

                <input
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                  multiple
                  style={{ background: "#ffeb3b", border: "1px solid black" }}
                  id="fileup"
                  hidden
                  accept="image/*"
                />
                <label className="selectfile " htmlFor="fileup">
                  اضغط هنا ليتم اختيار الصورة
                </label>
              </div>
             
      </Modal>
  <Modal
        title="Add New ImageRooms"
        visible={visibleState2}
        onOk={UpdateDetailsPlace2}
        confirmLoading={confirmLoadingState2}
        onCancel={handleCancelState2}
        okText="Update"
      >
      
  <div className="containerimag">
                <span className="lableinput">Room Image</span>
                <Image style={{maxHeight:"300px"}} width={"100%"} height={"100%"} src={Places_Imageupload.file} />

                <input
                  type="file"
                  onChange={(e) => handleChangeImage(e)}
                  multiple
                  style={{ background: "#ffeb3b", border: "1px solid black" }}
                  id="fileup"
                  hidden
                  accept="image/*"
                />
                <label className="selectfile " htmlFor="fileup">
                  اضغط هنا ليتم اختيار الصورة
                </label>
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

         
           <Tag
               onClick={GoToMangeCompany}
               style={{ padding: 10, fontWeight: 700,display:"flex",justifyContent:"space-between",alignItems:"center" }}
              className="Tagclass"
              color="default"
            >
                  العودة الى اعددات الغرفة
                   <RiArrowGoBackFill size={20} />
          </Tag>
           </div>
          

        

        </div>

         
        
      </div>

    
     

                

               
      
       <div style={{ width: "100%",padding:"10px 15px",display:"flex",flexWrap:"wrap" }}>

        {data.map((res, i) => 
            <div key={i} className="rommimagecontainer" >
                
               
                
      <Image style={{maxHeight:"300px"}} width={"100%"} height={"90%"} src={`${baseURLImg}/${res.ImagesRoom_path}`} />
         
           
            <div className="boxfloor">



            <Tag
               onClick={()=>UpdateState(res)}
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

export default ImageRoomPlace;

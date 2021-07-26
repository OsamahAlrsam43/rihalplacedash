import React, { useEffect, useState } from "react";
import HeaderDashBoard from "./HeaderDashBoard";
import { StateContry,Users } from "../../agent";
import { Table, Input, Button, Space, Tag, Spin,Row,Col,Modal ,message,Image} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { HiRefresh } from 'react-icons/hi';
import { BiMessageSquareAdd } from 'react-icons/bi';
import axios,{ baseURLImg, IdAppCompany } from "../../utils/API";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {  RiArrowGoBackFill} from 'react-icons/ri';
import Cookies from "universal-cookie";
import moment from "moment";


const PostUser = () => {

  const FORMAT = "YYYY ddd MMM DD HH:mm";

  const cookies = new Cookies();

  const [IdAppPlace, setIdAppPlace] = useState(
    cookies.get("IdAppPlace")
  );
  const [IdUser, setIdUser] = useState(cookies.get("userid"));
    const [IdUserReservation, setIdUserReservation] = useState(cookies.get("IdUserReservation"));

  const history = useHistory();
  
  

  const GoToMangeCompany = (e) => {
    // localStorage.setItem("IdAppProvince", "");
    history.push("UpdateUserAll");
  };

  
  const data = [];
  const [dataProvince, setdataProvince] = useState([]);

  useEffect(() => {
    try {
     Users.GetPostUserByIdUser(IdUserReservation).then((res) => setdataProvince(res.data.data[0].Posts));
    } catch (error) {
      
    }
    
  }, []);



  if (dataProvince.length < 0) {
    data.push({
      key: "0",
      no: "0",
      UserNameAddPost: "",
      UserIdAddPost: "",
      Post_Object: "",
      Post_Date: "",
      Post_Image: "",
      Post_Like: [],
      Posts_Comment: []
        
    
    })
  }
  else {
    dataProvince.map((res, i) =>
      data.push({
     
      
        key: res.Post_ID,
        no: i + 1,
        UserNameAddPost: res.UserNameAddPost,
        UserIdAddPost: res.UserIdAddPost,
        Post_Object: res.Post_Object,
        Post_Date: moment(res.Post_Date).format(FORMAT),
        Post_Image: `${baseURLImg}${res.Post_Image}`,
        Post_Like: res.Post_Like.length,
        Posts_Comment: res.Posts_Comment.length,
        Post_Like1: res.Post_Like,
        Posts_Comment1: res.Posts_Comment,
      })
    );
  }


  const [datalike, setdatalike] = useState([[{ UserName: "", DateLike: "",UserNameAddComment:"",Comment_Object:"" }]])

  const GetLikePost = (e) => {
    setdatalike(data.filter(ref => ref.key === e.key).map(res => res.Post_Like1))
    setVisibleState(true)
  }
 const GetCommentPost = (e) => {
    setdatalike(data.filter(ref => ref.key === e.key).map(res => res.Posts_Comment1))
    setVisibleState2(true)
  }
  

  const { confirm } = Modal;
  
  async function showConfirm(e) {

    
    setTimeout(async() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: "هل انت متأكد من حذف هذا المنشور ؟ ",
        okText:"نعم",cancelText:"لا",
        async onOk() {
        axios.delete('/PostsUser', {data:{"Posts_ID":e.key}});
        
     
           
 setTimeout(async() => {
          Users.GetPostUserByIdUser(IdUserReservation).then((res) => setdataProvince(res.data.data[0].Posts));
     message.success("Delete");

           
          }, 1000);

            
             
           
        },
        onCancel() {
         
        },
         
      });
       
    },1000);
  
   
  }

  const UpdateData = () => {
  Users.GetPostUserByIdUser(IdUserReservation).then((res) => setdataProvince(res.data.data[0].Posts)); };
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
      title: "موضوع المنشور",
      dataIndex: "Post_Object",
      key: "Post_Object",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Object"),
    },
    {
      title: "تاريخ النشر",
      dataIndex: "Post_Date",
      key: "Post_Date",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Date"),
    },
    {
      title: "عدد Like",
      dataIndex: "Post_Like",
      key: "Post_Like",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Post_Like"),
    },
     {
      title: "عدد Comment",
      dataIndex: "Posts_Comment",
      key: "Posts_Comment",
      render: (text) => <div>{text}</div>,
      ...getColumnSearchProps("Posts_Comment"),
    }
    ,
      {
      title: "الصورة",
      dataIndex: "Post_Image",
      key: "Post_Image",

      render: (text, record) => (
        <div style={{ display: "flex" }}>
            <Image style={{ maxHeight: "300px" }} width={"50px"} height={"50px"}
                  src={text} />
      
          </div>
      ),
    },
    {
      title: "Manage",
      dataIndex: "Post_Image",
      key: "Post_Image",

      render: (text, record) => (
        <div style={{ display: "flex" }}>
       
        <div className="divwsel" onClick={() => GetLikePost(record)}>
          <Tag color="blue">Like Details</Tag>
        </div>
       
              <div className="divwsel" onClick={() => GetCommentPost(record)}>
          <Tag color="green">Comment Details</Tag>
          </div>

            <div className="divwsel"  onClick={() => showConfirm(record)}>
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
  Users.GetPostUserByIdUser(IdUserReservation).then((res) => setdataProvince(res.data.data[0].Posts));      setStateAr("");
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
      
   Users.GetPostUserByIdUser(IdUserReservation).then((res) => setdataProvince(res.data.data[0].Posts));      setStateAr2("");
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
    history.push("UpdateUserAll");
    cookies.set("userid",e.key)
  };
      const titelplace = cookies.get("titeusername")

  return (
    <div style={{background:"#eef8fe",height:"100vh"}}>
          <HeaderDashBoard Title={`${ titelplace} / المنشورات`} />

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
                  العودة الى اعددات المستخدم
                   <RiArrowGoBackFill size={20} />
          </Tag>
           </div>
          

        

        </div>

         
        
      </div>

    
      <Modal
            title="Likes Details/ تفاصيل الاعجابات"
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
          {datalike[0].map((res, i)=>
            <div className="contanerAddRommFloor" style={{width:"100%"}} key={i}>
             <div style={{ width: "60%" }}>
                <div className="lableinput">
                  <label>اسم المستخدم</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.UserName}
                
                  
                  type="text"
                />

          </div>
           <div style={{ width: "30%" }}>
                <div className="lableinput">
                  <label>التاريخ</label>
                </div>

                 <input
                  className="inputtext"
                  value={moment(res.DateLike).format(FORMAT) }
               
                  
                  type="text"
                />

              </div>
              </div>
          )}
              
         </div>
          </Modal>

                
      <Modal
            title="Comments Details/ تفاصيل التعليقات"
            visible={visibleState2}
            onOk={handleOkState2}
            confirmLoading={confirmLoadingState2}
            onCancel={handleCancelState2}
            okText="Update"
            width={1000}
            footer={[
              <div>
                <Button key="Cancel0" onClick={handleCancelState2}>
                  Cancel
                </Button>
              </div>,
            ]}
      >
        <div className="contanerAddRommFloor">
          {datalike[0].map((res, i)=>
            <div className="contanerAddRommFloor" style={{width:"100%"}} key={i}>
             <div style={{ width: "25%" }}>
                <div className="lableinput">
                  <label>اسم المستخدم</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.UserNameAddComment}
                
                  
                  type="text"
                />

              </div>
               <div style={{ width: "50%" }}>
                <div className="lableinput">
                  <label>التعليق</label>
                </div>

                 <input
                  className="inputtext"
                  value={res.Comment_Object}
                
                  
                  type="text"
                />

          </div>
           <div style={{ width: "25%" }}>
                <div className="lableinput">
                  <label>التاريخ</label>
                </div>

                 <input
                  className="inputtext"
                  value={moment(res.DateComment).format(FORMAT) }
               
                  
                  type="text"
                />

              </div>
              </div>
          )}
              
         </div>
          </Modal>

               
      
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

export default PostUser;

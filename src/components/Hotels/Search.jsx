import React, {  useState } from "react";
import "./style.scss";
import moment from "moment";

import { Col, Input, Row, DatePicker, InputNumber, Button, Select } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { useHistory } from "react-router";
import { useStateValue } from "../../reducer/StateProvider";
import { actiontype } from "../../reducer/Reducer";
import { saveState } from "../../reducer/Reducer";

const Search = () => {
  const [{ serchdetails }, dispatch] = useStateValue();

  

  const dateFormat = "YYYY-MM-DD";

  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
    }
    
  const [wejha, setwejha] = useState(serchdetails[0].wejha);
  const [datewsool, setdatewsool] = useState(serchdetails[0].datewsool);
  const [datemgadera, setdatemgadera] = useState(serchdetails[0].datemgadera);
  const [adultnumber, setadultnumber] = useState(serchdetails[0].adultNo);
  const [childnumber, setchildnumber] = useState(serchdetails[0].chdNo);
  const [roomnumber, setroomnumber] = useState(serchdetails[0].Room);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const history = useHistory();

  const gotoserchform = () => {
    dispatch({
      type: actiontype.SET_SEARCH,
      items: [
        {
          wejha: wejha,
          datewsool: formatDate(moment(datewsool, dateFormat)),
          datemgadera: formatDate(moment(datemgadera, dateFormat)),
          adultNo: adultnumber,
          chdNo: childnumber,
          Room: roomnumber,
        },
      ],
    });
      saveState([
        {
          wejha: wejha,
          datewsool: formatDate(moment(datewsool, dateFormat)),
          datemgadera: formatDate(moment(datemgadera, dateFormat)),
          adultNo: adultnumber,
          chdNo: childnumber,
          Room: roomnumber,
        },
      ]);
     

      history.push("/HotelsSerchform", { from: "Search" });
    
      
    };


    const [datacity] = useState([{
          name:"بغداد",key:"1"
    },
        {
         name:"النجف الأشرف",key:"2"
     
        },
    {
        name:"اربيل",key:"3"
        },
    {
        name:"السليمانية",key:"4"
        },
    {
        name:"دهوك",key:"5"
        },
     {
        name:"كربلاء",key:"6"
        },
     {
        name:"البصرة",key:"7"
        },
    {
        name:"ذي قار",key:"8"
    },{
        name:"بابل",key:"9"
    }])

     
   
  return (
    <div className="Main_hotels">
      <h2 style={{ fontWeight: 600 }}>
        استكشف عروض الفنادق والشقق والبرامج السياحية وغيرها ...
      </h2>
      <div className="main_card_search">
        <Row>
          <Col
            style={{ padding: 5, textAlign: "center" }}
            xs={24}
            md={6}
            lg={6}
            xl={6}
          >
            <Select
              size="large"
              showSearch
              style={{ width: "100%" }}
              placeholder="ما هي وجهتك ... ؟ "
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.indexOf(input) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.localeCompare(optionB.children)
              }
              value={wejha}
              onChange={(e) => setwejha(e)}
                      >
                          {datacity.map((res, i) =>
                              <Option key={i} value={res.name}>{res.name}</Option>
                          )}
             
            </Select>
          </Col>

          <Col
            style={{ padding: 5, textAlign: "center", display: "flex" }}
            xs={24}
            md={8}
            lg={7}
            xl={7}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="تاريخ الوصول"
              size="large"
              format={dateFormat}
              disabledDate={disabledDate}
              onChange={(e, str) => setdatewsool(str)}
              defaultValue={moment(datewsool, dateFormat)}
            />

            <DatePicker
              style={{ marginRight: 5, width: "100%" }}
              placeholder="تاريخ المغادرة"
              size="large"
              format={dateFormat}
              disabledDate={disabledDate}
              onChange={(e, str) => setdatemgadera(str)}
              defaultValue={moment(datemgadera, dateFormat)}
            />
          </Col>

          <Col
            style={{
              padding: 5,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
            xs={24}
            md={8}
            lg={5}
            xl={5}
          >
            <Input
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={showModal}
              value={`${adultnumber} بالغ ${childnumber} طفل ${roomnumber} غرفة`}
              size="large"
              readOnly
            />
            <Modal
              title="اختيار عدد الاشخاص وعدد الغرف"
              okText="نعم"
              cancelText="الغاء"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Row>
                <Col
                  style={{
                    padding: 5,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                  span={24}
                >
                  <span style={{ width: "20%" }}>البالغ :</span>
                  <InputNumber
                    style={{ marginRight: 5, width: "80%" }}
                    min={1}
                    max={100}
                    value={adultnumber}
                    onChange={(e) => setadultnumber(e)}
                    size="large"
                  />
                </Col>

                <Col
                  style={{
                    padding: 5,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                  span={24}
                >
                  <span style={{ width: "20%" }}>الاطفال :</span>
                  <InputNumber
                    style={{ marginRight: 5, width: "80%" }}
                    min={0}
                    max={100}
                    value={childnumber}
                    onChange={(e) => setchildnumber(e)}
                    size="large"
                  />
                </Col>

                <Col
                  style={{
                    padding: 5,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                  span={24}
                >
                  <span style={{ width: "20%" }}>الغرف :</span>
                  <InputNumber
                    style={{ marginRight: 5, width: "80%" }}
                    min={1}
                    max={100}
                    value={roomnumber}
                    onChange={(e) => setroomnumber(e)}
                    size="large"
                  />
                </Col>
              </Row>
            </Modal>
          </Col>
          <Col
            style={{
              padding: 5,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
            xs={24}
            md={24}
            lg={6}
            xl={6}
          >
            <Button
              style={{ width: "100%", background: "#003580" }}
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              onClick={gotoserchform}
            >
              بحث
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Search;

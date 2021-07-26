import React from "react";
import { Card, Avatar, Col, Row, Rate } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const CardHotelsales2 = () => {
  const { Meta } = Card;

  return (
    <div>
      <Row>
        <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/22/79/2279644_v5.jpeg"
              />
            }
          >
            <Meta title="فنادق اربيل"/>
          </Card>
          </Col>


          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="https://zadturizm.com/uploads/advance_content/image/advance_content_fndk_tytanyyk_slymany_170928175404_b_all.jpg"
              />
            }
          >
            <Meta title="فنادق السيلمانية"/>
          </Card>
          </Col>


          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="https://cf.bstatic.com/images/hotel/max1024x768/799/7994849.jpg"
              />
            }
          >
            <Meta title="فنادق دهوك"/>
          </Card>
          </Col>

          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="http://photos.wikimapia.org/p/00/04/46/68/69_big.jpg"
              />
            }
          >
            <Meta title="فنادق البصرة"/>
          </Card>
          </Col>

          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="https://media-cdn.tripadvisor.com/media/photo-s/15/6d/9e/a5/blast-walls-now-surround.jpg"
              />
            }
          >
            <Meta title="فنادق بغداد"/>
          </Card>
          </Col>

          <Col  style={{
                padding: 5,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }} xs={12} md={8} lg={4} xl={4}>
                <Card
            hoverable
            bordered
            style={{ width: "100%",padding:10,border: "1px solid rgb(33 30 55)"}}
            cover={
              <img
              width="100px"
              height="150px"
                alt="example"
                src="https://cf.bstatic.com/images/hotel/max500/637/63770488.jpg"
              />
            }
          >
            <Meta title="فنادق كربلاء"/>
          </Card>
          </Col>

          
      </Row>
    </div>
  );
};

export default CardHotelsales2;

import { Rate } from "antd";
import React from "react";
import "./style.scss";

import { BsFillPersonFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { ImNotification } from "react-icons/im";

const HotelsSerchCard = ({
  imagehotel,
  namehotle,
  hotelsratestar,
  hotellocation,
  kmofcenter,
  roomtype,
  bedtype,
  withbreakfast,
  cancelfree,
  prepay,
  cancancel,
  Assess,
  Assessnumber,
  rateAssess,
  numbernight,
  adultnumber,
  chdnumber,
  pricenight,amla
}) => {
  return (
    <div className="search_hotels_main">
      <div className="hotels_search_details">
        <div className="hotels_search_details_div1">
          <img
            className="image_hotels"
            src={imagehotel} alt="1"
          />
        </div>

        <div className="hotels_search_details_div2">
          <div className="name_rate_hotels" style={{ display: "flex" }}>
            <h2 style={{ cursor: "pointer" }}>{namehotle}</h2>
            <Rate
              style={{ margin: "0 10px" }}
              disabled
              defaultValue={hotelsratestar}
            />
          </div>
          <div>
            <a href="/">{hotellocation}</a>

            <a href="/"> . الخارطة</a>
            <span> . {kmofcenter} كم عن المركز</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <h3 style={{ margin: "0 0 0 10px", fontWeight: 600 }}>
              {roomtype}
            </h3>
            <div>
              {" "}
              <span style={{ margin: "0 10px", fontWeight: 600 }}>
                {" "}
                -{" "}
              </span>{" "}
              <BsFillPersonFill size={15} /> <BsFillPersonFill size={15} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: "0 0 0 10px", fontWeight: 600 }}>{bedtype}</h4>
            <div>
              {" "}
              <span style={{ margin: "0 10px", fontWeight: 600 }}>
                {" "}
                -{" "}
              </span>{" "}
              <FaBed size={15} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <h4 style={{ margin: "5px 0 5px 10px", fontWeight: 600 }}>
              {withbreakfast}
            </h4>
            <span style={{ margin: "0 10px", fontWeight: 600 }}> - </span>
            <h4 style={{ margin: "5px 0 5px 10px", fontWeight: 600 }}>
              {cancelfree}
            </h4>
            <span style={{ margin: "0 10px", fontWeight: 600 }}> - </span>
            <h4 style={{ margin: "5px 0 5px 10px", fontWeight: 600 }}>
              {prepay}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <ImNotification
              style={{ margin: "0 0 0 5px", fontWeight: 600, color: "red" }}
            />
            <h3
              style={{ margin: "0 0 0 10px", fontWeight: 600, color: "green" }}
            >
              {cancancel}
            </h3>
          </div>
        </div>

        <div className="hotels_search_details_div3">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <div style={{ margin: 10, lineHeight: 1 }}>
              <h4>{Assess}</h4>
              <h4>{Assessnumber} تقيم</h4>
            </div>
            <div className="div_view_number">{rateAssess}</div>
          </div>

          <div className="ditals_room">
            <div> {numbernight} ليلة</div>
            <span style={{ margin: "0 10px", fontWeight: 600 }}> - </span>
            <div>{adultnumber} بالغ</div>
            <span style={{ margin: "0 10px", fontWeight: 600 }}> - </span>
            <div>{chdnumber} طفل</div>
          </div>

          <div style={{ display: "flex", position: "relative", padding: 25 }}>
            <div className="div_hotels_price">
              {pricenight} - {amla}
              <div className="div_write_price">اقل سعر</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsSerchCard;
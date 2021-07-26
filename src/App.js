import React, { Suspense, useEffect } from "react";
//import {Auth}  from './agent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Login from "./components/Login/Login.jsx";
import Hotels from "./components/Hotels/Hotels.jsx";
import Shqaq from "./components/Shqaq/Shqaq.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HotelsSerchform from "./components/Hotels/HotelsSerchform";

import i18n from "./i18n";
import HotelsDeatailsConf from "./components/Hotels/HotelsDeatailsConf.jsx";
import GalleryHotels from "./components/Hotels/GalleryHotels.jsx";
import ReservationHotel from "./components/Hotels/ReservationHotel.jsx";
import Resultshotels from "./components/Hotels/Resultshotels.jsx";
import DashBoradAdmin from "./components/DashBoard.js/DashBoradAdmin.js";
import CompanySetting from "./components/DashBoard.js/CompanySetting.js";
import PlaceMange from "./components/DashBoard.js/PlaceMange.js";
import UpdatePlace from "./components/DashBoard.js/UpdatePlace.js";
import AddPlace from "./components/DashBoard.js/AddPlace.js";
import ProvinceManage from "./components/DashBoard.js/ProvinceManage.js";
import Category from "./components/DashBoard.js/Category.js";
import ContactMange from "./components/DashBoard.js/ContactMange.js";
import AddUserToPlace from "./components/DashBoard.js/AddUserToPlace.js";
import ManageUserInPlace from "./components/DashBoard.js/ManageUserInPlace.js";
import UpdateUserToPlace from "./components/DashBoard.js/UpdateUserToPlace.js";
import ServicesManage from "./components/DashBoard.js/ServicesManage.js";
import FloorManage from "./components/DashBoard.js/FloorManage.js";
import RoomFloor from "./components/DashBoard.js/RoomFloor.js";
import RoomManage from "./components/DashBoard.js/RoomManage.js";
import AddNewRoom from "./components/DashBoard.js/AddNewRoom.js";
import UpdateRoom from "./components/DashBoard.js/UpdateRoom.js";
import ImageRoom from "./components/DashBoard.js/ImageRoom.js";
import AddImageToPlace from "./components/DashBoard.js/AddImageToPlace.js";
import OfferPlaceMange from "./components/DashBoard.js/OfferPlaceMange.js";
import UpdateOffer from "./components/DashBoard.js/UpdateOffer.js";
import ImageOffer from "./components/DashBoard.js/ImageOffer.js";
import AddNewOffer from "./components/DashBoard.js/AddNewOffer.js";
import OfferPlaceMangePlace from "./components/DashBoard.js/OfferPlaceMangePlace.js";
import ReservatinPlaceMange from "./components/DashBoard.js/ReservatinPlaceMange.js";
import ReviewPlaceManage from "./components/DashBoard.js/ReviewPlaceManage.js";
import NotiPlace from "./components/DashBoard.js/NotiPlace.js";
import AdminManage from "./components/DashBoard.js/AdminManage.js";
import AddAdmin from "./components/DashBoard.js/AddAdmin.js";
import UpdateAdmin from "./components/DashBoard.js/UpdateAdmin.js";
import NotiPlaceMamange from "./components/DashBoard.js/NotiPlaceMamange.js";
import LoginAdmin from "./components/DashBoard.js/LoginAdmin.js";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageAllUser from "./components/DashBoard.js/ManageAllUser.js";
import UpdateUserAll from "./components/DashBoard.js/UpdateUserAll.js";
import PostUser from "./components/DashBoard.js/PostUser.js";
import ReservationUser from "./components/DashBoard.js/ReservationUser.js";
import NotiUsersMange from "./components/DashBoard.js/NotiUsersMange.js";
import DashboradPlace from "./components/DashBoard.js/DashboradPlace.js";
import DashUserPlace from "./components/DashBoard.js/DashPlace/DashUserPlace";
import MangeMyPlace from "./components/DashBoard.js/DashPlace/MangeMyPlace.js";
import MangeUserMyPlace from "./components/DashBoard.js/DashPlace/MangeUserMyPlace.js";
import MangeFloorMyPlace from "./components/DashBoard.js/DashPlace/MangeFloorMyPlace.js";
import MangeResMyPlace from "./components/DashBoard.js/DashPlace/MangeResMyPlace.js";
import MangeRoomMyplace from "./components/DashBoard.js/DashPlace/MangeRoomMyplace.js";
import MangeOfferMyPlace from "./components/DashBoard.js/DashPlace/MangeOfferMyPlace.js";
import LoginPlace from "./components/DashBoard.js/DashPlace/LoginPlace.js";
import Updatausermyplace from "./components/DashBoard.js/DashPlace/Updatausermyplace.js";
import UserAddToMyPlace from "./components/DashBoard.js/DashPlace/UserAddToMyPlace.js";
import MangeAllRoom from "./components/DashBoard.js/DashPlace/MangeAllRoom.js";
import AddNewRoommyplace from "./components/DashBoard.js/DashPlace/AddNewRoommyplace.js";
import UpdateRoommyplace from "./components/DashBoard.js/DashPlace/UpdateRoommyplace.js";
import ImageRoomPlace from "./components/DashBoard.js/DashPlace/ImageRoomPlace.js";
import MangeServiceMyPlace from "./components/DashBoard.js/DashPlace/MangeServiceMyPlace.js";
import MangeImagesMyPlace from "./components/DashBoard.js/DashPlace/MangeImagesMyPlace.js";
import MangeNotifictionMyPlace from "./components/DashBoard.js/DashPlace/MangeNotifictionMyPlace.js";
import ProtectedPlaceRoute from "./components/ProtectedPlaceRoute.js";
const App = ({ dir, lang }) => {
  //Auth.login(0,0).then(res=>localStorage.setItem("token",res.data.token));
  ///Auth.current().then(res=>console.log(res.data[0]));

  useEffect(() => {
    if (i18n.language === "ar") {
      localStorage.setItem("langweb", "rtl");
    } else {
      localStorage.setItem("langweb", "ltr");
    }
  });

  return (
    <div dir={dir} lang={lang}>
      <Suspense fallback={<div>Loading</div>}>
        <Router>
          {/*    <Header />*/}
          <Switch>
         
             <Route exact path="/" component={LoginPlace} />
             <Route path="/LoginPlace" component={LoginPlace} />{" "}
            <ProtectedPlaceRoute path="/DashUserPlace" Component={DashUserPlace} />{" "}
            <ProtectedPlaceRoute path="/MangeMyPlace" Component={MangeMyPlace} />{" "}
            <ProtectedPlaceRoute path="/MangeUserMyPlace" Component={MangeUserMyPlace} />{" "}
             <ProtectedPlaceRoute path="/MangeResMyPlace" Component={MangeResMyPlace} />{" "}
            <ProtectedPlaceRoute path="/MangeRoomMyplace" Component={MangeRoomMyplace} />{" "}
            <ProtectedPlaceRoute path="/MangeFloorMyPlace" Component={MangeFloorMyPlace} />{" "}
             <ProtectedPlaceRoute path="/MangeOfferMyPlace" Component={MangeOfferMyPlace} />{" "}

            <ProtectedPlaceRoute path="/MangeServiceMyPlace" Component={MangeServiceMyPlace} />{" "}
            <ProtectedPlaceRoute path="/MangeImagesMyPlace" Component={MangeImagesMyPlace} />{" "}
               <ProtectedPlaceRoute path="/MangeNotifictionMyPlace" Component={MangeNotifictionMyPlace} />{" "}

            
            <ProtectedPlaceRoute path="/Updatausermyplace" Component={Updatausermyplace} />{" "}
            <ProtectedPlaceRoute path="/UserAddToMyPlace" Component={UserAddToMyPlace} />{" "}
            <ProtectedPlaceRoute path="/MangeAllRoom" Component={MangeAllRoom} />{" "}
            <ProtectedPlaceRoute path="/AddNewRoommyplace" Component={AddNewRoommyplace} />{" "}
            <ProtectedPlaceRoute path="/UpdateRoommyplace" Component={UpdateRoommyplace} />{" "}
            <ProtectedPlaceRoute path="/ImageRoomPlace" Component={ImageRoomPlace} />{" "}



          </Switch>
          {/* <Contact/>*/}
          {/*  <Footer/>*/}
        </Router>
      </Suspense>
    </div>
  );
};

export default App;

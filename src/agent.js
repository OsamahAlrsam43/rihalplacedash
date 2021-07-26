import axios from "./utils/API"
import Cookies from "universal-cookie";
const cookies = new Cookies();

const IduserAdmin = cookies.get("userid")
const requests = {
  del: (url, id) =>
    axios.delete(`${url}/${id}`),
  get: url =>
    axios.get(`${url}`),
  put: (url, body) =>
    axios.put(`${url}`, body),
  post: (url ,body) =>
    axios.post(`${url}`, body),

};

const Auth = {
  current: () =>
    requests.get('/users'),
  login: (Phone, Password) =>
    requests.post(`/users/login`, { "Phone":Phone, "Password":Password}),
  register: (username, email, password) =>
    requests.post('/users', {
      user: {
        username,
        email,
        password
      }
    }),
  save: user =>
    requests.put('/user', {
      user
    })
};


//Users
const AuthUser = {
  CheckToken : () => requests.get(`/auth/`)
}
const Users = {
   getAll: (IdUser) => requests.post('/users/GetAllUser', {"IdUser": IdUser}),
    GetOneUserByIdUser: (IdUser) => requests.get(`/users/${IdUser}`),
  GetAllUsersInplace: (IdApp,IdUser) => requests.post('/users/GetAllUsersInplace/', {"IdApp": IdApp,
    "IdUser": IdUser
  }),
  
  GetPostUserByIdUser: (IdUser) => requests.get(`/PostsUser/${IdUser}`),
  GetAllPostUser: (IdUser) => requests.get(`/PostsUser/`),
   GetAllReservation : () => requests.get(`/ReservationPlaces/reservation/all/`)
};

//Hotels 

const Hotels = {
  getAllHotels: () => requests.get('/hotel'),

  getHotelById: (idhotel) => requests.get(`/hotel/${idhotel}`),

}
//OfferHotel
const OfferHotel = {
  getAllOfferHotel: () => requests.get('/OfferHotel'),

  AddNewOfferHotel: (Hotel_Image, Hotel_name, Hotel_Address, Hotel_RateStar, Hotel_PriceBefore, Hotel_PriceNow, Amla, Hotel_OfferState) => requests.post('/OfferHotel', {
    Hotel_Image,
    Hotel_name,
    Hotel_Address,
    Hotel_RateStar,
    Hotel_PriceBefore,
    Hotel_PriceNow,
    Amla,
    Hotel_OfferState
  }),

  UpdateOfferHotel: (Hotel_Image, Hotel_name, Hotel_Address, Hotel_RateStar, Hotel_PriceBefore, Hotel_PriceNow, IdOffer, Amla, Hotel_OfferState) => requests.put('/OfferHotel', {
    Hotel_Image,
    Hotel_name,
    Hotel_Address,
    Hotel_RateStar,
    Hotel_PriceBefore,
    Hotel_PriceNow,
    IdOffer,
    Amla,
    Hotel_OfferState
  }),

  DeleteOfferHotel: (IdOffer) => requests.put('/OfferHotel', {
    IdOffer
  }),

}


const CompanySet = {
  SaveCompany: (NameCompany_ar,
    NameCompany_en,
    NameCompany_ku,
    Logo,
    Email,
    Email2,
    Email3,
    Phone1,
    Phone2,
    Phone3,
    Address_ar,
    Address_en,
    Address_ku,
    Company_Description_ar,
    Company_Description_en,
    Company_Description_ku, IdUser, IdApp) => requests.put('/Company', {
    "IdUser": IdUser,
    "NameCompany_ar": NameCompany_ar,
    "NameCompany_en": NameCompany_en,
    "NameCompany_ku": NameCompany_ku,
    "Logo": Logo,
    "Email": Email,
    "Email2": Email2,
    "Email3": Email3,
    "Phone1": Phone1,
    "Phone2": Phone2,
    "Phone3": Phone3,
    "Address_ar": Address_ar,
    "Address_en": Address_en,
    "Address_ku": Address_ku,
    "IdApp": IdApp,
    "Company_Description_ar": Company_Description_ar,
    "Company_Description_en": Company_Description_en,
    "Company_Description_ku": Company_Description_ku
  }),
  GetDetailsCompanyBiId: (IdCompany, IdUser) => requests.post(`/Company/${IdCompany}`, {
    "IdUser": IdUser
  })
}

const Places = {

  GetAllPlace: () => requests.post('/Places/getplace/all/', { "IdUser": IduserAdmin }),
  GetPlaceByIdApp: (IdApp) => requests.get(`/Places/${IdApp}`),

}

const Category = {

  AddNewCategory: (IdAppCompany, Name) => requests.post(`/CategoryPlaces/`, {
    "IdAppCompany": IdAppCompany,
    "Name": Name, IduserAdmin,
    "IdUser":IduserAdmin
  }),
  UpdateCategory: (IdAppCompany, Name, CategoryPlaces_ID, Name_ar) => requests.put(`/CategoryPlaces/`, {

    "IdAppCompany": IdAppCompany,
    "CategoryPlaces_ID": CategoryPlaces_ID,
    "Name": Name,
    "Name_ar": Name,
    "IdUser":IduserAdmin

  }),
  GetAllCategory: (IdCompany) => requests.get(`/CategoryPlaces/${IdCompany}`),

}


const Service = {

  AddNewService: (IdAppCompany, Name,Price,Currency) => requests.post(`/ServicePlaces/`, {
    "IdAppCompany": IdAppCompany,
    "Name": Name,"Price": Price,"Currency": Currency
  }),
  UpdateService: (IdAppCompany, Name, Price, Currency,ServicePlaces_ID) => requests.put(`/ServicePlaces/`, {
    "IdAppCompany": IdAppCompany,
    "Name": Name, "Price": Price, "Currency": Currency,"ServicePlaces_ID":ServicePlaces_ID
  }),
  GetAllService: (IdCompany) => requests.get(`/ServicePlaces/${IdCompany}`),

}

const Floor = {

  AddNewFloor: (IdPlaces, Floors_Name_ar,Floors_Name_en,Floors_Name_ku,Floor_State) => requests.post(`/Floorplace/${IdPlaces}`, {
    "Floors_Name_ar": Floors_Name_ar,"Floors_Name_en": Floors_Name_en,"Floors_Name_ku": Floors_Name_ku,"Floor_State":Floor_State
  }),
  UpdateFloor: (IdPlaces, Floors_Name_ar,Floors_Name_en,Floors_Name_ku,Floor_State,Floors_ID) => requests.put(`/Floorplace/${IdPlaces}`, {
    "Floors_Name_ar": Floors_Name_ar, "Floors_Name_en": Floors_Name_en, "Floors_Name_ku": Floors_Name_ku,"Floor_State":Floor_State,"Floors_ID":Floors_ID
  }),
  GetAllFloor: (IdPlaces) => requests.get(`/Floorplace/${IdPlaces}`),
  GetAllRoomInFloor: (IdApp,IdFloor) => requests.get(`/RoomFloorplace/${IdApp}&${IdFloor}`),

  AddNewRoomToFloor:(IdApp,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber) => requests.post(`/RoomFloorplace/${IdApp}&${IdFloor}`, {
                        "Rooms_Name_ar": Rooms_Name_ar,
                        "Rooms_bedtype_ar":Rooms_bedtype_ar,
                        "Rooms_Space":Rooms_Space,
                        "Rooms_Services_ar": Rooms_Services_ar,
                        "Rooms_priceAdult":Rooms_priceAdult,
                        "Rooms_priceChild": Rooms_priceChild,
                        "Price_Currency": Price_Currency,
                        "Rooms_State": Rooms_State,
                        "Rooms_ResDate": Rooms_ResDate,
                        "Rooms_ArvDate": Rooms_ArvDate,
                        "Rooms_ResNumberNight": Rooms_ResNumberNight,
                        "Romms_PersonNumber": Romms_PersonNumber,
                        "Rooms_Note": Rooms_Note,
                        "RoomsNumber":RoomsNumber
                       
                    }),
                    
  UpdateRoomToFloor:(IdApp,IdFloor, Rooms_Name_ar,Rooms_bedtype_ar,Rooms_Space,Rooms_Services_ar,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_State,Rooms_ResDate,Rooms_ArvDate,Rooms_ResNumberNight,Romms_PersonNumber,Rooms_Note,RoomsNumber,RoomsId) => requests.put(`/RoomFloorplace/${IdApp}&${IdFloor}`, {
                        "Rooms_Name_ar": Rooms_Name_ar,
                        "Rooms_bedtype_ar":Rooms_bedtype_ar,
                        "Rooms_Space":Rooms_Space,
                        "Rooms_Services_ar": Rooms_Services_ar,
                        "Rooms_priceAdult":Rooms_priceAdult,
                        "Rooms_priceChild": Rooms_priceChild,
                        "Price_Currency": Price_Currency,
                        "Rooms_State": Rooms_State,
                        "Rooms_ResDate": Rooms_ResDate,
                        "Rooms_ArvDate": Rooms_ArvDate,
                        "Rooms_ResNumberNight": Rooms_ResNumberNight,
                        "Romms_PersonNumber": Romms_PersonNumber,
                        "Rooms_Note": Rooms_Note,
                        "RoomsNumber":RoomsNumber,
                        "RoomsId": RoomsId
                    }),
}


const StateContry = {

  AddNewState: (IdAppCompany, NameState_ar, NameState_en, NameState_ku) => requests.post(`/StateContry/`, {
    "IdAppCompany": IdAppCompany,
    "NameState_ar": NameState_ar,
    "NameState_en": NameState_en,
    "NameState_ku": NameState_ku,
     "IdUser":IduserAdmin
  }),
  UpdateState: (IdAppCompany, NameState_ar, NameState_en, NameState_ku, State_ID) => requests.put(`/StateContry/`, {
    "IdAppCompany": IdAppCompany,
    "NameState_ar": NameState_ar,
    "NameState_en": NameState_en,
    "NameState_ku": NameState_ku,
    "State_ID": State_ID,
     "IdUser":IduserAdmin
  }),
  
  GetAllStateContry: (IdCompany) => requests.get(`/StateContry/${IdCompany}`),

}


const ContactUs = {

  GetAllContactUs: (IdCompany) => requests.post(`/Contact/getallcontactus/${IdCompany}`,{"IdUser":IduserAdmin}),
  UpdateStatusReadConatct: (IdCompany, Contact_ID) => requests.put(`/Contact/UpdateStatusReadConatct`, {
    "IdAppCompany": IdCompany,
    "Contact_ID": Contact_ID,
      "IdUser":IduserAdmin
  }),
  UpdateStatusNoReadConatct: (IdCompany, Contact_ID) => requests.put(`/Contact/UpdateStatusNoReadConatct`, {
    "IdAppCompany": IdCompany,
    "Contact_ID": Contact_ID,
     "IdUser":IduserAdmin
  }),


}


const Rooms = {

  AddNewRooms: (IdPlaces, Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency
  ) => requests.post(`/Roomplace/${IdPlaces}`, {
    "Rooms_Name_ar": Rooms_Name_ar,
    "Rooms_Name_en": Rooms_Name_en,
    "Rooms_Name_ku": Rooms_Name_ku,
    "Rooms_bedtype_ar": Rooms_bedtype_ar,
    "Rooms_bedtype_en": Rooms_bedtype_en,
    "Rooms_bedtype_ku": Rooms_bedtype_ku,
    "Rooms_Space": Rooms_Space,
    "Rooms_Services_ar": Rooms_Services_ar,
    "Rooms_Services_en": Rooms_Services_en,
    "Rooms_Services_ku": Rooms_Services_ku,
    "Rooms_priceAdult": Rooms_priceAdult,
    "Rooms_priceChild": Rooms_priceChild,
    "Price_Currency": Price_Currency
}),
  UpdateRooms: (IdPlaces, Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_ID
  ) => requests.put(`/Roomplace/${IdPlaces}`, {
    "Rooms_Name_ar": Rooms_Name_ar,
    "Rooms_Name_en": Rooms_Name_en,
    "Rooms_Name_ku": Rooms_Name_ku,
    "Rooms_bedtype_ar": Rooms_bedtype_ar,
    "Rooms_bedtype_en": Rooms_bedtype_en,
    "Rooms_bedtype_ku": Rooms_bedtype_ku,
    "Rooms_Space": Rooms_Space,
    "Rooms_Services_ar": Rooms_Services_ar,
    "Rooms_Services_en": Rooms_Services_en,
    "Rooms_Services_ku": Rooms_Services_ku,
    "Rooms_priceAdult": Rooms_priceAdult,
    "Rooms_priceChild": Rooms_priceChild,
    "Price_Currency": Price_Currency,
    "Rooms_ID": Rooms_ID,
}),
  GetAllRooms: (IdPlaces) => requests.get(`/Roomplace/${IdPlaces}`),
  GetOneRooms: (IdPlaces,Rooms_ID) => requests.get(`/Roomplace/OneRoom/${IdPlaces}&${Rooms_ID}`),

}



const Offer = {

  AddNewOffer: (IdPlaces, Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency
  ) => requests.post(`/Roomplace/${IdPlaces}`, {
    "Rooms_Name_ar": Rooms_Name_ar,
    "Rooms_Name_en": Rooms_Name_en,
    "Rooms_Name_ku": Rooms_Name_ku,
    "Rooms_bedtype_ar": Rooms_bedtype_ar,
    "Rooms_bedtype_en": Rooms_bedtype_en,
    "Rooms_bedtype_ku": Rooms_bedtype_ku,
    "Rooms_Space": Rooms_Space,
    "Rooms_Services_ar": Rooms_Services_ar,
    "Rooms_Services_en": Rooms_Services_en,
    "Rooms_Services_ku": Rooms_Services_ku,
    "Rooms_priceAdult": Rooms_priceAdult,
    "Rooms_priceChild": Rooms_priceChild,
    "Price_Currency": Price_Currency
}),
  UpdateOffer: (IdPlaces, Rooms_Name_ar, Rooms_Name_en, Rooms_Name_ku, Rooms_bedtype_ar, Rooms_bedtype_en, Rooms_bedtype_ku,
  Rooms_Space,Rooms_Services_ar,Rooms_Services_en,Rooms_Services_ku,Rooms_priceAdult,Rooms_priceChild,Price_Currency,Rooms_ID
  ) => requests.put(`/Roomplace/${IdPlaces}`, {
    "Rooms_Name_ar": Rooms_Name_ar,
    "Rooms_Name_en": Rooms_Name_en,
    "Rooms_Name_ku": Rooms_Name_ku,
    "Rooms_bedtype_ar": Rooms_bedtype_ar,
    "Rooms_bedtype_en": Rooms_bedtype_en,
    "Rooms_bedtype_ku": Rooms_bedtype_ku,
    "Rooms_Space": Rooms_Space,
    "Rooms_Services_ar": Rooms_Services_ar,
    "Rooms_Services_en": Rooms_Services_en,
    "Rooms_Services_ku": Rooms_Services_ku,
    "Rooms_priceAdult": Rooms_priceAdult,
    "Rooms_priceChild": Rooms_priceChild,
    "Price_Currency": Price_Currency,
    "Rooms_ID": Rooms_ID,
}),
  GetAllOffer: () => requests.get(`/OfferPlaces/`),
  GetAllOfferOnePlace: (IdAppPlace) => requests.get(`/OfferPlaces/one/${IdAppPlace}`),

  GetOneOffer: (IdOffer) => requests.get(`/OfferPlaces/oneoffer/${IdOffer}`, { data: { "IdUser": "YHF6Dd6o" } }),

}



const ImageRooms = {

  GetAllImageRooms: (IdApp,Rooms_ID) => requests.post(`/ImageRoomplace/${IdApp}`,{
    "Rooms_ID": Rooms_ID
}),
  UpdateImageRooms: (IdApp, Contact_ID) => requests.put(`/ImageRoomplace/UpdateStatusReadConatct`, {
    "IdAppCompany": IdApp,
    "Contact_ID": Contact_ID
  }),
  UpdateImageRooms: (IdApp, Contact_ID) => requests.put(`/ImageRoomplace/UpdateStatusNoReadConatct`, {
    "IdAppCompany": IdApp,
    "Contact_ID": Contact_ID
  }),


}


const ImageOffers = {

  GetAllImageOffers: (IdOffer) => requests.post(`/ImagesOffer/${IdOffer}`),
 

}


const ImagePlacs = {

  GetAllImageImagePlacs: (IdApp) => requests.get(`/ImagesPlaces/${IdApp}`),
  
  UpdateImageImagePlacs: (IdApp, Contact_ID) => requests.put(`/ImageRoomplace/UpdateStatusReadConatct`, {
    "IdAppCompany": IdApp,
    "Contact_ID": Contact_ID
  }),
  UpdateImageImagePlacs: (IdApp, Contact_ID) => requests.put(`/ImageRoomplace/UpdateStatusNoReadConatct`, {
    "IdAppCompany": IdApp,
    "Contact_ID": Contact_ID
  }),


}




const Reservation = {

  
  GetAllReservation: (IdAppPlace) => requests.get(`/ReservationPlaces/${IdAppPlace}`),
  LengthAllReservation :(IdAppPlace) => requests.get(`/ReservationPlaces/${IdAppPlace}`).then(res=>res.length),
    UpdateStatusActive: (IdAppPlace,IdAppUser,Reservations_ID) => requests.put(`/ReservationPlaces/ResActive/${IdAppPlace}/${IdAppUser}/${Reservations_ID}`),
  UpdateStatusInActive: (IdAppPlace, IdAppUser, Reservations_ID) => requests.put(`/ReservationPlaces/ResInActive/${IdAppPlace}/${IdAppUser}/${Reservations_ID}`),
      UpdateStatusResCancel: (IdAppPlace,IdAppUser,Reservations_ID) => requests.put(`/ReservationPlaces/ResCancel/${IdAppPlace}/${IdAppUser}/${Reservations_ID}`),

        GetAllReservationUser: (UserId,iduserauth) => requests.post(`/users/GetAllReservationUser/${UserId}`,{"IdUser":iduserauth}),

}

const Review= {

  
  GetAllReviewplace: (IdAppPlace) => requests.get(`/ReviewPlaces/${IdAppPlace}`),


}



const NotiFiction= {

  
  GetAllNotiOnePace: (IdAppPlace) => requests.get(`/NotiFictionPlace/${IdAppPlace}`),
  ReadNotiplace: (IdAppPlace) => requests.put(`/NotiFictionPlace/ReadNotiFromPlace/${IdAppPlace}`),


  GetNotiAllPlace: () => requests.get(`/NotiFictionPlace/`),
  
  AddNewNotiToPlace: (Places_IdApp,Noti_Title,Noti_Subject,UserAddNoti,User_IdAddNoti,AppName) => requests.post(`/NotiFictionPlace/`,
    {
    "Places_IdApp":Places_IdApp,
    "Noti_Title":Noti_Title,
    "Noti_Subject":Noti_Subject,
    "UserAddNoti":UserAddNoti,
    "User_IdAddNoti":User_IdAddNoti,
    "AppName":AppName
}
  ),
}



const NotiFictionUser= {

  GetAllNotiOnePace: (IdAppPlace) => requests.get(`/NotifictionUsers/${IdAppPlace}`),
  ReadNotiplace: (IdAppPlace) => requests.put(`/NotifictionUsers/ReadNotiFromPlace/${IdAppPlace}`),


  GetNotiAllPlace: () => requests.get(`/NotifictionUsers/`),
  
  AddNewNotiToPlace: (Places_IdApp,Noti_Title,Noti_Subject,UserAddNoti,User_IdAddNoti,AppName) => requests.post(`/NotifictionUsers/`,
    {
    "Places_IdApp":Places_IdApp,
    "Noti_Title":Noti_Title,
    "Noti_Subject":Noti_Subject,
    "UserAddNoti":UserAddNoti,
    "User_IdAddNoti":User_IdAddNoti,
    "AppName":AppName
}
  ),
}

export {
  Auth,
  OfferHotel,
  Users,
  Hotels,
  CompanySet,
  Places,
  Category,
  StateContry,
  ContactUs,
  Service,
  Floor,
  Rooms,
  ImageRooms,
  ImagePlacs,
  Offer,
  ImageOffers,Reservation,Review,NotiFiction,NotiFictionUser,AuthUser
};
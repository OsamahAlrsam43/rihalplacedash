import React from 'react'
import { useHistory } from 'react-router';
import { useStateValue } from '../../reducer/StateProvider';
import HotelsSerchCard from './HotelsSerchCard'
import Search from './Search';

import "./style.scss";

const HotelsSerchform = () => {
  const [{ serchdetails }] = useStateValue();

    const dataserchhotels = [
        {
           imagehotel:"https://cf.bstatic.com/images/hotel/max1024x768/185/185768701.jpg",
  namehotle:"فندق روتانا بابليون",
  hotelsratestar:5,
  hotellocation:"بغداد",
  kmofcenter:"3",
  roomtype:"غرفة كلاسيكية",
  bedtype:"1 سرير مزدوج",
  withbreakfast:"مع وجة افطار مجاني",
  cancelfree:"الغاء مجاني",
  prepay:"لا يطلب الدفع مقدم",
  cancancel:"يمكنك الإلغاء لاحقاً، لذا اضمن لنفسك هذا السعر الرائع اليوم",
  Assess:"جيد جدا",
  Assessnumber:"8",
  rateAssess:"8.5",
  numbernight:"1",
  adultnumber:"1",
  chdnumber:"0",
  pricenight:"500 USD ",
  amla:"IQD"

        },

          {
           imagehotel:"https://cf.bstatic.com/images/hotel/max1280x900/192/192193857.jpg",
  namehotle:"فندق قصر الدر",
  hotelsratestar:5,
  hotellocation:"النجف الأشرف",
  kmofcenter:"3",
  roomtype:"غرفة كلاسيكية",
  bedtype:"1 سرير مزدوج",
  withbreakfast:"مع وجة افطار مجاني",
  cancelfree:"الغاء مجاني",
  prepay:"لا يطلب الدفع مقدم",
  cancancel:"يمكنك الإلغاء لاحقاً، لذا اضمن لنفسك هذا السعر الرائع اليوم",
  Assess:"جيد جدا",
  Assessnumber:"8",
  rateAssess:"8.5",
  numbernight:"1",
  adultnumber:"1",
  chdnumber:"0",
  pricenight:"70,000",
  amla:"IQD"

        }
          
        ,
          
            {
           imagehotel:"https://cf.bstatic.com/images/hotel/max1280x900/154/154047353.jpg",
  namehotle:"فندق البارون",
  hotelsratestar:5,
  hotellocation:"كربلاء",
  kmofcenter:"3",
  roomtype:"غرفة كلاسيكية",
  bedtype:"1 سرير مزدوج",
  withbreakfast:"مع وجة افطار مجاني",
  cancelfree:"الغاء مجاني",
  prepay:"لا يطلب الدفع مقدم",
  cancancel:"يمكنك الإلغاء لاحقاً، لذا اضمن لنفسك هذا السعر الرائع اليوم",
  Assess:"جيد جدا",
  Assessnumber:"8",
  rateAssess:"8.5",
  numbernight:"1",
  adultnumber:"1",
  chdnumber:"0",
  pricenight:"20,000",
  amla:"IQD"

        }
            
        ,
            
              {
           imagehotel:"https://cf.bstatic.com/images/hotel/max1280x900/430/43093173.jpg",
  namehotle:"فندق ديفان اربيل",
  hotelsratestar:5,
  hotellocation:"اربيل",
  kmofcenter:"3",
  roomtype:"غرفة كلاسيكية",
  bedtype:"1 سرير مزدوج",
  withbreakfast:"مع وجة افطار مجاني",
  cancelfree:"الغاء مجاني",
  prepay:"لا يطلب الدفع مقدم",
  cancancel:"يمكنك الإلغاء لاحقاً، لذا اضمن لنفسك هذا السعر الرائع اليوم",
  Assess:"جيد جدا",
  Assessnumber:"8",
  rateAssess:"8.5",
  numbernight:"1",
  adultnumber:"1",
  chdnumber:"0",
  pricenight:"50,000",
  amla:"IQD"

        }
              
        ,
              
                {
           imagehotel:"https://cf.bstatic.com/images/hotel/max1024x768/185/185768701.jpg",
  namehotle:"فندق روتانا بابليون",
  hotelsratestar:5,
  hotellocation:"السليمانية",
  kmofcenter:"3",
  roomtype:"غرفة كلاسيكية",
  bedtype:"1 سرير مزدوج",
  withbreakfast:"مع وجة افطار مجاني",
  cancelfree:"الغاء مجاني",
  prepay:"لا يطلب الدفع مقدم",
  cancancel:"يمكنك الإلغاء لاحقاً، لذا اضمن لنفسك هذا السعر الرائع اليوم",
  Assess:"جيد جدا",
  Assessnumber:"8",
  rateAssess:"8.5",
  numbernight:"1",
  adultnumber:"1",
  chdnumber:"0",
                    pricenight: "90,000",
  amla:"IQD"

        }
    ]


     const history = useHistory();

  const HotelsDeatailsConf = () => {
   

      history.push("/HotelsDeatailsConf", { from: "HotelsSerchform" });
    
      
    };
    return (
        <div className="HotelsSerchform">
             <Search/>
            <div className="Serchform_dev_sort">
                <div className="dev_sort_by sort_by_active">السعر الأقل اولاً</div>
                <div className="dev_sort_by">السعر الاعلى اولاً</div>
                <div className="dev_sort_by">تصنيف النجوم الاقل اولاً</div>
                                <div className="dev_sort_by">تصنيف النجوم الاعلى اولاً</div>

                 <div className="dev_sort_by">الأفضل تقيماً</div>
                <div className="dev_sort_by">البعد عن المركز</div>
                  <div className="dev_sort_by">نقاط التقييم</div>
            </div>
            {dataserchhotels.filter(resp =>resp.hotellocation===serchdetails[0].wejha).map((res, i) =>
                <div key={i} onClick={HotelsDeatailsConf}>
                    <HotelsSerchCard   imagehotel={res.imagehotel}
  namehotle={res.namehotle}
  hotelsratestar={res.hotelsratestar}
  hotellocation={res.hotellocation}
  kmofcenter={res.kmofcenter}
  roomtype={res.roomtype}
  bedtype={res.bedtype}
  withbreakfast={res.withbreakfast}
  cancelfree={res.cancelfree}
  prepay={res.prepay}
  cancancel={res.cancancel}
  Assess={res.Assess}
  Assessnumber={res.Assessnumber}
  rateAssess={res.rateAssess}
  numbernight={res.numbernight}
  adultnumber={res.adultnumber}
  chdnumber={res.chdnumber}
                        pricenight={res.pricenight}
                        amla={res.amla}
                    />
                </div>
             
            )}
        </div>
    )
}

export default HotelsSerchform
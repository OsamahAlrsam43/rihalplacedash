import { Button, Divider, Image } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { BiBed } from 'react-icons/bi';


const DetailsRoom = ({  Rooms_Name, Rooms_Images, Rooms_bedtype, Rooms_Space,
    Rooms_Services,Rooms_priceAdult,Rooms_priceChild,Rooms_ID,Price_Amla }) => {
      const history = useHistory();

  

  const [imagesrooms, setimagesrooms] = useState([])
  
  console.log(Rooms_Images)
    const gotoReservationHotel = () => {
              history.push("/ReservationHotel", { from: "DetailsRoom" });

    }
    return (
        <div className="deatailsConf_namehotel" style={{padding:"10px",margin:5,background:"rgb(255 255 255)",width:"100%"}}>
            <h3>{Rooms_Name}</h3>
           
            <div style={{border:"1px solid #696969",padding:5,borderRadius:5}}>
                 <Image.PreviewGroup >

            
             <Image
                   
                        title="img0"
                src={Rooms_Images[0]}
                
            />
 <Image
                   
                        title="img0"
                src={Rooms_Images[0]}
                  width={0}
            />

             <Image
                   
                        title="img1"
                src={Rooms_Images[1]}
                  width={80}
            />

             <Image
                   
                        title="img2"
                src={Rooms_Images[2]}
                  width={80}
            />

            
            
     
            

     
    </Image.PreviewGroup>
            </div>
            <div style={{width:"100%"}}>
                <h3 className="details_price" style={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:10 }}><BiBed size={20} /> - {Rooms_bedtype} </h3>
                <h3  className="details_price" style={{marginTop:10,background:"rgb(105 96 36)"}}>عدد الاشخاص</h3>
                <div className="maindeatails" >
                    <h2  style={{ margin: "0 5px" }}> 1 بالغ</h2>
                    <h2 style={{ margin: "0 5px" }}> 1 طفل</h2>
                </div>
            </div>

            <div style={{marginTop:10,width:"100%", display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column"}}>
                <h3 className="details_price" style={{background:"rgb(38 11 148)",width:"100%"}}>السعر للغرفة/الليلة</h3>
                <h2 className="maindeatails" style={{width:"100%", fontWeight:800,color:"#d40d0d" }}>{parseFloat(Rooms_priceAdult)  +parseFloat(Rooms_priceChild) } IQD</h2>
                <div style={{width:"50%",flexDirection:"column"}}>
                     <h3>السعر للشخص/الليلة</h3>
                    <h5 className="details_price">البالغ : {Rooms_priceAdult } IQD</h5>
                      <h5 className="details_price">الطفل : { Rooms_priceChild} IQD</h5>

                </div>
                 <Divider/>
                


            </div>
            <div style={{width:"100%"}}>
                     <Button onClick={gotoReservationHotel} style={{padding:"0 50px",fontWeight:800,background:"#20962f",marginTop:0}} size="large" type="primary" block>
      احـجـز
    </Button>
                </div>
        </div>
    )
}

export default DetailsRoom

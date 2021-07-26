import React from 'react'
import { Result, Button, message } from 'antd';
import { useHistory } from 'react-router';

const Resultshotels = () => {

    const history = useHistory();
    const gotomain = () => {
        history.push("/")
    }

     const gotres = () => {
        message.info("قريباً")
    }


    return (
            <Result
    title="تم الحجز بنجاح "
    subTitle="رقم الحجز الخاص بك هو : 522221 , يرجى الانتظار لحين تاكيد الحجز من قبل صاحب الفندق "
    extra={[
      <Button style={{margin:5}} onClick={gotres}  type="primary" key="console" danger>
       الذهاب الى حجوزاتي
      </Button>,
      <Button style={{margin:5}} onClick={gotomain}  key="buy">الذهاب الى الصفحة الرئيسية</Button>,
    ]}
  />
        
    )
}

export default Resultshotels

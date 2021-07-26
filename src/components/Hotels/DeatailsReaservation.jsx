import React from 'react'
import { Input, Col, Row } from 'antd';

const DeatailsReaservation = ({cont}) => {
    return (
        <div style={{ margin: 5 }}>
            <Row>

         <Col
          style={{
            padding: 5,
           
          }}
          xs={24}
          md={16}
          lg={16}
          xl={16}
                >
                    
                    <h3 style={{ textAlign: "right" }}>الشخص  {cont}</h3>
                <Input required addonBefore="الاسـم الثلاثي" placeholder="يرجى ادخال اسمك الثلاثي" />
             <Input required type="date"  addonBefore="تـاريـخ الميـلاد" placeholder="يرجى ادخال تاريخ ميلادك"/>
            <Input required addonBefore="عـنوان السكن" placeholder="يرجى ادخال عنوان سكنك" />
            <Input  required type="number" addonBefore="رقـم الهـاتـف" placeholder="يرجى ادخال رقم الهاتف" />
                </Col> </Row>
            
        </div>
    )
}

export default DeatailsReaservation

import { Input } from 'antd';
import React from 'react'
import "./style.scss";
const Contact = () => {
    return (
        <div className="Contact_Main">
        
        <div className="Contact_form">
<h2>وفر وقتك ومالك!</h2>
<p> اشترك وسنرسل أفضل العروض إليك </p>

<Input min="11" max="11" size="large" type="number" style={{textAlign:"center",fontWeight:700,marginTop:10,maxWidth:400,fontSize:20}} placeholder="يرجى ادخال رقم الهاتف"   />
<button className="btn_contact">
اشترك
</button>

</div>

        </div>
    )
}

export default Contact

import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseURLI = "https://musing-goldwasser.185-170-213-238.plesk.page/api/v1";
//const baseURLI = "http://localhost:5000/api/v1";

const token = cookies.get("token");

var CryptoJS = require("crypto-js");
var bytes="";
var tk="";

if (token) {
     // Encrypt
  // Decrypt
  bytes =CryptoJS.AES.decrypt(token.toString(), 'cscode2021').toString(CryptoJS.enc.Utf8);

  tk= bytes.slice(101, bytes.length-1);
}


   const  data = {
        baseURL: baseURLI,
        responseType: "json",
        headers: {
            "Content-type": "application/json",
            "Accept": 'application/pdf',
            "authorization": `Bearer ${tk}`, 
         
        }
}


    

export default axios.create(data);




  
//export const baseURLImg =`http://localhost:5000/ftp/uploads/`;

export const baseURLImg =`https://musing-goldwasser.185-170-213-238.plesk.page/ftp/uploads/`;

export const IdAppCompany ="6aabb5fa-2ae3-42aa-8a14-01726df4e53a";

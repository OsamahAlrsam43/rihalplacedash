

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";

const ProtectedPlaceRoute = ({  Component }) => {
    const cookies = new Cookies();
    
const token = cookies.get("token");
const isAuthenticated = cookies.get("isAuthenticated");

    return isAuthenticated==="true"? ( <Component / >
    ) : ( <
        Redirect to = {
            { pathname: "/LoginPlace" } }
        />
    );
}

export default ProtectedPlaceRoute;

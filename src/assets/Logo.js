import React from "react";
import Logo from '../assets/ninja.png'
const LOGO = () => {
    return (
        <div>
            <img className="img-fluid" src={Logo} width="30px" />
            <span style={{ color: "tomato", display: "inline", fontWeight: "bold", fontStyle: "italic", paddingLeft: "5px" }}>food</span>
            <span style={{ color: "black", display: "inline", fontStyle: "italic", fontWeight: "bold" }}>ninja</span>
        </div>
    );
}

export default LOGO;
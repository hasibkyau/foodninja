import React from "react";
import { CardText } from "reactstrap";
import '../css/footer.css'
import '../css/banner.css'

const FooterBanner = (props) => {
    return (
            <div className = "py-3 pb-3" style={{ backgroundImage: "linear-gradient(to right, rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)),url("+props.bgImg+")", backgroundSize: "cover", height: "25vw", margin: "35px auto", }}>
                <div className = "container footer-text">
                    <h1 style={{ fontSize: "3vw" }}>{props.title}</h1>
                    <span style={{ color: "white" }}>{props.subtitle}</span>
                    <p style={{ color: "white" }} className="text-center">&copy; {props.copyRightText}</p>
                </div>
            </div>
    );
}

export default FooterBanner;
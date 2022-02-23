import React from "react";
import { CardText } from "reactstrap";
import '../css/footer.css'
import '../css/banner.css'

const FooterContact = (props) => {
    return (

        <footer className = "py-0 my-0">
        <ul className = "nav justify-content-center border-bottom pb-3 mb-3">
            <li className = "nav-item"><a href="#" className = "nav-link px-2 text-muted">Home</a></li>
            <li className = "nav-item"><a href="#" className = "nav-link px-2 text-muted">Features</a></li>
            <li className = "nav-item"><a href="#" className = "nav-link px-2 text-muted">Pricing</a></li>
            <li className = "nav-item"><a href="#" className = "nav-link px-2 text-muted">FAQs</a></li>
            <li className = "nav-item"><a href="#" className = "nav-link px-2 text-muted">About</a></li>
        </ul>
        <p className = "text-center text-muted">&copy; 2021 Ninja IT Corporation, Inc</p>
    </footer>
    );
}

export default FooterContact;
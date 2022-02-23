import React from "react";
import { CardText } from "reactstrap";
import '../css/banner.css'
import '../css/footer.css'

const FooterBody = () => {
    return (
        <div style={{}}>
            <div className = "container" style={{ textAlign: "left", color: "red", }}>
                <footer className = "py-5">
                    <div className = "row">
                        <div className = "col-3">
                            <h5>
                                Experience Personalized Online Shopping in foodninja
                            </h5>
                            <CardText style={{ color: "gray" }}>Online Shopping BD has never been easier. foodninja.com.bd is best online shopping store in Bangladesh that features 10+ million products at affordable prices. As bangaldesh's online shopping landscape is expanding every year, online shopping in dhaka, chittagong, khulna, sylhet and other big cities are also gaining momentum. Daraz is among best websites for online shopping in bangladesh that promises fast, reliable and convenient delivery of products to your doorstep.
                            </CardText>
                        </div>


                        <div className = "col-3">
                            <h5>
                                Top Categories & Brands
                            </h5>
                            <CardText>Fast Food</CardText>
                            <CardText style={{ color: "gray" }}>As bangaldesh's online shopping landscape is expanding every year, online shopping in dhaka, chittagong, khulna, sylhet and other big cities are also gaining momentum. Daraz is among best websites for online shopping in bangladesh that promises fast, reliable and convenient delivery of products to your doorstep.
                            </CardText>
                            <CardText>Burger</CardText>
                            <CardText style={{ color: "gray" }}> Daraz is among best websites for online shopping in bangladesh that promises fast, reliable and convenient delivery of products to your doorstep.
                            </CardText>

                        </div>
                        <div className = "col-3">
                            <h5>
                                Experience Personalized Online Shopping in foodninja
                            </h5>
                            <CardText style={{ color: "gray" }}>Online Shopping BD has never been easier. foodninja.com.bd is best online shopping store in Bangladesh that features 10+ million products at affordable prices. As bangaldesh's online shopping landscape is expanding every year, online shopping in dhaka, chittagong, khulna, sylhet and other big cities are also gaining momentum. Daraz is among best websites for online shopping in bangladesh that promises fast, reliable and convenient delivery of products to your doorstep.
                            </CardText>
                        </div>

                    </div>
                </footer>
            </div>

           
        </div>
    );
}

export default FooterBody;
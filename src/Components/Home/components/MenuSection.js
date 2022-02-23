import React from "react";
//import Menu from "../../Menu";

const MenuSection = () =>{
        document.title = "Home";
        return (
            <div>
            <div style={{backgroundColor:"tomato"}}>
                <div className="container">
                    <h3 style={{textAlign:"Left", padding:"10px 0px", color:"white"}}>Find your Favourite Food</h3>
                    <div className="row" style={{paddingBottom:"2vw"}}>
                        {/* <Menu/> */}
                    </div>
                    
                </div>
                                
            </div>
            </div>

        );  
}

export default MenuSection;
import React, { Component } from "react";
import BannerSection from "./components/BannerSection";
import AdvertiseSection from "./components/AdvertiseSection";
import MenuSection from "./components/MenuSection";
import FooterBody from "./components/FooterBody";
import FooterBanner from "./components/FooterBanner";
import FooterContact from "./components/FooterContact";
import Menu from "../Menu/Menu";


import BannerImg from '../../assets/images/foodninja/bg1.jpg'
import AdvertiseImg from '../../assets/images/foodninja/foodninja-01.png'
import Img from '../../assets/images/foodninja/bg3.jpg'


class Home extends Component {
    render() {
        document.title = "Home";
        return (
            <div>
                
                <BannerSection
                    companyName={{ fname: "food", lname: "ninja" }}
                    title="It's the food and groceries you love, delivered."
                    subtitle="It's the food and groceries you love, delivered. List your restuarnt or shop on foodninja"
                    align="left"
                    button={{ text: "Sign up for free", backgroundColor: "", size: "" }}
                    bgImg= {BannerImg}
                />

                <AdvertiseSection
                    AdvertiseTitle='List your restaurant or shop on foodninja'
                    AdvertiseDetails="Would you like millions of new customers to enjoy your amazing food and groceries? So would we! It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry ninjas – in a heartbeat! Interested? Let's start our partnership today!"
                    button={{ text: "Get Started" }}
                    bgImg= {AdvertiseImg}

                />

                <MenuSection />
                <Menu/>

                <FooterBanner
                    title="Thank you for visiting our site"
                    subtitle="Deploped by Md Hasibur Rahman"
                    copyRightText="2022 Ninja IT Corporation, Inc"
                    bgImg={Img}
                />
                <FooterBody/>
                <FooterContact />

            </div>

        );
    }
}

export default Home;
import React, { Component } from "react";
import BannerSection from "./components/BannerSection";
import AdvertiseSection from "./components/AdvertiseSection";
import MenuSection from "./components/MenuSection";
import FooterBody from "./components/FooterBody";
import FooterBanner from "./components/FooterBanner";
import FooterContact from "./components/FooterContact";

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
                    bgImg="assets/images/bg1.jpg"
                />

                <AdvertiseSection
                    AdvertiseTitle='List your restaurant or shop on foodninja'
                    AdvertiseDetails="Would you like millions of new customers to enjoy your amazing food and groceries? So would we! It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry ninjas – in a heartbeat! Interested? Let's start our partnership today!"
                    button={{ text: "Get Started" }}
                    bgImg='assets/images/logos/foodninja-01.png'

                />

                <MenuSection />

                <FooterBanner
                    title="Thank you for visiting our site"
                    subtitle="This project has deploped by Md Hasibur Rahman"
                    copyRightText="2022 Ninja IT Corporation, Inc"
                    bgImg="assets/images/bg3.jpg"
                />
                <FooterBody/>
                <FooterContact />

            </div>

        );
    }
}

export default Home;
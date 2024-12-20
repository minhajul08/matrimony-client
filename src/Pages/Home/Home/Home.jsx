

import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import CardSection from "./Banner/CardSection/CardSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>
                    Matrimony | Home
                </title>
            </Helmet>
        <Banner></Banner>
        <CardSection></CardSection>
        <HowItWorks></HowItWorks>
        <SuccessCounter></SuccessCounter>
        <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;
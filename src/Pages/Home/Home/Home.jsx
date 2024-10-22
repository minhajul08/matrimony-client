

import Banner from "./Banner/Banner";
import CardSection from "./Banner/CardSection/CardSection";
import BioDataPage from "./BioDataPage/BioDataPage";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div className="min-h-screen">
        <Banner></Banner>
        <CardSection></CardSection>
        <HowItWorks></HowItWorks>
        <SuccessCounter></SuccessCounter>
        <BioDataPage></BioDataPage>
        <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;


import Banner from "./Banner/Banner";
import CardSection from "./Banner/CardSection/CardSection";
import SuccessStory from "./SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div className="min-h-screen">
        <Banner></Banner>
        <CardSection></CardSection>
        <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;
import { useTitle } from "../hooks/useTitle";
import { PiCookingPotDuotone } from "react-icons/pi";
import { LuScanLine } from "react-icons/lu";
import { PiHeartbeatDuotone } from "react-icons/pi";
import { PiSealQuestionDuotone } from "react-icons/pi";
import HomeLayout from "../components/Layouts/HomeLayout";
import HeroSection from "../components/Fragments/HeroSection";
import Accordion from "../components/Elements/Accordion";
import FeatureItem from "../components/Elements/FeatureItem";
import ContactSection from "../components/Fragments/ContactSection";
import Card from "../components/Elements/Card";

const HomePage = () => {
  useTitle({ title: "Home" });

  return (
    <HomeLayout>
      <HeroSection />
      <Card classname="bg-gradient-to-b lg:bg-gradient-to-r from-primary to-black text-white px-8 py-12 sm:p-16 lg:p-20 mb-10 lg:mb-16">
        <div className="container m-auto flex flex-col lg:flex-row gap-16">
          <FeatureItem
            title="Recipe Ideas"
            desc="Discover creative recipes and ways to incorporate your favorite snacks into meals."
            icon={<PiCookingPotDuotone size={"1.5rem"} />}
          />
          <FeatureItem
            title="Scan your Snacks"
            desc="Scan snack packaging barcode effortlessly scan any snack package to reveal all the essential details."
            icon={<LuScanLine size={"1.5rem"} />}
          />
          <FeatureItem
            title="Worried About your Health?"
            desc="Personalized recommendations receive tailored suggestions based on
              your allergies."
            icon={<PiHeartbeatDuotone size={"1.5rem"} />}
          />
        </div>
      </Card>
      <div className="container mb-10 m-auto lg:mb-16">
        <h1 className="flex items-center gap-2 font-bold text-2xl mb-4">
          <PiSealQuestionDuotone size={"2rem"} /> FAQs
        </h1>
        <Accordion
          checked={true}
          title="What is Snackalyze?"
          desc="Snackalyze is a web app that uses image recognition to scan snack packaging barcode and instantly provide nutritional details, recipe ideas, and personalized snack recommendations."
        />
        <Accordion
          title="Why Snackalyze?"
          desc="Snackalyze allows users to scan snack packaging barcode and instantly access detailed and insightful information. Whether you’re tracking your diet, exploring new snacks, or simply curious about what you’re eating, Snackalyze has got you covered."
        />
        <Accordion
          title="How it Works?"
          desc="Snackalyze simplifies your snacking experience with cutting-edge technology. Simply take a photo of your snack's packaging barcode, and the app uses advanced barcode recognition to identify the product."
        />
      </div>
      <ContactSection />
    </HomeLayout>
  );
};

export default HomePage;

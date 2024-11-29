import Button from "../components/Elements/Button";
import { useTitle } from "../hooks/useTitle";

const HomePage = () => {
  useTitle({ title: "Home" });
  return (
    <div className="px-4 py-8 lg:py-20">
      <div className="container text-center m-auto mb-16 lg:mb-20">
        <div className="lg:w-1/3 m-auto">
          <h1 className="font-bold text-3xl mb-8">
            Scan snacks, get insights, snack smarter!
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            Discover the story behind every bite—scan, analyze, and enjoy your
            snacks smarter with Snackalyze!
          </p>
          <Button classname="bg-primary text-white px-8 py-4 hover:bg-black">
            Explore Now!
          </Button>
        </div>
      </div>
      <div className="container m-auto bg-gradient-to-b lg:bg-gradient-to-r from-primary to-black w-full rounded-lg p-8 sm:p-16 lg:p-20 text-white mb-10 lg:mb-16">
        <div className="container m-auto flex flex-col sm:flex-row lg:flex-row gap-10">
          <div>
            <p className="font-semibold mb-2">Recipe Ideas</p>
            <p className="text-sm">
              Discover creative recipes and ways to incorporate your favorite
              snacks into meals.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Want to Know About Snack?</p>
            <p className="text-sm">
              Scan Snack Packaging Effortlessly scan any snack package to reveal
              all the essential details.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Worried About your Health?</p>
            <p className="text-sm">
              Personalized Recommendations Receive tailored suggestions based on
              your dietary preferences and health goals.
            </p>
          </div>
        </div>
      </div>
      <div className="container mb-10 m-auto lg:mb-16">
        <h1 className="font-bold text-2xl mb-4">FAQs</h1>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-sm font-semibold">
            What is Snackalyze?
          </div>
          <div className="collapse-content">
            <p className="text-sm text-gray-400">
              Snackalyze allows users to scan snack packaging and instantly
              access detailed and insightful information. Whether you’re
              tracking your diet, exploring new snacks, or simply curious about
              what you’re eating, Snackify has got you covered.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-sm font-semibold">
            Why Snackalyze?
          </div>
          <div className="collapse-content">
            <p className="text-sm text-gray-400">
              Snackalyze allows users to scan snack packaging and instantly
              access detailed and insightful information. Whether you’re
              tracking your diet, exploring new snacks, or simply curious about
              what you’re eating, Snackify has got you covered.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-sm font-semibold">
            How it Works?
          </div>
          <div className="collapse-content">
            <p className="text-sm text-gray-400">
              Snackalyze allows users to scan snack packaging and instantly
              access detailed and insightful information. Whether you’re
              tracking your diet, exploring new snacks, or simply curious about
              what you’re eating, Snackify has got you covered.
            </p>
          </div>
        </div>
      </div>
      <div className="container m-auto">
        <div className="bg-primary rounded-lg p-8 text-white">
          <div className="flex flex-col gap-16 justify-between lg:flex-row">
            <div>
              <h1 className="font-bold text-2xl mb-4">
                Have a Question About Snackalyze?
              </h1>
              <p>
                Our team is here to help! Contact us with any questions or
                concerns you may have.
              </p>
              <Button classname="bg-red-300 text-white px-8 py-4 mt-8 hover:bg-black">
                Contact Now!
              </Button>
            </div>
            <img
              src="/images/ask_illustration.svg"
              className="sm:w-1/2 sm:m-auto lg:w-1/4 lg:m-0"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

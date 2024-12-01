import Button from "../Elements/Button";
import { PiCaretCircleRightDuotone } from "react-icons/pi";

const ContactSection = () => {
  return (
    <div className="container m-auto">
      <div className="bg-primary rounded-lg p-8 text-white">
        <div className="flex flex-col items-center gap-16 justify-between lg:flex-row">
          <div>
            <h1 className="font-bold text-2xl mb-4">
              Have a Question About Snackalyze?
            </h1>
            <p>
              Our team is here to help! Contact us with any questions or
              concerns you may have.
            </p>
            <Button classname="bg-red-300 text-white px-8 py-4 mt-8 flex justify-center items-center gap-2 hover:bg-black w-full sm:w-fit group">
              Contact Us{" "}
              <PiCaretCircleRightDuotone
                className="group-hover:translate-x-1 duration-150 transition-all"
                size={"1.5rem"}
              />
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
  );
};

export default ContactSection;

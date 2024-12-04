import { PiMagnifyingGlassDuotone, PiScanDuotone } from "react-icons/pi";
import Button from "../Elements/Button";
import InputIcon from "../Elements/InputIcon";
import { useGreetings } from "../../hooks/useGreeting";

const DashboardHeaderSection = (props) => {
  const { username } = props;
  const greeting = useGreetings();

  return (
    <div className="header">
      <h1 className="text-lg flex flex-wrap justify-center sm:justify-start mb-12 font-poppinsMedium">
        {greeting}, <span className="ml-1 text-primary">{username}</span>
      </h1>
      <div className="flex gap-4 mb-12">
        <InputIcon
          type="text"
          placeholder="Search for recipes"
          icon={
            <PiMagnifyingGlassDuotone className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          }
        />
        <div className="tooltip" data-tip="Scan Now!">
          <a href="/scan">
            <Button classname="bg-primary h-full hover:bg-black">
              <PiScanDuotone className="text-white" size={"1.5rem"} />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeaderSection;

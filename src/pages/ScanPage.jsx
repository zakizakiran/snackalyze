import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Button from "../components/Elements/Button";
import { PiScanDuotone } from "react-icons/pi";
import { useTitle } from "../hooks/useTitle";
import { use } from "react";
import { getSnackByUpc } from "../api/services/snackService";
import ListTile from "../components/Elements/ListTile";

const ScanPage = () => {
  const [result, setResult] = useState(null);
  const [videoDevice, setVideoDevice] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [snackData, setSnackData] = useState({});
  useTitle({ title: "Scan Snack" });

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setPermissionGranted(true);
        const videoDevices = await reader.listVideoInputDevices();
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );
        if (backCamera) {
          setVideoDevice(backCamera.deviceId);
        } else if (videoDevices.length > 0) {
          setVideoDevice(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setPermissionGranted(false);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (videoDevice) {
      const reader = new BrowserMultiFormatReader();
      reader.decodeFromVideoDevice(videoDevice, "video", (result) => {
        if (result) {
          setResult(result);
        }
      });
    }
  }, [videoDevice]);

  const handleConfirm = () => {
    setIsConfirm(true);
    const upc = result.text;
    const fetchSnackData = async () => {
      try {
        const response = await getSnackByUpc(upc);
        setSnackData(response);
      } catch (error) {
        console.error("Error fetching snack data:", error);
      }
    };
    fetchSnackData();
  };

  // Fungsi untuk mendapatkan nilai nutrient tertentu
  const getNutrientValue = (name) => {
    const nutrient = snackData.nutrition?.nutrients.find(
      (item) => item.name === name
    );
    return nutrient ? nutrient.amount : "N/A"; // Tampilkan 'N/A' jika nutrient tidak ditemukan
  };

  return isConfirm ? (
    <div className="">
      {snackData ? (
        <div className="flex justify-center items-center flex-col px-2">
          <div className="text-center">
            <h1 className="font-poppinsMedium mb-8">Snack Data</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-10">
              <img
                src={snackData.image}
                className="w-auto m-auto mb-10"
                alt=""
              />
              <h2 className="font-bold text-lg mb-6">{snackData.title}</h2>
              <div className="flex flex-col gap-2">
                <ListTile title="Brand" body={snackData.brand || "-"} />
                <ListTile
                  title="Calories (kcal)"
                  body={getNutrientValue("Calories")}
                />
                <ListTile
                  title="Carbohydrates (g)"
                  body={getNutrientValue("Carbohydrates")}
                />
                <ListTile
                  title="Sodium (mg)"
                  body={getNutrientValue("Sodium")}
                />
                <ListTile title="Sugar (g)" body={getNutrientValue("Sugar")} />
                <ListTile
                  title="Protein"
                  body={snackData.nutrition?.protein || "-"}
                />
              </div>
            </div>
            <a href="/scan">
              <Button
                type="button"
                classname="bg-primary hover:bg-black text-white w-full mt-10"
              >
                Scan Another
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col px-2">
          <div className="text-center">
            <h1 className="font-poppinsMedium mb-8">No Data Found</h1>
            <a href="/scan">
              <Button
                type="button"
                classname="bg-primary hover:bg-black text-white w-full mt-10"
              >
                Scan Another
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col px-2">
      <div className="text-center">
        <h1 className="font-poppinsMedium mb-8">Scan your Barcode!</h1>
        {permissionGranted ? (
          <video id="video" className="lg:max-w-lg rounded-xl mb-10" />
        ) : (
          <p className="bg-red-200 text-red-600 p-4 text-sm rounded-lg mb-10">
            Camera permission is required to scan barcodes.
          </p>
        )}
        {result ? (
          <p className="flex items-center justify-center gap-2 bg-green-200 text-green-600 p-4 text-sm rounded-lg">
            <PiScanDuotone size={"1.5rem"} /> {result.text}
          </p>
        ) : (
          <p className="flex justify-center items-center gap-2 bg-gray-200 text-gray-600 p-4 text-sm rounded-lg">
            Scanning <span className="loading loading-bars loading-xs" />
          </p>
        )}
        <Button
          type="button"
          classname="bg-primary hover:bg-black text-white w-full mt-10 disabled:bg-gray-300"
          disabled={!result}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ScanPage;

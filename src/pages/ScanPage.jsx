import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Button from "../components/Elements/Button";
import { PiScanDuotone } from "react-icons/pi";
import { useTitle } from "../hooks/useTitle";

const ScanPage = () => {
  const [result, setResult] = useState(null);
  const [videoDevice, setVideoDevice] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const API_KEY = "b8331f9ee8ff47d698514abf7fdf1997";
  useTitle({ title: "Scan Snack" });

  useEffect(() => {
    if (result) {
      // Fetch data from the API
      fetch(
        `https://api.spoonacular.com/food/products/upc/${result}?apiKey=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setApiData(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [result]);

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
  };

  return isConfirm ? (
    <div className="">
      <p>Result: {result.text}</p>
      {apiData ? (
        <div>
          <h3>Data from API:</h3>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col px-2">
      <div className="text-center">
        <h1 className="font-poppinsMedium mb-8">Scan your Barcode!</h1>
        {permissionGranted ? (
          <video id="video" className="w-full rounded-xl mb-10" />
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

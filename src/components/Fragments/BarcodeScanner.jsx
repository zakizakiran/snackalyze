import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = () => {
  const [result, setResult] = useState(null);
  const [videoDevice, setVideoDevice] = useState(null);
  const [apiData, setApiData] = useState(null);
  const API_KEY = "737d6975541e44c5aa07c626a2b83c1e";

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    async function init() {
      const videoDevices = await reader.listVideoInputDevices();
      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes("back")
      );
      if (backCamera) {
        setVideoDevice(backCamera.deviceId);
      } else if (videoDevices.length > 0) {
        setVideoDevice(videoDevices[0].deviceId);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (videoDevice) {
      const reader = new BrowserMultiFormatReader();
      reader.decodeFromVideoDevice(videoDevice, "video", (result) => {
        if (result) {
          setResult(result.text);
        }
      });
    }
  }, [videoDevice]);

  useEffect(() => {
    if (result) {
      // Fetch data from the API
      fetch(`https://api.sponcular.com/data?barcode=${result}&apiKey=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setApiData(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [result]);

  return (
    <div className="">
      {result ? (
        <>
          <p>Scanned code: {result}</p>
          {apiData ? (
            <div>
              <h3>Data from API:</h3>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </>
      ) : (
        <p>Scanning...</p>
      )}
      <video id="video" width="600" height="350" />
    </div>
  );
};

export default BarcodeScanner;

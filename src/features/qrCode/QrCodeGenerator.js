import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const qrCodeRef = useRef(null);
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="p-4 rounded-lg border">
      <h1 className="text-center font-semibold">QR Code Generator</h1>
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        {!qrIsVisible && (
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Enter a URL pr paste website url here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
          </div>
        )}
        {qrIsVisible && (
          <div className="flex flex-col">
            <div className="qrcode__image">
              <QRCode value={url} size={300} />
            </div>
            <button onClick={downloadQRCode}>
              Download Restaurant QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default QrCodeGenerator;

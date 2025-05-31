import { saveAs } from "file-saver";
import QrCodeGenerator from "../features/qrCode/QrCodeGenerator";

const GenQrPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 ">
      <QrCodeGenerator />
    </div>
  );
};

export default GenQrPage;

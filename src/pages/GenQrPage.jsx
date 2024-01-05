import { saveAs } from 'file-saver'

const GenQrPage = () =>{

    const handleDownload=()=>{
       
            saveAs('image_url', 'image.jpg') // Put your image URL here.
        
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <img src="" alt="QR CODE" width={200} height={200} className="Rounded border mb-1" />
            <button type="button" className="bg-black text-white p-1 rounded" onClick={handleDownload}>Save QR Code</button>
        </div>
    )

}

export default GenQrPage;
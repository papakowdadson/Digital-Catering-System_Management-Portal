import { saveAs } from 'file-saver'

const GenQrPage = () =>{

    const handleDownload=()=>{
       
            saveAs('https://firebasestorage.googleapis.com/v0/b/faretro-e47f7.appspot.com/o/kfoods%2Fkfoodqr.JPG?alt=media&token=be2a8ed1-3209-450b-925a-88acbc3ad2d2', 'image.jpg') // Put your image URL here.
        
    }

    return (
        <div className="flex flex-col justify-center items-center ">
            <img src="https://firebasestorage.googleapis.com/v0/b/faretro-e47f7.appspot.com/o/kfoods%2Fkfoodqr.JPG?alt=media&token=be2a8ed1-3209-450b-925a-88acbc3ad2d2" alt="QR CODE" width={200} height={200} className="Rounded border mb-1" />
            <button type="button" className="bg-black text-white p-1 rounded" onClick={handleDownload}>Save QR Code</button>
        </div>
    )

}

export default GenQrPage;
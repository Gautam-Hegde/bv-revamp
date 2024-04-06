import React from "react";
import { saveAs } from "file-saver";

const InventoryDisplay = ({ price, name, tokenId, creator, cover, file }) => {
    console.log(price);
    console.log(creator.trim())

    const downloadHandle = (_fileName, _fileURL) => {
        const name = _fileName;
        const URL = _fileURL;
        saveAs(URL, name);
    }

    const prod = creator.substring(0, 7)


    return (
        <div>
            <div className=" font-Gothic   mt-12 ml-12 ">
                <div className=" h-max w-96 bg-heroColor  rounded-xl p-8 border border-black">
                    <div className=" border-b border-black ">
                        <img src={cover} alt="" className=" object-contain max-w-full max-h-full  border-b border-black pb-4" />
                    </div>
                    <div className=" text-xl mt-4">
                        {name}
                    </div>
                    <div className=" mt-4 flex justify-between">
                        <p>Price</p>
                        <p>Creator</p>
                    </div>
                    <div className=" mt-3 flex justify-between">
                        <p>{price}</p>
                        <p>{prod + "....."}</p>
                    </div>
                    <button className="mt-4 rounded-lg bg-black text-white w-full h-14"
                        onClick={() => downloadHandle(name, file)}>
                        Download
                    </button>
                </div>


            </div>

        </div>
    )
}

export default InventoryDisplay;
import React from "react";
//import musciCover from "../images/music-logo.png"

const ProductDisplay = ({ name, tokenId, left, cover, price }) => {
    return (
        <div>
            
            <div className=" font-Gothic  mt-12 ml-12 ">
                <div className=" h-max w-96 bg-heroColor  rounded-xl p-8 border border-black hover:scale-110 transition-border duration-700">
                    <div className=" border-b border-black ">
                        <img src={cover} alt="" className=" object-contain max-w-full max-h-full  border-b border-black pb-4" />
                    </div>
                    <div className=" text-xl mt-4">
                        {name}
                    </div>
                    <div className=" mt-4 flex justify-between">
                        <p>Price</p>
                        <p>Remaining</p>
                    </div>
                    <div className=" mt-3 flex justify-between">
                        <p>{price}</p>
                        <p>{left}</p>
                    </div>
                </div>

            </div>
        </div>
    ) 
}


export default ProductDisplay;
import React, { useState } from "react";
import musicLogo from "../images/music-logo.png";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "./contractConfig";
import { contractAbi } from "./contractConfig";


const Articles = (props) => {


    const [isBuyClicked, setIsBuyClicked] = useState(false);
    // if user is authenticated then execute by option else say to connect wallet
    async function buy(props) {

        setIsBuyClicked(true);

        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            contractAbi.abi,
            signer
        );
        const price = ethers.utils.parseUnits(props.price.toString(), "ether");
        console.log(props.price);
        const transaction = await contract.buy(props.tokenId, {
            value: price,
            gasLimit: 1000000,
        });
        await transaction.wait()
            .then(() => {
                // toast.success("Transaction successful.", {
                // position: toast.POSITION.TOP_CENTER
                // });
                alert("Transaction successful!!");
                setIsBuyClicked(false);
            }).catch((err) => {
                // toast.error("Transaction failed.", {
                //   position: toast.POSITION.TOP_CENTER
                // });

                alert("transaction error");
                setIsBuyClicked(false);
            })
    }
    const datas = props.items
    return (
        <div>
            <div className=" h-screen">
                <div className="bg-articleColor font-Gothic text-lg h-36 rounded-md m-auto flex items-center px-10 border border-black">
                    <img src={musicLogo} alt="musicLogo" className="max-w-full max-h-full object-contain" />
                    <div className="flex flex-col ml-4 px-3">
                        <h1 className="text-5xl">Articles</h1>
                        <p className=" pt-2">No middle man Cutting Your Sales.Create Buy Sell and Earn with Your Music NFT's</p>
                    </div>
                </div>
                <div className=" flex space-x-16 mt-4 ml-4">
                    {datas.map((data, key) => {
                        return (
                            <div key={key}>
                                <div className=" h-max w-96 bg-heroColor  rounded-xl p-8 border border-black hover:scale-110 transition-border duration-700">
                                    <div className=" border-b border-black ">
                                        <img src={data.cover} alt="" srcset="" />
                                    </div>
                                    <div className=" text-xl mt-4">
                                        {data.name}
                                    </div>
                                    <div className=" mt-4 flex justify-between">
                                        <p>Price</p>
                                        <p>Remaining</p>
                                    </div>
                                    <div className=" mt-3 flex justify-between">
                                        <p>{data.price} MATIC</p>
                                        <p>{data.supplyL}</p>
                                    </div>
                                    <div className="">
                                        <button onClick={() => buy(data)} className=" mt-4 rounded-lg bg-black text-white w-full h-14">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


        </div>
    );
};

export default Articles;

import React, { useState } from "react";

import { BigHead } from '@bigheads/core'
import Publish from "../components/Publish";
import Inventory from "../components/Inventory";
import Products from "../components/Products";
const Dashboard = () => {
    const [publishClicked, SetPublishClicked] = useState(true)
    const [productsClicked, SetProductsClicked] = useState(false)
    const [inventoryClicked, SetInventoryClicked] = useState(false)
    return (
        <div>
            <div className=" fixed top-68 bottom-0 w-260 bg-black flex flex-col border-r-1 border-black z-1">

                <div className=" w-80 h-screen bg-black text-white" >

                    <div className=" h-1/2 border-b border-white">
                        <BigHead
                            accessory="shades"
                            body="chest"
                            circleColor="blue"
                            clothing="shirt"
                            clothingColor="red"
                            eyebrows="angry"
                            eyes="happy"
                            faceMask={false}
                            faceMaskColor="black"
                            facialHair="none"
                            graphic="redwood"
                            hair="buzz"
                            hairColor="blue"
                            hat="none4"
                            hatColor="red"
                            lashes={false}
                            lipColor="pink"
                            mask
                            mouth="open"
                            skinTone="light"
                        />
                    </div>

                    <div className=" flex items-center justify-center h-28 border-b border-white  ">
                        <button className="border-b-2 border-black hover:border-pink-500 transition-border duration-700 hover:scale-110  text-2xl"
                            style={{
                                color: publishClicked ? 'rgba(255,100,234,255)' : ''
                            }}
                            onClick={() => {
                                SetProductsClicked(false);
                                SetPublishClicked(true);
                                SetInventoryClicked(false)
                            }}>
                            Publish
                        </button>
                    </div>

                    <div className=" flex items-center justify-center h-28 border-b border-white">
                        <button className="border-b-2 border-black hover:border-pink-500 transition-border duration-700 hover:scale-110  text-2xl"
                            style={{
                                color: productsClicked ? 'rgba(255,100,234,255)' : ''
                            }}
                            onClick={() => {
                                SetProductsClicked(true);
                                SetPublishClicked(false);
                                SetInventoryClicked(false)
                            }}>
                            Products
                        </button>
                    </div>

                    <div className=" flex items-center justify-center  h-28 border-b border-white">
                        <button className="border-b-2 border-black hover:border-pink-500 transition-border duration-700 hover:scale-110  text-2xl"
                            onClick={() => {
                                SetProductsClicked(false);
                                SetPublishClicked(false);
                                SetInventoryClicked(true)
                            }}
                            style={{
                                color: inventoryClicked ? 'rgba(255,100,234,255)' : ''
                            }}>

                            Inventory
                        </button>
                    </div>

                    <div>
                        {
                            inventoryClicked && <Inventory />
                        }
                    </div>

                </div >
            </div >
            <div className=" absolute left-80 top-68 right-0 overflow-x-hidden flex flex-col">

                <div className=" font-Gothic w-screen text-black h-24 bg-heroColor  border-b-2 border-black text-4xl flex justify-center items-center ">
                    <p className=" mr-72">Hola!! Welcome To the Vault</p>
                </div>
                {
                    publishClicked && <Publish />
                }
                <div>
                    {
                        inventoryClicked && <Inventory />
                    }
                </div>

                <div>
                    {
                        productsClicked && <Products />
                    }
                </div>
            </div>


        </div>
    );
};

export default Dashboard;

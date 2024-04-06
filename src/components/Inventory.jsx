import React, { useEffect, useState } from 'react'
import { contractAddress } from "./contractConfig";
import { contractAbi } from "./contractConfig";
import web3modal from "web3modal";
import axios from "axios";
import { ethers } from 'ethers';
import InventoryDisplay from "./InventoryDisplay"


const Inventory = () => {
    const [myItems, setMyItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        myAssets();
    }, [loaded]);

    async function myAssets() {
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
        const data = await contract.fetchInventory();
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    creator: i.creator,
                    supplyL: i.supplyleft.toNumber(),
                    cover: meta.data.coverImageURI,
                    file: meta.data.contentURI,
                };

                return item;
            })
        );
        setMyItems(items);
        setLoaded(true);
    }

    return (
        <div>
            {myItems.map((item) => (
                <div key={item.tokenId}>
                    <InventoryDisplay
                        price={item.price}
                        name={item.name}
                        tokenId={item.tokenId}
                        creator={item.creator}
                        cover={item.cover}
                        file={item.file}
                    />
                </div>
            ))}
        </div>
    )
}

export default Inventory

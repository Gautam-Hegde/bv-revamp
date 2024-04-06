import React, { useState } from "react";
import publishLogo from "../images/publish-logo.png";
import AnimationLogo from "../images/animation-logo.png";
import artLogo from "../images/art-logo.png";
import articlesLogo from "../images/articles-logo.png";
import educationLogo from "../images/education-logo.png";
import ebookLogo from "../images/ebook-logo.png";
import musicLogo from "../images/music-logo.png";
import podcatLogo from "../images/podcast-logo.png";
import filmsLogo from "../images/films-logo.png";
import { contractAddress } from "./contractConfig";
import { contractAbi } from "./contractConfig";
// import { File} from "web3.storage";

import { ethers } from "ethers";
import web3modal from "web3modal";
import { create} from "@web3-storage/w3up-client";

const Publish = () => {
  const [isLoadingBarOfCoverActive, setIsLoadingBarOfCoverActive] =
    useState(false);
  const [isLoadingBarOfContentActive, setIsLoadingBarOfContentActive] =
    useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    category: "",
    supply: "",
    coverImageURI: null,
    contentURI: null,
  });

  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isEbooksActive, setIsEbooksActive] = useState(false);
  const [isPodcastActive, setIsPodcastActive] = useState(false);
  const [isEducationtActive, setIsEducationActive] = useState(false);
  const [isFilmsActive, setIsFilmsActive] = useState(false);
  const [isDrawingActive, setIsDrawingActive] = useState(false);
  const [isArticlesActive, setIsArticlesActive] = useState(false);

  const animationClickHandle = () => {
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsAnimationActive(true);
    setFormInput({
      ...formInput,
      category: "Animation",
    });
  };

  const musicClickHandle = () => {
    setIsAnimationActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsMusicActive(true);
    setFormInput({
      ...formInput,
      category: "Music",
    });
  };

  const ebooksClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsEbooksActive(true);
    setFormInput({
      ...formInput,
      category: "Ebooks",
    });
  };

  const podcastClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsPodcastActive(true);
    setFormInput({
      ...formInput,
      category: "Podcast",
    });
  };

  const educationClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsEducationActive(true);
    setFormInput({
      ...formInput,
      category: "Education",
    });
  };

  const filmsClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(false);
    setIsFilmsActive(true);
    setFormInput({
      ...formInput,
      category: "Films",
    });
  };

  const drawingClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsArticlesActive(false);
    setIsDrawingActive(true);
    setFormInput({
      ...formInput,
      category: "Art",
    });
  };

  const articlesClickHandle = () => {
    setIsAnimationActive(false);
    setIsMusicActive(false);
    setIsEbooksActive(false);
    setIsPodcastActive(false);
    setIsEducationActive(false);
    setIsFilmsActive(false);
    setIsDrawingActive(false);
    setIsArticlesActive(true);
    setFormInput({
      ...formInput,
      category: "Articles",
    });
  };

  let spaceCreated = false;

  async function uploadToWeb3Storage(files) {
    try {
        const client = await create(); 
        await createAndProvisionSpace(client); 
        const cid = await client.uploadFile(files);
        console.log("Uploaded to web3.storage. CID:", cid);
        return cid.asCID.toString();
    } catch (error) {
        console.error("Error uploading to web3.storage:", error);
        throw error;
    }
}

  async function createAndProvisionSpace(client) {
      try {
          if (!spaceCreated) {
              // Create a space
              const space = await client.createSpace("my-awesome-space");
              console.log("Space created:", space.did());
              const email = process.env.STORE_MAIL;

              const myAccount = await client.login(email);
              console.log("Logged in with account:", myAccount.did());

              while (true) {
                  const res = await myAccount.plan.get();
                  if (res.ok) break;
                  console.log("Waiting for payment plan to be selected...");
                  await new Promise((resolve) => setTimeout(resolve, 1000));
              }
  
   
              await myAccount.provision(space.did());
              console.log("Space provisioned with account");
  
              // Save the space to the agent's state store
              await space.save();
              console.log("Space saved locally");
  
              // Set the space as the current space
              await client.setCurrentSpace(space.did());
              console.log("Space set as the current space");
  

              const recovery = await space.createRecovery(myAccount.did());
              await client.capability.access.delegate({
                  space: space.did(),
                  delegations: [recovery],
              });
              console.log("Space recovery set up successfully");
  
              spaceCreated = true; // flag 
          } else {
              console.log("Space has already been created and provisioned.");
          }
      } catch (error) {
          console.error("Error creating and provisioning space:", error);
          throw error;
      }
  }

  const coverHandle = async () => {
    const fileInput = document.getElementById("cover");
    const filePath = fileInput.files[0].name;
    setIsLoadingBarOfCoverActive(true);
    const coverCID = await uploadToWeb3Storage(
      new File([fileInput.files[0]], filePath)
    );

    // const cidString = coverCID.asCID.toString();
    // console.log("coverId is", cidString);
    // console.log("filepath is",filePath);
    setFormInput({
      ...formInput,
      // coverImageURI: `https://ipfs.io/ipfs/${cidString}/${filePath}`,
      coverImageURI: `https://${coverCID}.ipfs.w3s.link`,
    });
  };

  // Function to handle content upload
  const contentHandle = async () => {
    const fileInput = document.getElementById("content");
    const filePath = fileInput.files[0].name;
    setIsLoadingBarOfContentActive(true);
    const contentCID = await uploadToWeb3Storage(
      new File([fileInput.files[0]], filePath)
    );
    setFormInput({
      ...formInput,
      // contentURI: `https://ipfs.io/ipfs/${cidString}/${filePath}`,
      contentURI: `https://${contentCID}.ipfs.w3s.link`,
    });
  };


  const metadata = async () => {
    const { name, price, coverImageURI, contentURI } = formInput;
    if (!name || !price || !coverImageURI || !contentURI) {
      console.log("inside metadata function something null");
      return;}
      console.log("outside metadata function");
    const data = JSON.stringify({ name, coverImageURI, contentURI });
        const files = [new File([data], "data.json")];
        const metaCID =await uploadToWeb3Storage(files[0]); 
        console.log("Meta data uri", metaCID);
        return `https://${metaCID}.ipfs.w3s.link`;
};


  const mintToken = async () => {
    console.log("content uri", formInput.contentURI);
    setIsMinting(true);
    try {
        const uri = await metadata();
        console.log("mint uri is ", uri);
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
        const price = ethers.utils.parseEther(formInput.price);
        const publish = await contract.createToken(
            uri,
            formInput.supply,
            price,
            formInput.category,
            {
                gasLimit: 1000000,
            }
        );
        await publish
            .wait()
            .then(() => {
                alert("Token Minted successfully");
                setIsMinting(false);
            })
            .catch(() => {
                alert("unexpected failure");
                setIsMinting(false);
            });
    } catch (error) {
        console.error("Error minting token:", error);
        setIsMinting(false);
    }
};

  return (
    <>
      <div className="bg-educationColor font-Gothic text-lg h-36 rounded-md m-auto flex items-center px-10 border border-black mt-12 w-screen">
        <img
          src={publishLogo}
          alt="musicLogo"
          className="max-w-full max-h-full object-contain"
        />
        <div className="flex flex-col ml-4 px-3">
          <h1 className="text-5xl">Publish & Mint</h1>
          <p className=" pt-2">
            Make some selections, fill in some boxes, and make your NFT live in
            minutes
          </p>
        </div>
      </div>
      <div className=" font-Gothic  w-full  h-max bg-heroColor mt-24 border border-black rounded-md text-xl">
        <div className=" px-11 py-11">
          <p>Name</p>
          <input
            type="text"
            name="name"
            onChange={(event) => {
              // setFormCredentials({
              //     ...FormCredentials,
              //     name: event.target.value,
              // });
              setFormInput({
                ...formInput,
                name: event.target.value,
              });
            }}
            placeholder="Enter The Product Name"
            required
            className=" w-full rounded-lg mt-4 h-16   text-left px-5"
          />
          <div className=" h-235 px-30">
            <p className=" mt-9 mb-8">Type</p>
            <div className="grid grid-cols-4 gap-10">
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={animationClickHandle}
                  style={{
                    backgroundColor: isAnimationActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isAnimationActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={AnimationLogo} alt="" className="  w-14" />
                    <p>Animation</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={drawingClickHandle}
                  style={{
                    backgroundColor: isDrawingActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isDrawingActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={artLogo} alt="" className="  w-14" />
                    <p>Art & Drawing</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={articlesClickHandle}
                  style={{
                    backgroundColor: isArticlesActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isArticlesActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={articlesLogo} alt="" className="  w-14" />
                    <p>Articles</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={ebooksClickHandle}
                  style={{
                    backgroundColor: isEbooksActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isEbooksActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={ebookLogo} alt="" className="  w-14" />
                    <p>Ebooks</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={educationClickHandle}
                  style={{
                    backgroundColor: isEducationtActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isEducationtActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={educationLogo} alt="" className="  w-14" />
                    <p>Education</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={filmsClickHandle}
                  style={{
                    backgroundColor: isFilmsActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isFilmsActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={filmsLogo} alt="" className="  w-14" />
                    <p>Films</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={musicClickHandle}
                  style={{
                    backgroundColor: isMusicActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isMusicActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={musicLogo} alt="" className="  w-14" />
                    <p>Music</p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="mt-15 w-190 h-35 rounded-md flex border border-black overflow-hidden cursor-pointer shadow-none"
                  onClick={podcastClickHandle}
                  style={{
                    backgroundColor: isPodcastActive
                      ? "rgba(35, 160, 148, 1)"
                      : "",
                    boxShadow: isPodcastActive ? "2px 2px 0px black" : "",
                  }}
                >
                  <div className="w-60 h-full px-4  flex justify-center items-center space-x-4">
                    <img src={podcatLogo} alt="" className="  w-14" />
                    <p>Podcasts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 h-28 grid-cols-2 grid mt-8">
            <div className=" flex flex-col pr-32">
              <p>Price</p>
              <input
                type="text"
                placeholder="2 MATIC"
                required
                className=" mt-2 rounded-lg w-96  text-left px-5"
                onChange={(event) => {
                  // setFormCredentials({
                  //     ...FormCredentials,
                  //     price: event.target.value
                  // })
                  setFormInput({
                    ...formInput,
                    price: event.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Copies</p>
              <input
                type="text"
                placeholder="1"
                required
                className=" mt-2 rounded-lg w-96 text-left px-5"
                onChange={(event) => {
                  // setFormCredentials({
                  //     ...FormCredentials,
                  //     supply: event.target.value
                  // })
                  setFormInput({
                    ...formInput,
                    supply: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-40 h-280px">
            <div className=" flex flex-col">
              <p>Cover Image</p>
              <div className=" mt-8 w-full h-96 border-dashed border-black border-2 rounded-lg bg-white flex flex-col justify-center items-center">
                <div className=" flex items-end">
                  <input
                    type="file"
                    id="cover"
                    className=" ml-24"
                    onChange={coverHandle}
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-col">
              <p>Content</p>
              <div className=" mt-8 w-full h-96 border-dashed border-black border-2 rounded-lg bg-white flex flex-col justify-center items-center">
                <div className=" flex items-end">
                  <input
                    type="file" //id="cover"
                    id="content"
                    className=" ml-24"
                    onChange={contentHandle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={mintToken}
          className=" font-Gothic bg-black text-white  w-96 rounded-lg mb-9 h-10 ml-96"
        >
          Mint Token
        </button>
      </div>
    </>
  );
};
export default Publish;

import React from 'react'
import { useState } from 'react';

//
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Music from './Music';
import Animation from './Animation';
import Ebooks from './Ebooks';
import ArtDrawing from './ArtDrawing';
import Podcasts from './Podcasts';
import Articles from './Articles';
import Education from './Education';
import Films from './Films';

//

import { contractAddress } from './contractConfig';
import { contractAbi } from "./contractConfig";
import axios from 'axios';
import web3modal from "web3modal";
import { ethers } from 'ethers';


import {
  animateScroll as scroll,
  scroller,
} from "react-scroll";
import { useEffect } from 'react';
import Footer from './Footer';





const Home = () => {
  const [myItems, setMyItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [musicNfts, setMusicNfts] = useState([]);
  const [animationNfts, setAnimationNfts] = useState([]);
  const [ebooksNfts, setEbooksNfts] = useState([]);
  const [artNfts, setArtNfts] = useState([]);
  const [podcastNfts, setPodcastNfts] = useState([]);
  const [articlesNfts, setArticleNfts] = useState([]);
  const [filmsNfts, setFilmsNfts] = useState([]);
  const [educationNfts, setEducationNfts] = useState([]);

  const animationScroll = () => {
    scroller.scrollTo("animation", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };
  const musicScroll = () => {
    scroller.scrollTo("music", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };
  const artDrawingScroll = () => {
    scroller.scrollTo("art", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };

  const podcastsScroll = () => {
    scroller.scrollTo("podcast", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };
  const articlesScroll = () => {
    scroller.scrollTo("article", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };

  const educationScroll = () => {
    scroller.scrollTo("education", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };
  const filmsScroll = () => {
    scroller.scrollTo("film", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };
  const ebooksScroll = () => {
    scroller.scrollTo("ebooks", {
      duration: 1500,
      delay: 200,
      smooth: true,
    });
  };


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
    const data = await contract.fetchStore();

    console.log("data is :", data);

    const items = await Promise.all(data.map(async (i) => {
      try {
          const tokenUri = await contract.uri(i.tokenId.toString());
          // console.log("tokenUri is :", tokenUri);
  
          // Ensure tokenUri is properly resolved before proceeding
          const response = await axios.get(await tokenUri,{cors:true});
          const meta = response.data;

          // console.log("meta is :", meta.coverImageURI);
  
          const price = ethers.utils.formatEther(i.price);
          const item = {
              price,
              name: meta.name,
              tokenId: parseInt(i.tokenId),
              supplyL: parseInt(i.supplyleft),
              cover: meta.coverImageURI,
              category: i.category,
              content: meta.contentURI
          };
          return item;
      } catch (error) {
          console.error("Error fetching item:", error);
          throw error; // Rethrow the error to indicate failure for this item
      }
  }));
    setMyItems(items);
    filterNFts();
  }

  function filterNFts() {
    myItems.map((nft) => {
      // console.log(nft.category);
      if (nft.category === "Music") {
        return setMusicNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Animation") {
        setAnimationNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Ebooks") {
        setEbooksNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Art") {
        setArtNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Podcast") {
        setPodcastNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Articles") {
        setArticleNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Films") {
        setFilmsNfts(oldArray => [...oldArray, nft]);
      }
      if (nft.category === "Education") {
        setEducationNfts(oldArray => [...oldArray, nft]);
      }
    })
    setLoaded(true);
  }
console.log(musicNfts);

  return (
    <>
    <NavBar
        onAnimationClick={animationScroll}
        onMusicClick={musicScroll}
        onEbooksClick={ebooksScroll}
        onArtClick={artDrawingScroll}
        onPodcastClick={podcastsScroll}
        onArticleClick={articlesScroll}
        onEducationClick={educationScroll}
        onFilmClick={filmsScroll}
      />
      <HeroSection/>
      <div className="music-div" id="music">
        <Music
          items={musicNfts} />
      </div>
      <div className="animation-div" id="animation">
        <Animation
          items={animationNfts} />
      </div>
      <div className="ebooks-div" id="ebooks">
        <Ebooks
          items={ebooksNfts} />
      </div>
      <div className="artDrawing" id="art">
        <ArtDrawing
          items={artNfts} />
      </div>
      <div className="artDrawing" id="podcast">
        <Podcasts
          items={podcastNfts} />
      </div>
      <div className="artDrawing" id="article">
        <Articles
          items={articlesNfts} />
      </div>
      <div className="artDrawing" id="education">
        <Education
          items={educationNfts} />
      </div>
      <div className="artDrawing" id="film">
        <Films
          items={filmsNfts} />
      </div>
      <Footer/>
    </>
  )
}

export default Home;
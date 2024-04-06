import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState, useRef, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { Link } from "react-router-dom";


const NavBar =
  ({ onAnimationClick, onMusicClick, onEbooksClick, onArtClick, onPodcastClick, onArticleClick, onEducationClick, onFilmClick }) => {
    const [items, addItems] = useState([
      "Art",
      "Podcast",
      "Articles",
      "Education",
      "Films",
    ]);
    const functionMap = {
      Art: onArtClick,
      Podcast: onPodcastClick,
      Articles: onArticleClick,
      Films: onFilmClick,
      Education: onEducationClick,
    };



    const dashboardHandle = () => {
     alert("Connect wallet to proceed");
    }

    //hooks
    const account = useAccount();
    // console.log(account.address);
    // const balance = useBalance({
    //   address: `${account.address}`,
    // })
    // console.log(balance?.data.formatted)

    const onItemClick = (item) => {
      const onClick = functionMap[item];
      if (onClick) {
        onClick();
      }
    };

    const [isClicked, setClick] = useState(false);
    const dropdownRef = useRef(null);

    const renderItems = () => {
      return (
        <ul
          ref={dropdownRef}
          className={`font-Gothic dropdown-menu absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isClicked ? "block" : "hidden"
            }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          {items.map((item, index) => {
            return (
              <button onClick={() => { onItemClick(item) }} className=" block" key={index} >
                <li className="px-4 py-2 text-lg border-b-2 border-white hover:border-pink-500 transition-border duration-700">
                  {item}
                </li>
              </button>
            );
          })
          }
        </ul >
      );
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setClick(false);
        }
      };
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return (
      <div className=" sticky top-0 bg-heroColor flex items-center justify-between flex-row px-4 py-2 font-Gothic border-b-2 border-black">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer font-Gothic border-b-2 border-white hover:border-pink-500 transition-border duration-700"> Web3</div>
        <ul className="flex items-center justify-between flex-row space-x-8 cursor-pointer text-lg">
          <button onClick={onMusicClick}>
            <li className="border-b-2 border-white hover:border-pink-500 transition-border duration-700 hover:scale-110">Music</li>
          </button>
          <button onClick={onAnimationClick}>
            <li className="border-b-2 border-white hover:border-pink-500 transition-border duration-700 hover:scale-110">Animation</li>
          </button>
          <button onClick={onEbooksClick}>
            <li className="border-b-2 border-white hover:border-pink-500 transition-border duration-700 hover:scale-110">Ebooks</li>
          </button>

          <li className="flex">
            <button
              onClick={() => {
                setClick(!isClicked);
              }}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2"
            >

              <RxHamburgerMenu />
            </button>
            {isClicked && renderItems()}
          </li>
           { account.isConnected ?
          <Link to="/dashboard">
            <button className="border-b-2 border-white hover:border-pink-500 transition-border duration-700 hover:scale-110">
              Dashboard
            </button>
          </Link>:
           <button onClick={dashboardHandle} className="border-b-2 border-white hover:border-pink-500 transition-border duration-700 hover:scale-110">
           Dashboard
         </button>

          }

        </ul>
        <div className="border-l-2 border-black px-4 font-Gothic h-full">
          <ConnectButton />
        </div>
      </div >
    );
  };

export default NavBar;

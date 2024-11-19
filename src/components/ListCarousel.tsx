"use client";

import {IAnimeResult} from "darkconsumet";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./ListCarousel.css";
import Image from "next/image";

const ListCarousel = () => {
  const [animeList, setAnimeList] = useState<IAnimeResult[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const data: any = await fetch("/api/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: 1, type: "most-favorite" }),

        }).then(async(res) => 
        {
          const result = await res.json()
          if(result){
            if(result.status === 200){
              setIsLoaded(true);
            }
            return result
          }else{
            throw new Error("Something went wrong");
          }
        }
        );
        console.log(data);
        setAnimeList(data.data.results);
      } catch (e) {
        console.log(e);
      }
    };
   fetchAnimeList();
  }, []);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5, // Default number of slides to show
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3, // Show 3 slides on tablet
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Carousel items;

  return (
    <div className="mx-auto px-4 py-8" >
      { isLoaded &&
      <Slider {...settings}>
        {animeList && animeList.map((item) => (
          <div key={item.id} className="px-2" title={item.title as string}>
            <div className="relative text-center rounded-xl shadow-md group">
              <Image
                className="rounded-xl"
                src={item.image as string}
                alt={item.title as string}
                width={500}
                height={500}
                style={{
                  width: "100%",
                  aspectRatio: "5/7",
                  objectFit: "cover",
                }}
              />
              <p
                className="w-full text-white font-extrabold p-2 rounded-b-md group-hover:max-h-full transition-all"
                style={{
                  minHeight: "2em",
                  maxHeight: "3.5em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Limit the text to two lines
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.title as string}
              </p>
              {/* {item.title && <p className="opacity-70 absolute font-extrabold top-0 right-0 bg-primary text-white text-xs px-2 py-1" style={{borderTopRightRadius: "0.75rem", borderBottomLeftRadius: "0.75rem"}}>DUB</p>} */}
            </div>
          </div>
        ))}
      </Slider>}
    </div>
  );
};

export default ListCarousel;

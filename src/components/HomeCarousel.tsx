"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { IAnimeInfo, IAnimeResult } from "darkconsumet";
import "./HomeCarousel.css";

function HomeCarousel() {
  const [banner, setBanner] = useState<IAnimeResult | []>([]);
  useLayoutEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const data: any = await fetch("/api/anime/others", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "spotlight" }),
        }).then(async (res) => {
          const result = await res.json();
          if (result) {
            if (result.status === 200) {
              setBanner(result.data.results);
            }
            return result;
          } else {
            throw new Error("Something went wrong");
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchSpotlight();
  }, []);

  useEffect(() => {
    console.log(banner);
  }, [banner]);
  return (
    <div id="outercarou" className="flex w-full md:max-w-[90vw] mx-auto pt-4 h-[30vh] sm:h-[64vh] xl:h-[70vh]">
      <Carousel
        pauseOnHover={true}
        slideInterval={5000}
        draggable={true}
        indicators={true}
      >
        {banner.map((item: IAnimeInfo, index: number) => (
          <div
            key={index}
            className="w-full h-full"
            style={{
              backgroundImage: `url(${item?.banner})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div
              className="h-full flex flex-col justify-end align-end"
              style={{
                background:
                  "linear-gradient(270deg,  rgba(0,0,0,0) 31%, rgba(0,0,0,0.6290849103313201) 59%, rgba(0,0,0,1) 83%)",
              }}
            >
              <div className="flex md:w-1/2 px-2 md:px-16 flex flex-col justify-center">
                <span className="text-xs md:text-2xl font-thin text-highlight-color">
                  {"#" + item?.rank + " Hits"}
                </span>
                <h1 className="text-sm md:text-4xl text-white font-bold">
                  {item?.title.toString()}
                </h1>
                {/* <p className="text-md font-semibold text-white">
                  {item?.japaneseTitle?.toString()}
                </p> */}
                <div>
                  <span className="min-w-[30px] text-center inline-block bg-primary-light text-xxs md:text-xs mr-2  px-1 ">
                    {item?.type}
                  </span>
                  <span className="text-center inline-block bg-highlight-color text-xxs md:text-xs text-black  mr-2 px-1 rounded-r-sm">
                    {item?.quality}
                  </span>
                  <span className="min-w-[30px] text-center inline-block bg-my-grey-500 text-xxs md:text-xs mr-2 text-white px-1 rounded-l-sm">
                    {item?.releaseDate}
                  </span>
                  <span className="min-w-[30px] text-center inline-block text-xxs md:text-xs text-black">
                    <span className="min-w-[30px] inline-block bg-blue-300 px-1 rounded-l-sm">
                      {item?.sub}
                    </span>
                    {item?.dub ? (
                      <span className="min-w-[30px] inline-block bg-green-300 px-1">
                        {item?.dub}
                      </span>
                    ) : null}
                    <span className="min-w-[30px] inline-block bg-red-300 px-1 rounded-r-sm">
                      {item?.sub > item?.dub ? item?.sub : item?.dub}
                    </span>
                  </span>
                </div>
                <p className="hidden md:block text-sm my-5 font-thin text-white">
                  {item?.description?.toString() || "".length > 300
                    ? item?.description?.toString().slice(0, 300) + "..."
                    : item?.description?.toString()}
                </p>
                <button className="w-[100px] h-10 mt-4 mb-10 bg-primary-color text-white rounded-md text-sm font-semibold hover:bg-primary-light">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./AdoptionSwiperCube.css";
import styled from "styled-components";

// import required modules
import { EffectCube, Pagination } from "swiper";

const AdoptionLink = styled.a`
  text-decoration: none;
  width: 100%;
  font-size: 25px;
  position: absolute;
  padding-top: 100px;
  padding-left: 10px;
  height: 100%;
  color: white;
  background-color: hsla(0, 0%, 26%, 0.35);
`;

const AdoptionSwiperCube = () => {
  SwiperCore.use([Autoplay]);

  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        // mousewheel={true}
        // loop={true}
        // onSlideChange={() => console.log("slide")}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <AdoptionLink href="https://petpalanimalshelter.com/profile.php?name=Josh&id=7037">
              Josh
            </AdoptionLink>
            <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7037.jpg" />
            {/* josh */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <AdoptionLink href="https://petpalanimalshelter.com/profile.php?name=Luna&id=7011">
              Luna
            </AdoptionLink>
            <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7011.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <AdoptionLink href="https://petpalanimalshelter.com/profile.php?name=Shiro&id=7065">
              Shiro
            </AdoptionLink>
            <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7065.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <AdoptionLink href="https://petpalanimalshelter.com/profile.php?name=Ace&id=7026">
              Ace
            </AdoptionLink>
            <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7026.jpg" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default AdoptionSwiperCube;

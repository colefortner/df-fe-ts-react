import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./AdoptionSwiperCube.css";

// import required modules
import { EffectCube, Pagination } from "swiper";

const AdoptionSwiperCube = () => {
  SwiperCore.use([Autoplay]);

  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 4000,
        }}
        speed={2000}
        // loop={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7037.jpg" />
          {/* josh */}
          <a href="https://petpalanimalshelter.com/profile.php?name=Josh&id=7037">
            Josh
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7011.jpg" />
          <a href="https://petpalanimalshelter.com/profile.php?name=Luna&id=7011">
            Luna
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/7041.jpg" />
          <a href="https://petpalanimalshelter.com/profile.php?name=Motive&id=7041">
            Motive
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://petpalanimalshelter.com/wp-content/uploads/pets/6998.jpg" />
          <a href="https://petpalanimalshelter.com/profile.php?name=Wilbur&id=6998">
            Wilbur
          </a>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default AdoptionSwiperCube;

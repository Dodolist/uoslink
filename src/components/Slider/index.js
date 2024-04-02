import axios from "axios";
import React, { useCallback } from "react";
import { BannerImage } from "./style";
import Banner1Image from "../../images/banner1.png";
import Banner2Image from "../../images/banner2.png";
import Banner3Image from "../../images/banner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Slider = ({ clickCustomBanner }) => {
  const clickBanner = (bannerId) => {
    // 새 창으로 링크 열기
    var link;
    if (bannerId === 1) {
      link = "https://uoslink.com";
      window.open(link, "_blank");
    } else if (bannerId === 2) {
      link = "http://pf.kakao.com/_MwxarG";
      window.open(link, "_blank");
    } else if (bannerId === 3) {
      if (localStorage.getItem("custom") !== "custom") {
        clickCustomBanner();
      }
    }

    let url = "https://www.iflab.run/api/click/banner";
    axios.post(url, {
      banner_id: String(bannerId),
    });
  };

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      style={{
        width: "100%",
        height: "156px",
        cursor: "pointer",
        borderRadius: "8px",
      }}
      autoplay={{ delay: 5000 }}
      loop={true}
    >
      <SwiperSlide>
        <BannerImage src={Banner3Image} onClick={() => clickBanner(3)} />
      </SwiperSlide>
      <SwiperSlide>
        <BannerImage src={Banner1Image} onClick={() => clickBanner(1)} />
      </SwiperSlide>
      <SwiperSlide>
        <BannerImage src={Banner2Image} onClick={() => clickBanner(2)} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;

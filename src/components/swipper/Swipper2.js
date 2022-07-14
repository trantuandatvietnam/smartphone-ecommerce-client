import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import banner1 from '../../assets/imgs/banner.png';
import banner2 from '../../assets/imgs/banner-reno.png';
import banner3 from '../../assets/imgs/banner-sale.png';
import banner4 from '../../assets/imgs/banner0ip13.png';

import subBanner1 from '../../assets/imgs/sub-banner-1.jpg';
import subBanner2 from '../../assets/imgs/sub-banner-2.jpg';
import subBanner3 from '../../assets/imgs/sub-banner3.jpg';
import subBanner4 from '../../assets/imgs/sub-banner4.png';

import './swipper.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

export default function Swipper2() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="flex gap-x-8 wrapper">
            <div className="lg:max-w-[76rem] mb-12 lg:mb-0 w-full flex flex-col justify-between">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: false,
                    }}
                >
                    <SwiperSlide>
                        <div className="object-cover rounded-lg overflow-hidden">
                            <img src={banner1} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="object-cover rounded-lg overflow-hidden">
                            <img src={banner2} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="object-cover rounded-lg overflow-hidden">
                            <img src={banner3} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="object-cover rounded-lg overflow-hidden">
                            <img src={banner4} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="p-4 whitespace-nowrap overflow-hidden">
                            <span>Sale off 50%</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="p-4 whitespace-nowrap overflow-hidden">
                            <span>Reno 6 Serises</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="p-4 whitespace-nowrap overflow-hidden">
                            <span>Phụ kiện - 50% giảm</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="p-4 whitespace-nowrap overflow-hidden">
                            <span>Iphone 13 Promax</span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-x-[2rem] gap-y-[2rem] w-[36rem] h-full ">
                <div className="object-cover  rounded-lg overflow-hidden">
                    <img src={subBanner1} alt="" />
                </div>
                <div className="object-cover rounded-lg overflow-hidden">
                    <img src={subBanner2} alt="" />
                </div>
                <div className="object-cover rounded-lg overflow-hidden">
                    <img src={subBanner3} alt="" />
                </div>
                <div className="object-cover rounded-lg overflow-hidden">
                    <img src={subBanner4} alt="" />
                </div>
            </div>
        </div>
    );
}

import React from 'react';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Title from '../../../../components/title/Title';

import payOnline1 from '../../../../assets/imgs/moca.png';
import payOnline2 from '../../../../assets/imgs/napThe.png';
import payOnline3 from '../../../../assets/imgs/vib.png';
import payOnline4 from '../../../../assets/imgs/tpBank.png';
import payOnline5 from '../../../../assets/imgs/vnPay.png';
import payOnline6 from '../../../../assets/imgs/vnPay100.png';
import payOnline7 from '../../../../assets/imgs/vnPay400.png';
// import css
import './payOnline.css';

const payOnlineData = [
    {
        id: 1,
        img: payOnline1,
    },
    {
        id: 2,
        img: payOnline2,
    },
    {
        id: 3,
        img: payOnline3,
    },
    {
        id: 4,
        img: payOnline4,
    },
    {
        id: 5,
        img: payOnline5,
    },
    {
        id: 6,
        img: payOnline6,
    },
    {
        id: 7,
        img: payOnline7,
    },
];

export default function PayOnline() {
    return (
        <div className="wrapper flex flex-col gap-2">
            <Title>Giảm thêm khi thanh toán online</Title>
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={3}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper3"
            >
                {payOnlineData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="object-cover overflow-hidden">
                            <img src={item.img} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


import 'swiper/css';
import 'swiper/css/pagination';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import img1 from '../../../../assets/banner/1.png';
import img2 from '../../../../assets/banner/2.png';
import img3 from '../../../../assets/banner/3.png'
const Banner = () => {
    return (
        <>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper mb-3"
        >
          <SwiperSlide>
            <img className='w-[1300px]' src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[1300px]' src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[1300px]' src={img3} alt="" />
          </SwiperSlide>
        </Swiper>
      </>
    );
};

export default Banner;
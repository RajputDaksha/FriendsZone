import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from '@material-tailwind/react/Image';
import img from '../../assets/img/team-2-800x800.jpg';
import SwiperSlideComponent from './SwiperSlideComponent';



function ChatUSerSwiper({ conversation, user, active, setInfo, setActive, setCurrentChat, currentChat, liveFriends }) {

    return (
        <>
            <div className="chat_user bg-[#d0d0d0] w-full  h-[3rem] flex items-center px-1 py-2 overflow-x-auto scrollbar-hide" id="top_live_user_in_mobile">

                {
                    liveFriends !== undefined && liveFriends.length > 0 && liveFriends.map((c) => {
                        // console.log(c)
                        return (
                            <>
                                        <SwiperSlideComponent conversation={c} />
                                   
                            </>


                        )
                    })
                }



            </div>
            
        </>

    );
};


export default ChatUSerSwiper
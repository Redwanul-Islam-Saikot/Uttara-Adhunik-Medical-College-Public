'use client';

import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper CSS Import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function StudentFeedbackSection() {
  const feedbacks = [
    {
      id: 1,
      name: 'Emma Elizabeth',
      role: 'Assistant Teacher',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
      feedback:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      id: 2,
      name: 'Zent Ekizie',
      role: 'Assistant Teacher',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop',
      feedback:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      id: 3,
      name: 'Samantha Willow',
      role: 'Teacher',
      rating: 4,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
      feedback:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      id: 4,
      name: 'Michael Vance',
      role: 'Medical Student',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
      feedback:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      id: 5,
      name: 'Sophia Reynolds',
      role: 'Senior Clinical Intern',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
      feedback:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
  ];

  return (
    <section className="bg-[#f8f9fa] py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d8253] font-serif">
            My Students Feedback
          </h2>
          <p className="text-slate-500 text-sm font-normal">
            You’ll find something to spark your curiosity and enhance
          </p>
        </div>

        {/* Feedback Cards Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1} // মোবাইলে ১টি
          slidesPerGroup={1} // প্রতিবারে ১টি করে স্লাইড হবে
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 }, // ট্যাবে ২টি
            1024: { slidesPerView: 3 }, // বড় স্ক্রিনে একসাথে ৩টি
          }}
          className="pb-14 feedback-swiper"
        >
          {feedbacks.map((item) => (
            <SwiperSlide key={item.id} className="h-full">
              <div className="bg-white p-8 rounded-none shadow-xs border border-slate-100 flex flex-col justify-between space-y-6 relative h-full min-h-[260px]">
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-[#ffc107] text-[#ffc107]"
                      />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {item.feedback}
                  </p>
                </div>

                {/* Profile & Quote Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#0d8253]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.role}</p>
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <Quote size={40} className="text-[#0d8253] stroke-1" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Pagination Bullet Colors */}
      <style jsx global>{`
        .feedback-swiper .swiper-pagination-bullet {
          background-color: #cbd5e1;
          opacity: 1;
        }
        .feedback-swiper .swiper-pagination-bullet-active {
          background-color: #ffc107;
        }
      `}</style>
    </section>
  );
}
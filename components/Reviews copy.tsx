import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../components/ui/card";

export const Reviews = (): React.ReactElement => {
  const { t } = useTranslation();
  const reviews = [
    {
      name: "DICE",
      content:
        "TRX Exchanger has been my go-to for years — always smooth and reliable. Had my first interaction with support recently, and it was just as great. Well done, guys!\n\n👍",
      rating: "icons/rating.png",
    },
    {
      name: "John Trox",
      content:
        "If you're having problems finding ways to bridge assets from niche sectors of web3 to other niche areas and can't find a one step, plug and play option, TRX is your new best friend. This is my preferred way to get EVM tokens to non-EVM chains by avoiding CEX's or any other custodial option. With TRX you are in control, you minimize middle-men, and ultimately reduce capital inefficiencies.\n\n🚀",
      rating: "icons/rating.png",
    },
    {
      name: "DICE",
      content:
        "Fast swaps and a huge selection of coins. Support is excellent, resolving any issues quickly. I've used the service over 50 times — always great!",
      rating: "icons/rating.png",
    },
    {
      name: "DICE",
      content:
        "Fast swaps and a huge selection of coins. Support is excellent, resolving any issues quickly. I've used the service over 50 times — always great!",
      rating: "icons/rating.png",
    },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const goToNext = useCallback(() => {
    setSlideDirection('left');
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, reviews.length - 1));
  }, [reviews.length]);

  const goToPrevious = useCallback(() => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, [reviews.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === ' ') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const getVisibleReviews = useCallback(() => {
    if (typeof window === 'undefined') return reviews.slice(0, 3);
    
    const width = window.innerWidth;
    let visibleCount = 1;
    if (width >= 1024) visibleCount = 3;
    else if (width >= 640) visibleCount = 2;

    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + visibleCount, reviews.length);
    return reviews.slice(startIndex, endIndex);
  }, [currentIndex]);

  const visibleReviews = getVisibleReviews();

  const getSlideContainerWidth = () => {
    if (typeof window === 'undefined') return 'w-full';
    
    const width = window.innerWidth;
    if (width < 640) return 'w-[411px]'; 
    if (width < 1024) return 'w-[800px]'; 
    return 'w-[1300px]'; 
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= reviews.length - (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1);

  return (
    <section id="reviews" className="flex flex-col w-full items-center gap-10 relative py-20 px-4">
      <h2 className="font-bold text-[#252525] text-4xl text-center tracking-[0] leading-[59.1px] md:text-3xl sm:text-2xl">
        {t("section_title_blog")}
      </h2>

      <div 
        className="relative w-full max-w-[1454px] min-h-[400px] flex flex-col items-center"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          disabled={isAtStart}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[57px] h-[57px] p-0 hover:bg-transparent z-10 transition-all duration-200 hover:scale-110"
          aria-label="Previous review"
        >
          <svg className="" width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.8942 14.2545H6.18192V18.9909H42.8942V14.2545Z" fill={`${
            isAtStart ? '#dbdbdb' : '#2E77DA'
          }`}/>
            <path d="M16.3654 32.4942L19.6828 29.1767L7.12782 16.624L19.6828 4.07126L16.3654 0.753784L0.497353 16.6241L16.3654 32.4942Z" fill={`${
            isAtStart ? '#dbdbdb' : '#2E77DA'
          }`}/>
          </svg>


        </Button>

        <div 
          className={`${getSlideContainerWidth()} flex justify-center items-center overflow-hidden`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className={`flex gap-6 md:gap-4 sm:gap-3 transition-all duration-700 py-6 ease-out ${
              slideDirection === 'left' ? 'animate-slide-left' : 
              slideDirection === 'right' ? 'animate-slide-right' : ''
            }`}
          >
            {visibleReviews.map((review, index) => (
              <Card
                key={`${currentIndex}-${index}`}
                className="w-[360px] sm:w-[350px] md:w-[350px] sm:w-[300px] bg-[#ffffff] h-fit rounded-2xl border-0 shadow-none transition-all duration-500 md:hover:shadow-xl md:hover:-translate-y-1 flex-shrink-0"
              >
                <CardContent className="p-14 md:p-8 sm:p-6">
                  <div className="flex flex-col gap-9 md:gap-6 sm:gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-[#252525] text-[21px] tracking-[0] leading-[59.1px] md:text-lg sm:text-base">
                        {review.name}
                      </h3>
                      <p className="font-normal text-[#252525] text-base tracking-[0] leading-6 whitespace-pre-line md:text-sm sm:text-xs">
                        {review.content}
                      </p>
                    </div>
                    <img
                      className="flex-[0_0_auto] max-w-[133px] md:max-w-[100px] sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
                      alt="Rating stars"
                      src={review.rating}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-[57px] h-[57px] p-0 hover:bg-transparent z-10 md:w-12 md:h-12 sm:w-10 sm:h-10 transition-all duration-200 hover:scale-110 ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="Next review"
        >
          <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.105713 14.2545H36.818V18.9909H0.105713V14.2545Z" fill={`${
            isAtEnd ? '#dbdbdb' : '#2E77DA'
          }`}/>
            <path d="M26.6346 32.4942L23.3171 29.1767L35.8722 16.624L23.3171 4.07126L26.6346 0.753784L42.5026 16.6241L26.6346 32.4942Z" fill={`${
            isAtEnd ? '#dbdbdb' : '#2E77DA'
          }`}/>
          </svg>

        </Button>

      </div>
    </section>
  );
};
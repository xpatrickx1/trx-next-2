import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../components/ui/card";

const Slide = ({ slide, current, handleSlideClick }) => {
  const slideRef = useRef(null);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  };

  const handleMouseLeave = () => {
    const el = slideRef.current;
    el.style.setProperty('--x', 0);
    el.style.setProperty('--y', 0);
  };

  const handleSlideSelect = () => {
    handleSlideClick(slide.index);
  };

  const imageLoaded = (event) => {
    event.target.style.opacity = 1;
  };

  const classNames = `slide ${current === slide.index ? 'slide--current' : 
    current - 1 === slide.index ? 'slide--previous' : 
    current + 1 === slide.index ? 'slide--next' : ''}`;

  return (
    <li 
      ref={slideRef}
      className={classNames}
      onClick={handleSlideSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="w-[360px] lg:w-[411px] bg-[#ffffff] h-fit rounded-2xl border-0 shadow-none transition-all duration-500 md:hover:shadow-xl md:hover:-translate-y-1 flex-shrink-0">
        <CardContent className="p-6 sm:p-14 md:p-8">
          <div className="flex flex-col gap-9 md:gap-6 sm:gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-[#252525] text-[21px] tracking-[0] leading-[59.1px] md:text-lg sm:text-base">
                {slide.name}
              </h3>
              <p className="font-normal text-[#252525] text-base tracking-[0] leading-6 whitespace-pre-line md:text-sm sm:text-xs">
                {slide.content}
              </p>
            </div>
            <img
              className="flex-[0_0-auto] max-w-[133px] md:max-w-[100px] sm:max-w-[80px] transition-transform duration-300 hover:scale-105"
              alt="Rating stars"
              src={slide.rating}
              onLoad={imageLoaded}
            />
          </div>
        </CardContent>
      </Card>
    </li>
  );
};

const SliderControl = ({ type, title, handleClick, disabled }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
      className={`btn btn--${type} absolute top-full md:top-1/2 -translate-y-1/2 w-[57px] h-[57px] p-0 hover:bg-transparent z-10 transition-all duration-200 hover:scale-110 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
      } ${type === 'previous' ? 'left-0' : 'right-0'}`}
      aria-label={title}
    >
      <svg className="icon" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        {type === 'previous' ? (
          <>
            <path d="M42.8942 14.2545H6.18192V18.9909H42.8942V14.2545Z" fill={disabled ? '#dbdbdb' : '#2E77DA'}/>
            <path d="M16.3654 32.4942L19.6828 29.1767L7.12782 16.624L19.6828 4.07126L16.3654 0.753784L0.497353 16.6241L16.3654 32.4942Z" fill={disabled ? '#dbdbdb' : '#2E77DA'}/>
          </>
        ) : (
          <>
            <path d="M0.105713 14.2545H36.818V18.9909H0.105713V14.2545Z" fill={disabled ? '#dbdbdb' : '#2E77DA'}/>
            <path d="M26.6346 32.4942L23.3171 29.1767L35.8722 16.624L23.3171 4.07126L26.6346 0.753784L42.5026 16.6241L26.6346 32.4942Z" fill={disabled ? '#dbdbdb' : '#2E77DA'}/>
          </>
        )}
      </svg>
    </Button>
  );
};

export const Reviews = (): React.ReactElement => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const slides = reviews.map((review, index) => ({
    ...review,
    index,
  }));

  const handlePreviousClick = useCallback(() => {
    setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const handleNextClick = useCallback(() => {
    setCurrent((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
  }, [slides.length]);

  const handleSlideClick = useCallback((index) => {
    if (current !== index) {
      setCurrent(index);
    }
  }, [current]);

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
    if (isLeftSwipe) handleNextClick();
    else if (isRightSwipe) handlePreviousClick();
  };

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    return width >= 1024 ? 3 : width >= 640 ? 2 : 1;
  };

  const getSlideWidth = () => {
    const width = window.innerWidth;
    return width >= 1024 ? 431 : width >= 640 ? 380 : 380;
  };

  const isAtStart = current === 0;
  // const isAtEnd = current >= slides.length - getVisibleCount() + (getVisibleCount() === 1 ? 0 : 1);
  const isAtEnd = current >= slides.length - getVisibleCount();

  const wrapperTransform = {
    transform: `translateX(-${(current * 100) / slides.length}%)`,
  };

  const containerWidth = () => {
    const visibleCount = getVisibleCount();
    const slideWidth = getSlideWidth();
    return `${visibleCount * slideWidth}px`;
  };
  return (
    <section id="reviews" className="flex flex-col w-full items-center gap-10 relative py-20 px-4">
      <h2 className="font-bold text-[#252525] text-4xl text-center tracking-[0] leading-[59.1px] md:text-3xl sm:text-2xl">
        {t("section_title_reviews")}
      </h2>

      <div className="relative w-full max-w-[1454px] min-h-[400px] flex flex-col items-center">
        <SliderControl
          type="previous"
          title="Go to previous review"
          handleClick={handlePreviousClick}
          disabled={isAtStart}
        />

        <div
          className="w-full flex  overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ width: containerWidth() }}
        >
          <ul
            className="flex w-full gap-[20px] pl-[10px]  transition-all duration-700 ease-out"
            style={{
              ...wrapperTransform,
              width: `${slides.length * getSlideWidth()}px`,
            }}
          >
            {slides.map((slide) => (
              <Slide
                key={slide.index}
                slide={slide}
                current={current}
                handleSlideClick={handleSlideClick}
              />
            ))}
          </ul>
        </div>

        <SliderControl
          type="next"
          title="Go to next review"
          handleClick={handleNextClick}
          disabled={isAtEnd}
        />
      </div>
    </section>
  );
};

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
 
];
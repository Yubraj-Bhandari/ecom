import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useCallback, useEffect } from 'react';

// Import banner images
import banner1 from '../../assets/banner1.jpg';
import banner4 from '../../assets/banner4.jpg';

import banner9 from '../../assets/banner9.jpg';


const BannerSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      image: banner1, 
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover the latest trends",
      image: banner4, 
      cta: "Explore"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On orders over $50",
      image: banner9, 
      cta: "Learn More"
    }
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="mb-8 relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="embla__slide relative flex-shrink-0 w-full"
              style={{ minHeight: '200px', height: 'clamp(200px, 40vw, 400px)' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${banner.image})`,
                }}
              >
                
                {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
              </div>
              <div className="relative z-10 flex items-center justify-center h-full text-white p-4 sm:p-6 lg:p-8">
                <div className="text-center max-w-md mx-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-xl mb-4 text-gray-100">
                    {banner.subtitle}
                  </p>
                  <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base w-full sm:w-auto">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-2 rounded-full text-gray-800 z-20"
        onClick={scrollPrev}
      >
        &#10094;
      </button>
      <button
        className="embla__next absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 p-2 rounded-full text-gray-800 z-20"
        onClick={scrollNext}
      >
        &#10095;
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

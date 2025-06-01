'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const gridImages = [
  '/images/gallery/01-pull.jpg',
  '/images/gallery/02-pull.jpg',
  '/images/gallery/03-white-pagne.jpg',
  '/images/gallery/04-white-pagne.jpg',
  '/images/gallery/05-suit-gray.jpg',
  '/images/gallery/06-suit-gray.jpg',
  '/images/gallery/07-suit-pink.jpg',
  '/images/gallery/08-suit-pink.jpg',
  '/images/gallery/09-jesus-la-star.jpg',
  '/images/gallery/10-jesus-la-star.jpg',
];

const carouselImages = ['/images/gallery/00-save-the-date.jpg', ...gridImages];

export const GallerySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewImageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const openCarousel = useCallback((index: number) => {
    setCurrentIndex(index + 1); // Offset by 1 for "save the date"
    setIsOpen(true);
  }, []);

  const closeCarousel = useCallback(() => setIsOpen(false), []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1,
    );
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: showNext,
    onSwipedRight: showPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (!previewContainerRef.current) return;
    const activeImage = previewImageRefs.current[currentIndex];
    if (!activeImage) return;

    activeImage.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [currentIndex]);

  return (
    <>
      <div id="gallery" className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 px-6 text-center sm:px-32">
          <h2 className="section-heading text-primary">
            Des souvenir à partager
          </h2>
          <p className="max-w-[878px]">
            Plongez dans notre histoire à travers des clichés inoubliables, de
            beaux souvenirs ensemble, du premier regard aux moments marquants,
            instants de complicité et de fous rires...
            <br />
            Restez connectés... des surprises arrivent!
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid h-[1208.07px] grid-cols-2 grid-rows-16 gap-2 sm:container sm:mx-auto sm:h-[2264px] sm:grid-cols-12 sm:grid-rows-20 sm:gap-4">
          <div className="col-span-1 row-span-3 sm:col-span-5 sm:row-span-6">
            <img
              src={gridImages[0]}
              onClick={() => openCarousel(0)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-4 sm:col-span-4 sm:row-span-5">
            <img
              src={gridImages[1]}
              onClick={() => openCarousel(1)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-3 sm:col-span-3 sm:row-span-5">
            <img
              src={gridImages[2]}
              onClick={() => openCarousel(2)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-2 sm:col-span-5 sm:row-span-4 sm:row-start-7">
            <img
              src={gridImages[3]}
              onClick={() => openCarousel(3)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-2 row-span-4 sm:col-span-7 sm:row-span-5">
            <img
              src={gridImages[4]}
              onClick={() => openCarousel(4)}
              className="h-full w-full cursor-pointer object-cover object-[50%_5%]"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-5 sm:col-span-3 sm:row-span-5">
            <img
              src={gridImages[5]}
              onClick={() => openCarousel(5)}
              className="h-full w-full cursor-pointer object-cover"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-2 sm:col-span-6 sm:row-span-5">
            <img
              src={gridImages[6]}
              onClick={() => openCarousel(6)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-4 sm:col-span-3 sm:row-span-5">
            <img
              src={gridImages[7]}
              onClick={() => openCarousel(7)}
              className="h-full w-full cursor-pointer object-cover object-center"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-3 sm:col-span-4 sm:row-span-5">
            <img
              src={gridImages[8]}
              onClick={() => openCarousel(8)}
              className="h-full w-full cursor-pointer object-cover object-center sm:object-[10%_30%]"
              alt="Gallery"
              draggable={false}
            />
          </div>
          <div className="col-span-1 row-span-2 sm:col-span-8 sm:row-span-5">
            <img
              src={gridImages[9]}
              onClick={() => openCarousel(9)}
              className="h-full w-full cursor-pointer object-cover object-center sm:object-[10%_40%]"
              alt="Gallery"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Carousel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur">
          {/* Close button */}
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 z-10 text-white hover:text-red-400"
          >
            <X size={36} />
          </button>

          {/* Preview Strip */}
          <div
            ref={previewContainerRef}
            className="mt-16 mb-4 flex max-w-[90svw] gap-2 overflow-x-auto overflow-y-hidden px-4"
          >
            {carouselImages.map((src, index) => (
              <img
                key={index}
                src={src}
                onClick={() => setCurrentIndex(index)}
                ref={(el) => {
                  previewImageRefs.current[index] = el;
                }}
                className={`h-16 w-auto cursor-pointer rounded-md object-cover transition-all duration-200 ${
                  currentIndex === index
                    ? 'scale-105 ring-4 ring-[#FF6FAA]'
                    : 'opacity-60 hover:opacity-100'
                }`}
                alt={`Preview ${index + 1}`}
                draggable={false}
              />
            ))}
          </div>

          {/* Main image with nav arrows and swipe handlers */}
          <div
            {...handlers}
            className="relative flex flex-1 touch-none items-center justify-center"
          >
            <button
              onClick={showPrev}
              className="absolute top-1/2 -left-1 -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft size={48} />
            </button>

            <Zoom>
              <img
                src={carouselImages[currentIndex]}
                className="max-h-[75svh] max-w-[90svw] rounded-lg shadow-xl select-none"
                alt={`Gallery ${currentIndex + 1}`}
                draggable={false}
              />
            </Zoom>
            <div className="bg-opacity-50 pointer-events-none absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs text-white md:hidden">
              Tapotez pour zoom
            </div>

            <button
              onClick={showNext}
              className="absolute top-1/2 -right-1 -translate-y-1/2 text-white hover:text-gray-600"
            >
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

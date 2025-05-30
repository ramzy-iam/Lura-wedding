export const GallerySection = () => {
  return (
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
      <div className="grid h-[1208.07px] grid-cols-2 grid-rows-16 gap-2 sm:h-[2264px] sm:grid-cols-7 sm:grid-rows-20 sm:gap-4">
        <div className="col-span-1 row-span-3 sm:col-span-3 sm:row-span-6">
          <img
            src="/images/gallery/01-pull.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-4 sm:col-span-2 sm:row-span-5">
          <img
            src="/images/gallery/02-pull.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-3 sm:col-span-2 sm:row-span-5">
          <img
            src="/images/gallery/03-white-pagne.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2 sm:col-span-3 sm:row-span-4 sm:row-start-7">
          <img
            src="/images/gallery/04-white-pagne.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-2 row-span-4 sm:col-span-4 sm:row-span-5">
          <img
            src="/images/gallery/05-suit-gray.jpg"
            className="h-full w-full object-cover object-[50%_5%]"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-5 sm:col-span-1 sm:row-span-5">
          <img
            src="/images/gallery/06-suit-gray.jpg"
            className="object- h-full w-full object-cover"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2 sm:col-span-5 sm:row-span-5">
          <img
            src="/images/gallery/07-suit-pink.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-4 sm:col-span-1 sm:row-span-5">
          <img
            src="/images/gallery/08-suit-pink.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-3 sm:col-span-2 sm:row-span-5">
          <img
            src="/images/gallery/09-jesus-la-star.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2 sm:col-span-5 sm:row-span-5">
          <img
            src="/images/gallery/10-jesus-la-star.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
      </div>
    </div>
  );
};

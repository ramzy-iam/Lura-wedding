export const GallerySection = () => {
  return (
    <div id="gallery" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 px-6 text-center">
        <h2 className="section-heading text-primary">
          Des souvenir à partager
        </h2>
        <p>
          Plongez dans notre histoire à travers des clichés inoubliables, de
          beaux souvenirs ensemble, du premier regard aux moments marquants,
          instants de complicité et de fous rires...
          <br />
          Restez connectés... des surprises arrivent!
        </p>
      </div>
      <div
        style={{ gridTemplateRows: 'repeat(16, 60px)' }}
        className="grid grid-cols-2 gap-2 sm:gap-4"
      >
        <div className="col-span-1 row-span-3">
          <img
            src="/images/gallery/01-pull.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-4">
          <img
            src="/images/gallery/02-pull.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-3">
          <img
            src="/images/gallery/03-white-pagne.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <img
            src="/images/gallery/04-white-pagne.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-2 row-span-4">
          <img
            src="/images/gallery/05-suit-gray.jpg"
            className="h-full w-full object-cover object-[50%_5%]"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-5">
          <img
            src="/images/gallery/06-suit-gray.jpg"
            className="object- h-full w-full object-cover"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <img
            src="/images/gallery/07-suit-pink.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-4">
          <img
            src="/images/gallery/08-suit-pink.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-3">
          <img
            src="/images/gallery/09-jesus-la-star.jpg"
            className="h-full w-full object-cover object-center"
            alt="Gallery"
          />
        </div>
        <div className="col-span-1 row-span-2">
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

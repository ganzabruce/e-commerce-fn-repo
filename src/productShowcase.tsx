// ProductShowcase.tsx

const ProductShowcase = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-4 mt-10 mb-10">
      {/* Wireless Speaker Section */}
      <div className="flex-1 bg-gray-100 rounded-2xl p-8 flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <span className="text-orange-400 text-sm font-medium tracking-wide">
            DIGITAL SMART
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            WIRELESS SPEAKER
          </h2>
          <p className="text-gray-600 text-lg font-medium">MIN. 30-75% OFF</p>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-fit">
            SHOP NOW
          </button>
        </div>

        {/* Speaker Image */}
        <div className="flex-shrink-0 ml-8">
          <img
            src="https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-banner-1.jpg"
            alt="Wireless Speaker"
            className="w-84 h-auto rounded-xl object-cover"
          />
        </div>
      </div>

      {/* Watch Charger Section */}
      <div className="flex-1 bg-gray-100 rounded-2xl p-8 flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <span className="text-orange-400 text-sm font-medium tracking-wide">
            DIGITAL SMART
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
            WATCH CHARGER
          </h2>
          <p className="text-gray-600 text-lg font-medium">UP TO 75% OFF</p>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-fit">
            SHOP NOW
          </button>
        </div>

        {/* Watch Charger Image */}
        <div className="flex-shrink-0 ml-8">
          <img
            src="https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-banner-2.jpg"
            alt="Watch Charger"
            className="w-84 h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;

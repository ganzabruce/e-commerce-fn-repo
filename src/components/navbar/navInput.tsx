const NavInput = () => {
  return (
    <div>
        <div className="search flex">
          <input
            type="search"
            className="border-1 w-100 border-gray-200 py-2 px-5 outline-none"
            name="s"
            placeholder="Search for products, categories, brands, sku..."
            autoComplete="off"
          />
          <select
            name=""
            id=""
            className="border-1 border-gray-200 py-2 px-5"
          >
            <option value="">All Categories</option>
            <option value="accessories">Accessories</option>
            <option value="analog">Analog</option>
            <option value="anklets">Anklets</option>
            <option value="beauty-accessory">Beauty Accessory</option>
            <option value="belts">Belts</option>
            <option value="bracelets">Bracelets</option>
            <option value="casual-shoes">Casual Shoes</option>
            <option value="digital">Digital</option>
            <option value="dresses">Dresses</option>
            <option value="earrings">Earrings</option>
            <option value="electronics">Electronics</option>
            <option value="formal-shoes">Formal Shoes</option>
            <option value="handbags">Handbags</option>
            <option value="hats-caps">Hats & Caps</option>
            <option value="jackets-coats">Jackets & Coats</option>
            <option value="jeans">Jeans</option>
            <option value="women-jeans">Women Jeans</option>
            <option value="laptop-bag">Laptop Bag</option>
            <option value="leather">Leather</option>
            <option value="lingerie-nightwear">Lingerie & Nightwear</option>
            <option value="luggage-travel">Luggage & Travel</option>
            <option value="makeup-kit">Makeup Kit</option>
            <option value="necklaces">Necklaces</option>
            <option value="pearl-jewelry">Pearl Jewelry</option>
            <option value="sandals-floaters">Sandals & Floaters</option>
            <option value="shirts">Shirts</option>
            <option value="shorts-skirts">Shorts & Skirts</option>
            <option value="smart-analog">Smart Analog</option>
            <option value="smart-watches">Smart Watches</option>
            <option value="sneakers">Sneakers</option>
            <option value="socks">Socks</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="t-shirts">T-Shirts</option>
            <option value="tops">Tops</option>
            <option value="trolley-bag">Trolley Bag</option>
            <option value="trousers-capris">Trousers & Capris</option>
            <option value="men-wallet">Wallets</option>
            <option value="wallets">Wallets</option>
            <option value="watches">Watches</option>
          </select>
          <button className="border-1 border-gray-200 py-2 px-5 bg-gray-900">
            <i className="fa-solid fa-magnifying-glass text-amber-300"></i>
          </button>
        </div>
    </div>
  )
}

export default NavInput
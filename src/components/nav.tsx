

const Nav = () => {
  return (
    <div className="">
        <div className="bg-amber-300 info flex justify-around">
            <div className="langs">
                <ul className='flex '>
                    <li className='py-2 px-4 border-1 border-y-0 border-gray-100'>english <i className="fa-solid fa-arrow-down"></i></li>
                    <li className='py-2 px-4 border-1 border-y-0 border-gray-100'>us dollar <i className="fa-solid fa-arrow-down"></i></li>
                </ul>
            </div>
            <div className="contacts">
                <ul className='flex '>
                    <li className='py-2 px-4 border-1 border-gray-100'>welcome to out store</li>
                    <li className='py-2 px-4 border-1 border-gray-100'>blog</li>
                    <li className='py-2 px-4 border-1 border-gray-100'>faq</li>
                    <li className='py-2 px-4 border-1 border-gray-100'>contact us</li>
                </ul>
            </div>
        </div>
        <div className="regular flex justify-around py-5 border-b-1 border-gray-200">
            <div className="logo">
                <img src="https://kapee.presslayouts.com/wp-content/themes/kapee/assets/images/logo.png" alt="" className='w-30 h-auto' />
            </div>
            <div className="search">
                <input type="search" className="border-1 w-100 border-gray-200 py-2 px-5 outline-none" name="s" value="" placeholder="Search for products, categories, brands, sku..." autocomplete="off" />
                <select name="" id="" className="border-1 border-gray-200 py-2 px-5" >
                        <option value="">All Categories</option><option className="" value="accessories">Accessories</option>
                        <option className="" value="analog">Analog</option>
                        <option className="" value="anklets">Anklets</option>
                        <option className="" value="beauty-accessory">Beauty Accessory</option>
                        <option className="" value="belts">Belts</option>
                        <option className="" value="bracelets">Bracelets</option>
                        <option className="" value="casual-shoes">Casual Shoes</option>
                        <option className="" value="digital">Digital</option>
                        <option className="" value="dresses">Dresses</option>
                        <option className="" value="earrings">Earrings</option>
                        <option className="" value="electronics">Electronics</option>
                        <option className="" value="formal-shoes">Formal Shoes</option>
                        <option className="" value="handbags">Handbags</option>
                        <option className="" value="hats-caps">Hats &amp; Caps</option>
                        <option className="" value="jackets-coats">Jackets &amp; Coats</option>
                        <option className="" value="jeans">Jeans</option>
                        <option className="" value="women-jeans">Jeans</option>
                        <option className="" value="laptop-bag">Laptop Bag</option>
                        <option className="" value="leather">Leather</option>
                        <option className="" value="lingerie-nightwear">Lingerie &amp; Nightwear</option>
                        <option className="" value="luggage-travel">Luggage &amp; Travel</option>
                        <option className="" value="makeup-kit">Makeup Kit</option>
                        <option className="" value="necklaces">Necklaces</option>
                        <option className="" value="pearl-jewelry">Pearl Jewelry</option>
                        <option className="" value="sandals-floaters">Sandals &amp; Floaters</option>
                        <option className="" value="shirts">Shirts</option>
                        <option className="" value="shorts-skirts">Shorts &amp; Skirts</option>
                        <option className="" value="smart-analog">Smart Analog</option>
                        <option className="" value="smart-watches">Smart Watches</option>
                        <option className="" value="sneakers">Sneakers</option>
                        <option className="" value="socks">Socks</option>
                        <option className="" value="sunglasses">Sunglasses</option>
                        <option className="" value="t-shirts">T-Shirts</option>
                        <option className="" value="tops">Tops</option>
                        <option className="" value="trolley-bag">Trolley Bag</option>
                        <option className="" value="trousers-capris">Trousers &amp; Capris</option>
                        <option className="" value="men-wallet">Wallets</option>
                        <option className="" value="wallets">Wallets</option>
                        <option className="" value="watches">Watches</option>
                </select>
                <button className="border-1 border-gray-200 py-2 px-5 bg-gray-900" >
                    <i className="fa-solid fa-magnifying-glass text-amber-300"></i>
                </button>
            </div>
            <div className="cart flex gap-3 ">
                <div className="login flex items-center">
                    <i className="fa-solid fa-user text-3xl"></i>
                    <div className="chars ml-2">
                        <h1 className='text-sm text-gray-800'>hello</h1>
                        <h1 className='text-xl'>sign in</h1>
                    </div>
                </div>
                <div className="likes flex items-center">
                    <i className="fa-regular fa-heart relative text-3xl ">
                        <div className="num absolute top-0 -right-3 bg-amber-300 py-0.5 px-1 rounded-full text-xs">0</div>
                    </i>
                </div>
                <div className="cartItems flex items-center mx-2">
                    <i className="fa-solid fa-bag-shopping text-3xl relative">
                        <div className="num text-xs absolute top-0 -right-3 bg-amber-300 py-0.5 px-1 rounded-full">0</div>
                    </i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav
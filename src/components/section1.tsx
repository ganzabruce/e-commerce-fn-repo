import MiniBar from "./navbar/miniBar"
import DropdownRight from "./navbar/dropdownRight"
import Spinner from "./spinner/spinner"
import Banners from "./navbar/banners"
interface Categories {
  title:string;
  name:string;
  subcategories:string[]
}
const categories = [
    {
      title: "",
      name: "Men's Clothing",
      subcategories: ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Suits', 'Shoes']
    },
    {
      title: "",
      name: "Women's Clothing",
      subcategories: ['Dresses', 'Tops', 'Skirts', 'Pants', 'Jackets', 'Shoes']
    },
    {
      title: "",
      name: 'Accessories',
      subcategories: ['Bags', 'Belts', 'Watches', 'Jewelry', 'Sunglasses', 'Hats']
    },
    {
      title: "",
      name: 'Shoes',
      subcategories: ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats', 'Sports']
    },
    {
      title: "",
      name: 'Jewellery',
      subcategories: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']
    },
    {
      title: "",
      name: 'Bags & Backpacks',
      subcategories: ['Handbags', 'Backpacks', 'Briefcases', 'Travel Bags', 'Wallets']
    },
    {
      title: "",
      name: 'Watches',
      subcategories: ['Smart Watches', 'Luxury', 'Sports', 'Casual', 'Digital']
    },
    {
      title: "",
      name: 'Shirts',
      subcategories: ['Casual', 'Formal', 'T-Shirts', 'Polo', 'Tank Tops']
    }
  ];
const Section1 = () => {
  return (
    <div>
        <nav className="border-b-1 border-gray-200">
            <MiniBar />
        </nav>
        <div className="">
          <div className="container grid grid-cols-12">
            <div className="links col-span-4 flex flex-col items-end "> 
              {categories.map(e=>(
                <div key={e.name}>
                  <DropdownRight title="Men's Clothing" name={e.name} subcategories={e.subcategories} />
                </div>
              ))}
            </div>
            <div className="carousel col-span-8  m-5">
                <h1 className="mx-auto my-auto ">
                  <Spinner />
                </h1>
            </div>
          </div>
        </div>
        <div className="banners">
        </div>
            
    </div>
  )
}

export default Section1
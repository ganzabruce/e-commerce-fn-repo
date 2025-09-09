import MiniBar from "./miniBar"
import DropdownRight from "./dropdownRight"
import Spinner from "./spinner"

const Section1 = () => {
  return (
    <div>
        <nav className="border-b-1 border-gray-200">
            <MiniBar />
        </nav>
        <div className="">
          <div className="container grid grid-cols-12">
            <div className="links col-span-4 flex flex-col items-end "> 
              <DropdownRight title="Men's Clothing" />
              <DropdownRight title="Women's Clothing" />
              <DropdownRight title="Accessories" />
              <DropdownRight title="Shoes" />
              <DropdownRight title="Jewellery" />
              <DropdownRight title="Bags & Backpacks" />
              <DropdownRight title="Watches" />
              <DropdownRight title="Dresses" />
              <DropdownRight title="Shirts" />
            </div>
            <div className="carousel col-span-8 bg-green-200 m-5">
                <h1 className="mx-auto my-auto ">
                  <Spinner />
                </h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Section1
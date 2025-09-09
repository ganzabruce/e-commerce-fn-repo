
import DropDown from "./dropDown"
const MiniBar = () => {
  return (
    <div className="grid grid-cols-7">
        <div className="two col-span-2 flex justify-end">
            <button className="bg-amber-300 w-78 flex justify-between items-center px-4"><p>shop by categories</p> <i className="fa-solid fa-bars"></i></button>
        </div>
        <div className="one col-span-5">
            <div className="categories flex">
                <DropDown title="Home" />
                <DropDown title="Shop" />
                <DropDown title="Pages" />
                <DropDown title="Blog" />
                <DropDown title="Elements" />
                <button className="">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default MiniBar
import MiniBar from "./navbar/miniBar"
import Spinner from "./spinner/spinner"

   
const Section1 = () => {
  return (
    <div>
        <nav className="border-b-1 border-gray-200">
            <MiniBar />
        </nav>
        <div className="">
          <div className="container grid grid-cols-12">
            <div className="links col-span-4 flex flex-col items-end "> 
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
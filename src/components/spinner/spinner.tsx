import { useState } from "react";
import SubSpinner from "./subSpinner";

const Spinner = () => {
  const [one, setOne] = useState(true);
  setInterval(()=>{
    if(one){
      setOne(false)
    }else{
      setOne(true)
    } 
    
  },22000)
  return (
    <div className="relative ">
      <button onClick={() => setOne(!one)} className="absolute left-0 top-1/2 py-3 px-5 bg-white shadow-xl rounded-full">
        <i className="fas fa-chevron-left"></i>
      </button>
      {one ? (
        <SubSpinner  image="/electronics-slider-1.png"  header1="BEST SMARTPHONE"  header2="WIRELESS"  header3="CHARGING STAND"  subheader="Up To 70% Off"
        />
      ) : (
        <SubSpinner  image="/electronics-slider-2.png"  header1="BEATS EP ON-EAR"  header2="PERSONALISED"  header3="HEADPHONES"  subheader="Min. 40-80% Off"
        />
      )}
      <button  onClick={() => setOne(!one)}  className="absolute right-0 top-1/2 py-3 px-5 bg-white shadow-xl rounded-full">
        <i className="fas fa-chevron-right"></i>
      </button>
      <div className="absolute bottom-0 flex left-1/2 -translate-x-1/2 space-x-2">
        <input  type="radio"  name="radio-1"  className="radio"  checked={one}  onChange={() => setOne(true)} />
        <input type="radio" name="radio-1" className="radio" checked={!one} onChange={() => setOne(false)} />
      </div>
    </div>
  );
};

export default Spinner;

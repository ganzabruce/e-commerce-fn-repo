interface subSpinnerProps{
    image: string;
    header1: string;
    header2: string;
    header3: string;
    subheader: string;
}

const SubSpinner = ({image,header1,header2,header3,subheader}:subSpinnerProps) => {
  return (
    <div className="">
        <div className="spinner flex bg-gray-50 items-center">
            <div className="text px-2">
                <h1 className="text-amber-300 text-2xl">{header1}</h1>
                <h1 className="font-bold text-5xl">{header2}</h1>
                <h1 className="font-bold text-5xl">{header3}</h1>
                <h1 className="text-3xl mb-3">{subheader}</h1>
                <button className="px-10 py-3 bg-amber-400">BUY NOW</button>
            </div>
            <img src={image} alt="" className="h-110 w-auto" />
        </div>
    </div>
  )
}

export default SubSpinner
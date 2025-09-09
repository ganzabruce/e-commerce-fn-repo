interface dropDownProps{
  title: string
}
const DropdownRight = ({title}:dropDownProps) => {
  return (
    <div className="dropdown-right dropdown-center dropdown-hover">
        <div className="dropdown dropdown-hover">
    <div tabIndex={0} role="button" className="btn m-1 w-80 bg-white flex justify-between">
        <h1>{title}</h1>
        <i className="fa-solid fa-arrow-right"></i>
    </div>
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
    </ul>
    </div>
    </div>
  )
}

export default DropdownRight
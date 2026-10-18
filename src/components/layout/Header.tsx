import NavPill from "./NavPill";
// import sunIcon from '../../assets/icons/sun.svg'
import moonIcon from '../../assets/icons/moon.svg'



export default function Header() {
  return (
    <header className="border-b-2 border-[#12424A]">
        <div className="flex justify-between  my-5 mx-10 items-center">
            <div className="flex items-center gap-2">
                <div className="border-2 border-[#12424A] rounded-full p-2 bg-[#B5E655]">
                    <h2 className=" -rotate-10 text-2xl font-bold text-[#12424A]">10X</h2>
                </div>
                <h2 className="text-3xl font-bold text-[#12424A]">Shop</h2>
            </div>
            <div className="flex gap-2">
                <nav className="flex ">
                    <ul className="flex gap-2">
                     <NavPill color="bg-[#7FC7bd]">Catalog</NavPill>
                     <NavPill color="bg-[#B5E655]">Orders</NavPill>
                     <NavPill color="bg-[#4CB6C2]">Cart
                        <div className="bg-[#12424A] rounded-full h-5 w-5 text-white flex items-center justify-center pt-0.5 ml-1">0</div>
                     </NavPill>
                     <NavPill color="bg-[#7FC7bd]">Profile</NavPill>
                    </ul>
                </nav>
                <div className="flex gap-2">
                    <button className="border-2 border-[#12424A] rounded-3xl p-2 h-10 ">
                        <img src={moonIcon} alt="moon icon" className="h-5 w-5"/>
                    </button>
                    <button className="border-2 border-dashed border-[#12424A] rounded-3xl p-2 h-10 text-xl flex items-center justify-center">Log out</button>
                </div>
            </div>
        </div>
    </header>
  )
}

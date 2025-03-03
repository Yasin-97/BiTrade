import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

type NavBarItemProp = {
  title: string;
  classprops?: string;
  setToggleMenu?: (toggle: boolean) => void;
};

const NavBarItem = ({ title, classprops, setToggleMenu }: NavBarItemProp) => (
  <li
    onClick={() => setToggleMenu?.(false)}
    className={`mx-4 cursor-pointer capitalize ${classprops}`}
  >
    <a href={`#${title}`}>{title}</a>
  </li>
);

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 z-30">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h1 className="text-white text-3xl">
          Bi
          <span className="text-grad-3">Trade</span>
        </h1>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["market", "services", "transactions", "footer"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        <ul
          className={`${!toggleMenu && "-right-full "} ${
            toggleMenu && " -right-2"
          } z-10 fixed -top-0  p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white transition-all`}
        >
          <li className="text-xl w-full my-2">
            <AiOutlineClose onClick={() => setToggleMenu((prev) => !prev)} />
          </li>
          {["market", "services", "transactions", "footer"].map(
            (item, index) => (
              <NavBarItem
                setToggleMenu={setToggleMenu}
                key={item + index}
                title={item}
                classprops="my-2 text-lg"
              />
            )
          )}
        </ul>
        {/* // )} */}
      </div>
    </nav>
  );
}

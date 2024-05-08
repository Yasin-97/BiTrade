import Spline from "@splinetool/react-spline";
import { AiFillPlayCircle } from "react-icons/ai";

const Landing = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center flex-col w-full">
      <div className="flex flex-col mf:flex-row items-center justify-center h-4/5 w-full mf:gap-16">
        <div className="order-1 mf:order-0">
          <h1 className="text-5xl sm:text-7xl py-1 text-center text-white">
            <b className="text-grad-2">Unleash</b> <br />{" "}
            <span className="text-grad-1">Virtual Coins.</span>
          </h1>
          <a
            href="#market"
            className="cursor-pointer flex flex-row justify-center items-center my-5 border-2 border-gray-300 hover:bg-gray-300 hover:text-black text-gray-100 text p-3 rounded-full transition-all"
          >
            <AiFillPlayCircle className=" mr-2" />
            <p className=" text-base font-semibold">Create Transaction</p>
          </a>
        </div>
        <div className="mf:order-1 w-[250px] h-[350px] mf:w-[400px] mf:h-[500px] flex items-center justify-center relative">
          <Spline
            className=" w-full"
            scene="https://prod.spline.design/HspFWhBBPqzPTJY3/scene.splinecode"
          />
        </div>
      </div>
      <div className=" w-full p-4 flex justify-center ">
        <ul className=" w-full mf:w-2/3 flex justify-around flex-wrap mf:flex-nowrap white-glassmorphism py-4 px-2 border-none">
          <div className="flex w-full gap-x-3">
            <li className="pb-2 mf:pb-0 border-b-2 mf:border-b-0 mf:border-r-2 border-[#a3a3a338] text-center text-gray-100 px-6 flex-1 flex flex-col">
              <span className="text-gray-300 text-xs tracking-widest -rotate-2">
                TPS
              </span>
              <b className="rotate-1 text-grad-3">+10K</b>
            </li>
            <li className="pb-2 mf:pb-0 border-b-2 mf:border-b-0 mf:border-r-2 border-[#a3a3a338] text-center text-gray-100 px-6 flex-1 flex flex-col">
              <span className="text-gray-300 text-xs tracking-widest -rotate-2">
                Support
              </span>
              <b className="rotate-1 text-grad-3"> Multi Chain</b>
            </li>
          </div>
          <div className="flex w-full">
            <li className="mf:order-2 pt-2 mf:pt-0 mf:border-l-2 border-[#a3a3a338] text-center text-gray-100 px-6 flex-1 flex flex-col">
              <span className="text-gray-300 text-xs tracking-widest -rotate-2">
                Integrated
              </span>
              <b className="rotate-1 text-grad-3">Hard Wallet</b>
            </li>
            <li className="pt-2 mf:pt-0 text-center px-6 flex-1 flex flex-col">
              <span className="text-gray-100 text-xs tracking-widest -rotate-2">
                DAU
              </span>
              <b className=" text-grad-3 rotate-1"> 1.5K</b>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Landing;

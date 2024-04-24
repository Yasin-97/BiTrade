import {
  Footer,
  Navbar,
  Services,
  Transactions,
  Welcome,
  Landing,
} from "./components/index.ts";
import LandingSVG from "./images/landing.svg";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcom bg-[#0f0e13] flex justify-center flex-col items-center">
        <img
          className="absolute right-0 top-0 mf:top-[-100px] z-0"
          src={LandingSVG}
          alt=""
        />
        <Navbar />
        <Landing />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;

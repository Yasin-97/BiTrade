import {
  Footer,
  Navbar,
  Services,
  Transactions,
  Welcome,
  Landing,
} from "./components/index.ts";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcom bg-[#0f0e13] flex justify-center flex-col items-center">
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

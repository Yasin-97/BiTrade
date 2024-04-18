import {
  Footer,
  Loader,
  Navbar,
  Services,
  Transactions,
  Welcome,
} from "./components/index.ts";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;

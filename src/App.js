import React from "react";
import Router from "./Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <div className="grid-container">
    <Header />
    <main>
      <Router />
    </main>
    <Footer />
  </div>
)

export default App;

import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Our Website</h1>
      </header>
      <main>
        <section className="hero">
          <h2>Discover Amazing Content</h2>
          <p>Explore our platform to find valuable resources and tools.</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

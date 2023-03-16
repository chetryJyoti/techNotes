import { Link } from "react-router-dom";

import React from "react";

function Public() {
  const content = (
    <section className="public">
    <header>
      <h1>
        Where Tech Meets Expertise: <span className="nowrap">Dan D. Repairs</span>
      </h1>
      <p>Expert solutions for all your tech needs</p>
    </header>
    <main className="public__main">
      <p>
        Located in Beautiful Downtown Foo City, Dan D. Repairs offers top-quality tech repair services backed by over 10 years of experience in the industry.
      </p>
      <h2>Our Services</h2>
      <ul>
        <li>Screen replacement for phones, tablets, and laptops</li>
        <li>Battery replacement for phones, tablets, and laptops</li>
        <li>Hardware repair for laptops and desktops</li>
        <li>Virus removal and system cleanup</li>
      </ul>
      <h2>What Our Customers Say</h2>
      <blockquote>"Dan D. Repairs saved my laptop! The staff were friendly, knowledgeable, and got the job done quickly. Highly recommend!" - Jane S.</blockquote>
      <address className="public__addr">
        Dan D. Repairs
        <br />
        555 Foo Drive
        <br />
        Foo City, CA 12345
        <br />
        <a href="tel:+15555555555">(555) 555-5555</a>
      </address>
      <br />
      <p>Owner: Dan Davidson</p>
    </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
}

export default Public;

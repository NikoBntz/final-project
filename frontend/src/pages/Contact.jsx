import React from "react";

const Contact = () => {
  return (
    <div className="contact-container">
      <header>
        <h1>Contact Us</h1>
      </header>
      <main>
        <section className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>
        <section className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: info@yourwebsite.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Business Rd, City, Country</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;

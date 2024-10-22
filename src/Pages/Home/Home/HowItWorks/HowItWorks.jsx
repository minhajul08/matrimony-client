import React from 'react';
import './HowItWorks.css'; // Import your custom styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className='text-3xl text-center'>How Our Matrimony Website Works</h2>
      <div className="steps-container">
        <div className="step">
          <i className="step-icon fas fa-user"></i>
          <h3>Create a Profile</h3>
          <p>Sign up and fill in your profile details to find your perfect match.</p>
        </div>
        <div className="step">
          <i className="step-icon fas fa-search"></i>
          <h3>Search and Connect</h3>
          <p>Browse profiles, filter by preferences, and send connection requests.</p>
        </div>
        <div className="step">
          <i className="step-icon fas fa-crown"></i>
          <h3>Premium Benefits</h3>
          <p>Enjoy enhanced search, messaging features, and priority support.</p>
        </div>
        <div className="step">
          <i className="step-icon fas fa-comments"></i>
          <h3>Secure Messaging</h3>
          <p>Chat securely and plan your meetings to know your match better.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

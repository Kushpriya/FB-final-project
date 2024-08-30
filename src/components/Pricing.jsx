import React from "react";
import "../assets/css/Pricing.css"; // Include your custom CSS here
import Navbar from "./Navbar"; // Ensure you have a Navbar component

const PlanCard = ({ title, price, features, buttonText, popular }) => (
  <div className={`plan-card ${popular ? "popular" : ""}`}>
    {popular && <div className="popular-badge">MOST POPULAR</div>}
    <h3>{title}</h3>
    <h1>{price}</h1>
    <button>{buttonText}</button>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

function Pricing() {
  return (
    <div className="pricing-container">
      <Navbar />
      <div className="tabs">
        <span>General settings</span>
        <span>Apps</span>
        <span>Notification</span>
        <span className="active">Plan</span>
        <span>Security</span>
      </div>

      <div className="plans">
        <PlanCard
          title="Business"
          price="$19 /month"
          features={[
            "10 inventory locations",
            "24/7 chat support",
            "Localized global selling (3 markets)",
            "POS Lite",
          ]}
          buttonText="Current plan"
        />

        <PlanCard
          title="Advanced"
          price="$299 /month"
          features={[
            "Custom reports and analytics",
            "10 inventory locations",
            "Enhanced 24/7 chat support",
            "Localized global selling (3 markets) + add markets for $59 USD/mo each",
            "15 additional staff accounts",
            "10x checkout capacity",
            "POS Lite",
          ]}
          buttonText="Get Started"
          popular={true}
        />

        <PlanCard
          title="Plus"
          price="$2,300 /month"
          features={[
            "Custom reports and analytics",
            "200 inventory locations",
            "Priority 24/7 phone support",
            "Localized global selling (50 markets)",
            "Unlimited staff accounts",
            "Fully customizable checkout with 40x capacity",
            "Sell wholesale/B2B",
          ]}
          buttonText="Get Started"
        />
      </div>
    </div>
  );
}

export default Pricing;

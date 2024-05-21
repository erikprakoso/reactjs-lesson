/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Card({ cardNumber, maskedNumber }) {
  const [showNumber, setShowNumber] = useState(false);
  const [displayedNumber, setDisplayedNumber] = useState(maskedNumber);

  useEffect(() => {
    setDisplayedNumber(maskedNumber);
  }, [maskedNumber]);

  const toggleShowNumber = () => {
    if (!showNumber) {
      let index = 0;
      const revealInterval = 100;
      const interval = setInterval(() => {
        setDisplayedNumber(() => {
          const updatedNumber =
            cardNumber.slice(0, index + 1) + maskedNumber.slice(index + 1);
          index++;
          if (index === cardNumber.length) {
            clearInterval(interval);
          }
          return updatedNumber;
        });
      }, revealInterval);
    } else {
      let index = cardNumber.length;
      const hideInterval = 100;
      const interval = setInterval(() => {
        setDisplayedNumber(() => {
          const updatedNumber =
            cardNumber.slice(0, index) + maskedNumber.slice(index);
          index--;
          if (index === 4) {
            clearInterval(interval);
          }
          return updatedNumber;
        });
      }, hideInterval);
    }
    setShowNumber(!showNumber);
  };

  return (
    <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
      <img
        className="relative object-cover w-full h-full rounded-xl"
        src="https://img.freepik.com/free-photo/abstract-background-illustration-pattern-design-backdrop-shape-generative-ai_188544-9092.jpg?t=st=1716211745~exp=1716215345~hmac=73ec0dd8eff80a1f12ae93d3b36c16d8ca32ab037a3e41f10fff46a97eab6990&w=1480"
        alt="card background"
      />
      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div>
            <p className="font-light">Name</p>
            <p className="font-medium tracking-widest">Erik P</p>
          </div>
          <img
            className="w-14 h-14"
            src="https://i.imgur.com/bbPHJVe.png"
            alt="bank logo"
          />
        </div>
        <div className="pt-1">
          <p className="font-light">Card Number</p>
          <div className="flex items-center">
            <p className="font-medium tracking-more-wider transition-all duration-500 ease-in-out">
              {displayedNumber}
            </p>
            <button className="ml-2 text-white" onClick={toggleShowNumber}>
              {showNumber ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs">Valid</p>
              <p className="font-medium tracking-wider text-sm">11/15</p>
            </div>
            <div>
              <p className="font-light text-xs">Expiry</p>
              <p className="font-medium tracking-wider text-sm">03/25</p>
            </div>
            <div>
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-sm">···</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

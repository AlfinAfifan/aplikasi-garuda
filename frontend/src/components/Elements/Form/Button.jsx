import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="submit"
      className="col-span-2 mt-3 rounded-lg bg-third px-2 py-2.5 font-semibold text-white hover:bg-second"
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

const Input = ({ label, name, type, onchange, ref }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="w-full rounded-md border border-black px-2 py-1.5"
        onChange={onchange}
        ref={ref}
      />
    </div>
  );
};

export default Input;

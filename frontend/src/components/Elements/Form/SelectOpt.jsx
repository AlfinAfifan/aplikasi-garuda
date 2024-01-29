import React from "react";

const SelectOpt = ({ label, children, name }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <select
        name=""
        id={name}
        className="w-full rounded-md border border-black px-2 py-1.5"
        defaultValue="pilih"
      >
        {children}
      </select>
    </div>
  );
};

export default SelectOpt;

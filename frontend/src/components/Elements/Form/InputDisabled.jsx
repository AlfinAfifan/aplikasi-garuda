import React from "react";

const InputDisabled = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <input
        className={`w-full rounded-md border border-gray-300 bg-gray-200 px-2 py-1.5 `}
        disabled
        value={value}
      />
    </div>
  );
};

export default InputDisabled;

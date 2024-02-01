import React from "react";
import ReactSearchBox from "react-search-box";

const SelectSearch = ({ label, name, placeholder, data, onselect, error }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <ReactSearchBox
        inputBorderColor={`${error ? "red" : "black"}`}
        inputHeight="37px"
        placeholder={placeholder}
        data={data}
        onSelect={onselect}
      />
      {error && (
        <p className="text-xs font-semibold text-red-700">Kolom harus diisi</p>
      )}
    </div>
  );
};

export default SelectSearch;

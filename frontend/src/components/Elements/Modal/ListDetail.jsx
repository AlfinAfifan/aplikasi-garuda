import React from "react";

const ListDetail = ({ title, value, style = "capitalize" }) => {
  return (
    <div className="flex gap-2">
      <h1 className="w-[35%] text-nowrap font-semibold capitalize">{title}</h1>
      <p className="font-semibold">:</p>
      <h1 className={`w-[60%] ${style}`}>{value}</h1>
    </div>
  );
};

export default ListDetail;

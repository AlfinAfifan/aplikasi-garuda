import React from "react";

export const THead = ({ children }) => {
  return <thead className="text-second bg-slate-200">{children}</thead>;
};

export const TBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

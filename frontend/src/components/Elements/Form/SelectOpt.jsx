import React from "react";
import { ErrorMessage, useField } from "formik";

const SelectOpt = ({ label, options, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name} className="font-medium">
        {label}
      </label>
      <select
        className={`w-full rounded-md border px-2 py-1.5 capitalize ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
        name={props.name}
        id={props.name}
        {...field}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </select>
      <p className="text-xs font-semibold text-red-700">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
};

export default SelectOpt;

import { useField, ErrorMessage } from "formik";
import React from "react";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className="font-medium">
        {label}
      </label>
      <input
        className={`w-full rounded-md border  px-2 py-1.5 ${meta.touched && meta.error ? "border-red-500" : "border-black"}`}
        id={field.name}
        name={field.name}
        type={field.type}
        {...field}
        {...props}
      />
      <p className="text-xs font-semibold text-red-700">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </p>
    </div>
  );
};

export default Input;

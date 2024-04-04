import { ErrorMessage } from "formik";
import Select from "react-select";

const SelectSearch = ({ label, name, placeholder, data, onChange, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <Select
        className="rounded-md border border-black"
        menuPosition="fixed"
        isClearable={true}
        options={data}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <p className="text-xs font-semibold text-red-700">
        <ErrorMessage name={name} component="div" className="text-red-500" />
      </p>
    </div>
  );
};

export default SelectSearch;

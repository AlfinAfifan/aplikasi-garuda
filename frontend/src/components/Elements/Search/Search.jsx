import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";

const Search = ({ handleSearch, searchPlacehold = "Cari", setDataSearch }) => {
  const [activeSearch, setActiveSearch] = useState(false);
  const inputRef = useRef(null);

  const handleMouseOut = (setFieldValue, values) => {
    if (values.search === "") {
      setActiveSearch(false);
      setFieldValue("search", "");
      setDataSearch(null);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <Formik initialValues={{ search: "" }}>
      {({ setFieldValue, values }) => {
        useEffect(() => {
          handleSearch(values);
        }, [values]);

        return (
          <Form
            className="flex w-96 items-center justify-end"
            onMouseLeave={() => handleMouseOut(setFieldValue, values)}
          >
            <Field
              id="search"
              name="search"
              type="text"
              className={`-mr-[38px] h-10 rounded-full border-2 border-second focus:outline-second pl-3 duration-500 placeholder:text-sm ${activeSearch ? "w-full pr-14" : "w-10"}`}
              onMouseOver={() => setActiveSearch(true)}
              innerRef={inputRef}
              placeholder={activeSearch ? searchPlacehold : ""}
            />
            <label
              className={`flex h-9 w-9 cursor-pointer items-center justify-center text-second`}
              htmlFor="search"
              onMouseOver={() => setActiveSearch(true)}
            >
              <FaMagnifyingGlass className="text-xl" />
            </label>
            {activeSearch && (
              <label
                className="absolute right-[77px] cursor-pointer text-second"
                htmlFor="search"
                onMouseOver={() => setActiveSearch(true)}
                onClick={() => {
                  setFieldValue("search", "");
                  setDataSearch(null);
                }}
              >
                <FaXmark />
              </label>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Search;

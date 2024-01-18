import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./darkSlice";

const DarkMode = () => {
  const [checked, setChecked] = useState(false);
  const theme = useSelector((state) => state.darkMode.theme);
  const dispatch = useDispatch();
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          onChange={() => {
            setChecked(!checked);
          }}
          className="sr-only peer"
          checked={theme === "dark"}
          onClick={() => dispatch(setTheme())}
        />
        <div className=" w-8 h-4 bg-gray-200 rounded-full py-[10px] peer  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:mt-[0.10rem] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "></div>
      </label>
    </>
  );
};

export default DarkMode;

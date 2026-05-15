import {useContext} from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { MyContaxt } from "./MyContaxt";
import { router } from "./router";



const App = () => {
  const {theme} = useContext(MyContaxt);
  return (
    <div className={`font-sans ${theme===true? "text-[#ececec] bg-[#212121]":"bg-white text-black"} `}>
        <RouterProvider router={router} />
    </div>
  );
};

export default App;

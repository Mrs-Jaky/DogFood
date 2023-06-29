import {createContext} from "react";

const Ctx = createContext({
    searchResult: "",
    setBaseData: () => {},

});

export default Ctx;
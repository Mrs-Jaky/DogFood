import {useState, useEffect, createContext} from "react";
import {Routes, Route} from "react-router-dom";

/* SPA - Single Page Application - Приложение с одной страницей */

// import testData from "./assents/data.json";
import Ctx from "./ctx"
import Api from "./Api"
// Подключаем компоненты
import Modal from "./components/Modal";
import {Header, Footer} from "./components/General"; // index.jsx

// Подключаем странички
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import Basket from "./pages/Basket";

const App = () => {
    let basketStore = localStorage.getItem("basket12");
    if (basketStore && basketStore[0] === "[") {
        basketStore = JSON.parse(basketStore);
    } else {
        basketStore = [];
    }
    const [user, setUser] = useState(localStorage.getItem("user12"));
    const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
    const [token, setToken] = useState(localStorage.getItem("token12"));
    const [api, setApi] = useState(new Api(token));
    const [basket, setBasket] = useState(basketStore);
    /*
        Есть массив с товарами (основной) [a,b,c] => [b,c] => [a]???
        | |
         U
        Есть массив с товарами фильтруемый [b,c], [a]
    */
    const [baseData, setBaseData] = useState([]);
    const [goods, setGoods] = useState(baseData);

    const [searchResult, setSearchResult] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    // Сохрани в переменную user то значение, что находится внутри useState

    useEffect(() => {
        if (user) {
            setUserId(localStorage.getItem("user12-id"));
            setToken(localStorage.getItem("token12"));
        } else {
            localStorage.removeItem("user12-id")
            localStorage.removeItem("token12")
            setUserId(null);
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        localStorage.setItem("basket12", JSON.stringify(basket));
    }, [basket])

    useEffect(() => {
        setApi(new Api(token));
        console.log("token", token);
        // if (token) {
        //     fetch("https://api.react-learning.ru/products", {
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data);
        //             setBaseData(data.products);
        //         })
        // }
    }, [token])

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    console.log(data);
                    setBaseData(data.products);
                })
        } else {
            setBaseData([]);
        }
    }, [api])
    /*
    useEffect(cb) - срабатывает при любом изменении внутри компонента
    useEffect(cb, []) - срабатывает один раз при создании компонента
    useEffect(cb, [props]) - срабатывает каждый раз, когда изменяется props
    useEffect(cb, [props1, props2, props3]) - срабатывает каждый раз, когда изменяется props1 или props2 или props3
    */

    /*
    * componentDidUpdate
    * */

    useEffect(() => {
        // console.log("000")
        // console.log(baseData.filter(el => el._id === "622c77cc77d63f6e70967d1e")[0].likes);
        // setGoods(baseData)
    }, [baseData])

    // const Ctx = createContext({});
    // import {Ctx} from "./App"

    return (
        // объявляем контекст в приложении
        /*
        * age = 2
        * value = {
        *   name: "User",
        *   setName: function(){}
        *   age => age: age
        * }
        * */
        <Ctx.Provider value={{
            searchResult,
            setSearchResult,
            setBaseData,
            baseData,
            goods,
            setGoods,
            userId,
            token,
            api,
            basket,
            setBasket
        }}>
            {/*<Ctx2.Provider>*/}
            {/*Так можно использовать еще один контекст для ограниченного количества компнентов*/}
                <Header
                    user={user}
                    upd={setUser}
                    searchArr={baseData}
                    setGoods={setGoods}
                    setModalOpen={setModalOpen}
                />
            {/*</Ctx2.Provider>*/}
            <main>
                <Routes>
                    <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                    <Route path="/catalog" element={
                        <Catalog 
                            goods={goods}
                            userId={userId}
                        />
                    }/>
                    <Route path="/old" element={
                        <OldPage
                            goods={goods}
                        />
                    }/>
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser}/>}
                    />
                    <Route path="/favorites" element={
                        <Favorites />}
                    />
                    {/*
                        :id - параметризованный запрос, где то, что идет после : является различными данными, которые можно вызвать при помощи свойства id
                        {id: "...."}
                        шаблон: /product/:brand/:year/:id
                        /product/samsung/2019/12345
                        /product/samsung/2019/78923
                        /product/xaomi/2022/93838
                        /product/apple/2019/32483
                        шаблон: /product/year/:year
                        {year: "..."}
                        /product/year/2022
                        /product/year/2019
                    */}
                    <Route path="/product/:id" element={<Product />}/>
                    <Route path="/add/product" element={<AddProduct/>}/>
                    <Route path="/basket" element={<Basket/>}/>
                </Routes>
            </main>
            <Footer/>
            <Modal 
                isActive={modalOpen} 
                setIsActive={setModalOpen}
                setUser={setUser}
            />
        </Ctx.Provider>
    )
}

export default App;

/*
* props <Component color="red"> - статичное свойство, которое не изменяется внутри этого компонента
*
* state - динамически изменяемое свойство
* const [color, setColor] = useState("red")
* setColor("blue")
* <Component color={color}>
*
* Меняется в зависимости от свойства color
* useEffect(() => {
*   // do something
* }, [color])
*
* obj = {
*   color: color
* }
* <Component color={color}>
    <Text color={color}>
        <Char color={color}/>
    </Text>
* </Component>
*
*
* <Component>
    <Text>
        <Char color={obj.color}/>
    </Text>
* </Component>
*
* obj - это глобальное хранилище данных (статичных или динамичных для компонентов, которые находятся в зоне видимости этого объекта)
*
* 1) React.Context - часть библиотеки React
* 2) Redux - внешняя библиотека, устанавливается как и React.Router дополнительно
* <Obj.Provider>
    <Component>
        <Text>
            <Char color={obj.color}/>
        </Text>
    </Component>
* </Obj.Provider>
*
* localStorage - сохранить данные внутри браузера, чтобы в дальнейшем к ним вернуться - чтобы не авторизовываться каждый раз, когда мы делаем изменение в React
* */
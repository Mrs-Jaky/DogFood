import {useContext} from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo";
import {
    BalloonHeart, 
    Cart4, 
    PersonCircle, 
    BuildingUp
} from "react-bootstrap-icons";
import Ctx from "../../ctx"

import Search from "../Search";
const Header = ({
        user,
        searchArr,
        setGoods,
        setModalOpen
    }) => {
    const {basket} = useContext(Ctx);
    const login = () => {
        setModalOpen(true)
    }
    return <header>
        <Logo/>
        <div className="search-block">
            <Search 
                data={searchArr} 
                setGoods={setGoods}
            />
        </div>
        <nav className="header__menu">
            {user && <>
                <Link to="/favorites">
                    <BalloonHeart title="Избранное"/>
                </Link>
                <Link to="/basket" className="header__link">
                    <Cart4  title="Корзина"/>
                    {basket.length > 0 && <span className="header__badge">
                        {basket.reduce((acc, el) => acc + el.cnt, 0)}
                    </span>}
                </Link>
                <Link to="/profile">
                    <PersonCircle  title="Личный кабинет"/>
                </Link>
            </>}
            <span>
                {!user && <BuildingUp  title="Войти" onClick={login}/>}
            </span>
        </nav>
    </header>
}

export default Header;
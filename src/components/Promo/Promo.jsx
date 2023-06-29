import "./style.css"

const Promo = (props) => {
    return <div className="promo__block">
        <div className="promo__img"/>
        <p className="promo__text">{props.text || "-"}</p>
    </div>
}

export default Promo;
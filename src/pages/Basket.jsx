import {useState, useContext, Fragment} from "react";
import {Container, Table, ButtonGroup, Button} from "react-bootstrap";
import {Trash3} from "react-bootstrap-icons";
import Ctx from "../ctx";
import {Link} from "react-router-dom";

const Basket = ({}) => {
    const {basket, setBasket, baseData} = useContext(Ctx);
    const ids = basket.map(b => b.id);
    const filteredData = baseData.filter(el => ids.includes(el._id))

    const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0);
    const sumDiscount = basket.reduce((acc, el) => {
        return acc + (el.price * el.cnt * ((100 - el.discount) / 100));
    }, 0);
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++
            }
            return el;
        }))
    }
    const dec = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt--
            }
            return el;
        }))
    }
    const del = (id) => {
        setBasket(prev => prev.filter(el => el.id !== id))
    }
    return <Container style={{gridTemplateColumns: "1fr"}}>
        <h1>Корзина</h1>
        <Table>
            <tbody>
                {basket.map(el => <tr key={el.id}>
                    {filteredData
                       .filter(f => f._id === el.id)
                       .map(d => <Fragment key={d._id}>
                           <td className="align-middle"><img src={d.pictures} alt={d.name} height="38px"/></td>
                           <td className="align-middle">
                               <Link to={`/product/${el.id}`}>{d.name}</Link>
                           </td>
                    </Fragment>)}
                    <td className="align-middle">
                        <ButtonGroup>
                            <Button
                                variant="warning"
                                disabled={el.cnt === 1}
                                onClick={() => dec(el.id)}
                            >-</Button>
                            <Button variant="light" disabled>{el.cnt}</Button>
                            {/* При заказе товара, следует ограничить число в соответствии с кол-вом на складе */}
                            <Button variant="warning" onClick={() => inc(el.id)}>+</Button>
                        </ButtonGroup>
                    </td>
                    <td className="align-middle">
                        <Trash3 onClick={() => del(el.id)} style={{cursor: "pointer"}}/>
                    </td>
                    <td className="align-middle">
                        {el.price} ₽
                    </td>
                    <td style={{verticalAlign: "middle"}}>
                        {el.discount > 0
                            ? <>
                                <span className="text-danger">{Math.ceil(el.price * el.cnt * ((100 - el.discount) / 100))} ₽</span>
                                <del className="ms-2 small text-secondary d-inline-block">{el.price * el.cnt} ₽</del>
                            </>
                            : <span>{el.price * el.cnt} ₽</span>}
                    </td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={5} className="text-end text-uppercase">Общая сумма:</td>
                    <td className="fs-5 fw-bold">{sumDiscount === sum
                        ? <span>{sum} ₽</span>
                        : <>
                            <span className="text-danger">{Math.ceil(sumDiscount)} ₽</span>
                            <del className="ms-2 small text-secondary d-inline-block">{sum} ₽</del>
                        </>
                    }</td>
                    {/* Посчитать сумму всех товаров с учетом их количества */}
                    {/* Посчитать сумму всех товаров с учетом их количества и скидки*/}
                </tr>
            </tfoot>
        </Table>
    </Container>
}

export default Basket;

/*
* [
*   {
*       id: product._id
*       cnt: >= 1
*       price: product.price
*       discount: 10
*   }
* ]
*
* */
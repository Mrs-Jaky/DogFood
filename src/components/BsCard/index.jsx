import {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons";
import {Card, Button} from "react-bootstrap";
import Ctx from "../../ctx";

const BsCard = ({
    discount,
    likes,
    name,
    pictures,
    price,
    tags,
    _id
}) => {
    // TODO: Сердечки стоят не там, где должны на самом деле (при поиске и обновлении страницы)
    const {setBaseData, userId, api} = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const [likeFlag, setLikeFlag] = useState(false);

    const likeHandler = () => {
        setIsLike(!isLike);
        setLikeFlag(true);
    }
    useEffect(() => {
        if (likeFlag) {
            api.setLike(_id, isLike)
                .then(data => {
                    // console.log(data.filter(el => el._id === _id));
                    setLikeFlag(false);
                    // setBaseData((old) => old.map(el => el._id === data._id ? data : el))
                    api.getProducts()
                        .then(newData => {
                            console.log(newData)
                            setBaseData(newData.products);
                        })
                })
        }
    }, [isLike])
    return <Card className="pt-3 h-100" id={"pro_" + _id}>
        {userId && <span className="card-like" onClick={likeHandler}>
            {isLike ? <SuitHeartFill/> : <SuitHeart/>}
        </span>}
        <Card.Img variant="top" src={pictures} alt={name} className="align-self-center w-auto" height="100"/>
        <Card.Body className="d-flex flex-column">
            <Card.Title as="h4">{price} ₽</Card.Title>
            <Card.Text className="text-secondary fs-5 flex-grow-1">{name}</Card.Text>
            <Button variant="warning" className="w-100">Купить</Button>
        </Card.Body>
        <Link to={`/product/${_id}`} className="card-link"></Link>
    </Card>
}

export default BsCard;
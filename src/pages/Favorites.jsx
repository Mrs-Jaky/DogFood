import {useContext, useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../ctx";

const Favorites = () => {
    const {userId, baseData} = useContext(Ctx);
    // const [likeCards, setLikeCards] = useState(baseData.filter(el => el.likes.includes(userId)));

    // useEffect(() => {
    //     console.log("ololo")
    //     console.log(baseData.filter(el => el.likes.includes(userId)));
    //     setLikeCards(baseData.filter(el => el.likes.includes(userId)));
    // }, [baseData])

    // useEffect(() => {
    //     console.log(likeCards)
    // }, [likeCards])
    return <Container className="d-block">
        <Row className="g-4">
            <Col xs={12}>
                <h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Любимые товары</h1>
            </Col>
            {baseData.filter(el => el.likes.includes(userId)).map((pro, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                    <BsCard img={pro.pictures} {...pro} user={userId}/>
                </Col>
            ))}
        </Row>
    </Container>
}

export default Favorites;
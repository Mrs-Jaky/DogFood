import {useContext, useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

// TODO: Доработать фильтрацию
const Catalog = ({goods, userId}) => {
	// let pg = usePagination(goods, 9)
	// const [paginate, setPaginate] = useState(pg)
	const {searchResult} = useContext(Ctx);
	const paginate = usePagination(goods, 9)
	// 1, 20
	// useEffect(() => {
	// 	let pg = usePagination(goods, 9)
	// 	setPaginate(pg)
	// }, [goods])
	useEffect(() => {
		paginate.step(1);
	}, [searchResult])
	return <Container className="d-block">
		<Row className="g-4">
			{searchResult && <Col xs={12} className="search-result">
				 {searchResult}
			</Col> }
			<Col xs={12}>
				<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог</h1>
			</Col>
			{paginate.pageData().map((pro, i) => (
				// {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
					<BsCard img={pro.pictures} {...pro} user={userId}/>
				</Col>
			))}
			{
				paginate.pageData().length > 0 &&
				<Col xs={12} className="text-center d-flex justify-content-center flex-column align-items-center overflow-hidden"><Pagination hk={paginate} /></Col>
			}
		</Row>
	</Container>
}

export default Catalog;
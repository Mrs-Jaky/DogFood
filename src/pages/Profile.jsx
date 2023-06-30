import {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Button, Container, Row, Col, Figure} from "react-bootstrap";
import Ctx from "../ctx";

import UpdatedInput from "../components/UpdatedInput";

const Profile = ({setUser}) => {
	const navigate = useNavigate()
	const { api } = useContext(Ctx);
	const [userData, setUserData] = useState({});
	const [inpName, setInpName] = useState(false);
	const [inpEmail, setInpEmail] = useState(false);
	const [inpAbout, setInpAbout] = useState(false);
	const [inpAvatar, setInpAvatar] = useState(false);

	const updUser = (name, val) => {
		let body = {...userData}
		if (name !== "avatar") {
			delete body.avatar;
		}
		body[name] = val;
		console.log(body);
		api.updAdmin(body, name === "avatar").then(data => setUserData(data));
	}

	const logOut = () => {
		setUser("");
		localStorage.removeItem("user12");
		navigate("/");
	}
	useEffect(() => {
		api.getAdmin()
			.then(data => {
				console.log(data);
				setUserData(data);
			})
	}, [])
	return <>
		<Container style={{gridTemplateColumns: "1fr"}} className="px-0">
			<Row>
				{userData?.name && <>
					<Col xs={12} sm={6}><h1>Личный кабинет</h1>
						<div><UpdatedInput
							val={userData.name}
							isActive={inpName}
							changeActive={setInpName}
							upd={updUser}
							name="name"
						/></div>
						<div><UpdatedInput
							val={userData.email}
							isActive={inpEmail}
							changeActive={setInpEmail}
							upd={updUser}
							name="email"
						/></div>
						<div><UpdatedInput
							val={userData.about}
							isActive={inpAbout}
							changeActive={setInpAbout}
							upd={updUser}
							name="about"
						/></div>
					</Col>
					<Col xs={12} sm={6}>
						<Figure>
							<Figure.Image
								src={userData.avatar}
								alt={userData.email}
							/>
							<Figure.Caption>
								 <UpdatedInput
									 val={userData.avatar}
									 isActive={inpAvatar}
									 changeActive={setInpAvatar}
									 upd={updUser}
									 name="avatar"
								 />
							</Figure.Caption>
						</Figure>
					</Col>
				</>}
			</Row>
			{/* <Link to="/add/product">Добавить товар</Link> */}
			<Button variant="warning" as={Link} to="/add/product">Добавить товар</Button>
			<br/>
			<button onClick={logOut}>Выйти из аккаунта</button>
		</Container>
	</>
}
export default Profile;
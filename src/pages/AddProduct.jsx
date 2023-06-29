/*
    В БД хранятся данные определенных типов
    Необязательные параметры помечены вопросительным знаком
    {
        name: string
        pictures: string (ссылка)
        price: number
        stock?: number (количество на складе)
        tags?: array of string (пометки новинок, скидок, популярных товаров)
        description?: string => "Скоро здесь будет текст..."
        discount?: number => 0
        wight?: string (вес - не 100, а "100 г")
    }
*/

import {useState, useContext, useEffect} from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Ctx from "../ctx";

const AddProduct = () => {
    const navigate = useNavigate();
    const {api, setBaseData} = useContext(Ctx);
    const [name, setName] = useState("");
    const [link, setLink] = useState("https://beolin.club/uploads/posts/2022-07/1657851760_12-beolin-club-p-risunok-kostochki-karandashom-krasivo-19.png"); // pictures
    const [price, setPrice] = useState(999);
    const [cnt, setCnt] = useState(20); // stock
    const [description, setDescription] = useState("Скоро здесь будет текст...");
    const [discount, setDiscount] = useState(0);
    const [wight, setWight] = useState("0 г");
    const [tagWord, setTagWord] = useState(""); // слово для массива с тегами
    const [tags, setTags] = useState(["df"]); // массив с тегами. По тегу df мы будет сортировать ТОЛЬКО наши товары и только с собачьими няшками (сами придумаем как)
    
    const tagsHandler = (e) => {
        const val = e.target.value;
        const last = val[val.length - 1];
        if (/\s/.test(last)) {
            const word = val.slice(0, val.length - 1);
            const test = tags.filter(tg => tg.toLowerCase() === word.toLowerCase());
            if (!test.length) {
                setTags(prev => [...prev, word]);
            }
            setTagWord("");
        } else {
            setTagWord(val);
        }
    }
    const clearForm = () => {
        setName("");
        setLink("https://beolin.club/uploads/posts/2022-07/1657851760_12-beolin-club-p-risunok-kostochki-karandashom-krasivo-19.png");
        setPrice(999);
        setCnt(20);
        setWight("0 г");
        setDiscount(0);
        setDescription("Скоро здесь будет текст...");
        setTagWord("");
        setTags(["df"]);
    }
    const delTag = (e) => {
        const val = e.target.innerText;
        // Из спсика с тегами возвращаем только те, которые не соответствуют нажатому
        setTags(prev => prev.filter(tg => tg !== val));
    }
    const formHandler = (e) => {
        e.preventDefault();
        const body = {
            name: name,
            price: price,
            discount: discount,
            stock: cnt,
            wight: wight,
            description: description,
            pictures: link,
            tags: tagWord && !tags.includes(tagWord) ? [...tags, tagWord] : tags
        };
        console.log(body);
        api.addProduct(body)
            .then(data => {
                console.log(data);
                if (!data.err && !data.error) {
                    clearForm();
                    // перенаправление на страницу с новым товар
                    navigate(`/product/${data._id}`)
                    // v1 - добавить товар на стороне клиента
                    setBaseData(prev => [...prev, data]);
                    // v2 - снова стянуть данные с сервера
                    // api.getProducts()
                    //     .then(data => setBaseData(data.products))
                }
            })
    }

    // useEffect(() => {
    //     console.log("форма обновилась")
    // }, [name])
    return <Container style={{gridTemplateColumns: "auto"}}>
        <Row>
            <Col xs={12}><h1>Добавить новый товар</h1></Col>
            <Form onSubmit={formHandler}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-name">Название товара</Form.Label>
                            <Form.Control 
                                id="pro-name" 
                                type="text" 
                                value={name} 
                                onChange={e => {setName(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-img">Ссылка на изображение</Form.Label>
                            <Form.Control 
                                id="pro-img" 
                                type="url" 
                                value={link}
                                onChange={e => {setLink(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-price">Цена товара</Form.Label>
                            <Form.Control 
                                id="pro-price" 
                                type="number" 
                                value={price} 
                                step="10"
                                min="9"
                                max="29999"
                                onChange={e => {setPrice(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-cnt">Количество на складе</Form.Label>
                            <Form.Control 
                                id="pro-cnt" 
                                type="number" 
                                value={cnt}
                                min="0"
                                max="10000"
                                onChange={e => {setCnt(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                            <Form.Control 
                                id="pro-w" 
                                type="text" 
                                value={wight}
                                placeholder="100 г"
                                onChange={e => {setWight(e.target.value)}}
                            />
                            <Form.Text>Не забудьте прописать единицу измерения вместе с весом</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-disc">Скидка</Form.Label>
                            <Form.Select 
                                id="pro-disc"
                                type="text"
                                defaultValue={discount}
                                onChange={e => {setDiscount(e.target.value)}}
                            >
                                <option value={0}>Без скидки</option>
                                <option value={5}>5 %</option>
                                <option value={10}>10 %</option>
                                <option value={15}>15 %</option>
                                <option value={20}>20 %</option>
                                <option value={25}>25 %</option>
                                <option value={45}>45 %</option>
                                <option value={60}>60 %</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-info">Описание</Form.Label>
                            <Form.Control 
                                id="pro-info" 
                                type="text" 
                                value={description}
                                as="textarea"
                                rows={4}
                                onChange={e => {setDescription(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-tag">Добавить теги</Form.Label>
                            <Form.Control 
                                id="pro-tag" 
                                type="text" 
                                value={tagWord}
                                onChange={tagsHandler}
                            />
                            <Form.Text as="div" className="mt-1 d-flex" style={{gap: ".25rem"}}>
                                {tags.map(tg => <Button 
                                    key={tg} 
                                    variant={tg === "df" ? "warning" : "secondary"}
                                    disabled={tg === "df"}
                                    onClick={delTag}
                                >{tg}</Button>)}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit">Добавить товар</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </Container>
}
export default AddProduct;
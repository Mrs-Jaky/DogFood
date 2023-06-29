class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru"
        this.token = token
    }
    setHeaders(isContentType = false) {
        const headers = {
            "Authorization": `Bearer ${this.token}`
        }
        if (isContentType) {
            headers["Content-Type"] = "application/json"
        }
        /*
        * {
        *   "Authorization": "Bearer ..."
        *   "Content-Type": "application/json"
        * }
        * */
        return headers;
    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: this.setHeaders()
        }).then(res => res.json());
    }
    getSingleProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    updSingleProduct(id, body) {
        return fetch(`${this.path}/products/${id}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
    delSingleProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? "PUT" : "DELETE",
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    setReview(id, body) {
        return fetch(`${this.path}/products/review/${id}`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
    delReview(id, r_id) {
        return fetch(`${this.path}/products/review/${id}/${r_id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    getReview(id) {
        return fetch(`${this.path}/products/review/${id}`, {
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    getUsers() {
        return fetch(`${this.path}/users`, {
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    getSingleUser(id) {
        return fetch(`${this.path}/users/${id}`, {
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    getAdmin() {
        return fetch(`${this.path}/users/me`, {
            headers: this.setHeaders()
        }).then(res => res.json())
    }
    updAdmin(body, changeImg = false) {
        return fetch(`${this.path}/users/me${changeImg ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
    register(body) {
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
    auth(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
}

export default Api;
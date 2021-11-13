import http from "../http_common";
class UsersService { /*Service for send data to server and get it*/

    all() { /*Send data to server*/
        return http.get("api/users/all");
    }
    delete(id) {
        return http.delete(`api/users/delete/${id}`);
    }
    edit(id) {
        return http.get(`api/users/edit/${id}`);
    }
    editsave(data, id) {
        return http.post(`api/users/save/${id}`, data);
    }
}

export default new UsersService();
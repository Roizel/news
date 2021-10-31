import http from "../http_common";
class AuthService {

    register(data) { /*Send data to server*/
        return http.post("api/account/register", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    login(data) {
        return http.post("api/account/login", data);
    }
}

export default new AuthService();
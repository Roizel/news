import http from "../http_common";

export default function setAuthorizationToken(token) {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`; /*Send token */
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
}
import { LOGIN, LOGOUT, REGISTER } from "../constants/actionTypes";
import authService from "../services/auth.service";
import jwt from 'jsonwebtoken';

export const RegisterUser = (model) => async (dispatch) => {
    try {
        const result = await authService.register(model); /*Call our func and give data to it*/
        dispatch({type: REGISTER}); /*Call dispatch and send action to redux*/
        const token = result.data.token;
        dispatch(authUser(token));
        return Promise.resolve(result); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}

export const LoginUser = (model) => async (dispatch) => {
    try {
        const result = await authService.login(model); /*Call our func and give data to it*/
        //dispatch({type: LOGIN}); /*Call dispatch and send action to redux*/
        const token = result.data.token;
        dispatch(authUser(token));
        return Promise.resolve(result); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}

export const authUser = (token) => async (dispatch) => {
    var user = jwt.decode(token);
    dispatch({type: LOGIN, payload: user});
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    })
}

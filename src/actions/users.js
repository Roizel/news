import { USERS_ALL, USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE} from "../constants/actionTypes";
import usersService from "../services/users.service";

export const UsersAll = () => async (dispatch) => {
    try {
        const {data} = await usersService.all(); /*Call our func and give data to it*/
        dispatch({type: USERS_ALL, payload: data}); /*Call dispatch and send action to redux*/
        return Promise.resolve(); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}
export const UserDelete = (id) => async (dispatch) => {
    try {
        const {data} = await usersService.delete(id); /*Call our func and give data to it*/
        dispatch({type: USERS_DELETED, payload: id}); /*Call dispatch and send action to redux*/
        return Promise.resolve(); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}
export const UserEdit = (id) => async (dispatch) => { /*Method, which send id to server and get result(exist or no exist)*/
    try {
        const {data} = await usersService.edit(id); /*Call our func and give data to it*/
        dispatch({type: USERS_EDIT, payload: data}); /*Call dispatch and send action to redux*/
        return Promise.resolve(); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}
export const UserEditSave = (user, id) => async (dispatch) => { /*Method. which send edit`s data to server and get result*/
    try {
        const {data} = await usersService.editsave(user, id); /*Call our func and give data to it*/
        dispatch({type: USERS_EDIT_SAVE, payload: data}); /*Call dispatch and send action to redux*/
        return Promise.resolve(); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}
import { USERS_ALL, USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE} from "../constants/actionTypes";

const initialState = { /*Our state in reducer*/
    list: [],
    editedUser: {}
}

const usersReducer = (state = initialState, action) => {
    const { type, payload } = action; /*Action - 'REGISTER', 'LOGIN' etc...*/
    console.log("payload", payload);
    switch (type) {
        case USERS_ALL: { /*If type == REGISTER*/
            return {
                ...state,
                list: payload
            }
        }
        case USERS_DELETED: {
            return {
                ...state,
                list: state.list.filter(item => item.id !== payload) /*Delete user from list*/
            };
        }
        case USERS_EDIT: {
            return {
                ...state,
                editedUser: payload
            }
        }
        case USERS_EDIT_SAVE: {
            return {
                ...state
            }
        }

        default:
            return state;
    }
}
export default usersReducer
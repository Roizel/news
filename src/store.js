import {applyMiddleware, combineReducers, createStore, compose} from "redux"; /*Just need*/
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";

const middleware = [
    thunk
];

const rootReducer = combineReducers({
    auth: authReducer
});

 // In development, use the browser's Redux dev tools extension if installed
 const enhancers = [];
 const isDevelopment = process.env.NODE_ENV === 'development';
 if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) { /*this code was created for check is project in =>*/
   window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; /*=> development or no. If yes, we can debug our project in chrome with tools in chrome*/
   enhancers.push(window.devToolsExtension());
 }

 const store = createStore( /*Just need*/
    rootReducer,
    {},
    compose(applyMiddleware(...middleware), ...enhancers)
);
export default store;
import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer

});
export default rootReducer;
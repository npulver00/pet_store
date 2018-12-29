const INITIALSTATE = {
    productList: [],
    user: null,
    cart: []
};

const ALL_PRODUCTS = "ALL_PRODUCTS";
const SET_USER = "SET_USER";
const ADD_CART = "ADD_CART";
const REMOVE_CART = "REMOVE_CART"


function reducer(state=INITIALSTATE, action){
    switch(action.type){
        case ALL_PRODUCTS:
            return Object.assign({}, state,{productList:action.payload});
        case SET_USER:
            return Object.assign({}, state, {user:action.payload});
        case ADD_CART:
            return [...state, action.payload];
        case REMOVE_CART:
            const firstMatchIndex= state.indexOf(action.payload)
            return state.filter((item, index)=>index !== firstMatchIndex)
        default: return state;
        }
}

function allProducts(items){
    return{
        type:ALL_PRODUCTS,
        payload:items
    }
}

function setUser(user){
    return{
        type: SET_USER,
        payload:user
    }
}

function removeCart(item){
    return{
        type: REMOVE_CART,
        payload: item
    }
}
function addCart(item){
    return{
        type: ADD_CART,
        payload: item
    }
}
export default reducer;

export {allProducts, setUser, removeCart, addCart}
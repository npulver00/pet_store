
const INITIALSTATE = {
    productList: [],
    user: [],
    name: ""


};

const ALL_PRODUCTS = "ALL_PRODUCTS";
const SET_USER = "SET_USER";
const ADD_CART = "ADD_CART";
const REMOVE_CART = "REMOVE_CART"
const INPUT_ADDRESS = "INPUT_ADDRESS"


function reducer(state = INITIALSTATE, action) {
    switch (action.type) {
        case ALL_PRODUCTS:
            return Object.assign({}, state, { productList: action.payload });
        case SET_USER:
            return Object.assign({}, state, { user: action.payload });
        case ADD_CART:
            return Object.assign({}, state, { user: action.payload });
        case REMOVE_CART:
            const firstMatchIndex = state.indexOf(action.payload)
            return state.filter((item, index) => index !== firstMatchIndex)
        case INPUT_ADDRESS:
            return Object.assign({}, state, { input: action.payload })
        default: return state;
    }
}

function allProducts(items) {
    return {
        type: ALL_PRODUCTS,
        payload: items
    }
}

function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

function removeCart(item) {
    return {
        type: REMOVE_CART,
        payload: item
    }
}
function addCart(id) {
    return {
        type: ADD_CART,
        payload: id
    }
}
function inputAddress(input) {
    return {
        type: INPUT_ADDRESS,
        payload: input
    }
}
export default reducer;

export { allProducts, setUser, removeCart, addCart, inputAddress }
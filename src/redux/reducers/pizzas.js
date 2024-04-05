const initialState = {
    items: [],
    isLoaded: false,
};

const pizzas = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {
                ...state,
                items: action.payload,
                isLoaded: true, // Оновлення isLoaded на true після завантаження піц
            };
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
            };
        default:
            return state;
    }
};

export default pizzas;

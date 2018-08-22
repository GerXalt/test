let initialState = {
    count: 12
};

export default function app(state = initialState, action){
    switch(action.type){
        case 'INC_COUNT':
            return { ...state, count: state.count + 1}
    };
    return initialState;
}
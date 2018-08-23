let initialState = {
    items: []
};

let lastId = 0;

export default function app(state = initialState, action){
    switch(action.type){
        case 'CREATE_ELEMENT':
            let y = state.items.reduce((max, item)=>(Math.max(max, item.y + (item.height || 0))), 0);
            let data = {...action.data, id: lastId++, y};
            return {...state, items: state.items.concat([data])};
        case 'MOVE_ELEMENT':
            let index = state.items.findIndex(x=>x.id == action.data.id);
            let el = {...state.items[index], x: action.data.x, y: action.data.y};
            let newItems = state.items.slice();
            newItems.splice(index, 1, el);
            return {...state, items: newItems};
    };
    return initialState;
}
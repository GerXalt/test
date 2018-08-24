let initialState = {
    items: [],
    height: 0
};

let lastId = 0;

export default function app(state = initialState, action){
    switch(action.type){
        case 'CREATE_ELEMENT':
            let y = state.items.reduce((max, item)=>(Math.max(max, item.y + (item.height || 0))), 0);
            let data = {...action.data, id: lastId++, y};
            let height = Math.max(state.height, y + action.data.height);
            return {...state, items: state.items.concat([data]), height};
        case 'CHANGE_ELEMENT':
            let index = state.items.findIndex(x=>x.id == action.data.id);
            let el = {...state.items[index], ...action.data};
            let newItems = state.items.slice();
            newItems.splice(index, 1, el);
            return {...state, items: newItems};
    };
    return initialState;
}
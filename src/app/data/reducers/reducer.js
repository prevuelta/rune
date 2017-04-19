const initialState = {
    todos: []
}

export default (state = intialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text
                    }
                ]
            })
        default:
            return state
    }
}
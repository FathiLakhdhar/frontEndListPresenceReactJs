var todos = [
    { id: 0, complited: false, text: 'AZERTY' },
    { id: 1, complited: false, text: 'QUERY' },
];
export default function (state = todos, action) {
    const { type, payload, id, toggleAll } = action;
    switch (type) {
        case 'ADD_TODO':
            return [
                ...state, payload
            ]

        case 'TOGGLE_TODO':
            return state.map((todo) => (todo.id === id) ? { ...todo, complited: !todo.complited } : todo);
        case 'TOGGLE_ALL_TODO':
            return state.map(todo => { return { ...todo, complited: toggleAll } });
        default:
            return state;
    }
}
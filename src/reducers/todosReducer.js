var todos = [
    { id: 0, complited: false, text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.' },
    { id: 1, complited: false, text: 'Aliquam tincidunt mauris eu risus.' },
    { id: 2, complited: false, text: 'Vestibulum auctor dapibus neque.' },
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
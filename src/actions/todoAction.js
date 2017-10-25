
export function addTodo(data){
    return {
        type: 'ADD_TODO',
        payload: data
    }
}

export function toggleTodo(id){
    return {
        type: 'TOGGLE_TODO',
        id
    }
}
export function toggleAllTodo(toggleAll){
    //toggleAll : true or false
    return {
        type: 'TOGGLE_ALL_TODO',
        toggleAll 
    }
}
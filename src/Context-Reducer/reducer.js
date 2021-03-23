export const initialState = {
    user: null,
    screen: false,
    sidebar: true,
    searchInput: ''
}


export const reducer = (state, action) => {

    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.user
            }
        case 'showScreen' :
            return {
                ...state,
                sidebar: false,
                screen: true
            }
        case 'showSidebar' :
            return {
                ...state,
                sidebar: true,
                screen: false
            }
        case 'searchTopic' :
            return  {
                ...state,
                searchInput: action.payload
            }
        case 'showBoth' :
            return {
                ...state,
                sidebar: true,
                screen: true
            }


        default:
            return state;
    }
}


let initalState = {
    background : null,
    btn_color: null
}

const userCustom = (state = initalState, action) => {
    if (action.type == 'CONFIG_BACKGROUND') 
    return {
        ...state,
        background: action.bg_uri
      };
    if (action.type == 'CONFIG_BTN_COLOR') return {
        ...state,
        btn_color: action.btn_color
    };
    return state;
};

export default userCustom;
import ActionType from '../../constants/ActionType'

const initState = {
    editImage: '',
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.ADD_EDIT_IMAGE: {
            return {
                ...state,
                editImage: action.blobUrl,
            }
        }
        default:
            return state;
    }
};
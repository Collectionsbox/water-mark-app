import ActionType from '../../constants/ActionType'
import Util from '../../util/Util'

export const addEditImageAction = blobUrl => {
    return (dispatch, getState) => {
        Util.getImageInfo(blobUrl, (info) => {
            let {width, height} = info;
            dispatch({
                type: ActionType.ADD_EDIT_IMAGE,
                blobUrl: blobUrl,
                editImageSize: {width, height}
            });
        })
    };
};

export const addWMImageAction = blobUrl => ({
    type: ActionType.ADD_WM_IMAGE,
    blobUrl: blobUrl,
});

export const initEditViewAction = canvas => ({
    type: ActionType.INIT_EDIT_VIEW,
    canvas: canvas,
});

export const redrawAction = () => {
    return {
        type: ActionType.REDRAW,
    }
};

export const dropAction = (point) => {
    return {
        type: ActionType.EDIT_DROP,
        point: point,
    }
};
export const dragAction = (offset) => {
    return {
        type: ActionType.EDIT_DRAG,
        offset: offset,
    }
};
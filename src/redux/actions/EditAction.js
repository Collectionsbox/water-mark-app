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

export const initEditViewAction = (canvas, trackView) => ({
    type: ActionType.INIT_EDIT_VIEW,
    canvas: canvas,
    trackView: trackView,
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
export const dragAction = (point, offset) => {
    return {
        type: ActionType.EDIT_DRAG,
        point: point,
        offset: offset,
    }
};

export const upAction = () => {
    return {
        type: ActionType.EDIT_UP
    }
};

export const overAction = (point) => {
    return {
        type: ActionType.EDIT_OVER,
        point: point,
    }
};

export const deleteSelectedSpriteAction = () => {
    return {
        type: ActionType.DELETE_SELECTED_SPRITE,
    }
};

export const exportAction = () => {
    return {
        type: ActionType.EXPORT,
    }
};
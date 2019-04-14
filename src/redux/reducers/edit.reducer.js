import ActionType from "../../constants/ActionType";
import Store from '../../store/Store'

const initState = {
    size: {width: 800, height: 800},
    editImage: '',
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.INIT_EDIT_VIEW: {
            Store.initView(action.canvas);
            Store.initTrackView(action.trackView);
            return state;
        }
        case ActionType.ADD_WM_IMAGE: {
            Store.addWMImage(action.blobUrl);
            return state;
        }
        case ActionType.ADD_EDIT_IMAGE: {
            let {width, height} = action.editImageSize;
            let r = width / height;
            let size = {};
            if (r > 1) {
                size.width = 800;
                size.height = 800 / r;
            } else {
                size.height = 800;
                size.width = 800 * r;
            }
            Store.updateCanvasSize(size);
            return {
                ...state,
                editImage: action.blobUrl,
                size: size,
            }
        }
        case ActionType.REDRAW: {
            Store.drawCanvas();
            return state;
        }
        case ActionType.EDIT_DROP: {
            Store.dropDownCanvas(action.point);
            return state;
        }
        case ActionType.EDIT_DRAG: {
            Store.dragInCanvas(action.point, action.offset);
            return state;
        }
        case ActionType.EDIT_UP: {
            Store.dropUpCanvas();
            return state;
        }
        case ActionType.EDIT_OVER: {
            Store.overCanvas(action.point);
            return state;
        }
        case ActionType.DELETE_SELECTED_SPRITE: {
            Store.deleteWM();
            return state;
        }
        case ActionType.EXPORT: {
            Store.export();
            return state;
        }
        default:
            return state;
    }
};
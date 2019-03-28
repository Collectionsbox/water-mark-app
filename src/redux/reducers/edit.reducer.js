import ActionType from "../../constants/ActionType";
import Store from '../../store/Store'

const initState = {
    size: {width: 500, height: 500},
    editImage: '',
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.INIT_EDIT_VIEW: {
            Store.initView(action.canvas);
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
                size.width = 500;
                size.height = 500 / r;
            } else {
                size.height = 500;
                size.width = 500 * r;
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
            Store.dragInCanvas(action.offset);
            return state;
        }
        default:
            return state;
    }
};
import React, {Component} from 'react'
import style from './Edit.module.css'
import {connect} from 'react-redux'
import {
    initEditViewAction,
    redrawAction, dropAction,
    dragAction,
    upAction,
    overAction,
    deleteSelectedSpriteAction
} from '../redux/actions/EditAction'
import Util from '../util/Util'
import MouseEvent from './common/MouseEvent'

class Edit extends Component{
    constructor(props) {
        super(props);
        this.point = {x: 0, y: 0};
        this.isMouseDown = false;
    }
    componentDidMount() {
        this.props.initEditView(this.editCanvas, this.trackView);
        Util.addEvent(document.body, 'keydown', this.keyDown);
    }
    componentWillMount() {
        Util.removeEvent(document.body, 'keydown', this.keyDown);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {editImage} = this.props;
        if (editImage && editImage !== prevProps.editImage) {
            this.drawEditImage();
        }
    }

    render() {
        let {
            size,
            mouseDownInCanvas,
            mouseOverInCanvas,
            mouseMoveInCanvas,
        } = this.props;
        return (
            <div  style={{width: size.width, height: size.height}}
                  className={style.container}>
                <MouseEvent mouseDown={mouseDownInCanvas}
                            mouseOver={mouseOverInCanvas}
                            mouseDrag={mouseMoveInCanvas}
                            className={style.mouseContent}
                >
                    {() => {
                        return (
                            <div className={style.editContent}
                                 style={{width: size.width, height: size.height}}>
                                <canvas ref={ele => this.editCanvas = ele}
                                        style={{width: size.width, height: size.height}}
                                        className={style.edit}
                                        width={size.width}
                                        height={size.height}>
                                </canvas>
                            </div>
                        );
                    }}
                </MouseEvent>
                <div ref={ele => this.trackView = ele}
                     className={style.trackView} />
            </div>
        );
    }
    keyDown = (e) => {
        if (e.key === 'Delete') {
            this.props.deleteSelectedSprite();
        }
    };
    drawEditImage = () => {
        let {editImage} = this.props;
        let ctx = this.editCanvas.getContext('2d');
        Util.getImageInfo(editImage, (info) => {
            let {image} = info;
            ctx.drawImage(image, 0, 0, this.editCanvas.width, this.editCanvas.height);
            this.props.redraw();
        })
    };
}

const mapStateToProps = (state) => {
    return {
        size: state.edit.size,
        editImage: state.edit.editImage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        initEditView: function (canvas, trackView) {
            dispatch(initEditViewAction(canvas, trackView));
        },
        redraw: function () {
            dispatch(redrawAction());
        },
        mouseDownInCanvas: function (point) {
            dispatch(dropAction(point));
        },
        mouseMoveInCanvas: function (point, offset) {
            dispatch(dragAction(point, offset));
        },
        mouseUpInCanvas: function () {
            dispatch(upAction());
        },
        mouseOverInCanvas: function (point) {
            dispatch(overAction(point));
        },
        deleteSelectedSprite: function () {
            dispatch(deleteSelectedSpriteAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
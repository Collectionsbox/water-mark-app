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

class Edit extends Component{
    constructor(props) {
        super(props);
        this.point = {x: 0, y: 0};
        this.isMouseDown = false;
    }
    componentDidMount() {
        this.props.initEditView(this.editCanvas, this.trackView);
        Util.addEvent(document.body, 'mousemove', this.mouseMove);
        Util.addEvent(document.body, 'keydown', this.keyDown);
    }
    componentWillMount() {
        Util.removeEvent(document.body, 'mousemove', this.mouseMove);
        Util.removeEvent(document.body, 'keydown', this.keyDown);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {editImage} = this.props;
        if (editImage && editImage !== prevProps.editImage) {
            this.drawEditImage();
        }
    }

    render() {
        let {size} = this.props;
        return (
            <div  style={{width: size.width, height: size.height}}
                  ref={ele => this.container = ele}
                  onMouseDown={this.mouseDown}
                  className={style.container}>
                <div className={style.editContent}
                     style={{width: size.width, height: size.height}}>
                    <canvas ref={ele => this.editCanvas = ele}
                            style={{width: size.width, height: size.height}}
                            className={style.edit}
                            width={size.width}
                            height={size.height}>
                    </canvas>
                </div>
                <div ref={ele => this.trackView = ele}
                     className={style.trackView} />
            </div>
        );
    }

    mouseDown = (e) => {
        this.isMouseDown = true;
        this.point = this.getPoint(e);
        Util.addEvent(document.body, 'mouseup', this.mouseUp);
        this.props.mouseDownInCanvas(this.point);
    };
    mouseUp = (e) => {
        this.isMouseDown = false;
        Util.removeEvent(document.body, 'mouseup', this.mouseUp);
        this.props.mouseUpInCanvas();
    };
    mouseMove = (e) => {
        let point = this.getPoint(e);
        let offset = {
            x: point.x - this.point.x,
            y: point.y - this.point.y,
        };
        if (this.isMouseDown) {
            this.props.mouseMoveInCanvas(offset);
        } else {
            this.props.mouseOverInCanvas(point);
        }
        this.point = point;
    };
    keyDown = (e) => {
        if (e.key === 'Delete') {
            this.props.deleteSelectedSprite();
        }
    };
    getPoint = (e) => {
        let {left, top} = this.editCanvas.getBoundingClientRect();
        return {
            x: e.clientX - left,
            y: e.clientY - top,
        };
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
        mouseMoveInCanvas: function (offset) {
            dispatch(dragAction(offset));
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
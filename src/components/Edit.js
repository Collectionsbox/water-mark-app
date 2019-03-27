import React, {Component} from 'react'
import style from './Edit.module.css'
import {connect} from 'react-redux'
import Util from '../util/Util'

class Edit extends Component{
    constructor(props) {
        super(props);
        this.isMouseDown = false;
        this.point = {x: 0, y: 0};
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let {editImage} = this.props;
        if (editImage && editImage !== prevProps.editImage) {
            this.drawEditImage();
        }
    }

    render() {
        let {size={width: 500, height: 500}} = this.props;
        return (
            <div className={style.container}
                 ref={ele => this.container = ele}
                 onMouseDown={this.mouseDown}
                 onMouseMove={this.mouseMove}
            >
                <canvas ref={ele => this.editCanvas = ele}
                        className={style.edit}
                        width={size.width}
                        height={size.height}>
                </canvas>
            </div>
        );
    }

    mouseDown = (e) => {
        this.isMouseDown = true;
        this.container.addEventListener('mousemove', this.mouseMove);
        this.initPoint(e);
    };
    mouseUp = (e) => {
        this.isMouseDown =false;
        this.container.removeEventListener('mousemove', this.mouseMove);
    };
    mouseMove = (e) => {
        this.initPoint(e);
    };
    initPoint = (e) => {
        let {left, top} = this.container.getBoundingClientRect();
        this.point.x = left - e.clientX;
        this.point.y = top - e.clientY;
    };
    drawEditImage = () => {
        let {editImage} = this.props;
        let ctx = this.editCanvas.getContext('2d');
        Util.getImageInfo(editImage, (info) => {
            let {width, height, image} = info;
            this.editCanvas.width = width;
            this.editCanvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);
        })
    };
}

const mapStateToProps = (state) => {
    return {
        size: state.edit.size,
        editImage: state.resource.editImage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
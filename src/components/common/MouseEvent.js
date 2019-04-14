import React, {Component} from 'react'
import Util from "../../util/Util";

class MouseEvent extends Component {

    constructor(props) {
        super(props);
        this.hasDown = false;
        this.point = {x: 0, y: 0};
    }

    componentDidMount() {
        let {target = 'body'} = this.props;
        if (target === 'body') {
            Util.addEvent(document.body, 'mousemove', this.handleMove);
        }
    }

    componentWillMount() {
        let {target = 'body'} = this.props;
        if (target === 'body') {
            Util.removeEvent(document.body, 'mousemove', this.handleMove);
        }
    }

    render () {
        return (
            <div ref={ele => this.container = ele}
                 className={this.props.className}
                 style={{width: '100%', height: '100%'}}
                 onMouseDown={this.handleDown}>
                {this.props.children()}
            </div>
        );
    }

    handleDown = (e) => {
        this.hasDown = true;
        let {mouseDown, target} = this.props;
        this.point = this.getPoint(e);
        Util.addEvent(this.getEventTarget(), 'mouseup', this.handleUp);
        if (target !== 'body') {
            Util.addEvent(this.container, 'mousemove', this.handleMove);
        }
        if (mouseDown) {
            mouseDown(this.point);
        }
    };

    handleMove = (e) => {
        let point = this.getPoint(e);
        let offset = {
            x: point.x - this.point.x,
            y: point.y - this.point.y,
        };
        let {mouseOver, mouseDrag} = this.props;
        if (this.hasDown) {
            mouseDrag(point, offset);
        } else {
            mouseOver(point);
        }
        this.point = point;
    };

    handleUp = () => {
        this.hasDown = false;
        let {mouseUp, target = 'body'} = this.props;
        Util.removeEvent(this.getEventTarget(), 'mouseup', this.handleUp);
        if (target !== 'body') {
            Util.removeEvent(this.container, 'mousemove', this.handleMove);
        }
        if (mouseUp) {
            mouseUp();
        }
    };

    getPoint = (e) => {
        let {left, top} = this.container.getBoundingClientRect();
        return {
            x: e.clientX - left,
            y: e.clientY - top,
        };
    };

    getEventTarget = () => {
        let {target = 'body'} = this.props;
        return target === 'body' ? document.body : this.container;
    };
}

export default MouseEvent;
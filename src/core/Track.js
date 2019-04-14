import Util from '../util/Util'

class Track {
    constructor() {
        this.element = null;
        this.trackLineColor = '#ee3960';
        this.trackLineOverColor = '#5E5E5E';
        this.trackLineWidth = 2;
        this.trackNodeRadius = 8;
        this.trackNodeColor = '#AEAEAE';
        this.trackNodeActiveColor = '#26ADEE';
        this.trackNodeCollection = [];
        this.init();
    }

    init () {
        this.element = document.createElement('div');
        this.element.style.setProperty('border', this.trackLineWidth + 'px dashed ' + this.trackLineColor);
        this.element.style.setProperty('position', 'absolute');
        for (let key in Track.Track_NODE) {
            let value = Track.Track_NODE[key];
            if ((value >= 0 && value <= 7) || value === 9) {
                let node = null;
                switch (value) {
                    case 0:
                        node = this.createTrackNode({x: 0, y: 0});
                        break;
                    case 1:
                        node = this.createTrackNode({x: '50%', y: 0});
                        break;
                    case 2:
                        node = this.createTrackNode({x: '100%', y: 0});
                        break;
                    case 3:
                        node = this.createTrackNode({x: '100%', y: '50%'});
                        break;
                    case 4:
                        node = this.createTrackNode({x: '100%', y: '100%'});
                        break;
                    case 5:
                        node = this.createTrackNode({x: '50%', y: '100%'});
                        break;
                    case 6:
                        node = this.createTrackNode({x: 0, y: '100%'});
                        break;
                    case 7:
                        node = this.createTrackNode({x: 0, y: '50%'});
                        break;
                    case 9:
                        node = this.createTrackNode({x: '50%', y: '-20px',});
                        break;
                    default:
                        break;
                }
                this.element.appendChild(node);
                this.trackNodeCollection.push(node);
            }
        }
    }
    createTrackNode (pos) {
        let {x, y} = pos;
        let node = document.createElement('div');
        node.style.setProperty('border-radius', '50%');
        node.style.setProperty('border', '1px solid #000000');
        node.style.setProperty('width', (this.trackNodeRadius * 2) + 'px');
        node.style.setProperty('height', (this.trackNodeRadius * 2) + 'px');
        node.style.setProperty('background-color', this.trackNodeColor);
        node.style.setProperty('position', 'absolute');
        node.style.setProperty('left', x);
        node.style.setProperty('top', y);
        node.style.setProperty('transform', 'translate(-50%, -50%)');
        return node;
    }
    draw (view, relativeRect, rotation = 0, withNode, activeNode, hasMiddleNode) {
        view.appendChild(this.element);
        for (let i = 0; i < this.trackNodeCollection.length; i++) {
            this.trackNodeCollection[i].style.setProperty('display', withNode ? 'block' : 'none');
            this.trackNodeCollection[i].style.setProperty('background-color', activeNode === i ?
                this.trackNodeActiveColor : this.trackNodeColor);
        }
        let {x, y, width, height} = this.getRect(view, relativeRect);
        this.element.style.setProperty('border-color', withNode ? this.trackLineColor : this.trackLineOverColor);
        this.element.style.setProperty('left', x + 'px');
        this.element.style.setProperty('top', y + 'px');
        this.element.style.setProperty('width', width + 'px');
        this.element.style.setProperty('height', height + 'px');
        this.element.style.setProperty('transform', 'rotate(' + rotation + 'deg)');
    }
    clear () {
        if (this.element.parentNode) {
            this.element.remove();
        }
    }
    nodePoint (view, relativeRect, rotation, point) {
        let {x, y, width, height} = this.getRect(view, relativeRect);
        let node = -1;

        let tPoint = {
            x: point.x - x - width / 2,
            y: y + height / 2 - point.y,
        };
        let afterPoint = Util.pointAfterRotation(tPoint, rotation / 180 * Math.PI);

        if (this.pointInNode({x: -width / 2, y: height / 2}, afterPoint)) {
            node = 0;
        } else if (this.pointInNode({x: 0, y: height / 2}, afterPoint)) {
            node = 1;
        } else if (this.pointInNode({x: width / 2, y: height / 2}, afterPoint)) {
            node = 2;
        } else if (this.pointInNode({x: width / 2, y: 0}, afterPoint)) {
            node = 3;
        } else if (this.pointInNode({x: width / 2, y: -height / 2}, afterPoint)) {
            node = 4;
        } else if (this.pointInNode({x: 0, y: -height / 2}, afterPoint)) {
            node = 5;
        } else if (this.pointInNode({x: -width / 2, y: -height / 2}, afterPoint)) {
            node = 6;
        } else if (this.pointInNode({x: -width / 2, y: 0}, afterPoint)) {
            node = 7;
        } else if (Util.isPointInRect(afterPoint, {x: -width / 2, y: -height / 2, width, height}, afterPoint)) {
            node = 8;
        } else if (this.pointInNode({x: 0, y: height / 2 + 20}, afterPoint)) {
            node = 9;
        } else {
            node = -1;
        }
        return node;
    }
    pointInNode (pos, point) {
        let {x, y} = pos;
        return Util.isPointInRect(point, {x: x - this.trackNodeRadius, y: y - this.trackNodeRadius, width: this.trackNodeRadius * 2, height: this.trackNodeRadius * 2})
    }
    getRect (view, relativeRect) {
        let {x, y, w, h} = relativeRect;
        let {width, height} = view.getBoundingClientRect();
        return {
            x: x * width,
            y: y * height,
            width: w * width,
            height: h * height,
        }
    }
}

Track.Track_NODE = {
    LEFT_TOP: 0,
    CENTER_TOP: 1,
    RIGHT_TOP: 2,
    RIGHT_CENTER: 3,
    RIGHT_BOTTOM: 4,
    CENTER_BOTTOM:5,
    LEFT_BOTTOM: 6,
    LEFT_CENTER: 7,
    CENTER: 8,
    ROTATE: 9,
    NONE: -1,
};

export default Track;
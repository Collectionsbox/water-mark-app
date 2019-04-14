import Track from './Track'
import Util from "../util/Util";

class Sprite {
    constructor() {
        this.relativeRect = null;
        this.rotation = 0;
        this.layerIndex = 1;
        this.track = new Track();
    }
    getRelativeRect () {
        return this.relativeRect;
    }
    setRelativeRect (rect) {
        this.relativeRect = {...rect}
    }
    clearRelativeRect () {
        this.relativeRect = null;
    }
    move (offsetPoint) {
        this.relativeRect.x += offsetPoint.x;
        this.relativeRect.y += offsetPoint.y;
    }
    rotate (deg) {
        this.rotation = deg;
    }
    resize (trackNode, offsetPoint, keepRatio = true) {
        let afterOffsetPoint = Util.pointAfterRotation(offsetPoint, this.rotation / 180 * Math.PI);
        let {x, y} = afterOffsetPoint;
        let r = this.relativeRect.w / this.relativeRect.h;
        let oriW = this.relativeRect.w;
        let oriH = this.relativeRect.h;
        let oriX = this.relativeRect.x;
        let oriY = this.relativeRect.y;

        let covertPos = (point, nextPoint) => {
            let p = Util.pointAfterRotation(point, -this.rotation / 180 * Math.PI);
            p.x = p.x + (oriX + oriW / 2);
            p.y = (oriY + oriH / 2) - p.y;
            let p2 = Util.pointAfterRotation(nextPoint, -this.rotation / 180 * Math.PI);
            let p3 = {};
            p3.x = p.x - p2.x;
            p3.y = p.y + p2.y;
            return {
                x: p3.x - this.relativeRect.w / 2,
                y: p3.y - this.relativeRect.h / 2,
            }
        };

        switch (trackNode) {
            case 0: {
                let isAdd = (x < 0 || (x === 0 && y > 0));
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w -= x;
                    this.relativeRect.h -= y;
                }
                let pos = covertPos({
                    x: oriW / 2,
                    y: -oriH / 2,
                }, {
                    x: this.relativeRect.w / 2,
                    y: -this.relativeRect.h / 2,
                });
                this.relativeRect.x = pos.x;
                this.relativeRect.y = pos.y;
                break;
            }
            case 1: {
                this.relativeRect.h -= y;
                this.relativeRect.y += y;
                break;
            }
            case 2: {
                let isAdd = x > 0 || (x === 0 && y > 0);
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w += x;
                    this.relativeRect.h -= y;
                }
                let pos = covertPos({
                    x: -oriW / 2,
                    y: -oriH / 2,
                }, {
                    x: -this.relativeRect.w / 2,
                    y: -this.relativeRect.h / 2,
                });
                this.relativeRect.x = pos.x;
                this.relativeRect.y = pos.y;
                break;
            }
            case 3: {
                this.relativeRect.w += x;
                break;
            }
            case 4: {
                let isAdd = x > 0 || (x === 0 && y < 0);
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w += x;
                    this.relativeRect.h += y;
                }
                let pos = covertPos({
                    x: -oriW / 2,
                    y: oriH / 2,
                }, {
                    x: -this.relativeRect.w / 2,
                    y: this.relativeRect.h / 2,
                });
                this.relativeRect.x = pos.x;
                this.relativeRect.y = pos.y;
                break;
            }
            case 5: {
                this.relativeRect.h += y;
                break;
            }
            case 6: {
                let isAdd = x < 0 || (x === 0 && y < 0);
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w -= x;
                    this.relativeRect.h += y;
                }
                let pos = covertPos({
                    x: oriW / 2,
                    y: oriH / 2,
                }, {
                    x: this.relativeRect.w / 2,
                    y: this.relativeRect.h / 2,
                });
                this.relativeRect.x = pos.x;
                this.relativeRect.y = pos.y;
                break;
            }
            case 7: {
                this.relativeRect.w -= x;
                this.relativeRect.x += x;
                break;
            }
            default:
        }
    }
    draw () {}
    getLayerIndex () {
        return this.layerIndex;
    }
    setLayerIndex (index) {
        this.layerIndex = index;
    }
    initRelativeRect (viewSize, selfSize) {
        let {width, height} = viewSize;
        this.relativeRect = {};
        let r = selfSize.width / selfSize.height;
        this.relativeRect.w = 0.5;
        this.relativeRect.h = width * this.relativeRect.w / r / height;
        this.relativeRect.x = (1 - this.relativeRect.w) / 2;
        this.relativeRect.y = (1 - this.relativeRect.h) / 2;
    }
    getRect (viewSize) {
        let {x, y, w, h} = this.relativeRect;
        let {width, height} = viewSize;
        return {
            x: x * width,
            y: y * height,
            width: w * width,
            height: h * height,
        }
    }
    drawTrack (view, withNode, activeNode) {
        this.track.draw(view, this.relativeRect, this.rotation, withNode, activeNode);
    }
    delete () {
        this.track.clear();
    }
    clearTrack () {
        this.track.clear();
    }
    trackNodePoint (view, point) {
        return this.track.nodePoint(view, this.relativeRect, this.rotation, point);
    }

    //改变ViewSize后，将Sprite的relativeRect以中心点自适应, 宽度不变
    updateRelativeRect (viewSize, selfSize) {
        let {x, y, w, h} = this.relativeRect;
        let newRelativeRect = {w: w};
        let oldCenterPoint = {
            x: x + w / 2,
            y: y + h / 2,
        };
        let r = selfSize.width / selfSize.height;
        newRelativeRect.h =  viewSize.width * w / r / viewSize.height;
        newRelativeRect.x = oldCenterPoint.x - newRelativeRect.w / 2;
        newRelativeRect.y = oldCenterPoint.y - newRelativeRect.h / 2;
        this.relativeRect = newRelativeRect;
    }
}

export default Sprite;
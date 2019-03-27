class Sprite {
    constructor() {
        this.selected = false;
        this.relativeRect = {w: 0, h: 0, x: 0, y: 0};
        this.rotation = 0;
        this.layerIndex = 1;
        //trackNode
        //-1 => not selected
        //0 =>  left-top
        //1 =>  top
        //2 =>  right-top
        //3 =>  right
        //4 =>  right-bottom
        //5 =>  bottom
        //6 =>  left-bottom
        //7 =>  left
        //8 =>  selected
        this.trackNode = -1;
    }

    select () {
        this.selected = true;
    }
    deselect () {
        this.selected = false;
    }
    isSelected () {
        return this.selected;
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
    getRotation () {
        return this.rotation;
    }
    setRotation (deg) {
        this.rotation = deg;
    }
    move (offsetPoint) {
        this.relativeRect.x += offsetPoint.x;
        this.relativeRect.y += offsetPoint.y;
    }
    resize (offsetPoint, keepRatio = true) {
        let {x, y} = offsetPoint;
        let r = this.relativeRect.w / this.relativeRect.h;
        let oriW = this.relativeRect.w;
        let oriH = this.relativeRect.h;
        switch (this.trackNode) {
            case 0: {
                let isAdd = (x < 0 || (x === 0 && y > 0));
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w -= x;
                    this.relativeRect.h += y;
                }
                this.relativeRect.x -= (this.relativeRect.w - oriW);
                this.relativeRect.y -= (this.relativeRect.h - oriH);
                break;
            }
            case 1: {
                this.relativeRect.h += y;
                this.relativeRect.y -= y;
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
                this.relativeRect.y -= (this.relativeRect.h - oriH);
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
                    this.relativeRect.h -= y;
                }
                break;
            }
            case 5: {
                this.relativeRect.h -= y;
                break;
            }
            case 6: {
                let isAdd = x < 0 || (x === 0 && y < 0);
                if (keepRatio) {
                    this.relativeRect.w += isAdd ? Math.abs(x) : -Math.abs(x);
                    this.relativeRect.h = this.relativeRect.w / r;
                } else {
                    this.relativeRect.w += x;
                    this.relativeRect.h -= y;
                }
                this.relativeRect.x -= x;
                break;
            }
            case 7: {
                this.relativeRect.w -= x;
                this.relativeRect.x -= x;
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
}

export default Sprite;
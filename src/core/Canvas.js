import Track from './Track'

class Canvas {
    constructor () {
        this.sprites = [];
        this.selectedIndex = -1;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.trackView = null;
        this.trackNode = -1;
    }

    getCanvas () {
        return this.canvas;
    }
    getContext () {
        return this.context;
    }
    setSize (size) {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
    }
    getSize () {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        }
    }
    updateAllSpriteRelativeRect (viewSize, oldSize) {
        this.sprites.forEach((sprite) => {
            let {w, h} = sprite.getRelativeRect();
            sprite.updateRelativeRect(viewSize, {width: w * oldSize.width, height: h * oldSize.height});
        });
    }
    clear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw () {
        this.sprites.forEach((sprite, index) => {
            this.drawSprite(sprite);
            if (this.selectedIndex === index) {
                this.sprites[index].drawTrack(this.trackView, true, -1);
            }
        });
    }
    drawSprite(sprite) {
        sprite.draw(this.canvas);
    }
    addSprite (sprite) {
        this.sprites.push(sprite);
    }
    deleteSpite () {
        this.sprites[this.selectedIndex].delete();
        this.sprites.splice(this.selectedIndex, 1);
    }
    drop (point) {
        this.selectedIndex = -1;
        let hasFound = false;
        for (let i = this.sprites.length - 1; i > -1; i--) {
            let sprite = this.sprites[i];
            sprite.clearTrack();
            if (!hasFound) {
                this.trackNode = sprite.trackNodePoint(this.trackView, point);
                if (this.trackNode !== -1) {
                    this.selectedIndex = i;
                    hasFound = true;
                }
            }
        }
        if (hasFound) {
            this.sprites[this.selectedIndex].drawTrack(this.trackView, true, this.trackNode);
        }
    }
    dropUp () {
        this.trackNode = -1;
        if (this.selectedIndex !== -1) {
            this.sprites[this.selectedIndex].drawTrack(this.trackView, true, this.trackNode);
        }
    }
    drag (point, offset) {
        if (this.selectedIndex !== -1) {
            let {width, height} = this.getSize();
            let offsetPoint = {x: offset.x / width, y: offset.y / height};
            let selectedSp = this.sprites[this.selectedIndex];
            if (this.trackNode === Track.Track_NODE.CENTER) {
                selectedSp.move(offsetPoint);
            } else if (this.trackNode !== Track.Track_NODE.NONE && this.trackNode !== Track.Track_NODE.ROTATE) {
                selectedSp.resize(this.trackNode, offsetPoint);
            } else if (this.trackNode === Track.Track_NODE.ROTATE) {
                let spRect = selectedSp.getRect({width: width, height: height});
                let cor = Math.atan2((spRect.y + spRect.height / 2) - point.y, point.x - (spRect.x + spRect.width / 2));
                let deg = 90 - cor / Math.PI * 180;
                selectedSp.rotate(deg < 0 ? deg + 360 : deg);
            }
            selectedSp.drawTrack(this.trackView, true, this.trackNode);
        }
    }
    mouseOver (point) {
        let overSprite = null;
        let hasFound = false;
        this.sprites.forEach((sprite, index) => {
            if (index !== this.selectedIndex) {
                sprite.clearTrack();
            }
        });
        for (let i = this.sprites.length - 1; i > -1; i--) {
            let sprite = this.sprites[i];
            this.trackNode = sprite.trackNodePoint(this.trackView, point);
            if (this.selectedIndex === i && this.trackNode !== -1 && this.trackNode !== 9) {
                break;
            }
            if (!hasFound && this.trackNode !== -1 && this.trackNode !== 9) {
                overSprite = sprite;
                hasFound = true;
            }
        }
        if (overSprite) {
            overSprite.drawTrack(this.trackView, false, -1);
        }
    }
    initTrackView (view) {
        this.trackView = view;
    }
}

export default Canvas;
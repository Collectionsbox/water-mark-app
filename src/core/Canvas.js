import Util from '../util/Util'

class Canvas {
    constructor () {
        this.sprites = [];
        this.selectedIndex = -1;
        this.size = {width: 1, height: 1};
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }

    getCanvas () {
        return this.canvas;
    }
    getContext () {
        return this.context;
    }
    setSize (size) {
        this.size = {...size};
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
        this.sprites.forEach((sprite) => {
            this.drawSprite(sprite);
        });
    }
    drawSprite(sprite) {
        sprite.draw(this.canvas);
    }
    addSprite (sprite) {
        this.selectedIndex = this.sprites.push(sprite) - 1;
    }
    deleteSpite () {
        this.sprites.splice(this.selectedIndex, 1);
        this.selectedIndex = this.sprites.length - 1;
    }
    drop (point) {
        this.selectedIndex = this.sprites.findIndex((sprite) => {
            return Util.isPointInRect(point, sprite.getRect(this.getSize()));
        });
        console.log(this.selectedIndex);
        if (this.selectedIndex !== -1) {
            // let selectedSprite = this.sprites[this.selectedIndex];
        }
    }
    drag (offset) {
        if (this.selectedIndex !== -1) {
            let selectedSp = this.sprites[this.selectedIndex];
            let {width, height} = this.getSize();
            selectedSp.move({x: offset.x / width, y: offset.y / height});
        }
    }
}

export default Canvas;
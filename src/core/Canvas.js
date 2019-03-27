class Canvas {
    constructor () {
        this.sprites = [];
        this.size = {width: 1, height: 1};
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }

    setSize (size) {
        this.size = {...size};
    }
    clear () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw () {
        this.sprites.forEach((sprite) => {
            sprite.draw(this.canvas);
        });
    }
    addSprite (sprite) {
        this.sprites.push(sprite);
    }
    deleteSpite (index) {
        this.sprites.splice(index, 1);
    }
}

export default Canvas;
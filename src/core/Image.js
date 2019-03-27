import Sprite from 'Sprite'

class Image extends Sprite{
    constructor(props) {
        super(props);
        this.blobUrl = '';
        this.image = new Image();
    }
    setSource (blobUrl, callback) {
        this.blobUrl = blobUrl;
        this.image.addEventListener('load', () => {
            if (this.relativeRect) {
                let r = this.image.clientWidth / this.image.clientHeight;
                let oriH = this.relativeRect.h;
                this.relativeRect.h = this.relativeRect.w / r;
                this.relativeRect.y -= this.relativeRect.h - oriH;
            }
            if (callback) {
                callback();
            }
        });
        this.image.src = this.blobUrl;
    }
    getSource () {
        return this.blobUrl;
    }
    draw (canvas) {
        let {width, height} = canvas;
        if (!this.relativeRect) {
            this.initRelativeRect({width: width, height: height});
        }
        let ctx = canvas.getContext('2d');
        let posX = this.relativeRect.x * width;
        let posY = this.relativeRect.y * height;
        let sizeW = this.relativeRect.w * width;
        let sizeH = this.relativeRect.h * height;
        ctx.drawImage(this.image, posX, posY, sizeW, sizeH);
    }
    initRelativeRect (viewSize) {
        let {width, height} = viewSize;
        let r = this.image.clientWidth / this.image.clientHeight;
        this.relativeRect.w = 0.5;
        this.relativeRect.h = width * this.relativeRect.w / r / height;
        this.relativeRect.x = (1 - this.relativeRect.w) / 2;
        this.relativeRect.y = (1 - this.relativeRect.h) / 2;
    }
}

export default Image;
import Sprite from './Sprite'

class WMImage extends Sprite{
    constructor(props) {
        super(props);
        this.blobUrl = '';
        this.image = new Image();
    }
    setSource (blobUrl) {
        this.blobUrl = blobUrl;
        return new Promise ((resolve, reject) => {
            this.image.addEventListener('load', () => {
                if (this.relativeRect) {
                    let r = this.image.clientWidth / this.image.clientHeight;
                    let oriH = this.relativeRect.h;
                    this.relativeRect.h = this.relativeRect.w / r;
                    this.relativeRect.y -= this.relativeRect.h - oriH;
                }
                resolve();
            });
            this.image.addEventListener('error', () => {
                console.log('not support');
                reject();
            });
            this.image.src = this.blobUrl;
        });
    }
    getSource () {
        return this.blobUrl;
    }
    draw (canvas) {
        let {width, height} = canvas;
        if (!this.relativeRect) {
            this.initRelativeRect(
                {width: width, height: height},
                {width: this.image.naturalWidth, height: this.image.naturalHeight},
            );
        }
        let ctx = canvas.getContext('2d');
        let posX = this.relativeRect.x * width;
        let posY = this.relativeRect.y * height;
        let sizeW = this.relativeRect.w * width;
        let sizeH = this.relativeRect.h * height;
        ctx.save();
        ctx.translate(posX + sizeW / 2, posY + sizeH / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image, -sizeW / 2, -sizeH / 2, sizeW, sizeH);
        ctx.translate(-(posX + sizeW / 2), -(posY + sizeH / 2));
        ctx.restore();
    }
}

export default WMImage;
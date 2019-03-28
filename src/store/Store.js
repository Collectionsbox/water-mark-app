import Canvas from '../core/Canvas'
import WMImage from '../core/WMImage'

let canvas = new Canvas();

export default {
    initView: function (view) {
        view.parentNode.appendChild(canvas.getCanvas());
    },
    drawCanvas: function () {
        canvas.draw();
    },
    updateCanvasSize: function (size) {
        canvas.updateAllSpriteRelativeRect(size, canvas.getSize());
        canvas.setSize(size);
        canvas.clear();
        canvas.draw();
    },
    addWMImage: function (src) {
        let image = new WMImage();
        image.setSource(src, () => {
            canvas.addSprite(image);
            canvas.drawSprite(image);
            canvas.draw();
        });
    },
    deleteWM: function () {
        canvas.deleteSpite();
        canvas.draw();
    },
    dropDownCanvas: function (point) {
        canvas.drop(point);
    },
    dragInCanvas: function (offset) {
        canvas.clear();
        canvas.drag(offset);
        canvas.draw();
    },
}
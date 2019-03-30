import Canvas from '../core/Canvas'
import WMImage from '../core/WMImage'
import {ninvoke} from "q";

let canvas = new Canvas();
let editCanvas = null;

export default {
    initView: function (view) {
        editCanvas = view;
        editCanvas.parentNode.appendChild(canvas.getCanvas());
    },
    initTrackView: function (view) {
        canvas.initTrackView(view);
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
        canvas.clear();
        canvas.draw();
    },
    dropDownCanvas: function (point) {
        canvas.drop(point);
    },
    dropUpCanvas: function () {
        canvas.dropUp();
    },
    overCanvas: function (point) {
        canvas.mouseOver(point);
    },
    dragInCanvas: function (offset) {
        canvas.clear();
        canvas.drag(offset);
        canvas.draw();
    },
    export: function () {
        let exportCanvas = document.createElement('canvas');
        let ctx = exportCanvas.getContext('2d');
        let {width, height} = canvas.getSize();
        exportCanvas.width = width;
        exportCanvas.height = height;
        ctx.drawImage(editCanvas, 0, 0, width, height);
        ctx.drawImage(canvas.getCanvas(), 0, 0, width, height);
        exportCanvas.toBlob((data) => {
            let blobUrl = URL.createObjectURL(data);
            let a = document.createElement('a');
            a.download = 'export.png';
            document.body.appendChild(a);
            a.href = blobUrl;
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
        })
    },
}
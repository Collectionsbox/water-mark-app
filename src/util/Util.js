export default {
    getImageInfo: function (imageSrc, success, error) {
        let image = new Image();
        image.onload = () => {
            success({width: image.width, height: image.height, image: image});
        };
        image.onerror = () => {
            alert('Not Support!');
        };
        image.src = imageSrc;
    },
    isPointInRect: function (point, rect) {
        let {x, y, width, height} = rect;
        return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height;
    },
    addEvent: function (target, eventType, func, stopPropagation = true) {
        target.addEventListener(eventType, func, stopPropagation);
    },
    removeEvent: function (target, eventType, func, stopPropagation = true) {
        target.removeEventListener(eventType, func, stopPropagation);
    },
    pointAfterRotation: function (point, rotation, fixed) {
        let curCor = Math.atan2(point.y, point.x);
        let afterCor = curCor + rotation;
        let distance = this.distancePoint(point);
        let x = Math.cos(afterCor) * distance;
        let y = Math.sin(afterCor) * distance;
        return {
            x: typeof fixed === 'number' ? parseFloat(x.toFixed(fixed)) : x,
            y: typeof fixed === 'number' ? parseFloat(y.toFixed(fixed)) : y,
        }

    },
    distancePoint: function (point) {
        return Math.sqrt((Math.pow(point.x, 2) + Math.pow(point.y, 2)));
    },
    getTextHeight: function () {

    },
}
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
}
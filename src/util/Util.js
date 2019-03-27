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
}
import Sprit from './Sprite'
import _ from 'lodash'

class WMText extends Sprit {
    constructor(props) {
        super(props);
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.text = props.text ? props.text : '';
        this.fontFamily = props.fontFamily ? props.fontFamily : 'sans-serif';
        this.fontSize = props.fontSize ? props.fontSize : 12;
        this.lineHeight = props.lineHeight ? props.lineHeight : 12;
        this.textAlign = 'left';
        this.textBaseLine = 'top';
        this.color = '#000000';
    }
    setText (value) {
        this.text = value;
    }
    getText () {
        return this.text;
    }
    setFontFamily (value) {
        this.fontFamily = value;
    }
    getFontFamily () {
        return this.fontFamily;
    }
    setFontSize (value) {
        this.fontSize = value;
    }
    getFontSize () {
        return this.fontSize;
    }
    draw (canvas) {
        let {width, height} = canvas;
        if (!this.relativeRect) {
            let textSize = this.getSize();
            this.initRelativeRect(
                {width: width, height: height},
                textSize,
            );
            this.fontSize = 12 * this.relativeRect.w * width / textSize.width;
            this.lineHeight = this.fontSize;
        }
        this.canvas.width = width * this.relativeRect.w;
        this.canvas.height = height * this.relativeRect.h;
        this.updateStyle();
        this.text.split('\n').forEach((value, index) => {
            this.context.fillText(value, 0, this.lineHeight * (index + 1));
        });
        canvas.getContext('2d')
            .drawImage(this.canvas, this.relativeRect.x * width, this.relativeRect.y * height);
    }
    updateStyle () {
        this.context.font = this.fontSize + 'px ' + this.fontFamily;
        this.context.textAlign  = this.textAlign;
        this.context.fillStyle  = this.color;
        this.context.textBaseLine  = this.textBaseLine;
    }
    getSize () {
        let contents = this.text.split('\n');
        let widths = contents.map((value) => {
            return this.context.measureText(value).width;
        });
        this.updateStyle();
        return {
            width: _.max(widths),
            height: contents.length * this.lineHeight,
        }
    }
}

export default WMText;
import React, {Component} from 'react'
import style from './FileInput.module.css'

class FileInput extends Component {
    render() {
        let {accept, dataChange} = this.props;
        return <input ref={ele => this.input = ele}
                      className={style.file}
                      onChange={dataChange}
                      type='file'
                      accept={accept}/>;
    }

    triggerClick = () => {
        this.input.click();
    };
}

export default FileInput
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {addEditImageAction, addWMImageAction} from '../redux/actions/EditAction'
import FileInput from './common/FileInput'

class Resource extends Component{

    render() {
        return (
            <Fragment>
                <button onClick={this.bgHandleClick}>添加圖片</button>
                <button onClick={this.wmHandleClick}>添加圖片水印</button>
                <FileInput ref={ele => this.bgImage = ele} accept='image/*' dataChange={this.bgDataChange}/>
                <FileInput ref={ele => this.wmImage = ele} accept='image/*' dataChange={this.wmDataChange}/>
            </Fragment>
        );
    }

    bgHandleClick = () => {
        this.bgImage.triggerClick();
    };
    wmHandleClick = () => {
        this.wmImage.triggerClick();
    };
    bgDataChange = (e) => {
        if (e.target.files[0]) {
            this.props.addEditImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    wmDataChange = (e) => {
        if (e.target.files[0]) {
            this.props.addWMImage(URL.createObjectURL(e.target.files[0]));
        }
    };
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEditImage: function (data) {
            dispatch(addEditImageAction(data));
        },
        addWMImage: function (data) {
            dispatch(addWMImageAction(data));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
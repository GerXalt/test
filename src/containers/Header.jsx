import React from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { createImage, createVideo } from 'store/app/actions'

class Header extends React.Component {
    constructor(props){
        super(props);
        this.inputFile = null;
    }

    onImageButtonChange(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event){
            let image = event.target.result;
            store.dispatch(createImage({image}));
        };
        reader.readAsDataURL(file);
    }

    onImageButtonClick(e){
        var event = new MouseEvent("click", {
            view: window,
            bubbles: false,
            cancelable: false
        });
        this.inputFile.dispatchEvent(event);
    }

    onVideoButtonClick(){
        let videoUrl = prompt('https://www.youtube.com/watch?v=tp-utWVDpIQ');
        let vid = videoUrl.match(/\?v=(.*)$/i)[1];
        let image = `//img.youtube.com/vi/${vid}/maxresdefault.jpg`;
        store.dispatch(createVideo({image}));
    }

    render(){
        return (<div className="header">
            <div className="button-container">
                <input 
                    ref={(e)=>{this.inputFile = e}} 
                    type="file" 
                    value='' 
                    onChange={(e)=>{this.onImageButtonChange(e)}} 
                />
                <button className="button" onClick={(e)=>{this.onImageButtonClick(e)}}>
                    Добавить фото
                </button>
                <button className="button" onClick={(e)=>{this.onVideoButtonClick(e)}}>
                    Добавить видео
                </button>
            </div>
        </div>)
    }
}

export default connect(({app})=>({
    app
}))(Header)
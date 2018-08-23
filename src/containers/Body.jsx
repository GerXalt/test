import React from 'react'
import { connect } from 'react-redux'
import store from 'store'
import Container from 'components/Container'
import * as actions from 'store/app/actions'

class Image extends React.Component {
    constructor(props){
        super(props);
        this.img = null;
    }

    componentDidMount(){
        this.img.ondragstart = function(){return false};
    }

    render(){
        const { data } = this.props;
        return (<div className="image-element-container">
            <img src={data.image} ref={(e)=>{this.img=e}} />
        </div>)
    }
}

class Video extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.img.ondragstart = function(){return false};
    }

    render(){
        const { data } = this.props;
        return (<div className="image-element-container">
            <img src={data.image} ref={(e)=>{this.img=e}} />
        </div>)
    }

}

class Body extends React.Component {
    constructor(props){
        super(props);
        this.elements = {
            image: Image,
            video: Video
        }
    }

    onElementChange(id, e){
        store.dispatch(actions.changeElement({id, ...e}));
    }

    render(){
        const { items } = this.props.app;
        return (<div className="body">
            <div className="draggable-container">
                {
                    items.map((x, i)=>{
                        let $component = this.elements[x.type];
                        return (
                            <Container
                                keepAspectRatio={x.keepAspectRatio}
                                key={`element-${i}`}
                                y={x.y}
                                x={x.x}
                                width={x.width}
                                height={x.height}
                                onChange={((id)=>(e)=>{this.onElementChange(id, e)})(x.id)}
                            >
                                <$component data={x.data} />
                            </Container>
                        )
                    })
                }
            </div>
        </div>)
    }
}

export default connect(({app})=>({
    app
}))(Body)
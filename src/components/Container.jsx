import React from 'react'

export default class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isMoving: false,
            isResizing: false,
            clickCoords: null,
            currentDiff: null
        };
        this.container = null;
        this.clickCoords = null;
        this.currentCoords = null;
        this.moveListener = this.moveListener.bind(this);
        this.onMoveEndListener = this.onMoveEndListener.bind(this);
        this.resizePoints = [{
            vertical: 'top',
            horizontal: 'left'
        }, {
            vertical: 'top',
            horizontal: 'right'
        }, {
            vertical: 'bottom',
            horizontal: 'right'
        }, {
            vertical: 'bottom',
            horizontal: 'left'
        }];
        this.aspectRatio = 0;
    }

    onMoveStart(e){
        if (e.nativeEvent.button!==0) return;
        document.addEventListener('mouseup', this.onMoveEndListener);
        this.setState({
            isMoving: true,
            clickCoords: {
                x: e.nativeEvent.pageX,
                y: e.nativeEvent.pageY
            },
            currentDiff: {
                x: 0,
                y: 0
            }
        });
        document.addEventListener('mousemove', this.moveListener);
    }

    moveListener(e){
        this.setState({
            currentDiff: {
                x: e.pageX - this.state.clickCoords.x,
                y: e.pageY - this.state.clickCoords.y
            }
        });
    }

    onMoveEndListener(e){
        if (e.button!==0) return;
        document.removeEventListener('mousemove', this.moveListener);
        document.removeEventListener('mouseup', this.onMoveEndListener);
        this.props.onMove({
            x: this.props.x + this.state.currentDiff.x,
            y: this.props.y + this.state.currentDiff.y
        });
        this.setState({
            isMoving: false,
            clickCoords: null,
            currendDiff: null
        });
    }

    componentDidMount(){
        this.aspectRatio = this.container.offsetWidth / this.container.offsetHeight;
    }

    render(){
        let y = (this.state.isMoving ? this.props.y + this.state.currentDiff.y : this.props.y) + 'px';
        let x = (this.state.isMoving ? this.props.x + this.state.currentDiff.x : this.props.x) + 'px';
        let width = this.props.width ? this.props.width + 'px' : 'initial';
        let height = this.props.height ? this.props.height + 'px' : 'initial';
        return (
            <div className="draggable-item"
                style={{top: y, left: x, width, height}} 
                ref={(el)=>{this.container = el}}
                onMouseDown={(e)=>{this.onMoveStart(e)}}
            >
                {
                    this.resizePoints.map((x, i)=>(
                        <div 
                            key={`resize-point-${i}`} 
                            className={`resize-point ${x.vertical} ${x.horizontal}`}
                            onMouseDown={(e)=>{this.onResizeStart(e)}}
                        >
                        
                        </div>
                    ))
                }
                {
                    this.props.children
                }
            </div>
        )
    }
}
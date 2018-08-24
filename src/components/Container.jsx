import React from 'react'

export default class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isMoving: false, 
            isResizing: false,
            clickCoords: null, //первые координаты для ресайза и перетаскивания
            currentDiff: null, //разница координат
            //коэффициенты для ресайза, разные для каждой пипки за которую тянем
            vModePosition: null, //насколько от разницы менять позицию
            hModePosition: null,
            vModeSize: null,    //насколько от разницы менять размер
            hModeSize: null,
            //для сохранения пропорций
            keepMode: null,
            keepVMode: null
        };
        this.container = null;
        this.clickCoords = null;
        this.currentCoords = null;
        this.onMove = this.onMove.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onResizeEnd = this.onResizeEnd.bind(this);
        this.resizePoints = [{
            vertical: 'top',
            horizontal: 'left',
            vModePosition: 1,
            hModePosition: 1,
            vModeSize: -1,
            hModeSize: -1,
            keepMode: -1,
            keepVMode: 1
        }, {
            vertical: 'top',
            horizontal: 'right',
            vModePosition: 1,
            hModePosition: 0,
            vModeSize: -1,
            hModeSize: 1,
            keepMode: 1,
            keepVMode: 1
        }, {
            vertical: 'bottom',
            horizontal: 'right',
            vModePosition: 0,
            hModePosition: 0,
            vModeSize: 1,
            hModeSize: 1,
            keepMode: -1,
            keepVMode: -1
        }, {
            vertical: 'bottom',
            horizontal: 'left',
            vModePosition: 0,
            hModePosition: 1,
            vModeSize: 1,
            hModeSize: -1,
            keepMode: 1,
            keepVMode: -1
        }];
        this.aspectRatio = 0;
    }

    //#region Перетаскивание
    onMoveStart(e){
        if (e.nativeEvent.button!==0) return;
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
        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onMoveEnd);
    }

    onMove(e){
        this.setState({
            currentDiff: {
                x: e.pageX - this.state.clickCoords.x,
                y: e.pageY - this.state.clickCoords.y
            }
        });
    }

    onMoveEnd(e){
        if (e.button!==0) return;
        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('mouseup', this.onMoveEnd);
        this.props.onChange({
            x: this.props.x + this.state.currentDiff.x,
            y: this.props.y + this.state.currentDiff.y
        });
        this.setState({
            isMoving: false,
            clickCoords: null,
            currendDiff: null
        });
    }
    //#endregion

    //#region Ресайз
    onResizeStart(point, e){
        if (e.nativeEvent.button!==0) return;
        e.stopPropagation();
        const { vertical, horizontal, ...modes } = point;
        this.setState({
            ...modes,
            isResizing: true,
            clickCoords: {
                x: e.nativeEvent.pageX,
                y: e.nativeEvent.pageY
            },
            currentDiff: {
                x: 0,
                y: 0
            }
        });
        document.addEventListener('mousemove', this.onResize);
        document.addEventListener('mouseup', this.onResizeEnd);
    }

    onResize(e){
        let x = e.pageX - this.state.clickCoords.x;
        let y = -1 * (e.pageY - this.state.clickCoords.y);
        if (this.props.keepAspectRatio){
            if (y * this.state.keepVMode < this.aspectRatio * x * this.state.keepMode * this.state.keepVMode){
                y = x * this.aspectRatio * this.state.keepMode;
            } else {
                x = y / this.aspectRatio * this.state.keepMode;
            }
        };
        this.setState({
            currentDiff: {x, y: -1 * y}
        });
    }

    onResizeEnd(e){
        if (e.button!==0) return;
        e.stopPropagation();
        document.removeEventListener('mousemove', this.onResize);
        document.removeEventListener('mouseup', this.onResizeEnd);
        this.props.onChange({
            width: this.props.width + this.state.hModeSize * this.state.currentDiff.x,
            height: this.props.height + this.state.vModeSize * this.state.currentDiff.y,
            x: this.props.x + this.state.hModePosition * this.state.currentDiff.x,
            y: this.props.y + this.state.vModePosition * this.state.currentDiff.y
        });
        this.setState({
            isResizing: false,
            clickCoords: null,
            currendDiff: null
        });
    }
    //#endregion

    componentDidMount(){
        this.aspectRatio = this.container.offsetHeight / this.container.offsetWidth;
    }

    render(){
        let y = this.props.y + 'px';
        let x = this.props.x + 'px';
        let width = this.props.width + 'px';
        let height = this.props.height + 'px';
        if (this.state.isMoving){
            y = (this.props.y + this.state.currentDiff.y) + 'px';
            x = (this.props.x + this.state.currentDiff.x) + 'px';
        } else if (this.state.isResizing){
            width = (this.props.width + this.state.hModeSize * this.state.currentDiff.x) + 'px';
            height = (this.props.height + this.state.vModeSize * this.state.currentDiff.y) + 'px';
            x = (this.props.x + this.state.hModePosition * this.state.currentDiff.x) + 'px';
            y = (this.props.y + this.state.vModePosition * this.state.currentDiff.y) + 'px';
        };
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
                            onMouseDown={((point)=>(e)=>{this.onResizeStart(point, e)})(x)}
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
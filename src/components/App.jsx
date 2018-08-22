import React from 'react';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'store/app/actions';

class App extends React.Component {
    constructor(props){
        super(props);
    }

    onClick(){
        store.dispatch(actions.incCount());
    }

    render(){
        const { count } = this.props.app;
        return (
            <div className="app">
                <div className='count' onClick={(e)=>{this.onClick(e)}}>{count} asd</div>
            </div>
        )
    }
}

export default connect(({app})=>({
    app
}))(App)
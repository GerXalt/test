import React from 'react';
import Header from 'containers/Header'
import Body from 'containers/Body'

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app">
                <Header />
                <Body />
            </div>
        )
    }
}
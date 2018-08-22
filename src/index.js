import React from 'react'
import App from 'components/App'
import { render } from 'react-dom'
import 'content/styles.scss'
import store from './store'
import { Provider } from 'react-redux'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
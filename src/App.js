import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/root.reducer'
import Edit from './components/Edit'
import Resource from './components/Resource'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <Edit />
            <Resource />
          </div>
        </Provider>
    );
  }
}

export default App;

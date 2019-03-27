import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './redux/reducers/root.reducer'
import Edit from './components/Edit'
import Resource from './containers/Resource'

const store = createStore(rootReducer);

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

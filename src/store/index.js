import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postReducer } from './redusers/postReducer';

const rootReducer =combineReducers( {
    post: postReducer
}
)

export default createStore(rootReducer, applyMiddleware(thunk));
import  {combineReducers} from 'redux'
import edit from './edit.reducer'
import resource from './resource.reducer'

export default combineReducers({
    edit: edit,
    resource: resource,
})
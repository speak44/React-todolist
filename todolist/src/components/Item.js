import React ,{Component} from 'react';
export default class extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {id,cont,ischecked,changechecked,deleteTodo}=this.props
    return(
      <li key={id}
          className={ischecked?'':"completed"}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={!ischecked}
            onChange={()=>changechecked(id)}
          />
          <label>
            {cont}
          </label>
          <button className="destroy"
            onClick={()=>deleteTodo(id)}
          />
        </div>
        <input
          ref="editField"
          className="edit"
        />
      </li>
    )
  }
}

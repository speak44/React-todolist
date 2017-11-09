import React ,{Component} from 'react';
export default class extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {view,onchangeview,conleft,showclear,onclear}=this.props;
    return(
      <footer className="footer">
      <span className="todo-count">
        <strong>{conleft}</strong> cont left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={view==='all'?'selected':''}
            onClick={()=>onchangeview('all')}
          >
              All
          </a>
        </li>
        {' '}
        <li>
          <a
            href="#/active"
            className={view=='active'?'selected':''}
            onClick={()=>onchangeview('active')}
          >
              Active
          </a>
        </li>
        {' '}
        <li>
          <a
            href="#/completed"
            className={view=='completed'?'selected':''}
            onClick={()=>onchangeview('completed')}
          >
              Completed
          </a>
        </li>
      </ul>
      {showclear?(
        <button
          className="clear-completed"
          onClick={onclear}
          >
          Clear completed
        </button>):''
      }
     </footer>
    )
  }
}

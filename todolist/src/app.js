import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Item from './components/Item';
import Footer from './components/Footer';
import './common/style/base.css';
import './common/style/index.css';
// import Data from './common/data/data';
class App extends Component{
    constructor(props){
        super(props);
        this.state={
          inputvalue:'',
          todocont:[],
          view:'all'
        }
        this.changevalue=this.changevalue.bind(this)
        this.inputkeydown=this.inputkeydown.bind(this)
        this.changechecked=this.changechecked.bind(this)
        this.deleteTodo=this.deleteTodo.bind(this)
        this.todoAll=this.todoAll.bind(this)
        this.onchangeview=this.onchangeview.bind(this)
        this.onclear=this.onclear.bind(this)
    }
    //改变value值内容
    changevalue(ev){
      this.setState({
        inputvalue:ev.target.value
      })
    }
    //inputkeydown事件
    inputkeydown(ev){
        let {value}=ev.target;
        if(ev.keyCode===13&&value!==''){
          let {todocont}=this.state;
          this.setState({
            todocont:[
              ...todocont,
              {
                id:Math.random(),
                cont:value,
                ischecked:true
              }
            ],
              inputvalue:''
          })
        }
    }
    //触发单击选中事件
    changechecked(newid){
      let {todocont}=this.state;
      let newtodocont=todocont.map((e,i)=>{
        if(e.id===newid){
          e.ischecked=!e.ischecked
        }
        return e
      })
      this.setState({
        todocont:newtodocont
      })
    }
    //删除按钮
    deleteTodo(id){
      let {todocont}=this.state;
      let newtodo=todocont.filter((e,i)=>{
        return e.id == id?false:true
      })
      this.setState({
        todocont:newtodo
      })
    }
    //全选按钮点击
    todoAll(ev){
      // console.log(ev.target.checked);
      let {checked}=ev.target;
      let {todocont}=this.state;
      this.setState({
        todocont:todocont.map((e,i)=>{
           e.ischecked=!checked
           return e
        })
      })
    }
    //切换状态
    onchangeview(view){
      this.setState({
        view
      })
    }
    //全选删除事件
    onclear(){
      let {todocont}=this.state;
      let newtodocont=todocont.filter((e,i)=>{
          return e.ischecked
      })
      this.setState({
        todocont:newtodocont
      })
    }
    render(){
      let {inputvalue,todocont,view}=this.state;
      let {changevalue,
          inputkeydown,
          changechecked,
          deleteTodo,
          todoAll,
          onchangeview,
          onclear
        }=this;
      // let {data}=this.props;
      let todoconlength=todocont.length;
      //左下角显示的内容；
      let conleft=todoconlength;
      let showtodocont=todocont.filter((e,i)=>{
        let {id,cont,ischecked}=e;
        let show=false;
        if(!ischecked)conleft--;
        switch (view) {
          case 'active':
          // 未完成内容显示
              if (ischecked===true) {
                  show=true
              }
            break;
          case 'completed':
          // 显示已完成内容
            if (ischecked===false) {
                show=true
            }
            break;
          default:
            show=true;
        }
        return show
      })
      let datalist=showtodocont.map((e,i)=>{
        let {id,cont,ischecked}=e
        return(
            <Item
              key={id}
              {...{
                id,
                cont,
                ischecked,
                changechecked,
                deleteTodo
              }}
            />
        )
      })
        return (
          <div>
            <header className="header">
  						<h1>todos</h1>
  						<input
  							className="new-todo"
  							placeholder="What needs to be done?"
                value={inputvalue}
                onChange={changevalue}
  							autoFocus={true}
                onKeyDown={inputkeydown}
  						/>
  					</header>
            {/* main */}
            {todoconlength>0?(<section className="main">
						<input
							className="toggle-all"
							type="checkbox"
              checked={conleft===0}
              onChange={todoAll}
						/>
						<ul className="todo-list">
              {datalist}
						</ul>
					</section>):null}
          {todoconlength>0?(<Footer
            {...{
              view,
              onchangeview,
              conleft,
              onclear,
              showclear:todoconlength>conleft
            }}
          />):null}
        </div>
        )
    }
}
ReactDOM.render(
  <App
    // data={Data}
  />,
  document.getElementById('root')
)

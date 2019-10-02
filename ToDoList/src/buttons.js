import React from 'react';
import './App.css';

let toDo = 0;


class Buttons extends React.Component  {
  constructor(props){
    super(props);
    this.addDo = this.addDo.bind(this);
    this.deleteDo = this.deleteDo.bind(this);
    
  }

  componentDidUpdate(){
    const toDoList = this.props.toDoList;
  
  }

  addDo(e) {
    if(this.props.toDoList == 8) return;
    this.props.onClickDoAdd();
    
  }

  deleteDo(e){
    if(this.props.toDoList == 0) return;
    this.props.onClickDoDelete();
    
  }


  render(){
     
   
    return (
      <header className="buttons">
        <a id="add" onClick={this.addDo} id='add'>+</a>
        <a id="delete" onClick={this.deleteDo}>−</a>
        <span>Количество дел: {this.props.toDoList} </span>
      </header>
  );
  }
  
}

export default Buttons;
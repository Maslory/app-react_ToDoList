import React from 'react';
import './App.css';
import Buttons from './buttons';
import Windows from './windows';




class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        toDoList: 0

    };
    this.changeDoA = this.changeDoA.bind(this);
    this.changeDoD = this.changeDoD.bind(this);
  }

  changeDoA() {
    
    this.setState(prevState =>({
      toDoList: prevState.toDoList + 1
    }));
  }

  changeDoD(a) {
    console.log(this.state.toDoList);
    console.log('draggable' + document.getElementsByClassName('draggable').length);
    if(document.getElementsByClassName('draggable').length < this.state.toDoList){
      this.setState(prevState =>({
        toDoList: document.getElementsByClassName('draggable').length
      }));
    }
      
    
  }

componentDidUpdate(){
  
  
}

  render() {
    const toDoList = this.state.toDoList;
    if (this.state.toDoList < 0) {
      this.state.toDoList = 0;
    }
    return (
      <div className="App" onMouseMove={this.changeDoD} >
        <Buttons toDoList={this.state.toDoList} onClickDoAdd={this.changeDoA} onClickDoDelete={this.changeDoD} />
        <Windows toDoList={this.state.toDoList} onClickDoDelete={this.changeDoD} />
      </div>
    );
  }
}

export default App;

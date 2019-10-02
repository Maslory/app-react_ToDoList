import React from 'react';
import './App.css';


let dragObject = {};
let toDoListDo = 0;
let FixedList = 0;
let Fixed = [];

class Windows extends React.Component {
  constructor(props) {
    super(props);
    this.fixState = this.fixState.bind(this);
  }

 

  fixState(){
    
    const toDoList = this.props.toDoList;
    if(FixedList<toDoList){
      this.props.onClickDoDelete();
      console.log(FixedList);
    }
  }
    
   
 componentDidUpdate(){
   const toDoList = this.props.toDoList;
   console.log('toDoList:'+toDoList);

  toDoListDo+=1;
for(let i = 0; i < Fixed.length; i++) {
    if(toDoList==i && Fixed[i]==false){
      Fixed[i]=true;
      createDo();
      console.log('Do:'+toDoListDo);
      if(toDoList < toDoListDo){
        Fixed[i]=false;
      }    
  }
};
 
 
  
function createDo(){
    const coordinates = document.getElementById('coordinates');
    
   const button1 = document.createElement('button');
      // СОЗДАНИЕ ШАБЛОНА ЭЛЕМЕНТА ДЕЛ
    const div = document.createElement('div');
    div.className = 'windows';
    div.id = 'windows';
    div.style.position = 'absolute';
    const header = document.createElement('header');
    button1.id = 'closeWindow';
    button1.className = 'closeWindow';
    div.className = 'draggable';
    header.id = 'elementMove';
    // header.style.position = 'absolute';
    const input = document.createElement("textarea");
    // input.style.position = 'absolute';
    input.className = 'textBox';
    input.placeholder = 'Ну что... Какие дела?';
    coordinates.appendChild(div);
    div.appendChild(header);
    header.appendChild(button1);
    div.appendChild(input);

   FixedList = toDoList;
  button1.onclick = function(e){
    const qw = e.target.parentNode;
    toDoListDo +=1;
    FixedList-=1;
    try{
    document.body.removeChild(qw.parentNode);
    }
    catch{
      coordinates.removeChild(qw.parentNode);
    }
  }
}
}



  



 


  componentDidMount(){
    for(let i=1;i<9;i++){
      Fixed[i]=false;
    }
    document.onmousedown = function(e) {   // поставить coordinates

      if (e.which != 1) { // если клик правой кнопкой мыши
        return; // то он не запускает перенос
      }
    
      const elem = e.target.closest('.draggable');
      if (!elem) return; // не нашли, клик вне draggable-объекта
      // запомнить переносимый объект
      dragObject.elem = elem;
  
      // запомнить координаты, с которых начат перенос объекта
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
    }

    document.onmousemove = function(e) {
      if (!dragObject.elem) return; // элемент не зажат
    
      if ( !dragObject.avatar ) { // если перенос не начат...
    
        // посчитать дистанцию, на которую переместился курсор мыши
        const moveX = e.pageX - dragObject.downX;
        const moveY = e.pageY - dragObject.downY;
        if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
          return; // ничего не делать, мышь не передвинулась достаточно далеко
        }
    
        dragObject.avatar = createAvatar(e); // захватить элемент
        if (!dragObject.avatar) {
          dragObject = {}; // аватар создать не удалось, отмена переноса
          return; // возможно, нельзя захватить за эту часть элемента
        }
    
        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        const coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;
    
        startDrag(e); // отобразить начало переноса
      }
    
      // отобразить перенос объекта при каждом движении мыши
      dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
      return false;
    }

    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();
    
      return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
      };
    }

    function startDrag(e) {
      var avatar = dragObject.avatar;
    
      document.body.appendChild(avatar);
      avatar.style.zIndex = 9999;
      avatar.style.position = 'absolute';
    }


    function createAvatar(e) {
      // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
      var avatar = dragObject.elem;
      var old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || '',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
      };
      // функция для отмены переноса
      avatar.rollback = function() {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
      };
    
      return avatar;
    }
    document.onmouseup = function(e) {
      // (1) обработать перенос, если он идет
      // if (dragObject.avatar) {
      //   finishDrag(e);
      // }
      if(dragObject.elem == undefined){
        return;
      }
      
      dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';
    
      // window.style.top = elem1.style.top;
      // window.style.left = elem1.style.left;
      dragObject = {};
      
  if (dragObject.elem == null) {
    // такое возможно, если курсор мыши "вылетел" за границу окна
    return null;
  } 
      return dragObject.elem.closest('.droppable');
      // в конце mouseup перенос либо завершился, либо даже не начинался
      // (2) в любом случае очистим "состояние переноса" dragObject
      // dragObject = {};
    }
  }

  render(){
    return (
      <div  className='mainWindow'   id='coordinates'>
    </div>
    );
  }
 
}

export default Windows;
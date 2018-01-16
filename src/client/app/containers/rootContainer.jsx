import React,{Component} from 'react';
import Game from '../components/Game';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import style from '../styles/styles.scss';


class Container extends Component{
  render(){
    return <DragDropContextProvider backend={HTML5Backend}>
            <Game/>
          </DragDropContextProvider>
  }
}

export default Container;

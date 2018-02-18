import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GAME_STATE,DIFFICULTY } from '../utils/constants';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.gameState != GAME_STATE.OPEN
    };
    this.toggle = this.toggle.bind(this);
    this.setEasy = this.setEasy.bind(this);
    this.setHard = this.setHard.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setEasy(){
    this.props.actions.setDifficulty(DIFFICULTY.EASY);
    this.toggle();
  }

  setHard(){
    this.props.actions.setDifficulty(DIFFICULTY.HARD);
    this.toggle();
  }

  render() {
    if(this.props.gameState == GAME_STATE.OPEN)
      return null;
    if(this.props.gameState == GAME_STATE.COMPLETE)
      return(
        <div>
          <Modal isOpen={true} className={this.props.className}>
            <ModalHeader>You Win!</ModalHeader>
            <ModalBody className="text-center">
              Congratulations!
            </ModalBody>
            <ModalFooter>
              <a href="https://github.com/vikrantsinghthakur">GitHub</a>
              <a href="https://www.facebook.com/vikrantsingh.thakur.14">Facebook</a>
            </ModalFooter>
          </Modal>
        </div>
      )
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader>Select Difficulty</ModalHeader>
          <ModalBody className="text-center">
            <Button color="primary" onClick={this.setEasy}>Easy</Button>{' '}
            <Button color="danger" onClick={this.setHard}>Difficult</Button>
          </ModalBody>
          <ModalFooter>
            <a href="https://github.com/vikrantsinghthakur">GitHub</a>
            <a href="https://www.facebook.com/vikrantsingh.thakur.14">Facebook</a>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;

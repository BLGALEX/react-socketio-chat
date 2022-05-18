import * as React from 'react';
import * as Shared from './SharedTypes';
import { toggleDarkMode } from '../topmenu/DarkMode';
import { toggleSendOnEnter, getSendOnEnter } from '../topmenu/SendOnEnter';
import { toggle24HTime, get24HTime } from '../topmenu/TimeFormat';
import { Alignment, Button, Navbar, NavbarGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { getLanguage, setLanguage } from '../topmenu/Language';

interface Props {
  user: Shared.User | null;
}

interface State {
  sendOnEnterToggled: boolean,
  is24HTime: boolean,
  language: string
}

export class TopMenu extends React.Component<Props, State> {
  state: State = {
    sendOnEnterToggled: getSendOnEnter(),
    is24HTime: get24HTime(),
    language: getLanguage()
  };

  doToggleSendOnEnter = () => {
    toggleSendOnEnter();
    this.setState({
      sendOnEnterToggled: getSendOnEnter()
    });
  }

  doToggle24HTime = () => {
    toggle24HTime();
    this.setState({
      is24HTime: get24HTime()
    });
  }

  setLanguageES = () => {
    setLanguage("ES");
    this.setState({
      language : "ES"
    });
  }
  

  setLanguageENG = () => {
    setLanguage("ENG");
    this.setState({
      language: "ENG"
    });
  }
  
  
  render() {
    return (
        <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <Link to="/" className='bp3-navbar-heading pt-button pt-minimal'>React Chat</Link>
        </NavbarGroup>

        <NavbarGroup align={Alignment.RIGHT}>
          <Button style={ ( this.state.language === "ES" ) ? { backgroundColor: 'blue'} : {} } onClick={this.setLanguageES} >ES</Button>
          <Button style={ ( this.state.language === "ENG" ) ? { backgroundColor: 'blue'} : {} } onClick={this.setLanguageENG}>ENG</Button>
              |    
          <Button icon="confirm" onClick={this.doToggleSendOnEnter} style={ this.state.sendOnEnterToggled ? { backgroundColor: 'yellow'} : {} } />
          <Button icon="time" onClick={this.doToggle24HTime} style={ this.state.is24HTime ? { backgroundColor: 'yellow'} : {} } />
          <Button icon="lightbulb" onClick={toggleDarkMode} />
        </NavbarGroup>
      </Navbar>
    )
  }
}
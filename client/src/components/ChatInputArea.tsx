import { Button, Classes, FormGroup, Icon, InputGroup, Popover, Tag } from '@blueprintjs/core';
import * as React from 'react';
import * as Shared from './SharedTypes';
import { socket } from '../Socket';
import { getSendOnEnter } from '../topmenu/SendOnEnter';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const emojiPicker = {
  position: "absolute",
  bottom: 50,
  right: 0,
  cssFloat: "left"
};

interface Props {
  user: Shared.User;
}

interface State {
  msg: string,
  newNick: string,
  changingNick: boolean,
  viewEmojiPanel: boolean
}

export class ChatInputBar extends React.Component<Props, State> {

  state: State = {
    msg: '',
    newNick: '',
    changingNick: false,
    viewEmojiPanel: false
  };

  newNickChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    const newNick = e.target.value.trim();
    this.setState({ newNick });
  };

  changeNickKeyPress: React.KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter') return;
    if (!Shared.validNick(this.state.newNick)) return;

    const newNick = this.state.newNick.trim();
    if (newNick.length === 0) return;

    this.setState({
      changingNick: false,
      newNick: '',
    });

    socket.emit('change nick', newNick);
  };

  keyPressed: React.KeyboardEventHandler = (e) => {
    if ( (e.key === 'Enter') && ( getSendOnEnter() ) )
    {
      const str = this.state.msg.trim();
      if (str.length === 0) return;
  
      socket.emit('new message', this.state.msg);
      this.setState({ msg: '' });
    }
  };

  sendMessageClick = () => {
    if ( this.state.msg.length > 0 )
    {
      socket.emit('new message', this.state.msg);
      this.setState({ msg: '' });
    }
  }

  toggleEmojiPanel = () => {
    this.setState({ 
      viewEmojiPanel: !this.state.viewEmojiPanel 
    });
  }

  changed: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ msg: e.target.value });
  };

  addEmoji = e => {
    const emoji = e.native;
    this.setState({ 
      msg: this.state.msg + emoji ,
      viewEmojiPanel: false 
    });
  };

  render() {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto',
        gridGap: '1em',
        alignItems: 'left',
      }}>
        <Popover
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
          usePortal={true}
          className='bp3-fixed'
          onInteraction={(nextOpenState) => {
            this.setState({
              newNick: this.props.user.nick || '',
              changingNick: nextOpenState,
            });
          }}
          isOpen={this.state.changingNick}
          content={
            <FormGroup
              label="Nick to use"
              helperText={Shared.validNick(this.state.newNick) ? "Good idea. Let's go with that." : 'Not valid! Try again.'}
            >
              <InputGroup
                autoFocus
                onKeyPress={this.changeNickKeyPress}
                value={this.state.newNick}
                onChange={this.newNickChanged}
              />
            </FormGroup>
          }
        >
          <Tag
            interactive
            minimal
            large
            intent='primary'
            icon={this.props.user.guest ? undefined : <Icon icon='person' iconSize={12} />}
          >
            #{this.props.user.n} {this.props.user.nick}
          </Tag>
        </Popover>
        <InputGroup
          autoFocus
          onKeyPress={this.keyPressed}
          onChange={this.changed}
          value={this.state.msg}
        />
        <Button 
          icon="send-to" 
          onClick={this.sendMessageClick}
        />
        <Button 
          icon="person" 
          onClick={this.toggleEmojiPanel}
        />
        { this.state.viewEmojiPanel ? <Picker style={emojiPicker} onSelect={this.addEmoji} emojiTooltip={true} /> : null } 
      </div>
    );
  }

};

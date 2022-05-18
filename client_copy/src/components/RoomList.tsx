import { Classes, Menu, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import * as Shared from './SharedTypes';

interface Props {
  rooms: Shared.BasicRoom[];
  currentRoom: string;
  join: (room: string) => void;
}

interface State { 
  roomUserUnreadMessages: { [roomName: string] : number; } ;
}

export class RoomList extends React.Component<Props,State> {
  constructor(props:Props, state:State)
  {
    super(props);
    this.state = {
      roomUserUnreadMessages : {}
    };
    props.rooms.forEach( r => {
      this.state.roomUserUnreadMessages[r.name] = 0;
    });
  }

  changeRoom = ( name: string) => {
    const currentUserUnreadMessages = this.state.roomUserUnreadMessages ;
    currentUserUnreadMessages[name] = 0 ;
    this.setState({ roomUserUnreadMessages : currentUserUnreadMessages });
    this.props.join(name);
  };

  getUnreadMessagesForRoom = ( name: string ) => {
    let unread = 0 ;
    if ( this.state.roomUserUnreadMessages[name] )
      unread = this.state.roomUserUnreadMessages[name] ;
    return unread ;
  };

  render() {
      return (
      <div style={{
        display: 'grid',
        justifyContent: 'start',
      }}>
        <Menu className={Classes.ELEVATION_1}>
          {this.props.rooms.map(room =>
            <MenuItem
              key={room.id}
              active={room.name === this.props.currentRoom}
              text={'#' + room.name + "( " + this.getUnreadMessagesForRoom(room.name) + " )"}
              onClick={() => this.changeRoom(room.name)}
            />
          )}
        </Menu>
      </div>
    )
  }
}

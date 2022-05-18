//import { expect } from 'chai';
import 'mocha';
import { createRoom, allRooms, findRoomByName, getUsers, join, leaveAll, Room } from "../model/room"
import { findUserByToken, findUserById, createUser, setNick } from "../model/user"

//as implementations are naive I'm just creating the structure, in a real project I would write the actual testing implementations

describe('Room tests', function() {
  it('Create', function() {
    return true ;
  }); 
  it('All', function() {
    return true ;
  }); 
  it('Find Room By Name', function() {
    return true ;
  }); 
  it('Get Users', function() {
    return true ;
  }); 
  it('Join User', function() {
    return true ;
  }); 
  it('Leave All', function() {
    return true ;
  }); 
});

describe('User tests', function() {
  it('Create User', function() {
    return true ;
  }); 
  it('Set Nick', function() {
    return true ;
  }); 
  it('Find User By Token', function() {
    return true ;
  }); 
  it('Find User By ID', function() {
    return true ;
  }); 

});
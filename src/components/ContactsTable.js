import React, { Component, Fragment } from 'react';
import contacts from '../contacts.json';
import Contact from './Contact';

class ContactsTable extends Component {

  state = {
    contactList: contacts.slice(0,5)
  }

  getRandomContact(){
    let contactItem = Math.floor(Math.random() * (contacts.length - 1));
    while(this.state.contactList.filter(contact => contact.id === contacts[contactItem].id).length > 0) {
      contactItem = Math.floor(Math.random() * (contacts.length - 1));
    }

    return contacts[contactItem];
  }

  addRandomContact = (e)=>{
    e.preventDefault();
    if(this.state.contactList.length > contacts.length) return;
    this.setState({
      contactList: [
        ...this.state.contactList, 
        this.getRandomContact()
      ]
    })
  }

  sortByName = (e)=>{
    e.preventDefault();
    this.setState({
      contactList: [
        ...this.state.contactList.sort((a,b) => a.name.localeCompare(b.name))
      ]
    })
  }

  sortByPopularity = (e)=>{
    e.preventDefault();
    this.setState({
      contactList: [
        ...this.state.contactList.sort((a,b)=>b.popularity-a.popularity)
      ]
    })
  }

  removeContact = (e)=>{
    e.preventDefault();
    let temp = [...this.state.contactList].filter(contact => contact.id !== e.target.id);
    this.setState({contactList: temp});
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by Name</button>
        <button onClick={this.sortByPopularity}>Sort by Popularity</button>

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contactList.map(contact => {
              return <Contact handleEvent={this.removeContact}>{contact}</Contact>
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ContactsTable;
import React, { Component, Fragment } from 'react';
import contacts from '../contacts.json';
import Contact from './Contact';

class ContactsTable extends Component {

  state = {
    contactList: contacts.slice(0,5)
  }

  addRandomContact = ()=>{
    let randomContact = contacts[Math.floor(Math.random() * (contacts.length))];

    if(this.state.contactList.find(contact => contact.id === randomContact.id)) {
      if(this.state.contactList.length < contacts.length) {
        this.addRandomContact();
      }
      return;
    }

    this.setState({
      contactList: [
        ...this.state.contactList,
        randomContact
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
              return <Contact key={contact.id} handleEvent={this.removeContact}>{contact}</Contact>
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ContactsTable;
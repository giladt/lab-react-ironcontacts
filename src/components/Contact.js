import React from 'react';

function Contact(props) {
  const contact = props.children;
  return (
    <tr key={contact.id} name={contact.name} popularity={contact.popularity}>
      <td><img src={contact.pictureUrl} alt={contact.name} height="75px"/></td>
      <td>{contact.name}</td>
      <td>{contact.popularity}</td>
      <td><button onClick={props.handleEvent} id={contact.id}>Delete</button></td>
    </tr>
  );
}

export default Contact;
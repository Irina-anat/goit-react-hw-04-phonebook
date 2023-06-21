import React from 'react';
import css from './App.module.css'
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import  ContactForm  from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';


export class App extends React.Component {
  state = {
    contacts:[],
    filter: '',
  };
  
  addContact = ({ name, number }) => {
   const contact = {
    id: nanoid(),
    name,
    number,
    };
    
  const lowerCaseName = name.toLowerCase();

  this.state.contacts.some(
    contact =>
      (contact.name.toLowerCase() === lowerCaseName && contact.number === number) || contact.number === number || contact.name.toLowerCase() === lowerCaseName)

  ?  Notify.warning(`Contact with that ${name} or ${number} is already present in the phone book.`)
 
  : this.setState(prevState => ({
    contacts: [contact, ...prevState.contacts],
  }))
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value })
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  //не робити стрілкою
  componentDidUpdate(_, prevState) {
   // console.log('App componentDidUpdate');
   //масиви порівнюємо за писиланням: видаляю, додаю контакт
    if (this.state.contacts !== prevState.contacts) {
     // console.log('Update contacts')
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }  
    //console.log(prevState)
    //console.log(this.state)  
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    } 
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container__phonebook}>
          <h1>Phonebook</h1>
        <ContactForm 
          onSubmit={this.addContact}/>
          <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={this.visibleContacts()}
          onDeleteContact={this.deleteContact} />   
      </div>
    )}
};


Notify.init({
width: '450px',
fontSize: '20px',
position: 'center-top',
closeButton: false,
});




/*export class App extends React.Component {

  state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
],
  filter: ''
}
  
  addContact = text => {
   console.log(text)
 }
  //відфільтровую контакти і залишаю ті ел. id яких не співпадають
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  };

//this.props.onSubmit(this.state) ContactForm - дані при відправці ф-ми
  formSubmitHandler = data => {
  console.log(data)
}
   
  render() {
    const {contacts} = this.state
    return (
      <div className={css.container__phonebook}>
        <h1>Phonebook</h1>
        <ContactForm 
          onSubmit={this.formSubmitHandler}
        />
        <h2>Contacts</h2>
        <ContactList contacts={contacts}
          onDeleteContact={this.deleteContact} />
      </div>
    )}
}*/

/*addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }
   
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }))
  };
*/


import {useState, useEffect, useMemo} from 'react';
import css from './App.module.css'
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  ContactForm  from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';


const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  /*або const [contacts, setContacts] = useState(
  JSON.parse(localStorage.getItem('contacts')) || []);*/
  
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const lowerCaseName = name.toLowerCase();

    const isContactExist = contacts.some(
      (contact) =>
        (contact.name.toLowerCase() === lowerCaseName && contact.number === number) ||
        contact.number === number ||
        contact.name.toLowerCase() === lowerCaseName
    );

    isContactExist
      ? Notify.warning(`Contact with that ${name} or ${number} is already present in the phone book.`)
      : setContacts((prevContacts) => [contact, ...prevContacts]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const visibleContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container__phonebook}>
      <h1>Телефонна книга</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Контакти</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export { App };
  
  Notify.init({
width: '450px',
fontSize: '20px',
position: 'center-top',
closeButton: false,
  });










/*export class App extends React.Component {
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
*/







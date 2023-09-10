import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitForm = data => {
    console.log(data);
    const isAlreadyExist = this.state.contacts.find(
      el => el.name === data.name
    );
    if (isAlreadyExist) return alert('Already Exist');

    const newContacts = {
      ...data,
      id: nanoid(),
    };
    this.setState(prev => ({
      contacts: [newContacts, ...prev.contacts],
    }));
  };
  isNameNew = (contacts, newObj) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  onChangeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };
  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div className={css.container}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.onSubmitForm} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
        <ContactList
          contacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

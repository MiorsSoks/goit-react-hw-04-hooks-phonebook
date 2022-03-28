import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

function App() {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // --- Add to local storage
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (contacts) setContacts(parsedContacts);
    console.log(localStorage.getItem('contacts'));
  }, []);
  

  // --- Get from local storage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const deleteContact = event => {
    event.preventDefault();
    const idDeletedContact = event.currentTarget.id;
    setContacts(prevState => {
      console.log(prevState);
      return prevState.filter(contact => contact.id !== idDeletedContact);
    });
  };

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (
      !contacts.find(
        oldContact =>
          oldContact.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts([contact, ...contacts]);
    } else {
      alert(`${contact.name} is already in contacts`);
    }
  };

  const addFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} addFilter={addFilter} />
      <ContactList
        filterContacts={filterContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;

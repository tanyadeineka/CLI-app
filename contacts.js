const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(contacts);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}
const getContactById = async contactId => {
    try {
        const contacts = await listContacts();
        return contacts.filter(({ id }) => id === contactId);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const removeContact = async contactId => {
    try {
      const contacts = await listContacts();
        const newContacts = contacts.filter(({ id }) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), "utf-8");
        return newContacts;
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

listContacts();

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
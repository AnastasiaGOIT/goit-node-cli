import path from "path";
import * as fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  const readList = await fs.readFile(contactsPath);
  const data = JSON.parse(readList);
  return data;
}

export async function getContactById(contactId) {
  const list = await listContacts();
  const result = list.find((item) => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
}

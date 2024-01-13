import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allList = await listContacts();
      return console.log(allList);
      break;

    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

      break;

    case "remove":
      const removeBook = await removeContact(id);
      return console.log(removeBook);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

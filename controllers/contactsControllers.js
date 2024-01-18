const { HttpError } = require("../helpers/HttpError")

import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);   
  }
  catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch (error) {
    next(error);   
  }  
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    })
  }
  catch (error) {
    next(error);   
  }
  res.json({ message: 'template message' })
  
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
};

export const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
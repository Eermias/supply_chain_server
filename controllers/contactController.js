const contactService =
  require("../services/contactService");

const getContacts = async (req, res) => {

  try {

    const { supplierId } = req.params;

    const contacts =
      await contactService
        .getContactsBySupplierId(
          supplierId
        );

    res.json(contacts);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch contacts"
    });
  }
};

const getContact = async (req, res) => {

  try {

    const { id } = req.params;

    const contact =
      await contactService.getContactById(id);

    if (!contact) {

      return res.status(404).json({
        error: "Contact not found"
      });
    }

    res.json(contact);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch contact"
    });
  }
};

const createContact = async (req, res) => {

  try {

    const {
      supplier_id,
      name,
      phone,
      email,
      position
    } = req.body;

    const result =
      await contactService.createContact(
        supplier_id,
        name,
        phone,
        email,
        position
      );

    res.status(201).json({
      message: "Contact created",
      contactId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create contact"
    });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact
};
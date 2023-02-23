"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactRoutes = (0, express_1.Router)();
const contact_model_1 = require("../schemas/contact.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
contactRoutes.get('/create', (req, res) => {
    res.render("createContact");
});
contactRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const contactNew = new contact_model_1.Contact(req.body);
        const contact = await contactNew.save();
        if (contact) {
            res.redirect("/contacts/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
contactRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const contact = await contact_model_1.Contact.findOne({ _id: req.body.id });
        contact.fullname = req.body.fullname;
        contact.address = req.body.address;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        await contact.save();
        if (contact) {
            res.redirect("/contacts/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
contactRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query);
        let limit;
        let offset;
        if (!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        }
        else {
            limit = Number(req.query.limit);
            offset = Number(req.query.offset);
        }
        const contacts = await contact_model_1.Contact.find().limit(limit).skip(offset);
        res.render("listContact", { contacts: contacts });
    }
    catch (_a) {
        res.render("error");
    }
});
contactRoutes.get('/update/:id', async (req, res) => {
    try {
        const contact = await contact_model_1.Contact.findOne({ _id: req.params.id });
        console.log(contact, 'contact');
        if (contact) {
            res.render("updateContact", { contact: contact });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
contactRoutes.get('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const contact = await contact_model_1.Contact.findOne({ _id: req.params.id });
        if (contact) {
            await contact.remove();
            res.redirect("/contacts/list?offset=0&limit=3");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
exports.default = contactRoutes;
//# sourceMappingURL=contact.router.js.map
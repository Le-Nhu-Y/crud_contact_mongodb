import { Router } from 'express';
const contactRoutes = Router();
import { Contact } from "../schemas/contact.model";
import multer from 'multer';
const upload = multer();


contactRoutes.get('/create', (req, res) => {
    res.render("createContact");
});


contactRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const contactNew = new Contact(req.body);
        const contact = await contactNew.save();
        if (contact) {
            res.redirect("/contacts/list?offset=0&limit=3")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



contactRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.body.id });
        contact.fullname = req.body.fullname;
        contact.address = req.body.address;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        await contact.save();
        if (contact) {
            res.redirect("/contacts/list?offset=0&limit=3")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



contactRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query)
        let limit: number;
        let offset: number;
        if(!req.query.offset || !req.query.limit) {
            limit = 1;
            offset = 0;
        } else {
            limit = Number(req.query.limit as string);
            offset = Number(req.query.offset as string);
        }

        const contacts = await Contact.find().limit(limit).skip(offset);
        res.render("listContact", { contacts: contacts });
    } catch {
        res.render("error");
    }
});



contactRoutes.get('/update/:id', async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id });
        console.log(contact, 'contact')
        if (contact) {
            res.render("updateContact", {contact: contact})
        } else {
            res.render("error");
        }
    } catch (err) {

        res.render("error");
    }
});



contactRoutes.get('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id)
        const contact = await Contact.findOne({ _id: req.params.id });

        if (contact) {

            await contact.remove();

            res.redirect("/contacts/list?offset=0&limit=3")

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});





export default contactRoutes;

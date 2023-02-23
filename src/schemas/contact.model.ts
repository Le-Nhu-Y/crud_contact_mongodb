import {Schema,model} from "mongoose";

interface IContact{
    fullname:string;
    address:string;
    email:string;
    phone:string
}


const contactSchema = new Schema<IContact>({
    fullname:String,
    address:String,
    email:String,
    phone:String
})

const Contact=model<IContact>('Contact',contactSchema);
export {Contact};

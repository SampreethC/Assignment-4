const {Schema,model} =require('mongoose');

const dataSchema = new Schema({
        student_name:{
            type:String,
            required:true
        },
        Department:{
            type:String,
            required:true
        },
        phone_num:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true   
        }
    },
    {
    timestamps:true
    }
);

module.exports = model('Data',dataSchema); 
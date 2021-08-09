const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
require('./db');
const Data = require('./models/Data')
const init = async() => {
    const server = new Hapi.Server({
        port:3000,
        host:'localhost'
    });

    server.route({
        method:'POST',
        path:'/data',
        options:{
            validate:{
                payload:Joi.object({
                        student_name:Joi.string().min(5).max(20).required(),
                        Department:Joi.string().min(3).max(20).required(),
                        phone_num:string().length(10).pattern(/^[0-9]+$/).required(),
                        email: Joi.string().email({ tlds: { allow: false } })
                }),
                failAction:(request,h,error) => {
                    return error.isJoi
                    ?h.response(error.details[0]).takeover()
                    :h.response(error).takeover()
                }
            }
        },
        handler: async(request,h) =>{
            try{
                const data = new Data(request.payload);
                const dataSaved = await data.save();
                return h.response(dataSaved);
            }catch(error){
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method:'GET',
        path:'/data',
        handler: async(request,h) =>{
            try{
                const data = await Data.find();
                return h.response(data);
            }catch(error){
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method:'PUT',
        path:'/data/{id}',
        options:{
            validate:{
                payload:Joi.object({
                    student_name:Joi.string().min(5).max(20).required(),
                    Department:Joi.string().min(3).max(20).required(),
                    phone_num:string().length(10).pattern(/^[0-9]+$/).required(),
                    email: Joi.string().email({ tlds: { allow: false } })
                }),
                failAction:(request,h,error) => {
                    return error.isJoi
                    ?h.response(error.details[0]).takeover()
                    :h.response(error).takeover()
                }
            }
        },
        handler: async(request,h) =>{
            try{
                const updatedData = await Data.findByIdAndUpdate(request.params.id,request.payload,{new:true});
                return h.response(updatedData);
            }catch(error){
                return h.response(error).code(500);
            }
        }
    });

    server.route({
        method:'DELETE',
        path:'/data/{id}',
        handler: async(request,h) =>{
            try{
                const deletedData = await Data.findByIdAndDelete(request.params.id);
                return h.response(deletedData);
            }catch(error){
                return h.response(error).code(500);
            }
        }
    });

    await server.start();
    console.log(`server is running on ${server.info.uri}`)

};

init();
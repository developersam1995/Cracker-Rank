const Joi = require('joi');
module.exports = {
    validateBody: (schema) =>{ 
        return(req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }
            
            if(!req.value) {
                req.value = {};
            }
            req.value['body'] = result.value;
            next();
        }
    }, 
    
    schemas: {
        userSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            mobile: Joi.number().required(),
            type: Joi.string().required()
        }),
        
        userBusinessSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            mobile: Joi.number().required(),
            type: Joi.string().required(),
            companyName: Joi.string().required(),
            address: Joi.string().required()
        }),
        
        localLoginSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        
        testSchema: Joi.object().keys({
            companyId: Joi.string().required(),
            questionsId: Joi.array().required(),
            duration: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required()
        }),
        
        questionSchema: Joi.object().keys({
            title: Joi.string().required(),
            problemDescription: Joi.string().required(),
            exampleInputs: Joi.string().required(),
            exampleOutput: Joi.string().required(),
            testCases: Joi.array().required(),
            functionName: Joi.string().required(),
            paramNames: Joi.string().required()
        }),
    }
}
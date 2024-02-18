const commonResponse = require("../utils/commonResponse");
const commonError = require("../utils/commonError");
const { blogSchema } = require("../helper/validationSchema/blogSchema");
const { createBlogService, listBlogService, detailsBlogService } = require("../service/blogService");
const { OK, CREATED, BAD_REQUEST } = require("../utils/constants/httpCodes");
const { models } = require("../config/db/postgres/seqConfig");
const { Op } = require("sequelize");
const DataFrame = require("dataframe-js").DataFrame;

module.exports = {

    blogCreate: async (req, res, next) => {
        try {
            const { error, value } = blogSchema.validate(req.body, { abortEarly: false });
            if (error) {
                console.log("==================16",error.details);
                let dfErrorMsg = new DataFrame(error.details, ['message']);
                commonError({ message: dfErrorMsg.toCollection()[0].message, statusCode: BAD_REQUEST });
            }
            else {
                console.log("---------------------21",value);
                const createBlogServiceData = await createBlogService({value, req});
                const { data, status, message } = createBlogServiceData;
                commonResponse(req, data, status, message);
            }
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    blogDetails: async (req, res, next) => {
        try {
            const detailsBlogServiceData = await detailsBlogService(req.params.id);
            const { data, status, message } = detailsBlogServiceData;
            commonResponse(req, data, status, message);
            next();
        } catch (err) {
            next(err);
        }
    },

    blogList: async (req, res, next) => {
        try {
            const listBlogServiceData = await listBlogService({ req });
            const { data, status, message } = listBlogServiceData;
            commonResponse(req, data, status, message);
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

};

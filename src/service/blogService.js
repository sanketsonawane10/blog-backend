const moment = require("moment");
const { genericCreate, genericList, genericDetails } = require("../helper/generic/repositoryGeneric");
const { queryFilter } = require("../helper/generic/queryFilterGeneric");
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, } = require("../utils/constants/httpCodes");
const DataFrame = require("dataframe-js").DataFrame;
const { routePath } = require('../utils/constants/routePath');
const { Op } = require("sequelize");
const { models } = require("../config/db/postgres/seqConfig");
const sequelize = models.sequelize;
const { modelAttributes } = require('../utils/constants/modelAttributes');
const commonError = require('../utils/commonError');

module.exports = {

    createBlogService: async ({ value, req }) => {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let createBlogData = {};
            createBlogData = await genericCreate({ repoData: value, mainModel: models.blogModel });
            await models.sequelize.query(
                `REFRESH MATERIALIZED VIEW CONCURRENTLY blog_sch.blog_views`,
                { transaction }
            );
            await transaction.commit();
            return { data: createBlogData?.dataValues, status: CREATED, message: "Blog Created Successfully!" };
        } catch (err) {
            console.error("error", err);
            if (transaction) {
                await transaction.rollback();
            }
            throw err;
        }
    },

    listBlogService: async ({ req }) => {
        let { query: queryData, baseUrl } = req;
        let moduleName = baseUrl.slice(`${routePath}/`.length);
        queryData.modelAttributeName = moduleName;
        queryData.isLimitOffset = true;
        const queryFilterData = await queryFilter({ moduleName, queryData });
        const { rows, count } = await genericList(queryFilterData);
        if (rows?.length) {
            return ({ data: { count, rows }, status: OK, message: "Blog List!" });
        }
        commonError({ message: "Blog List Not Found", statusCode: NOT_FOUND, data: {} });

    },


};

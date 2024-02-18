const { models } = require('../../../config/db/postgres/seqConfig');
const { Op } = require('sequelize');

module.exports = {

    genericCreate: async ({ repoData, mainModel, transaction }) => {
        try {
            const genericCreateData = await mainModel.create({
                ...repoData
            }, { transaction });
            const result = { ...genericCreateData, ...genericCreateData.dataValues }
            return result;
        } catch (err) {
            throw err;
        }
    },

    genericList: async ({ mainModel, queryFilterData }) => {
        try {
            console.log("-------20",queryFilterData);
            const result =  await mainModel.findAndCountAll({
                ...queryFilterData
            });
            console.log("0----------==========23",result);
            return result;
        } catch (err) {
            console.error("error", err);
            throw err;
        }
    },

    genericDetails: async ({ mainModel, queryFilterData }) => {
        try {
            const result = await mainModel.findOne({
                ...queryFilterData
            });
            return { ...result, ...result?.dataValues }
        } catch (err) {
            console.error("error", err);
            throw err;
        }
    },


}
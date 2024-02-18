const { modelAttributes } = require('../../../utils/constants/modelAttributes');
const { sortDefault } = require('../../../utils/constants/sortDefault');
const { genericSearchPayload } = require('../../../utils/constants/searchModule');
const { models } = require('../../../config/db/postgres/seqConfig');
const sequelize = models.sequelize;
const { Op } = require('sequelize');

const queryFilter = async ({ moduleName, queryData }) => {
  try {
    let { filters, page, limit, attributes, modelAttributeName, sort, isLimitOffset, search } = queryData;
    // pages and limit
    page = parseInt(page) > 0 ? parseInt(page) - 1 : 0;
    limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
    let offset = page ? page * limit : 0;
    // sorting
    let sortData = [!sort ? sortDefault[modelAttributeName] : sort];
    if (sort) {
      let sortSplitData = sort.split(':');
      sortSplitData[1] = sortSplitData[1] === '1' ? 'ASC' : 'DESC';
      sortData[0] = sortSplitData;
    }

    // attributes
    let attributesData;
    if (attributes) {
      attributesData = modelAttributes[modelAttributeName].filter((item) =>
        attributes.split(',').includes(item)
      );
    }
    attributesData = attributesData && attributesData.length > 0 ? attributesData : modelAttributes[modelAttributeName + '_default'];

    //search
    const genericSearchPayloadData = await genericSearchPayload({ moduleName, search });
    if (genericSearchPayloadData) {
      filters = genericSearchPayloadData;
    }

    // filters
    let filterData;
    if (filters) {
      const queryMultipleFilterArray = filters.split(';');
      const queryMultipleFilterArrayData = queryMultipleFilterArray.map(
        (item, index) => {
          const queryFilterArray = item.split(':');
          let key = queryFilterArray[0];
          let filter = queryFilterArray[1];
          let value;
          switch (filter) {
            case 'in':
              value = queryFilterArray[2].split(',');
              break;
            case 'between':
              value = queryFilterArray[2].split(',');
              break;
            case 'iLike':
              value = queryFilterArray[2] + '%';
              break;
            default:
              value = queryFilterArray[2];
          }

          let filterObj = {};

          if (filter === "iLikeEnum") {
            if (filterData) {
              filterData = {
                ...filterData,
                [Op.or]: [
                  sequelize.where(
                    sequelize.fn('LOWER', sequelize.cast(sequelize.col(key), 'TEXT')),
                    { [Op.iLike]: `%${value}%` }
                  )
                ]
              }
            }
          }

          filterObj[key] = { [Op[filter]]: value };
          return filterObj;
        }
      );
      if (genericSearchPayloadData) {
        filterData = { [Op.or]: [...queryMultipleFilterArrayData] };
      } else {
        filterData = { [Op.and]: [...queryMultipleFilterArrayData] };
      }
    }

    let queryFilterData = {
      where: { ...filterData },
      order: [sortData],
      attributes: attributesData,
    };

    console.log("--------------95",isLimitOffset);
    console.log("--------------96",limit);
    console.log("--------------97",offset);

    if (isLimitOffset) {
      queryFilterData.limit = limit;
      queryFilterData.offset = offset;
    }



    const mainModel = models[`${moduleName}ViewModel`];

    return { mainModel, queryFilterData };
  } catch (err) {
  }
};


module.exports = {
  queryFilter
};

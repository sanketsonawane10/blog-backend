module.exports = {

    genericSearchPayload: async ({ moduleName, search }) => {

        const searchPayload = {
            blog: `title:iLike:${search};content:iLike:${search}`,
        }

        return search ? searchPayload[moduleName] : null;

    }

}
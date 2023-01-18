const { getTag } = require('./utils')

class Config {
    constructor() {
        const {
            PLUGIN_YC_API_KEY,
            PLUGIN_YC_SERVICE_ACCOUNT_ID,
            PLUGIN_YC_KEY_ID,
            DRONE_SOURCE_BRANCH,

            PLUGIN_DB_CLUSTER_ID,
            PLUGIN_DB_USER,
            PLUGIN_DB_HOST,
            PLUGIN_DB_PORT = 5432,
            PLUGIN_DB_PASSWORD,
            PLUGIN_RESTORE_DB_NAME,
            PLUGIN_IS_TEST_DB,
        } = process.env

        this.yc = {
            apiKey: PLUGIN_YC_API_KEY,
            serviceAccountId: PLUGIN_YC_SERVICE_ACCOUNT_ID,
            keyId: PLUGIN_YC_KEY_ID,

            audience: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
        }
        this.tag = getTag(DRONE_SOURCE_BRANCH)

        this.db = {
            name: this.tag,

            clusterId: PLUGIN_DB_CLUSTER_ID,
            user: PLUGIN_DB_USER,
            host: PLUGIN_DB_HOST,
            port: PLUGIN_DB_PORT,
            password: PLUGIN_DB_PASSWORD,
            restore_db_name: PLUGIN_RESTORE_DB_NAME,
            is_test_db: PLUGIN_IS_TEST_DB,
        }
    }
}

module.exports = Config

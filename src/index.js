
const get = require('lodash/get')
const set = require('lodash/set')
const mergeWith = require('lodash/mergeWith')


const Config = class {
    constructor (_config = {}) {
        this._config = _config
    }

    /**
     * Update in memory value of the pre-loaded config
     *
     * @example
     * ```js
     * Config.set('database.pg', {
     *  host: '127.0.0.1',
     *  ...
     * })
     * ```
     *
     * @param {String} key
     * @param {Any} value
     */
    set (key, value) {
        set(this._config, key, value)
    }

    /**
     * Read value from the pre-loaded config. Make use of the `dot notation`
     * syntax to read nested values.
     *
     * The `defaultValue` is returned when original value is `undefined`.
     *
     * @example
     * ```js
     * Config.get('database.pg.host')
     * ```
     *
     * @param {String} key
     * @param {Any} defaultValue
     */
    get (key, defaultValue) {
        return get(this._config, key, defaultValue)
    }

    /**
     * Fetch and merge an object to the existing config. This method is useful
     * when you are fetching an object from the config and want to merge
     * it with some default values.
     *
     * An optional customizer can be passed to customize the merge operation.
     * The function is directly passed to [lodash.mergeWith](https://lodash.com/docs/4.17.11#mergeWith)
     * method.
     *
     * @example
     * ```js
     * // Config inside the file will be merged with the given object
     *
     * Config.merge('database.pg', {
     *   host: 'localhost',
     *   port: 5432
     * })
     * ```
     *
     * @param {String} key
     * @param {Object} defaultValues
     * @param {Function} [customizer]
     */
    merge (key, defaultValues, customizer) {
        return mergeWith(defaultValues, this.get(key), customizer)
    }
}


module.exports = Config

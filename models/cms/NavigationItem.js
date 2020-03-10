// Use symbols for private attributes
const _fields = Symbol('fields');

const parseUrl = url => url.split('/').filter((item,index) => index > 2).join('/');

export default class NavigationItem {
    /**
     * The page constructor
     *
     * @param {Object} data  The object to parse into the model.
     */
    constructor (data) {        
        this[_fields] = data;
    }

    /**
     * Getter for a CMS navigation id
     *
     * @return  {String}
     */
    get id () {
        return this[_fields].ID;
    }

    /**
     * Getter for a CMS navigation title
     *
     * @return  {String}
     */
    get title () {
        return this[_fields].title.toLowerCase();
    }

    /**
     * Getter for a CMS navigation link
     *
     * @return  {String}
     */
    get link () {
        return parseUrl(this[_fields].url);
    }
};

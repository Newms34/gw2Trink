const storage = {
    set: function (k, v, o) {
        if (typeof v == 'object') {
            v = JSON.stringify(v);
        }
        if (typeof k != 'string') {
            throw new Error('Storage key must be a string value!')
        }
        if (!o && localStorage.getItem(k)) {
            throw new Error('Must specify overwrite parameter, or choose a different key!')
        }
        localStorage.setItem(k, v)
    },
    get: function (k) {
        return localStorage.getItem(k)
    },
    delete: function (k) {
        delete localStorage[k]
    }
};
// module.exports=storage;
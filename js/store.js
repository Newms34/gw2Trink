//  class Storage {
//     setStore(k, v, o) {
//         if (typeof v == 'object') {
//             v = JSON.stringify(v);
//         }
//         if (typeof k != 'string') {
//             throw new Error('Storage key must be a string value!')
//         }
//         if (!o && localStorage.getItem(k)) {
//             throw new Error('Must specify overwrite parameter, or choose a different key!')
//         }
//         localStorage.setItem(k, v)
//     }
//     getStore(k) {
//         return localStorage.getItem(k)
//     }
//     deleteStore(k) {
//         delete localStorage[k]
//     }
// };

function setStore(k, v, o) {
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
}
function getStore(k) {
    return localStorage.getItem(k)
}
function deleteStore(k) {
    delete localStorage[k]
}
export {setStore,getStore,deleteStore}
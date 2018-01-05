const db = require('../db');
const error = require('../utils/error');

module.exports = {
	/**
	 * [checkUnique description]
	 * @param  {String}                     collection  Name of the collection
	 * @param  {String}                     field       Name of the field in the collection
	 * @param  {Object || String || Array}  value       [description]
	 * @return {Boolean || Throw error}                 If error not thrown, true is returned
	 */
	async checkDocumentIsUnique(collection, field, value) {
	  const dbase = db.get();
	  const data = {[field]: value};
	  try {
	    const count = await dbase.collection(collection).find(data).count();
	    if(count === 0) return true;
	    throw error.documentUnique;
	  } catch (err) {
	    throw err;
	  }
	}
}

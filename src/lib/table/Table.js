/**
 * Table module.
 * @module lib/table/Table
 */

/**
 * Table object constructor.
 * @constructor
 * @param {string} dimensions - The dimensions for the table.
 */
function Table(dimensions) {

    if (!(this instanceof Table)) {
        return new Table(dimensions);
    }

    this.length = dimensions.defaultLength; 
    this.width = dimensions.defaultWidth;     
}

/**
 * Resize the table.
 * @param {number} newWidth - The new width of the table.
 * @param {number} newLength - The new length of the table.
 */
Table.prototype.setDimensions = function(newWidth, newLength) {

    if (newLength > 0) {
        this.length = newLength;
    }
    if (newWidth > 0) {
        this.width = newWidth;
    }
};

/**
 * @return {number} The length of the table.
 */
Table.prototype.getLength = function() {

    return this.length;
};

/**
 * @return {number} The width of the table.
 */
Table.prototype.getWidth = function() {

    return this.width;
};

module.exports = {
    Table
};
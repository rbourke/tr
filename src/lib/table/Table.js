function Table(dimensions) {

    if (!(this instanceof Table)) {
        return new Table(dimensions);
    }

    this.length = dimensions.defaultLength; 
    this.width = dimensions.defaultWidth;     
}

Table.prototype.setDimensions = function(newWidth, newLength) {

    if (newLength > 0) {
        this.length = newLength;
    }
    if (newWidth > 0) {
        this.width = newWidth;
    }
};

Table.prototype.getLength = function() {

    return this.length;
};

Table.prototype.getWidth = function() {

    return this.width;
};

module.exports = {
    Table
};
const config = require('../../config/properties.json');
let table = new (require('../../lib/table/Table.js')).Table(config.table.dimensions);

it('accepts valid dimensions', () => {
    table.setDimensions(5, 5);
    expect(table.getLength()).toBe(5);
    expect(table.getWidth()).toBe(5);
});

it('ignores invalid dimensions', () => {
    table.setDimensions(-1, -1);
    expect(table.getLength()).not.toBe(-1);
    expect(table.getWidth()).not.toBe(-1);
});

it('always creates a new table', () => {
    let table = (require('../../lib/table/Table.js')).Table(config.table.dimensions);
    expect(table).toBeInstanceOf((require('../../lib/table/Table.js')).Table);
});

var fl = require('fantasy-land');
var List = require('../src/List');

describe('List', function() {
  it('should correctly handle equality', function() {
    expect(List()[fl.equals](List())).toBe(true);
    expect(List()[fl.equals](List(1))).toBe(false);
    expect(List(1)[fl.equals](List(1))).toBe(true);

    expect(List(1, 2, 3, 4)[fl.equals](List(1, 2, 3, 4))).toBe(true);
    expect(List(1, 2, 3, 4)[fl.equals](List(2, 3, 4, 1))).toBe(false);
    expect(List(1, 2, 3, 4)[fl.equals](List(1, 2, 3, 5))).toBe(false);
  });
});


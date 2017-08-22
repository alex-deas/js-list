var List = require('../src/List');

describe('List', function() {
  it('should correctly handle equality', function() {
    expect(List().equals(List())).toBe(true);
    expect(List().equals(List(1))).toBe(false);
    expect(List(1).equals(List(1))).toBe(true);

    expect(List(1, 2, 3, 4).equals(List(1, 2, 3, 4))).toBe(true);
    expect(List(1, 2, 3, 4).equals(List(2, 3, 4, 1))).toBe(false);
    expect(List(1, 2, 3, 4).equals(List(1, 2, 3, 5))).toBe(false);
  });
});


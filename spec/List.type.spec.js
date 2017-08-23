var List = require('../src/List');

describe('List', function() {
  it('should implement the Identity specification', function() {
    var x = List();
    var y = List(1);
    var z = List(1, 2, 3, 4);

    expect(x.id().equals(x)).toBe(true);
    expect(y.id().equals(y)).toBe(true);
    expect(z.id().equals(z)).toBe(true);
  });

  it('should be a Setoid', function() {
    var x = List(1, 2, 3, 4);
    var y = List(1, 2, 3, 4);
    var z = List(1, 2, 3, 4);
    // reflexivity
    expect(x.equals(x)).toBe(true);

    // symmetry
    expect(x.equals(y)).toEqual(y.equals(x));

    // transitivity
    expect(y.equals(z)).toEqual(x.equals(z));
  });

  it('should be a Semigroup', function() {
    var x = List(1).concat(List(2)).concat(List(3));
    var y = List(1).concat(List(2).concat(List(3)));

    expect(x.equals(y)).toBe(true);
  });

  it('should be a Functor', function() {
    var x = List(1, 2, 3, 4);

    // identity
    expect(x.map(a => a).equals(x)).toBe(true);

    // composition
    const f = x => x + 1;
    const g = x => x * 2;
    expect(x.map(x => f(g(x))).equals(x.map(g).map(f))).toBe(true);
  });

  it('should be a Foldable', function() {
    var xs = List("foo", "bar", "baz", "bang");
    expect(xs.reduce((acc, x) => acc.concat([x]), [])).toEqual(["foo", "bar", "baz", "bang"]);
  })
});


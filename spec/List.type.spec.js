var fl = require('fantasy-land');
var List = require('../src/List');

describe('List', function() {
  it('should implement the Identity specification', function() {
    var x = List();
    var y = List(1);
    var z = List(1, 2, 3, 4);

    expect(x[fl.id]()[fl.equals](x)).toBe(true);
    expect(y[fl.id]()[fl.equals](y)).toBe(true);
    expect(z[fl.id]()[fl.equals](z)).toBe(true);
  });

  it('should be a Setoid', function() {
    var x = List(1, 2, 3, 4);
    var y = List(1, 2, 3, 4);
    var z = List(1, 2, 3, 4);
    // reflexivity
    expect(x[fl.equals](x)).toBe(true);

    // symmetry
    expect(x[fl.equals](y)).toEqual(y[fl.equals](x));

    // transitivity
    expect(y[fl.equals](z)).toEqual(x[fl.equals](z));
  });

  it('should be a Semigroup', function() {
    var x = List(1)[fl.concat](List(2))[fl.concat](List(3));
    var y = List(1)[fl.concat](List(2)[fl.concat](List(3)));

    expect(x[fl.equals](y)).toBe(true);
  });

  it('should be a Functor', function() {
    var x = List(1, 2, 3, 4);

    // identity
    expect(x[fl.map](a => a)[fl.equals](x)).toBe(true);

    // composition
    const f = x => x + 1;
    const g = x => x * 2;
    expect(x[fl.map](x => f(g(x)))[fl.equals](x[fl.map](g)[fl.map](f))).toBe(true);
  });

  it('should be a Foldable', function() {
    var xs = List("foo", "bar", "baz", "bang");
    expect(xs[fl.reduce]((acc, x) => acc.concat([x]), [])).toEqual(["foo", "bar", "baz", "bang"]);
  })
});


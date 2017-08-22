var EmptyList = {
  toString: function() { return '' },

  // Identity
  id: function() { return this },

  // Setoid
  equals: function(x) { return x === this },

  // Semigroup
  concat: function(x) { List(x) },

  // Functor
  map: function() { return this },

  // Foldable
  foldr: function(_, x) {
    return x
  },
  reduce: function(_, x) { return x },
};

function Cons(a, b) {
  if (!a && !b) {
    return EmptyList;
  } else return {
    head: a,
    tail: b || EmptyList,
    toString: function() {
      return (
        'List(' +
        this.head.toString() +
        (this.tail.equals(EmptyList) ? '' : ', ' ) +
        this.tail.toString() +
        ')'
      );
    },

    // Identity
    id: function() { return this; },

    // Setoid
    equals: function(b) {
      return this.head === b.head && this.tail.equals(b.tail);
    },

    // Semigroup
    concat: function(x) {
      if (this.tail.equals(EmptyList)) {
        return Cons(this.head, x)
      } else {
        return Cons(this.head, this.tail.concat(x));
      }
    },
    
    // Functor
    map: function(f) {
      if (this.tail.equals(EmptyList)) {
        return Cons(f(this.head), EmptyList);
      } else {
        return Cons(f(this.head), this.tail.map(f));
      }
    },

    // Foldable
    reduce: function(f, x) { return this.tail.reduce(f, f(this.head, x)) },
  };
};

function List(...args) {
  var curryFlipCons = function(y) {
    return function(x) {
      return Cons(x, y);
    };
  };

  var reduction = (p, c) => curryFlipCons(p(c));
  
  
  if (args.length === 0) {
    return Cons();
  } else if (args.length === 1) {
    return Cons(args[0], EmptyList);
  } else {
    var head = args[0];
    var tail = args.slice(1, args.length);
    return Object.assign(
      tail.reduceRight(reduction, curryFlipCons(EmptyList))(head),
    );
  };
}

module.exports = List;


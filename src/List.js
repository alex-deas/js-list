var fl = require('fantasy-land');

var snd = function (_, x) { return x };

var EmptyList = {
  toString: function() { return '' },

  // Identity
  [fl.id]: function() { return this },

  // Setoid
  [fl.equals]: function(x) { return x === this },

  // Semigroup
  [fl.concat]: function(x) { List(x) },

  // Functor
  [fl.map]: function() { return this },

  // Foldable
  foldr: snd,
  foldl: snd,
  [fl.reduce]: snd,
};

function Cons(a, b) {
  if (!a) {
    return EmptyList;
  } else return {
    head: a,
    tail: b || EmptyList,
    toString: function() {
      return (
        'List(' +
        this.head.toString() +
        (this.tail[fl.equals](EmptyList) ? '' : ', ' ) +
        this.tail.toString() +
        ')'
      );
    },

    // Identity
    [fl.id]: function() { return this; },

    // Setoid
    [fl.equals]: function(b) {
      return this.head === b.head && this.tail[fl.equals](b.tail);
    },

    // Semigroup
    [fl.concat]: function(x) {
      if (this.tail[fl.equals](EmptyList)) {
        return Cons(this.head, x)
      } else {
        return Cons(this.head, this.tail[fl.concat](x));
      }
    },
    
    // Functor
    [fl.map]: function(f) {
      if (this.tail[fl.equals](EmptyList)) {
        return Cons(f(this.head), EmptyList);
      } else {
        return Cons(f(this.head), this.tail[fl.map](f));
      }
    },

    // Foldable
    foldr: function(f, x) { return this.tail.foldr(f, f(x, this.head)) },
    foldl: function(f, x) { return f(this.tail.foldl(f, x), this.head) },
    [fl.reduce]: function(f, x) { return this.tail[fl.reduce](f, f(x, this.head))},
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
    return Cons(args[0]);
  } else {
    var head = args[0];
    var tail = args.slice(1, args.length);
    return Object.assign(
      tail.reduceRight(reduction, curryFlipCons(EmptyList))(head),
    );
  };
}

module.exports = List;


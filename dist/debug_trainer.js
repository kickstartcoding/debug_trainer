// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../elm/Main.elm":[function(require,module,exports) {
(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEBUG mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return $elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return $elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? $elm$core$Result$Ok(value)
				: (value instanceof String)
					? $elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return $elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Model$SavedData$DecodingFailed = function (a) {
	return {$: 'DecodingFailed', a: a};
};
var $author$project$Model$SavedData$FileMissing = {$: 'FileMissing'};
var $author$project$Model$SavedData$SavedData = function (changedFiles) {
	return {changedFiles: changedFiles};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $miniBill$elm_codec$Codec$Codec = function (a) {
	return {$: 'Codec', a: a};
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $miniBill$elm_codec$Codec$buildObject = function (_v0) {
	var om = _v0.a;
	return $miniBill$elm_codec$Codec$Codec(
		{
			decoder: om.decoder,
			encoder: function (v) {
				return $elm$json$Json$Encode$object(
					om.encoder(v));
			}
		});
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $miniBill$elm_codec$Codec$composite = F3(
	function (enc, dec, _v0) {
		var codec = _v0.a;
		return $miniBill$elm_codec$Codec$Codec(
			{
				decoder: dec(codec.decoder),
				encoder: enc(codec.encoder)
			});
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $miniBill$elm_codec$Codec$dict = A2(
	$miniBill$elm_codec$Codec$composite,
	function (e) {
		return A2(
			$elm$core$Basics$composeL,
			A2($elm$core$Basics$composeL, $elm$json$Json$Encode$object, $elm$core$Dict$toList),
			$elm$core$Dict$map(
				function (_v0) {
					return e;
				}));
	},
	$elm$json$Json$Decode$dict);
var $miniBill$elm_codec$Codec$ObjectCodec = function (a) {
	return {$: 'ObjectCodec', a: a};
};
var $miniBill$elm_codec$Codec$decoder = function (_v0) {
	var m = _v0.a;
	return m.decoder;
};
var $miniBill$elm_codec$Codec$encoder = function (_v0) {
	var m = _v0.a;
	return m.encoder;
};
var $elm$json$Json$Decode$map2 = _Json_map2;
var $miniBill$elm_codec$Codec$field = F4(
	function (name, getter, codec, _v0) {
		var ocodec = _v0.a;
		return $miniBill$elm_codec$Codec$ObjectCodec(
			{
				decoder: A3(
					$elm$json$Json$Decode$map2,
					F2(
						function (f, x) {
							return f(x);
						}),
					ocodec.decoder,
					A2(
						$elm$json$Json$Decode$field,
						name,
						$miniBill$elm_codec$Codec$decoder(codec))),
				encoder: function (v) {
					return A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							name,
							A2(
								$miniBill$elm_codec$Codec$encoder,
								codec,
								getter(v))),
						ocodec.encoder(v));
				}
			});
	});
var $author$project$Model$SavedData$FileData = F3(
	function (originalContent, change, hintsGiven) {
		return {change: change, hintsGiven: hintsGiven, originalContent: originalContent};
	});
var $author$project$Model$SavedData$Change = F2(
	function (replacementData, breakType) {
		return {breakType: breakType, replacementData: replacementData};
	});
var $author$project$Utils$Types$BreakType$CaseSwap = {$: 'CaseSwap'};
var $author$project$Utils$Types$BreakType$ChangeFunctionArgs = {$: 'ChangeFunctionArgs'};
var $author$project$Utils$Types$BreakType$RemoveParenthesis = {$: 'RemoveParenthesis'};
var $author$project$Utils$Types$BreakType$RemoveReturn = {$: 'RemoveReturn'};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $miniBill$elm_codec$Codec$buildCustom = function (_v0) {
	var am = _v0.a;
	return $miniBill$elm_codec$Codec$Codec(
		{
			decoder: A2(
				$elm$json$Json$Decode$andThen,
				function (tag) {
					var _v1 = A2($elm$core$Dict$get, tag, am.decoder);
					if (_v1.$ === 'Nothing') {
						return $elm$json$Json$Decode$fail('tag ' + (tag + 'did not match'));
					} else {
						var dec = _v1.a;
						return A2($elm$json$Json$Decode$field, 'args', dec);
					}
				},
				A2($elm$json$Json$Decode$field, 'tag', $elm$json$Json$Decode$string)),
			encoder: function (v) {
				return am.match(v);
			}
		});
};
var $miniBill$elm_codec$Codec$CustomCodec = function (a) {
	return {$: 'CustomCodec', a: a};
};
var $miniBill$elm_codec$Codec$custom = function (match) {
	return $miniBill$elm_codec$Codec$CustomCodec(
		{decoder: $elm$core$Dict$empty, match: match});
};
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $miniBill$elm_codec$Codec$variant = F4(
	function (name, matchPiece, decoderPiece, _v0) {
		var am = _v0.a;
		var enc = function (v) {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'tag',
						$elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'args',
						A2($elm$json$Json$Encode$list, $elm$core$Basics$identity, v))
					]));
		};
		return $miniBill$elm_codec$Codec$CustomCodec(
			{
				decoder: A3($elm$core$Dict$insert, name, decoderPiece, am.decoder),
				match: am.match(
					matchPiece(enc))
			});
	});
var $miniBill$elm_codec$Codec$variant0 = F2(
	function (name, ctor) {
		return A3(
			$miniBill$elm_codec$Codec$variant,
			name,
			function (c) {
				return c(_List_Nil);
			},
			$elm$json$Json$Decode$succeed(ctor));
	});
var $author$project$Utils$Types$BreakType$codec = $miniBill$elm_codec$Codec$buildCustom(
	A3(
		$miniBill$elm_codec$Codec$variant0,
		'ChangeFunctionArgs',
		$author$project$Utils$Types$BreakType$ChangeFunctionArgs,
		A3(
			$miniBill$elm_codec$Codec$variant0,
			'RemoveParenthesis',
			$author$project$Utils$Types$BreakType$RemoveParenthesis,
			A3(
				$miniBill$elm_codec$Codec$variant0,
				'RemoveReturn',
				$author$project$Utils$Types$BreakType$RemoveReturn,
				A3(
					$miniBill$elm_codec$Codec$variant0,
					'CaseSwap',
					$author$project$Utils$Types$BreakType$CaseSwap,
					$miniBill$elm_codec$Codec$custom(
						F5(
							function (caseSwap, removeReturn, removeParenthesis, changeFunctionArgs, value) {
								switch (value.$) {
									case 'CaseSwap':
										return caseSwap;
									case 'RemoveReturn':
										return removeReturn;
									case 'RemoveParenthesis':
										return removeParenthesis;
									default:
										return changeFunctionArgs;
								}
							})))))));
var $author$project$Utils$Types$ReplacementData$ReplacementData = F2(
	function (originalContent, newContent) {
		return {newContent: newContent, originalContent: originalContent};
	});
var $author$project$Utils$Types$ReplacementData$ContentData = F3(
	function (start, end, content) {
		return {content: content, end: end, start: start};
	});
var $miniBill$elm_codec$Codec$build = F2(
	function (encoder_, decoder_) {
		return $miniBill$elm_codec$Codec$Codec(
			{decoder: decoder_, encoder: encoder_});
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Encode$int = _Json_wrap;
var $miniBill$elm_codec$Codec$int = A2($miniBill$elm_codec$Codec$build, $elm$json$Json$Encode$int, $elm$json$Json$Decode$int);
var $miniBill$elm_codec$Codec$object = function (ctor) {
	return $miniBill$elm_codec$Codec$ObjectCodec(
		{
			decoder: $elm$json$Json$Decode$succeed(ctor),
			encoder: function (_v0) {
				return _List_Nil;
			}
		});
};
var $miniBill$elm_codec$Codec$string = A2($miniBill$elm_codec$Codec$build, $elm$json$Json$Encode$string, $elm$json$Json$Decode$string);
var $author$project$Utils$Types$ReplacementData$contentDataCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'content',
		function ($) {
			return $.content;
		},
		$miniBill$elm_codec$Codec$string,
		A4(
			$miniBill$elm_codec$Codec$field,
			'end',
			function ($) {
				return $.end;
			},
			$miniBill$elm_codec$Codec$int,
			A4(
				$miniBill$elm_codec$Codec$field,
				'start',
				function ($) {
					return $.start;
				},
				$miniBill$elm_codec$Codec$int,
				$miniBill$elm_codec$Codec$object($author$project$Utils$Types$ReplacementData$ContentData)))));
var $author$project$Utils$Types$ReplacementData$codec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'newContent',
		function ($) {
			return $.newContent;
		},
		$author$project$Utils$Types$ReplacementData$contentDataCodec,
		A4(
			$miniBill$elm_codec$Codec$field,
			'originalContent',
			function ($) {
				return $.originalContent;
			},
			$author$project$Utils$Types$ReplacementData$contentDataCodec,
			$miniBill$elm_codec$Codec$object($author$project$Utils$Types$ReplacementData$ReplacementData))));
var $author$project$Model$SavedData$changeCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'breakType',
		function ($) {
			return $.breakType;
		},
		$author$project$Utils$Types$BreakType$codec,
		A4(
			$miniBill$elm_codec$Codec$field,
			'replacementData',
			function ($) {
				return $.replacementData;
			},
			$author$project$Utils$Types$ReplacementData$codec,
			$miniBill$elm_codec$Codec$object($author$project$Model$SavedData$Change))));
var $author$project$Model$SavedData$fileDataCodec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'hintsGiven',
		function ($) {
			return $.hintsGiven;
		},
		$miniBill$elm_codec$Codec$int,
		A4(
			$miniBill$elm_codec$Codec$field,
			'change',
			function ($) {
				return $.change;
			},
			$author$project$Model$SavedData$changeCodec,
			A4(
				$miniBill$elm_codec$Codec$field,
				'originalContent',
				function ($) {
					return $.originalContent;
				},
				$miniBill$elm_codec$Codec$string,
				$miniBill$elm_codec$Codec$object($author$project$Model$SavedData$FileData)))));
var $author$project$Model$SavedData$codec = $miniBill$elm_codec$Codec$buildObject(
	A4(
		$miniBill$elm_codec$Codec$field,
		'changedFiles',
		function ($) {
			return $.changedFiles;
		},
		$miniBill$elm_codec$Codec$dict($author$project$Model$SavedData$fileDataCodec),
		$miniBill$elm_codec$Codec$object($author$project$Model$SavedData$SavedData)));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $miniBill$elm_codec$Codec$decodeString = function (codec) {
	return $elm$json$Json$Decode$decodeString(
		$miniBill$elm_codec$Codec$decoder(codec));
};
var $author$project$Model$SavedData$fromFlag = function (maybeDataString) {
	if (maybeDataString.$ === 'Just') {
		var string = maybeDataString.a;
		var _v1 = A2($miniBill$elm_codec$Codec$decodeString, $author$project$Model$SavedData$codec, string);
		if (_v1.$ === 'Ok') {
			var savedData = _v1.a;
			return $elm$core$Result$Ok(savedData);
		} else {
			var error = _v1.a;
			return $elm$core$Result$Err(
				$author$project$Model$SavedData$DecodingFailed(
					$elm$json$Json$Decode$errorToString(error)));
		}
	} else {
		return $elm$core$Result$Err($author$project$Model$SavedData$FileMissing);
	}
};
var $author$project$Utils$Types$FilePath$FilePath = function (a) {
	return {$: 'FilePath', a: a};
};
var $author$project$Utils$Types$FilePath$fromString = function (string) {
	return $author$project$Utils$Types$FilePath$FilePath(string);
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Utils$Types$FilePath$toString = function (_v0) {
	var string = _v0.a;
	return string;
};
var $author$project$Model$SavedData$errorMessage = F2(
	function (dataFilePath, error) {
		if (error.$ === 'FileMissing') {
			return '\n\n' + ('Could not find any save data at ' + ($author$project$Utils$Types$FilePath$toString(dataFilePath) + ('. That file is where debug_trainer stores data on what files it has changed.' + (' Without it, this feature won\'t work.' + '\n\n'))));
		} else {
			var reason = error.a;
			return '\n\n' + ('Unable to parse the saved data file at ' + ($author$project$Utils$Types$FilePath$toString(dataFilePath) + ('. Here is the error it gave:\n\n' + (reason + ('\n\nThe save file at ' + ($author$project$Utils$Types$FilePath$toString(dataFilePath) + (' may be broken. If this error persists, try deleting ' + ($author$project$Utils$Types$FilePath$toString(dataFilePath) + (' and then running debug_trainer again.' + '\n\n')))))))));
		}
	});
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$Utils$Types$FilePath$walkTree = F2(
	function (workingDirectory, filepath) {
		var workingDirectoryDirs = A2($elm$core$String$split, '/', workingDirectory);
		var navCount = $elm$core$List$length(
			A2($elm$core$String$split, '../', filepath)) - 1;
		var newFilePath = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$drop,
				navCount,
				A2($elm$core$String$split, '../', filepath)));
		var newWorkingDirectory = A2(
			$elm$core$String$join,
			'/',
			$elm$core$List$reverse(
				A2(
					$elm$core$List$drop,
					navCount,
					$elm$core$List$reverse(workingDirectoryDirs))));
		return newWorkingDirectory + ('/' + newFilePath);
	});
var $author$project$Utils$Types$FilePath$fullPath = F2(
	function (workingDirectory, _v0) {
		var filepath = _v0.a;
		return A2($elm$core$String$startsWith, workingDirectory, filepath) ? $author$project$Utils$Types$FilePath$FilePath(filepath) : (A2($elm$core$String$startsWith, './', filepath) ? $author$project$Utils$Types$FilePath$FilePath(
			workingDirectory + ('/' + A2($elm$core$String$dropLeft, 2, filepath))) : (A2($elm$core$String$startsWith, '../', filepath) ? $author$project$Utils$Types$FilePath$FilePath(
			A2($author$project$Utils$Types$FilePath$walkTree, workingDirectory, filepath)) : $author$project$Utils$Types$FilePath$FilePath(workingDirectory + ('/' + filepath))));
	});
var $author$project$Model$SavedData$fullPathString = F2(
	function (workingDirectory, filepath) {
		return $author$project$Utils$Types$FilePath$toString(
			A2($author$project$Utils$Types$FilePath$fullPath, workingDirectory, filepath));
	});
var $author$project$Model$SavedData$getFileData = F2(
	function (_v0, savedData) {
		var filepath = _v0.filepath;
		var workingDirectory = _v0.workingDirectory;
		return A2(
			$elm$core$Dict$get,
			A2($author$project$Model$SavedData$fullPathString, workingDirectory, filepath),
			savedData.changedFiles);
	});
var $author$project$Ports$printAndExitFailure = _Platform_outgoingPort('printAndExitFailure', $elm$json$Json$Encode$string);
var $author$project$Utils$Cmd$fromFileData = function (_v0) {
	var filepath = _v0.filepath;
	var model = _v0.model;
	var dataPresentCmdFunc = _v0.dataPresentCmdFunc;
	var dataAbsentCmd = _v0.dataAbsentCmd;
	var _v1 = model.savedDataResult;
	if (_v1.$ === 'Ok') {
		var savedData = _v1.a;
		var _v2 = A2(
			$author$project$Model$SavedData$getFileData,
			{filepath: filepath, workingDirectory: model.workingDirectory},
			savedData);
		if (_v2.$ === 'Just') {
			var fileData = _v2.a;
			return A2(dataPresentCmdFunc, savedData, fileData);
		} else {
			return dataAbsentCmd;
		}
	} else {
		if (_v1.a.$ === 'FileMissing') {
			var _v3 = _v1.a;
			return dataAbsentCmd;
		} else {
			var error = _v1.a;
			return $author$project$Ports$printAndExitFailure(
				A2($author$project$Model$SavedData$errorMessage, model.dataFilePath, error));
		}
	}
};
var $author$project$Ports$print = _Platform_outgoingPort('print', $elm$json$Json$Encode$string);
var $author$project$Ports$printAndExitSuccess = _Platform_outgoingPort('printAndExitSuccess', $elm$json$Json$Encode$string);
var $author$project$Ports$readFile = _Platform_outgoingPort('readFile', $elm$json$Json$Encode$string);
var $author$project$Commands$Break$Cmd$init = F2(
	function (filepath, model) {
		return $author$project$Utils$Cmd$fromFileData(
			{
				dataAbsentCmd: $elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							$author$project$Ports$print(
							'\n\n' + ('Breaking ' + ($author$project$Utils$Types$FilePath$toString(filepath) + ('...' + '\n\n')))),
							$author$project$Ports$readFile(
							$author$project$Utils$Types$FilePath$toString(filepath))
						])),
				dataPresentCmdFunc: F2(
					function (_v0, _v1) {
						return $author$project$Ports$printAndExitSuccess(
							'\n\n' + ($author$project$Utils$Types$FilePath$toString(filepath) + (' has already had a change introduced to it. ' + ('Try fixing that change before breaking it again. ' + ('To get a hint, run:\n\ndebug_trainer hint ' + ($author$project$Utils$Types$FilePath$toString(filepath) + '\n\n'))))));
					}),
				filepath: filepath,
				model: model
			});
	});
var $author$project$Utils$Messages$withNewlineBuffers = function (string) {
	return '\n\n' + (string + '\n\n');
};
var $author$project$Utils$Messages$noRecordOfChangeMessage = function (filepath) {
	return $author$project$Utils$Messages$withNewlineBuffers(
		'debug_trainer has no record of ' + ($author$project$Utils$Types$FilePath$toString(filepath) + ' being changed. Either it has never been changed or the changes that were made have been reverted'));
};
var $author$project$Commands$Explain$Cmd$init = F2(
	function (filepath, model) {
		return $author$project$Utils$Cmd$fromFileData(
			{
				dataAbsentCmd: $author$project$Ports$printAndExitSuccess(
					$author$project$Utils$Messages$noRecordOfChangeMessage(filepath)),
				dataPresentCmdFunc: F2(
					function (_v0, _v1) {
						return $author$project$Ports$printAndExitSuccess('Feature not implemented yet.');
					}),
				filepath: filepath,
				model: model
			});
	});
var $author$project$Commands$Hint$Cmd$printFirstHint = function (_v0) {
	var change = _v0.change;
	var _v1 = change.breakType;
	switch (_v1.$) {
		case 'CaseSwap':
			return $author$project$Ports$printAndExitSuccess('\n\n' + ('HINT: Somewhere in this file, debug_trainer changed a word from ' + ('starting with a capital letter to starting with ' + ('a lowercase letter or vice versa.' + '\n\n'))));
		case 'RemoveReturn':
			return $author$project$Ports$printAndExitSuccess('\n\n' + ('HINT: Somewhere in this file, debug_trainer removed ' + ('a `return` keyword from a function.' + '\n\n')));
		case 'RemoveParenthesis':
			return $author$project$Ports$printAndExitSuccess('\n\n' + ('HINT: Somewhere in this file, debug_trainer removed ' + ('an opening or closing parenthesis or bracket.' + '\n\n')));
		default:
			return $author$project$Ports$printAndExitSuccess('\n\n' + ('HINT: Somewhere in this file, debug_trainer changed ' + ('the arguments to a function.' + '\n\n')));
	}
};
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $author$project$Utils$FileContent$rowFromOffset = F2(
	function (offset, source) {
		var newlinesCount = $elm$core$List$length(
			A2(
				$elm$core$String$indexes,
				'\n',
				A2($elm$core$String$left, offset, source)));
		return newlinesCount + 1;
	});
var $author$project$Commands$Hint$Cmd$printSecondHint = function (_v0) {
	var change = _v0.change;
	var originalContent = _v0.originalContent;
	var lineOfChange = A2($author$project$Utils$FileContent$rowFromOffset, change.replacementData.originalContent.start, originalContent);
	return $author$project$Ports$printAndExitSuccess(
		'\n\n' + ('HINT: The line where the change was made was line ' + ($elm$core$String$fromInt(lineOfChange) + (' of the original file.' + '\n\n'))));
};
var $author$project$Commands$Hint$Cmd$printHint = F2(
	function (fileData, hintNumber) {
		switch (hintNumber) {
			case 1:
				return $author$project$Commands$Hint$Cmd$printFirstHint(fileData);
			case 2:
				return $author$project$Commands$Hint$Cmd$printSecondHint(fileData);
			default:
				var otherHintNumber = hintNumber;
				return $author$project$Ports$printAndExitSuccess(
					'\n\n' + ('You asked for hint number ' + ($elm$core$String$fromInt(otherHintNumber) + (', but you have to choose either hint ' + ('1 or 2.' + '\n\n')))));
		}
	});
var $author$project$Commands$Hint$Cmd$init = F3(
	function (filepath, hintNumber, model) {
		return $author$project$Utils$Cmd$fromFileData(
			{
				dataAbsentCmd: $author$project$Ports$printAndExitSuccess(
					$author$project$Utils$Messages$noRecordOfChangeMessage(filepath)),
				dataPresentCmdFunc: F2(
					function (_v0, fileData) {
						return A2($author$project$Commands$Hint$Cmd$printHint, fileData, hintNumber);
					}),
				filepath: filepath,
				model: model
			});
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Model$SavedData$removeFileData = F2(
	function (_v0, savedData) {
		var filepath = _v0.filepath;
		var workingDirectory = _v0.workingDirectory;
		return _Utils_update(
			savedData,
			{
				changedFiles: A2(
					$elm$core$Dict$remove,
					A2($author$project$Model$SavedData$fullPathString, workingDirectory, filepath),
					savedData.changedFiles)
			});
	});
var $miniBill$elm_codec$Codec$encodeToValue = function (codec) {
	return $miniBill$elm_codec$Codec$encoder(codec);
};
var $author$project$Model$SavedData$encode = function (savedData) {
	return A2($miniBill$elm_codec$Codec$encodeToValue, $author$project$Model$SavedData$codec, savedData);
};
var $miniBill$elm_codec$Codec$map = F3(
	function (go, back, codec) {
		return $miniBill$elm_codec$Codec$Codec(
			{
				decoder: A2(
					$elm$json$Json$Decode$map,
					go,
					$miniBill$elm_codec$Codec$decoder(codec)),
				encoder: function (v) {
					return A2(
						$miniBill$elm_codec$Codec$encoder,
						codec,
						back(v));
				}
			});
	});
var $author$project$Utils$Types$FilePath$codec = A3($miniBill$elm_codec$Codec$map, $author$project$Utils$Types$FilePath$fromString, $author$project$Utils$Types$FilePath$toString, $miniBill$elm_codec$Codec$string);
var $author$project$Utils$Types$FilePath$encode = $miniBill$elm_codec$Codec$encoder($author$project$Utils$Types$FilePath$codec);
var $author$project$Ports$writeFile = _Platform_outgoingPort('writeFile', $elm$core$Basics$identity);
var $author$project$Ports$writeFileWith = function (_v0) {
	var path = _v0.path;
	var contents = _v0.contents;
	var dataToSave = _v0.dataToSave;
	return $author$project$Ports$writeFile(
		$elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'path',
					$author$project$Utils$Types$FilePath$encode(path)),
					_Utils_Tuple2(
					'contents',
					$elm$json$Json$Encode$string(contents)),
					_Utils_Tuple2(
					'dataToSave',
					$author$project$Model$SavedData$encode(dataToSave))
				])));
};
var $author$project$Commands$Reset$Cmd$init = F2(
	function (filepath, model) {
		var workingDirectory = model.workingDirectory;
		return $author$project$Utils$Cmd$fromFileData(
			{
				dataAbsentCmd: $author$project$Ports$printAndExitSuccess(
					$author$project$Utils$Messages$noRecordOfChangeMessage(filepath)),
				dataPresentCmdFunc: F2(
					function (savedData, _v0) {
						var originalContent = _v0.originalContent;
						return $author$project$Ports$writeFileWith(
							{
								contents: originalContent,
								dataToSave: A2(
									$author$project$Model$SavedData$removeFileData,
									{filepath: filepath, workingDirectory: workingDirectory},
									savedData),
								path: filepath
							});
					}),
				filepath: filepath,
				model: model
			});
	});
var $author$project$Main$init = F2(
	function (_v0, _v1) {
		var randomNumber1 = _v0.randomNumber1;
		var randomNumber2 = _v0.randomNumber2;
		var workingDirectory = _v0.workingDirectory;
		var data = _v0.data;
		var dataFilePath = _v0.dataFilePath;
		var command = _v1.command;
		var model = {
			command: command,
			dataFilePath: $author$project$Utils$Types$FilePath$fromString(dataFilePath),
			randomNumbers: {breakTypeInt: randomNumber1, segmentToBreakInt: randomNumber2},
			savedDataResult: $author$project$Model$SavedData$fromFlag(data),
			workingDirectory: workingDirectory
		};
		return _Utils_Tuple2(
			model,
			function () {
				switch (command.$) {
					case 'Break':
						var filepath = command.a;
						return A2($author$project$Commands$Break$Cmd$init, filepath, model);
					case 'Hint':
						var filepath = command.a;
						var hintNumber = command.b;
						return A3($author$project$Commands$Hint$Cmd$init, filepath, hintNumber, model);
					case 'Explain':
						var filepath = command.a;
						return A2($author$project$Commands$Explain$Cmd$init, filepath, model);
					default:
						var filepath = command.a;
						return A2($author$project$Commands$Reset$Cmd$init, filepath, model);
				}
			}());
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $dillonkearns$elm_cli_options_parser$Cli$Program$Config = function (a) {
	return {$: 'Config', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser = function (a) {
	return {$: 'OptionsParser', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$end = function (_v0) {
	var record = _v0.a;
	return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(record);
};
var $dillonkearns$elm_cli_options_parser$Cli$Program$add = F2(
	function (optionsParser, _v0) {
		var programRecord = _v0.a;
		var optionsParsers = programRecord.optionsParsers;
		return $dillonkearns$elm_cli_options_parser$Cli$Program$Config(
			_Utils_update(
				programRecord,
				{
					optionsParsers: _Utils_ap(
						optionsParsers,
						_List_fromArray(
							[
								$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$end(optionsParser)
							]))
				}));
	});
var $author$project$Model$Break = function (a) {
	return {$: 'Break', a: a};
};
var $author$project$Utils$Types$LoggingStatus$LoggingOff = {$: 'LoggingOff'};
var $author$project$Utils$Types$LoggingStatus$LoggingOn = {$: 'LoggingOn'};
var $author$project$Utils$Types$LoggingStatus$fromBool = function (bool) {
	return bool ? $author$project$Utils$Types$LoggingStatus$LoggingOn : $author$project$Utils$Types$LoggingStatus$LoggingOff;
};
var $author$project$Model$breakInit = F3(
	function (filepathString, loggingIsOn, isInTestMode) {
		return {
			command: $author$project$Model$Break(
				$author$project$Utils$Types$FilePath$fromString(filepathString)),
			isInTestMode: isInTestMode,
			loggingStatus: $author$project$Utils$Types$LoggingStatus$fromBool(loggingIsOn)
		};
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$buildSubCommand = F2(
	function (subCommandName, cliOptionsConstructor) {
		return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
			{
				decoder: function (_v0) {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(_List_Nil, cliOptionsConstructor));
				},
				description: $elm$core$Maybe$Nothing,
				subCommand: $elm$core$Maybe$Just(subCommandName),
				usageSpecs: _List_Nil
			});
	});
var $dillonkearns$elm_cli_options_parser$Cli$Program$config = $dillonkearns$elm_cli_options_parser$Cli$Program$Config(
	{optionsParsers: _List_Nil});
var $dillonkearns$elm_cli_options_parser$Tokenizer$Flag = {$: 'Flag'};
var $dillonkearns$elm_cli_options_parser$Occurences$Optional = {$: 'Optional'};
var $dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption = F2(
	function (a, b) {
		return {$: 'ParsedOption', a: a, b: b};
	});
var $dillonkearns$elm_cli_options_parser$Cli$Option$Option = function (a) {
	return {$: 'Option', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$Decode$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$Decode$decoder = $dillonkearns$elm_cli_options_parser$Cli$Decode$Decoder(
	function (value) {
		return $elm$core$Result$Ok(
			_Utils_Tuple2(_List_Nil, value));
	});
var $dillonkearns$elm_cli_options_parser$Cli$Option$buildOption = F2(
	function (dataGrabber, usageSpec) {
		return $dillonkearns$elm_cli_options_parser$Cli$Option$Option(
			{dataGrabber: dataGrabber, decoder: $dillonkearns$elm_cli_options_parser$Cli$Decode$decoder, usageSpec: usageSpec});
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$FlagOrKeywordArg = F3(
	function (a, b, c) {
		return {$: 'FlagOrKeywordArg', a: a, b: b, c: c};
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$flag = F2(
	function (flagName, occurences) {
		return A3(
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$FlagOrKeywordArg,
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Flag(flagName),
			$elm$core$Maybe$Nothing,
			occurences);
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $dillonkearns$elm_cli_options_parser$Cli$Option$flag = function (flagName) {
	return A2(
		$dillonkearns$elm_cli_options_parser$Cli$Option$buildOption,
		function (_v0) {
			var options = _v0.options;
			return A2(
				$elm$core$List$member,
				A2($dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption, flagName, $dillonkearns$elm_cli_options_parser$Tokenizer$Flag),
				options) ? $elm$core$Result$Ok(true) : $elm$core$Result$Ok(false);
		},
		A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$flag, flagName, $dillonkearns$elm_cli_options_parser$Occurences$Optional));
};
var $author$project$Model$Hint = F2(
	function (a, b) {
		return {$: 'Hint', a: a, b: b};
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Model$hintInit = F4(
	function (maybeHintNumberString, filepathString, loggingIsOn, isInTestMode) {
		var hintNumber = function () {
			if (maybeHintNumberString.$ === 'Just') {
				var hintNumberString = maybeHintNumberString.a;
				return A2(
					$elm$core$Maybe$withDefault,
					1,
					$elm$core$String$toInt(hintNumberString));
			} else {
				return 1;
			}
		}();
		return {
			command: A2(
				$author$project$Model$Hint,
				$author$project$Utils$Types$FilePath$fromString(filepathString),
				hintNumber),
			isInTestMode: isInTestMode,
			loggingStatus: $author$project$Utils$Types$LoggingStatus$fromBool(loggingIsOn)
		};
	});
var $dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError = function (a) {
	return {$: 'MatchError', a: a};
};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$KeywordArg = function (a) {
	return {$: 'KeywordArg', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$keywordArg = F2(
	function (keywordArgName, occurences) {
		return A3(
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$FlagOrKeywordArg,
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$KeywordArg(keywordArgName),
			$elm$core$Maybe$Nothing,
			occurences);
	});
var $dillonkearns$elm_cli_options_parser$Cli$Option$optionalKeywordArg = function (optionName) {
	return A2(
		$dillonkearns$elm_cli_options_parser$Cli$Option$buildOption,
		function (_v0) {
			var operands = _v0.operands;
			var options = _v0.options;
			var _v1 = A2(
				$elm_community$list_extra$List$Extra$find,
				function (_v2) {
					var thisOptionName = _v2.a;
					var optionKind = _v2.b;
					return _Utils_eq(thisOptionName, optionName);
				},
				options);
			if (_v1.$ === 'Nothing') {
				return $elm$core$Result$Ok($elm$core$Maybe$Nothing);
			} else {
				if (_v1.a.b.$ === 'KeywordArg') {
					var _v3 = _v1.a;
					var optionArg = _v3.b.a;
					return $elm$core$Result$Ok(
						$elm$core$Maybe$Just(optionArg));
				} else {
					return $elm$core$Result$Err(
						$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError('Expected option ' + (optionName + ' to have arg but found none.')));
				}
			}
		},
		A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$keywordArg, optionName, $dillonkearns$elm_cli_options_parser$Occurences$Optional));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $dillonkearns$elm_cli_options_parser$Cli$Option$listToString = function (list) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'[',
				A2($elm$core$String$join, ', ', list),
				']'
			]));
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Operand = F3(
	function (a, b, c) {
		return {$: 'Operand', a: a, b: b, c: c};
	});
var $dillonkearns$elm_cli_options_parser$Occurences$Required = {$: 'Required'};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$operand = function (operandName) {
	return A3($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Operand, operandName, $elm$core$Maybe$Nothing, $dillonkearns$elm_cli_options_parser$Occurences$Required);
};
var $dillonkearns$elm_cli_options_parser$Cli$Option$requiredPositionalArg = function (operandDescription) {
	return A2(
		$dillonkearns$elm_cli_options_parser$Cli$Option$buildOption,
		function (_v0) {
			var usageSpecs = _v0.usageSpecs;
			var operands = _v0.operands;
			var operandsSoFar = _v0.operandsSoFar;
			var _v1 = A2($elm_community$list_extra$List$Extra$getAt, operandsSoFar, operands);
			if (_v1.$ === 'Just') {
				var operandValue = _v1.a;
				return $elm$core$Result$Ok(operandValue);
			} else {
				return $elm$core$Result$Err(
					$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError(
						'Expect operand ' + (operandDescription + ('at ' + ($elm$core$String$fromInt(operandsSoFar) + (' but had operands ' + $dillonkearns$elm_cli_options_parser$Cli$Option$listToString(operands)))))));
			}
		},
		$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$operand(operandDescription));
};
var $author$project$Model$Reset = function (a) {
	return {$: 'Reset', a: a};
};
var $author$project$Model$resetInit = F3(
	function (filepathString, loggingIsOn, isInTestMode) {
		return {
			command: $author$project$Model$Reset(
				$author$project$Utils$Types$FilePath$fromString(filepathString)),
			isInTestMode: isInTestMode,
			loggingStatus: $author$project$Utils$Types$LoggingStatus$fromBool(loggingIsOn)
		};
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$Decode$decodeFunction = function (_v0) {
	var decodeFn = _v0.a;
	return decodeFn;
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$operandCount = function (usageSpecs) {
	return $elm$core$List$length(
		A2(
			$elm$core$List$filterMap,
			function (spec) {
				switch (spec.$) {
					case 'FlagOrKeywordArg':
						return $elm$core$Maybe$Nothing;
					case 'Operand':
						var operandName = spec.a;
						var mutuallyExclusiveValues = spec.b;
						var occurences = spec.c;
						return $elm$core$Maybe$Just(operandName);
					default:
						return $elm$core$Maybe$Nothing;
				}
			},
			usageSpecs));
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$resultMap = F2(
	function (mapFunction, result) {
		return A2(
			$elm$core$Result$map,
			function (_v0) {
				var validationErrors = _v0.a;
				var value = _v0.b;
				return _Utils_Tuple2(
					validationErrors,
					mapFunction(value));
			},
			result);
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$updateDecoder = F2(
	function (decoder, _v0) {
		var optionsParserRecord = _v0.a;
		return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
			{decoder: decoder, description: optionsParserRecord.description, subCommand: optionsParserRecord.subCommand, usageSpecs: optionsParserRecord.usageSpecs});
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withCommon = F2(
	function (_v0, fullOptionsParser) {
		var innerOption = _v0.a;
		var optionsParser = fullOptionsParser.a;
		var decoder = optionsParser.decoder;
		var usageSpecs = optionsParser.usageSpecs;
		return function (_v4) {
			var record = _v4.a;
			return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
				_Utils_update(
					record,
					{
						usageSpecs: _Utils_ap(
							usageSpecs,
							_List_fromArray(
								[innerOption.usageSpec]))
					}));
		}(
			A2(
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$updateDecoder,
				function (optionsAndOperands) {
					return A2(
						$elm$core$Result$andThen,
						function (_v1) {
							var validationErrors = _v1.a;
							var fromValue = _v1.b;
							var _v2 = A2(
								$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$resultMap,
								function (fn) {
									return fn(fromValue);
								},
								decoder(optionsAndOperands));
							if (_v2.$ === 'Ok') {
								var _v3 = _v2.a;
								var previousValidationErrors = _v3.a;
								var thing = _v3.b;
								return $elm$core$Result$Ok(
									_Utils_Tuple2(
										_Utils_ap(previousValidationErrors, validationErrors),
										thing));
							} else {
								var value = _v2;
								return value;
							}
						},
						A2(
							$elm$core$Result$andThen,
							$dillonkearns$elm_cli_options_parser$Cli$Decode$decodeFunction(innerOption.decoder),
							innerOption.dataGrabber(
								{
									operands: optionsAndOperands.operands,
									operandsSoFar: $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$operandCount(usageSpecs),
									options: optionsAndOperands.options,
									usageSpecs: optionsAndOperands.usageSpecs
								})));
				},
				fullOptionsParser));
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with = $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withCommon;
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withDoc = F2(
	function (docString, _v0) {
		var optionsParserRecord = _v0.a;
		return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
			_Utils_update(
				optionsParserRecord,
				{
					description: $elm$core$Maybe$Just(docString)
				}));
	});
var $author$project$Main$programConfig = A2(
	$dillonkearns$elm_cli_options_parser$Cli$Program$add,
	A2(
		$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withDoc,
		'Change the specified file back to its original, unbroken state.',
		A2(
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
			$dillonkearns$elm_cli_options_parser$Cli$Option$flag('test'),
			A2(
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
				$dillonkearns$elm_cli_options_parser$Cli$Option$flag('log'),
				A2(
					$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
					$dillonkearns$elm_cli_options_parser$Cli$Option$requiredPositionalArg('filepath'),
					A2($dillonkearns$elm_cli_options_parser$Cli$OptionsParser$buildSubCommand, 'reset', $author$project$Model$resetInit))))),
	A2(
		$dillonkearns$elm_cli_options_parser$Cli$Program$add,
		A2(
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withDoc,
			'Display a hint about the error that was introduced into the specified file.',
			A2(
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
				$dillonkearns$elm_cli_options_parser$Cli$Option$flag('test'),
				A2(
					$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
					$dillonkearns$elm_cli_options_parser$Cli$Option$flag('log'),
					A2(
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
						$dillonkearns$elm_cli_options_parser$Cli$Option$requiredPositionalArg('filepath'),
						A2(
							$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
							$dillonkearns$elm_cli_options_parser$Cli$Option$optionalKeywordArg('hint-number'),
							A2($dillonkearns$elm_cli_options_parser$Cli$OptionsParser$buildSubCommand, 'hint', $author$project$Model$hintInit)))))),
		A2(
			$dillonkearns$elm_cli_options_parser$Cli$Program$add,
			A2(
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$withDoc,
				'Randomly introduce an error into the specified file.',
				A2(
					$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
					$dillonkearns$elm_cli_options_parser$Cli$Option$flag('test'),
					A2(
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
						$dillonkearns$elm_cli_options_parser$Cli$Option$flag('log'),
						A2(
							$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
							$dillonkearns$elm_cli_options_parser$Cli$Option$requiredPositionalArg('filepath'),
							A2($dillonkearns$elm_cli_options_parser$Cli$OptionsParser$buildSubCommand, 'break', $author$project$Model$breakInit))))),
			$dillonkearns$elm_cli_options_parser$Cli$Program$config)));
var $dillonkearns$elm_cli_options_parser$Cli$Program$ShowSystemMessage = {$: 'ShowSystemMessage'};
var $dillonkearns$elm_cli_options_parser$Cli$Program$UserModel = F2(
	function (a, b) {
		return {$: 'UserModel', a: a, b: b};
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $dillonkearns$elm_cli_options_parser$Cli$Program$CustomMatch = function (a) {
	return {$: 'CustomMatch', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Failure = {$: 'Failure'};
var $dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Success = {$: 'Success'};
var $dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage = F2(
	function (a, b) {
		return {$: 'SystemMessage', a: a, b: b};
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getSubCommand = function (_v0) {
	var subCommand = _v0.a.subCommand;
	return subCommand;
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getUsageSpecs = function (_v0) {
	var usageSpecs = _v0.a.usageSpecs;
	return usageSpecs;
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$mutuallyExclusiveSynopsis = function (_v0) {
	var values = _v0.a;
	return A2($elm$core$String$join, '|', values);
};
var $dillonkearns$elm_cli_options_parser$Occurences$qualifySynopsis = F2(
	function (occurences, rawSynopsis) {
		switch (occurences.$) {
			case 'Optional':
				return '[' + (rawSynopsis + ']');
			case 'Required':
				return rawSynopsis;
			default:
				return '[' + (rawSynopsis + ']...');
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionSynopsis = F3(
	function (occurences, option, maybeMutuallyExclusiveValues) {
		return A2(
			$dillonkearns$elm_cli_options_parser$Occurences$qualifySynopsis,
			occurences,
			function () {
				if (option.$ === 'Flag') {
					var flagName = option.a;
					return '--' + flagName;
				} else {
					var keywordArgName = option.a;
					if (maybeMutuallyExclusiveValues.$ === 'Just') {
						var mutuallyExclusiveValues = maybeMutuallyExclusiveValues.a;
						return '--' + (keywordArgName + (' <' + ($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$mutuallyExclusiveSynopsis(mutuallyExclusiveValues) + '>')));
					} else {
						return '--' + (keywordArgName + (' <' + (keywordArgName + '>')));
					}
				}
			}());
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$synopsis = F2(
	function (programName, _v0) {
		var usageSpecs = _v0.usageSpecs;
		var description = _v0.description;
		var subCommand = _v0.subCommand;
		return programName + (' ' + (A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$cons,
					subCommand,
					A2(
						$elm$core$List$map,
						function (spec) {
							return $elm$core$Maybe$Just(
								function () {
									switch (spec.$) {
										case 'FlagOrKeywordArg':
											var option = spec.a;
											var mutuallyExclusiveValues = spec.b;
											var occurences = spec.c;
											return A3($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionSynopsis, occurences, option, mutuallyExclusiveValues);
										case 'Operand':
											var operandName = spec.a;
											var mutuallyExclusiveValues = spec.b;
											var occurences = spec.c;
											var positionalArgSummary = A2(
												$elm$core$Maybe$withDefault,
												operandName,
												A2($elm$core$Maybe$map, $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$mutuallyExclusiveSynopsis, mutuallyExclusiveValues));
											switch (occurences.$) {
												case 'Required':
													return '<' + (positionalArgSummary + '>');
												case 'Optional':
													return '[<' + (positionalArgSummary + '>]');
												default:
													return 'TODO shouldn\'t reach this case';
											}
										default:
											var restArgsDescription = spec.a;
											return '<' + (restArgsDescription + '>...');
									}
								}());
						},
						usageSpecs)))) + A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (doc) {
					return ' # ' + doc;
				},
				description))));
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$synopsis = F2(
	function (programName, optionsParser) {
		return A2(
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$synopsis,
			programName,
			function (_v0) {
				var record = _v0.a;
				return record;
			}(optionsParser));
	});
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$helpText = F2(
	function (programName, optionsParsers) {
		return A2(
			$elm$core$String$join,
			'\n',
			A2(
				$elm$core$List$map,
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$synopsis(programName),
				optionsParsers));
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$SubCommand = function (a) {
	return {$: 'SubCommand', a: a};
};
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$buildSubCommandSuggestions = function (optionsParsers) {
	return A2(
		$elm$core$List$map,
		$dillonkearns$elm_cli_options_parser$TypoSuggestion$SubCommand,
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A2(
				$elm$core$List$map,
				function ($) {
					return $.subCommand;
				},
				optionsParsers)));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$Match = F4(
	function (score, offset, length, keys) {
		return {keys: keys, length: length, offset: offset, score: score};
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$Result = F2(
	function (score, matches) {
		return {matches: matches, score: score};
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$ConfigModel = F4(
	function (addPenalty, movePenalty, removePenalty, insertPenalty) {
		return {addPenalty: addPenalty, insertPenalty: insertPenalty, movePenalty: movePenalty, removePenalty: removePenalty};
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$defaultConfig = A4($dillonkearns$elm_cli_options_parser$Fuzzy$ConfigModel, 10, 1000, 10000, 1);
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $dillonkearns$elm_cli_options_parser$Fuzzy$dissect = F2(
	function (separators, strings) {
		dissect:
		while (true) {
			if (!separators.b) {
				return strings;
			} else {
				var head = separators.a;
				var tail = separators.b;
				var dissectEntry = function (entry) {
					var separatorLength = $elm$core$String$length(head);
					var slice = F2(
						function (index, _v1) {
							var prevIndex = _v1.a;
							var sum = _v1.b;
							var separatorSlice = _List_fromArray(
								[
									A3($elm$core$String$slice, index, index + separatorLength, entry)
								]);
							var precedingSlice = _Utils_eq(prevIndex, index) ? _List_Nil : _List_fromArray(
								[
									A3($elm$core$String$slice, prevIndex, index, entry)
								]);
							return _Utils_Tuple2(
								index + separatorLength,
								_Utils_ap(
									sum,
									_Utils_ap(precedingSlice, separatorSlice)));
						});
					var indexes = A2($elm$core$String$indexes, head, entry);
					var result = A3(
						$elm$core$List$foldl,
						slice,
						_Utils_Tuple2(0, _List_Nil),
						indexes);
					var lastIndex = result.a;
					var first = result.b;
					var entryLength = $elm$core$String$length(entry);
					var last = _Utils_eq(lastIndex, entryLength) ? _List_Nil : _List_fromArray(
						[
							A3($elm$core$String$slice, lastIndex, entryLength, entry)
						]);
					return _Utils_ap(first, last);
				};
				var dissected = A3(
					$elm$core$List$foldl,
					F2(
						function (e, s) {
							return _Utils_ap(
								s,
								dissectEntry(e));
						}),
					_List_Nil,
					strings);
				var $temp$separators = tail,
					$temp$strings = dissected;
				separators = $temp$separators;
				strings = $temp$strings;
				continue dissect;
			}
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$String$foldl = _String_foldl;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $dillonkearns$elm_cli_options_parser$Fuzzy$initialModel = _List_Nil;
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$quickSort = function (entries) {
	if (!entries.b) {
		return _Utils_Tuple2(0, _List_Nil);
	} else {
		var head = entries.a;
		var tail = entries.b;
		var partition = A2(
			$elm$core$List$partition,
			function (e) {
				return _Utils_cmp(e, head) < 0;
			},
			tail);
		var smaller = $dillonkearns$elm_cli_options_parser$Fuzzy$quickSort(partition.a);
		var penalty = $elm$core$List$isEmpty(smaller.b) ? 0 : 1;
		var larger = $dillonkearns$elm_cli_options_parser$Fuzzy$quickSort(partition.b);
		return _Utils_Tuple2(
			(smaller.a + penalty) + larger.a,
			_Utils_ap(
				smaller.b,
				_Utils_ap(
					_List_fromArray(
						[head]),
					larger.b)));
	}
};
var $dillonkearns$elm_cli_options_parser$Fuzzy$distance = F3(
	function (config, needle, hay) {
		var accumulateInsertPenalty = F2(
			function (elem, result) {
				if (result.a.$ === 'Just') {
					var prev = result.a.a;
					var score = result.b;
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(elem),
						((elem - 1) - prev) + score);
				} else {
					var _v2 = result.a;
					var score = result.b;
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(elem),
						score);
				}
			});
		var accumulate = F2(
			function (c, indexList) {
				var indexes = A2(
					$elm$core$String$indexes,
					$elm$core$String$fromChar(c),
					hay);
				var hayIndex = $elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (e) {
							return !A2($elm$core$List$member, e, indexList);
						},
						indexes));
				if (hayIndex.$ === 'Just') {
					var v = hayIndex.a;
					return _Utils_ap(
						indexList,
						_List_fromArray(
							[v]));
				} else {
					return indexList;
				}
			});
		var accumulated = A3($elm$core$String$foldl, accumulate, $dillonkearns$elm_cli_options_parser$Fuzzy$initialModel, needle);
		var hPenalty = ($elm$core$String$length(hay) - $elm$core$List$length(accumulated)) * config.addPenalty;
		var nPenalty = ($elm$core$String$length(needle) - $elm$core$List$length(accumulated)) * config.removePenalty;
		var sorted = $dillonkearns$elm_cli_options_parser$Fuzzy$quickSort(accumulated);
		var iPenalty = A3(
			$elm$core$List$foldl,
			accumulateInsertPenalty,
			_Utils_Tuple2($elm$core$Maybe$Nothing, 0),
			sorted.b).b * config.insertPenalty;
		var mPenalty = sorted.a * config.movePenalty;
		return A4(
			$dillonkearns$elm_cli_options_parser$Fuzzy$Match,
			((mPenalty + hPenalty) + nPenalty) + iPenalty,
			0,
			$elm$core$String$length(hay),
			sorted.b);
	});
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$padHays = F2(
	function (ns, hs) {
		return _Utils_ap(
			hs,
			A2(
				$elm$core$List$repeat,
				ns - $elm$core$List$length(hs),
				''));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$reduceLeft = F3(
	function (ns, c, hs) {
		return _Utils_Tuple2(
			A3(
				$elm$core$List$foldl,
				F2(
					function (e, sum) {
						return $elm$core$String$length(e) + sum;
					}),
				0,
				A2($elm$core$List$take, c, hs)),
			A2($elm$core$List$drop, c, hs));
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$reduceRight = F3(
	function (ns, c, hs) {
		return A2(
			$elm$core$List$take,
			$elm$core$List$length(hs) - ((ns - c) - 1),
			hs);
	});
var $dillonkearns$elm_cli_options_parser$Fuzzy$match = F4(
	function (configs, separators, needle, hay) {
		var reduceHays = F3(
			function (ns, c, hs) {
				return A3(
					$dillonkearns$elm_cli_options_parser$Fuzzy$reduceLeft,
					ns,
					c,
					A3(
						$dillonkearns$elm_cli_options_parser$Fuzzy$reduceRight,
						ns,
						c,
						A2($dillonkearns$elm_cli_options_parser$Fuzzy$padHays, ns, hs)));
			});
		var needles = A2(
			$dillonkearns$elm_cli_options_parser$Fuzzy$dissect,
			separators,
			_List_fromArray(
				[needle]));
		var initialResult = A2($dillonkearns$elm_cli_options_parser$Fuzzy$Result, 0, _List_Nil);
		var hays = A2(
			$dillonkearns$elm_cli_options_parser$Fuzzy$dissect,
			separators,
			_List_fromArray(
				[hay]));
		var accumulateConfig = F2(
			function (c, sum) {
				switch (c.$) {
					case 'AddPenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{addPenalty: val});
					case 'RemovePenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{removePenalty: val});
					case 'MovePenalty':
						var val = c.a;
						return _Utils_update(
							sum,
							{movePenalty: val});
					default:
						var val = c.a;
						return _Utils_update(
							sum,
							{insertPenalty: val});
				}
			});
		var config = A3($elm$core$List$foldl, accumulateConfig, $dillonkearns$elm_cli_options_parser$Fuzzy$defaultConfig, configs);
		var minScore = F2(
			function (n, _v2) {
				var offset = _v2.a;
				var hs = _v2.b;
				var initialPenalty = ((($elm$core$String$length(n) * config.removePenalty) + ($elm$core$String$length(n) * config.movePenalty)) + ($elm$core$String$length(hay) * config.addPenalty)) + (($elm$core$String$length(hay) * $elm$core$String$length(n)) * config.insertPenalty);
				var initialMatch = A4($dillonkearns$elm_cli_options_parser$Fuzzy$Match, initialPenalty, offset, 0, _List_Nil);
				var accumulateMatch = F2(
					function (e, _v1) {
						var prev = _v1.a;
						var prevOffset = _v1.b;
						var newOffset = prevOffset + $elm$core$String$length(e);
						var eDistance = A3($dillonkearns$elm_cli_options_parser$Fuzzy$distance, config, n, e);
						var newMatch = (_Utils_cmp(eDistance.score, prev.score) < 0) ? _Utils_update(
							eDistance,
							{offset: prevOffset}) : prev;
						return _Utils_Tuple2(newMatch, newOffset);
					});
				return A3(
					$elm$core$List$foldl,
					accumulateMatch,
					_Utils_Tuple2(initialMatch, offset),
					hs).a;
			});
		var accumulateResult = F2(
			function (n, _v0) {
				var prev = _v0.a;
				var num = _v0.b;
				var matchResult = A2(
					minScore,
					n,
					A3(
						reduceHays,
						$elm$core$List$length(needles),
						num,
						hays));
				var newResult = _Utils_update(
					prev,
					{
						matches: _Utils_ap(
							prev.matches,
							_List_fromArray(
								[matchResult])),
						score: matchResult.score + prev.score
					});
				return _Utils_Tuple2(newResult, num + 1);
			});
		return A3(
			$elm$core$List$foldl,
			accumulateResult,
			_Utils_Tuple2(initialResult, 0),
			needles).a;
	});
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$name = function (typoSuggestion) {
	if (typoSuggestion.$ === 'Flag') {
		var suggestionName = typoSuggestion.a;
		return suggestionName;
	} else {
		var suggestionName = typoSuggestion.a;
		return suggestionName;
	}
};
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$name = function (usageSpec) {
	switch (usageSpec.$) {
		case 'FlagOrKeywordArg':
			var option = usageSpec.a;
			var mutuallyExclusiveValues = usageSpec.b;
			var occurences = usageSpec.c;
			if (option.$ === 'Flag') {
				var flagName = option.a;
				return flagName;
			} else {
				var keywordArgName = option.a;
				return keywordArgName;
			}
		case 'Operand':
			var operandOptionName = usageSpec.a;
			var mutuallyExclusiveValues = usageSpec.b;
			var occurences = usageSpec.c;
			return operandOptionName;
		default:
			var restArgsDescription = usageSpec.a;
			return restArgsDescription;
	}
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$uniqueBy = F2(
	function (f, list) {
		return A4($elm_community$list_extra$List$Extra$uniqueHelp, f, $elm$core$Set$empty, list, _List_Nil);
	});
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$optionSuggestions = function (optionsParsers) {
	return A2(
		$elm$core$List$map,
		$dillonkearns$elm_cli_options_parser$TypoSuggestion$Flag,
		A2(
			$elm$core$List$map,
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$name,
			A2(
				$elm_community$list_extra$List$Extra$uniqueBy,
				$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$name,
				$elm$core$List$concat(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.usageSpecs;
						},
						optionsParsers)))));
};
var $elm$core$List$sortBy = _List_sortBy;
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$getSuggestions = F2(
	function (optionsParsers, unexpectedOption) {
		var something = F2(
			function (needle, hay) {
				return A4($dillonkearns$elm_cli_options_parser$Fuzzy$match, _List_Nil, _List_Nil, needle, hay).score;
			});
		return A2(
			$elm$core$List$sortBy,
			A2(
				$elm$core$Basics$composeR,
				$dillonkearns$elm_cli_options_parser$TypoSuggestion$name,
				something(unexpectedOption)),
			_Utils_ap(
				$dillonkearns$elm_cli_options_parser$TypoSuggestion$buildSubCommandSuggestions(optionsParsers),
				$dillonkearns$elm_cli_options_parser$TypoSuggestion$optionSuggestions(optionsParsers)));
	});
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$suggestionToString = function (typoSuggestion) {
	return '`' + (function () {
		if (typoSuggestion.$ === 'Flag') {
			var flagName = typoSuggestion.a;
			return '--' + flagName;
		} else {
			var buildSubCommandName = typoSuggestion.a;
			return buildSubCommandName;
		}
	}() + '`');
};
var $dillonkearns$elm_cli_options_parser$TypoSuggestion$toMessage = F2(
	function (optionsParsers, unexpectedOption) {
		var _v0 = $elm$core$List$head(
			A2($dillonkearns$elm_cli_options_parser$TypoSuggestion$getSuggestions, optionsParsers, unexpectedOption));
		if (_v0.$ === 'Just') {
			var bestSuggestion = _v0.a;
			return 'The `--' + (unexpectedOption + ('` flag was not found. Maybe it was one of these typos?\n\n`--' + (unexpectedOption + ('` <> ' + $dillonkearns$elm_cli_options_parser$TypoSuggestion$suggestionToString(bestSuggestion)))));
		} else {
			return 'TODO';
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$Match = function (a) {
	return {$: 'Match', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$NoMatch = function (a) {
	return {$: 'NoMatch', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$SystemParser = function (a) {
	return {$: 'SystemParser', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$UserParser = function (a) {
	return {$: 'UserParser', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$ValidationErrors = function (a) {
	return {$: 'ValidationErrors', a: a};
};
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$ShowHelp = {$: 'ShowHelp'};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$build = function (cliOptionsConstructor) {
	return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
		{
			decoder: function (_v0) {
				return $elm$core$Result$Ok(
					_Utils_Tuple2(_List_Nil, cliOptionsConstructor));
			},
			description: $elm$core$Maybe$Nothing,
			subCommand: $elm$core$Maybe$Nothing,
			usageSpecs: _List_Nil
		});
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$expectFlag = F2(
	function (flagName, _v0) {
		var optionsParser = _v0.a;
		var usageSpecs = optionsParser.usageSpecs;
		var decoder = optionsParser.decoder;
		return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
			_Utils_update(
				optionsParser,
				{
					decoder: function (stuff) {
						var options = stuff.options;
						return A2(
							$elm$core$List$member,
							A2($dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption, flagName, $dillonkearns$elm_cli_options_parser$Tokenizer$Flag),
							options) ? decoder(stuff) : $elm$core$Result$Err(
							$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError('Expect flag ' + ('--' + flagName)));
					},
					usageSpecs: _Utils_ap(
						usageSpecs,
						_List_fromArray(
							[
								A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$flag, flagName, $dillonkearns$elm_cli_options_parser$Occurences$Required)
							]))
				}));
	});
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$helpParser = A2(
	$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$expectFlag,
	'help',
	$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$build($dillonkearns$elm_cli_options_parser$Cli$LowLevel$ShowHelp));
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return A2($elm$core$Dict$member, k, t2);
				}),
			t1);
	});
var $elm$core$Set$intersect = F2(
	function (_v0, _v1) {
		var dict1 = _v0.a;
		var dict2 = _v1.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$intersect, dict1, dict2));
	});
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$intersection = function (sets) {
	if (!sets.b) {
		return $elm$core$Set$empty;
	} else {
		if (!sets.b.b) {
			var set = sets.a;
			return set;
		} else {
			var first = sets.a;
			var rest = sets.b;
			return A2(
				$elm$core$Set$intersect,
				first,
				$dillonkearns$elm_cli_options_parser$Cli$LowLevel$intersection(rest));
		}
	}
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$map = F2(
	function (mapFunction, optionsParser) {
		var decoder = optionsParser.a.decoder;
		return A2(
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$updateDecoder,
			A2(
				$elm$core$Basics$composeR,
				decoder,
				$elm$core$Result$map(
					$elm$core$Tuple$mapSecond(mapFunction))),
			optionsParser);
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$matchResultToMaybe = function (matchResult) {
	if (matchResult.$ === 'Match') {
		var thing = matchResult.a;
		return $elm$core$Maybe$Just(thing);
	} else {
		var unknownFlags = matchResult.a;
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$oneOf = A2(
	$elm$core$List$foldl,
	F2(
		function (x, acc) {
			return (!_Utils_eq(acc, $elm$core$Maybe$Nothing)) ? acc : x;
		}),
	$elm$core$Maybe$Nothing);
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$ShowVersion = {$: 'ShowVersion'};
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$showVersionParser = A2(
	$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$expectFlag,
	'version',
	$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$build($dillonkearns$elm_cli_options_parser$Cli$LowLevel$ShowVersion));
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$Match = function (a) {
	return {$: 'Match', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$NoMatch = function (a) {
	return {$: 'NoMatch', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$hasRestArgs = function (usageSpecs) {
	return A2(
		$elm$core$List$any,
		function (usageSpec) {
			if (usageSpec.$ === 'RestArgs') {
				return true;
			} else {
				return false;
			}
		},
		usageSpecs);
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$isOperand = function (option) {
	switch (option.$) {
		case 'Operand':
			var operandName = option.a;
			var mutuallyExclusiveValues = option.b;
			var occurences = option.c;
			return true;
		case 'FlagOrKeywordArg':
			return false;
		default:
			return false;
	}
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$expectedPositionalArgCountOrFail = function (_v0) {
	var optionsParser = _v0.a;
	var decoder = optionsParser.decoder;
	var usageSpecs = optionsParser.usageSpecs;
	return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
		_Utils_update(
			optionsParser,
			{
				decoder: function (stuff) {
					var operands = stuff.operands;
					return ((!$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$hasRestArgs(usageSpecs)) && (_Utils_cmp(
						$elm$core$List$length(operands),
						$elm$core$List$length(
							A2($elm$core$List$filter, $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$isOperand, usageSpecs))) > 0)) ? $elm$core$Result$Err(
						$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError('Wrong number of operands')) : decoder(stuff);
				}
			}));
};
var $dillonkearns$elm_cli_options_parser$Cli$Decode$UnexpectedOptions = function (a) {
	return {$: 'UnexpectedOptions', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionName = function (option) {
	if (option.$ === 'Flag') {
		var flagName = option.a;
		return flagName;
	} else {
		var keywordArgName = option.a;
		return keywordArgName;
	}
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionExists = F2(
	function (usageSpecs, thisOptionName) {
		return A2(
			$elm_community$list_extra$List$Extra$find,
			function (option) {
				return _Utils_eq(
					$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionName(option),
					thisOptionName);
			},
			A2(
				$elm$core$List$filterMap,
				function (usageSpec) {
					switch (usageSpec.$) {
						case 'FlagOrKeywordArg':
							var option = usageSpec.a;
							var mutuallyExclusiveValues = usageSpec.b;
							var occurences = usageSpec.c;
							return $elm$core$Maybe$Just(option);
						case 'Operand':
							return $elm$core$Maybe$Nothing;
						default:
							return $elm$core$Maybe$Nothing;
					}
				},
				usageSpecs));
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$unexpectedOptions_ = F2(
	function (_v0, options) {
		var usageSpecs = _v0.a.usageSpecs;
		return A2(
			$elm$core$List$filterMap,
			function (_v1) {
				var optionName = _v1.a;
				var optionKind = _v1.b;
				return _Utils_eq(
					A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionExists, usageSpecs, optionName),
					$elm$core$Maybe$Nothing) ? $elm$core$Maybe$Just(optionName) : $elm$core$Maybe$Nothing;
			},
			options);
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$failIfUnexpectedOptions = function (fullOptionsParser) {
	var optionsParser = fullOptionsParser.a;
	var decoder = optionsParser.decoder;
	var usageSpecs = optionsParser.usageSpecs;
	return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$OptionsParser(
		_Utils_update(
			optionsParser,
			{
				decoder: function (flagsAndOperands) {
					var unexpectedOptions = A2($dillonkearns$elm_cli_options_parser$Cli$OptionsParser$unexpectedOptions_, fullOptionsParser, flagsAndOperands.options);
					return $elm$core$List$isEmpty(unexpectedOptions) ? decoder(flagsAndOperands) : $elm$core$Result$Err(
						$dillonkearns$elm_cli_options_parser$Cli$Decode$UnexpectedOptions(unexpectedOptions));
				}
			}));
};
var $dillonkearns$elm_cli_options_parser$Tokenizer$KeywordArg = function (a) {
	return {$: 'KeywordArg', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionHasArg = F2(
	function (options, optionNameToCheck) {
		var _v0 = A2(
			$elm_community$list_extra$List$Extra$find,
			function (spec) {
				return _Utils_eq(
					$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionName(spec),
					optionNameToCheck);
			},
			A2(
				$elm$core$List$filterMap,
				function (spec) {
					switch (spec.$) {
						case 'FlagOrKeywordArg':
							var option = spec.a;
							var mutuallyExclusiveValues = spec.b;
							var occurences = spec.c;
							return $elm$core$Maybe$Just(option);
						case 'Operand':
							return $elm$core$Maybe$Nothing;
						default:
							return $elm$core$Maybe$Nothing;
					}
				},
				options));
		if (_v0.$ === 'Just') {
			var option = _v0.a;
			if (option.$ === 'Flag') {
				var flagName = option.a;
				return false;
			} else {
				var optionName_ = option.a;
				return true;
			}
		} else {
			return false;
		}
	});
var $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$KeywordArg = function (a) {
	return {$: 'KeywordArg', a: a};
};
var $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$NotOption = {$: 'NotOption'};
var $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$Option = function (a) {
	return {$: 'Option', a: a};
};
var $elm$core$String$fromList = _String_fromList;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$split = function (string) {
	var _v0 = $elm$core$String$toList(string);
	if (((_v0.b && ('-' === _v0.a.valueOf())) && _v0.b.b) && ('-' === _v0.b.a.valueOf())) {
		var _v1 = _v0.b;
		var optionName = _v1.b;
		var _v2 = A2(
			$elm$core$String$split,
			'=',
			$elm$core$String$fromList(optionName));
		if (_v2.b) {
			if (!_v2.b.b) {
				var singleOptionName = _v2.a;
				return $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$Option(singleOptionName);
			} else {
				var firstOptionName = _v2.a;
				var splitAfterOptionName = _v2.b;
				return $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$KeywordArg(
					{
						name: firstOptionName,
						value: $elm$core$String$concat(splitAfterOptionName)
					});
			}
		} else {
			return $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$Option(
				$elm$core$String$fromList(optionName));
		}
	} else {
		return $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$NotOption;
	}
};
var $dillonkearns$elm_cli_options_parser$Tokenizer$flagsAndOperands_ = F3(
	function (usageSpecs, argv, soFar) {
		flagsAndOperands_:
		while (true) {
			if (!argv.b) {
				return soFar;
			} else {
				var firstArg = argv.a;
				var restArgs = argv.b;
				var _v1 = $dillonkearns$elm_cli_options_parser$Tokenizer$EqualsSplitter$split(firstArg);
				switch (_v1.$) {
					case 'Option':
						var optionName = _v1.a;
						if (A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$optionHasArg, usageSpecs, optionName)) {
							if (restArgs.b) {
								var secondArg = restArgs.a;
								var afterSecondArg = restArgs.b;
								var $temp$usageSpecs = usageSpecs,
									$temp$argv = afterSecondArg,
									$temp$soFar = {
									operands: soFar.operands,
									options: _Utils_ap(
										soFar.options,
										_List_fromArray(
											[
												A2(
												$dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption,
												optionName,
												$dillonkearns$elm_cli_options_parser$Tokenizer$KeywordArg(secondArg))
											]))
								};
								usageSpecs = $temp$usageSpecs;
								argv = $temp$argv;
								soFar = $temp$soFar;
								continue flagsAndOperands_;
							} else {
								var $temp$usageSpecs = usageSpecs,
									$temp$argv = restArgs,
									$temp$soFar = {
									operands: soFar.operands,
									options: _Utils_ap(
										soFar.options,
										_List_fromArray(
											[
												A2($dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption, optionName, $dillonkearns$elm_cli_options_parser$Tokenizer$Flag)
											]))
								};
								usageSpecs = $temp$usageSpecs;
								argv = $temp$argv;
								soFar = $temp$soFar;
								continue flagsAndOperands_;
							}
						} else {
							var $temp$usageSpecs = usageSpecs,
								$temp$argv = restArgs,
								$temp$soFar = {
								operands: soFar.operands,
								options: _Utils_ap(
									soFar.options,
									_List_fromArray(
										[
											A2($dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption, optionName, $dillonkearns$elm_cli_options_parser$Tokenizer$Flag)
										]))
							};
							usageSpecs = $temp$usageSpecs;
							argv = $temp$argv;
							soFar = $temp$soFar;
							continue flagsAndOperands_;
						}
					case 'KeywordArg':
						var name = _v1.a.name;
						var value = _v1.a.value;
						var $temp$usageSpecs = usageSpecs,
							$temp$argv = restArgs,
							$temp$soFar = {
							operands: soFar.operands,
							options: _Utils_ap(
								soFar.options,
								_List_fromArray(
									[
										A2(
										$dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption,
										name,
										$dillonkearns$elm_cli_options_parser$Tokenizer$KeywordArg(value))
									]))
						};
						usageSpecs = $temp$usageSpecs;
						argv = $temp$argv;
						soFar = $temp$soFar;
						continue flagsAndOperands_;
					default:
						var $temp$usageSpecs = usageSpecs,
							$temp$argv = restArgs,
							$temp$soFar = {
							operands: _Utils_ap(
								soFar.operands,
								_List_fromArray(
									[firstArg])),
							options: soFar.options
						};
						usageSpecs = $temp$usageSpecs;
						argv = $temp$argv;
						soFar = $temp$soFar;
						continue flagsAndOperands_;
				}
			}
		}
	});
var $dillonkearns$elm_cli_options_parser$Tokenizer$flagsAndOperands = F2(
	function (usageSpecs, argv) {
		return A3(
			$dillonkearns$elm_cli_options_parser$Tokenizer$flagsAndOperands_,
			usageSpecs,
			argv,
			{operands: _List_Nil, options: _List_Nil});
	});
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getDecoder = function (_v0) {
	var decoder = _v0.a.decoder;
	return decoder;
};
var $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$tryMatch = F2(
	function (argv, optionsParser) {
		var usageSpecs = optionsParser.a.usageSpecs;
		var subCommand = optionsParser.a.subCommand;
		var flagsAndOperands = function (record) {
			var _v5 = _Utils_Tuple2(subCommand, record.operands);
			if (_v5.a.$ === 'Nothing') {
				var _v6 = _v5.a;
				return $elm$core$Result$Ok(
					{operands: record.operands, options: record.options, usageSpecs: usageSpecs});
			} else {
				if (_v5.b.b) {
					var buildSubCommandName = _v5.a.a;
					var _v7 = _v5.b;
					var actualSubCommand = _v7.a;
					var remainingOperands = _v7.b;
					return _Utils_eq(actualSubCommand, buildSubCommandName) ? $elm$core$Result$Ok(
						{operands: remainingOperands, options: record.options, usageSpecs: usageSpecs}) : $elm$core$Result$Err(
						{errorMessage: 'Sub optionsParser does not match', options: record.options});
				} else {
					var buildSubCommandName = _v5.a.a;
					return $elm$core$Result$Err(
						{errorMessage: 'No sub optionsParser provided', options: record.options});
				}
			}
		}(
			A2($dillonkearns$elm_cli_options_parser$Tokenizer$flagsAndOperands, usageSpecs, argv));
		var decoder = $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getDecoder(
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$failIfUnexpectedOptions(
				$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$expectedPositionalArgCountOrFail(optionsParser)));
		if (flagsAndOperands.$ === 'Ok') {
			var actualFlagsAndOperands = flagsAndOperands.a;
			return function (result) {
				if (result.$ === 'Err') {
					var error = result.a;
					switch (error.$) {
						case 'MatchError':
							var matchError = error.a;
							return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$NoMatch(_List_Nil);
						case 'UnrecoverableValidationError':
							var validationError = error.a;
							return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$Match(
								$elm$core$Result$Err(
									_List_fromArray(
										[validationError])));
						default:
							var unexpectedOptions = error.a;
							return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$NoMatch(unexpectedOptions);
					}
				} else {
					if (!result.a.a.b) {
						var _v3 = result.a;
						var value = _v3.b;
						return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$Match(
							$elm$core$Result$Ok(value));
					} else {
						var _v4 = result.a;
						var validationErrors = _v4.a;
						var value = _v4.b;
						return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$Match(
							$elm$core$Result$Err(validationErrors));
					}
				}
			}(
				decoder(actualFlagsAndOperands));
		} else {
			var errorMessage = flagsAndOperands.a.errorMessage;
			var options = flagsAndOperands.a.options;
			return $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$NoMatch(
				A2($dillonkearns$elm_cli_options_parser$Cli$OptionsParser$unexpectedOptions_, optionsParser, options));
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$LowLevel$try = F2(
	function (optionsParsers, argv) {
		var matchResults = A2(
			$elm$core$List$map,
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$tryMatch(
				A2($elm$core$List$drop, 2, argv)),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$end,
					A2(
						$elm$core$List$map,
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$map($dillonkearns$elm_cli_options_parser$Cli$LowLevel$UserParser),
						optionsParsers)),
				_List_fromArray(
					[
						A2(
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$map,
						$dillonkearns$elm_cli_options_parser$Cli$LowLevel$SystemParser,
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$end($dillonkearns$elm_cli_options_parser$Cli$LowLevel$helpParser)),
						A2(
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$map,
						$dillonkearns$elm_cli_options_parser$Cli$LowLevel$SystemParser,
						$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$end($dillonkearns$elm_cli_options_parser$Cli$LowLevel$showVersionParser))
					])));
		var commonUnmatchedFlags = $elm$core$Set$toList(
			$dillonkearns$elm_cli_options_parser$Cli$LowLevel$intersection(
				A2(
					$elm$core$List$map,
					function (matchResult) {
						if (matchResult.$ === 'NoMatch') {
							var unknownFlags = matchResult.a;
							return $elm$core$Set$fromList(unknownFlags);
						} else {
							return $elm$core$Set$empty;
						}
					},
					matchResults)));
		return function (maybeResult) {
			if (maybeResult.$ === 'Just') {
				var result = maybeResult.a;
				if (result.$ === 'Ok') {
					var msg = result.a;
					if (msg.$ === 'SystemParser') {
						var systemMsg = msg.a;
						return systemMsg;
					} else {
						var userMsg = msg.a;
						return $dillonkearns$elm_cli_options_parser$Cli$LowLevel$Match(userMsg);
					}
				} else {
					var validationErrors = result.a;
					return $dillonkearns$elm_cli_options_parser$Cli$LowLevel$ValidationErrors(validationErrors);
				}
			} else {
				return $dillonkearns$elm_cli_options_parser$Cli$LowLevel$NoMatch(commonUnmatchedFlags);
			}
		}(
			$dillonkearns$elm_cli_options_parser$Cli$LowLevel$oneOf(
				A2($elm$core$List$map, $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$MatchResult$matchResultToMaybe, matchResults)));
	});
var $dillonkearns$elm_cli_options_parser$Cli$Program$run = F3(
	function (_v0, argv, versionMessage) {
		var optionsParsers = _v0.a.optionsParsers;
		var matchResult = A2($dillonkearns$elm_cli_options_parser$Cli$LowLevel$try, optionsParsers, argv);
		var errorMessage = 'TODO - show error message explaining that user needs to pass unmodified `process.argv` from node here.';
		var programName = function () {
			if (argv.b && argv.b.b) {
				var first = argv.a;
				var _v4 = argv.b;
				var programPath = _v4.a;
				return A2(
					$elm$core$Maybe$withDefault,
					errorMessage,
					$elm_community$list_extra$List$Extra$last(
						A2($elm$core$String$split, '/', programPath)));
			} else {
				return errorMessage;
			}
		}();
		switch (matchResult.$) {
			case 'NoMatch':
				var unexpectedOptions = matchResult.a;
				return _Utils_eq(unexpectedOptions, _List_Nil) ? A2(
					$dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage,
					$dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Failure,
					'\nNo matching optionsParser...\n\nUsage:\n\n' + A2($dillonkearns$elm_cli_options_parser$Cli$LowLevel$helpText, programName, optionsParsers)) : A2(
					$dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage,
					$dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Failure,
					A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$map,
							$dillonkearns$elm_cli_options_parser$TypoSuggestion$toMessage(
								A2(
									$elm$core$List$map,
									function (optionsParser) {
										return {
											subCommand: $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getSubCommand(optionsParser),
											usageSpecs: $dillonkearns$elm_cli_options_parser$Cli$OptionsParser$getUsageSpecs(optionsParser)
										};
									},
									optionsParsers)),
							unexpectedOptions)));
			case 'ValidationErrors':
				var validationErrors = matchResult.a;
				return A2(
					$dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage,
					$dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Failure,
					'Validation errors:\n\n' + A2(
						$elm$core$String$join,
						'\n',
						A2(
							$elm$core$List$map,
							function (_v2) {
								var name = _v2.name;
								var invalidReason = _v2.invalidReason;
								return '`' + (name + ('` failed a validation. ' + invalidReason));
							},
							validationErrors)));
			case 'Match':
				var msg = matchResult.a;
				return $dillonkearns$elm_cli_options_parser$Cli$Program$CustomMatch(msg);
			case 'ShowHelp':
				return A2(
					$dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage,
					$dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Success,
					A2($dillonkearns$elm_cli_options_parser$Cli$LowLevel$helpText, programName, optionsParsers));
			default:
				return A2($dillonkearns$elm_cli_options_parser$Cli$Program$SystemMessage, $dillonkearns$elm_cli_options_parser$Cli$ExitStatus$Success, versionMessage);
		}
	});
var $dillonkearns$elm_cli_options_parser$Cli$Program$statefulInit = F2(
	function (options, flags) {
		var matchResult = A3($dillonkearns$elm_cli_options_parser$Cli$Program$run, options.config, flags.argv, flags.versionMessage);
		var cmd = function () {
			if (matchResult.$ === 'SystemMessage') {
				var exitStatus = matchResult.a;
				var message = matchResult.b;
				if (exitStatus.$ === 'Failure') {
					return _Utils_Tuple2(
						$dillonkearns$elm_cli_options_parser$Cli$Program$ShowSystemMessage,
						options.printAndExitFailure(message));
				} else {
					return _Utils_Tuple2(
						$dillonkearns$elm_cli_options_parser$Cli$Program$ShowSystemMessage,
						options.printAndExitSuccess(message));
				}
			} else {
				var cliOptions = matchResult.a;
				var _v2 = A2(options.init, flags, cliOptions);
				var userModel = _v2.a;
				var userCmd = _v2.b;
				return _Utils_Tuple2(
					A2($dillonkearns$elm_cli_options_parser$Cli$Program$UserModel, userModel, cliOptions),
					userCmd);
			}
		}();
		return cmd;
	});
var $elm$core$Platform$worker = _Platform_worker;
var $dillonkearns$elm_cli_options_parser$Cli$Program$stateful = function (options) {
	return $elm$core$Platform$worker(
		{
			init: $dillonkearns$elm_cli_options_parser$Cli$Program$statefulInit(options),
			subscriptions: function (model) {
				if (model.$ === 'UserModel') {
					var actualModel = model.a;
					var cliOptions = model.b;
					return options.subscriptions(actualModel);
				} else {
					return $elm$core$Platform$Sub$none;
				}
			},
			update: F2(
				function (msg, model) {
					if (model.$ === 'UserModel') {
						var actualModel = model.a;
						var cliOptions = model.b;
						var _v2 = A3(options.update, cliOptions, msg, actualModel);
						var userModel = _v2.a;
						var userCmd = _v2.b;
						return _Utils_Tuple2(
							A2($dillonkearns$elm_cli_options_parser$Cli$Program$UserModel, userModel, cliOptions),
							userCmd);
					} else {
						return _Utils_Tuple2($dillonkearns$elm_cli_options_parser$Cli$Program$ShowSystemMessage, $elm$core$Platform$Cmd$none);
					}
				})
		});
};
var $author$project$Actions$BreakAction = F2(
	function (a, b) {
		return {$: 'BreakAction', a: a, b: b};
	});
var $elm$core$Platform$Sub$map = _Platform_map;
var $author$project$Commands$Break$Actions$ReceiveFileContents = function (a) {
	return {$: 'ReceiveFileContents', a: a};
};
var $author$project$Ports$receiveFileContents = _Platform_incomingPort('receiveFileContents', $elm$json$Json$Decode$string);
var $author$project$Commands$Break$Subscriptions$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Ports$receiveFileContents($author$project$Commands$Break$Actions$ReceiveFileContents)
			]));
};
var $author$project$Subscriptions$subscriptions = function (model) {
	var command = model.command;
	switch (command.$) {
		case 'Break':
			var filename = command.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Actions$BreakAction(filename),
				$author$project$Commands$Break$Subscriptions$subscriptions(model));
		case 'Hint':
			return $elm$core$Platform$Sub$none;
		case 'Explain':
			return $elm$core$Platform$Sub$none;
		default:
			return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Actions$ExplainAction = F2(
	function (a, b) {
		return {$: 'ExplainAction', a: a, b: b};
	});
var $author$project$Actions$HintAction = F2(
	function (a, b) {
		return {$: 'HintAction', a: a, b: b};
	});
var $author$project$Actions$ResetAction = F2(
	function (a, b) {
		return {$: 'ResetAction', a: a, b: b};
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Breakers$Utils$candidates = F2(
	function (mapValidCandidate, segments) {
		return A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var index = _v0.a;
				var segment = _v0.b;
				return A2(
					$elm$core$Maybe$map,
					function (data) {
						return _Utils_Tuple2(index, data);
					},
					mapValidCandidate(segment));
			},
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, segments));
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Commands$Break$Update$determineChoiceProbability = function (_v0) {
	var breakTypeCount = _v0.breakTypeCount;
	var breakOpportunityCount = _v0.breakOpportunityCount;
	var totalBreakOpportunities = _v0.totalBreakOpportunities;
	return $elm$core$Basics$round(100 * (((breakOpportunityCount / totalBreakOpportunities) + (1.0 / breakTypeCount)) / 2.0));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Utils$List$pickRandom = F2(
	function (seed, candidateList) {
		var listSize = $elm$core$List$length(candidateList);
		if (listSize > 0) {
			var index = A2($elm$core$Basics$modBy, listSize, seed);
			return A2($elm_community$list_extra$List$Extra$getAt, index, candidateList);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Parsers$Generic$Segment$Word = {$: 'Word'};
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Utils$String$isAllCaps = function (string) {
	return _Utils_eq(
		$elm$core$String$toUpper(string),
		string);
};
var $author$project$Utils$String$isMoreThanOneCharacter = function (string) {
	return $elm$core$String$length(string) > 1;
};
var $author$project$Breakers$CaseSwap$validCandidateData = function (segment) {
	var content = segment.content;
	var segmentType = segment.segmentType;
	return (_Utils_eq(segmentType, $author$project$Parsers$Generic$Segment$Word) && ($author$project$Utils$String$isMoreThanOneCharacter(content) && (!$author$project$Utils$String$isAllCaps(content)))) ? $elm$core$Maybe$Just(segment) : $elm$core$Maybe$Nothing;
};
var $author$project$Breakers$ChangeFunctionArgs$validCandidateData = function (segment) {
	var segmentType = segment.segmentType;
	if (segmentType.$ === 'FunctionDeclaration') {
		var data = segmentType.a;
		var _arguments = data._arguments;
		var dataWithNewArgs = function (newArgs) {
			return {data: data, newArguments: newArgs, segment: segment};
		};
		if (!_arguments.b) {
			return $elm$core$Maybe$Just(
				dataWithNewArgs(
					_List_fromArray(
						['num'])));
		} else {
			if (!_arguments.b.b) {
				return $elm$core$Maybe$Just(
					dataWithNewArgs(_List_Nil));
			} else {
				var arg1 = _arguments.a;
				var _v2 = _arguments.b;
				var arg2 = _v2.a;
				var tail = _v2.b;
				return $elm$core$Maybe$Just(
					dataWithNewArgs(
						A2(
							$elm$core$List$cons,
							arg2,
							A2($elm$core$List$cons, arg1, tail))));
			}
		}
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Parsers$Generic$Segment$ParenthesisOrBracket = {$: 'ParenthesisOrBracket'};
var $author$project$Breakers$RemoveParenthesis$validCandidateData = function (segment) {
	var segmentType = segment.segmentType;
	return _Utils_eq(segmentType, $author$project$Parsers$Generic$Segment$ParenthesisOrBracket) ? $elm$core$Maybe$Just(segment) : $elm$core$Maybe$Nothing;
};
var $author$project$Parsers$Generic$Segment$ReturnStatement = {$: 'ReturnStatement'};
var $author$project$Breakers$RemoveReturn$validCandidateData = function (segment) {
	var segmentType = segment.segmentType;
	return _Utils_eq(segmentType, $author$project$Parsers$Generic$Segment$ReturnStatement) ? $elm$core$Maybe$Just(segment) : $elm$core$Maybe$Nothing;
};
var $author$project$Commands$Break$Update$chooseBreakType = F2(
	function (segments, _v0) {
		var breakTypeInt = _v0.breakTypeInt;
		var returnStatementCandidateCount = $elm$core$List$length(
			A2($author$project$Breakers$Utils$candidates, $author$project$Breakers$RemoveReturn$validCandidateData, segments));
		var parenthesisCandidateCount = $elm$core$List$length(
			A2($author$project$Breakers$Utils$candidates, $author$project$Breakers$RemoveParenthesis$validCandidateData, segments));
		var functionDeclarationCandidateCount = $elm$core$List$length(
			A2($author$project$Breakers$Utils$candidates, $author$project$Breakers$ChangeFunctionArgs$validCandidateData, segments));
		var caseSwapCandidateCount = $elm$core$List$length(
			A2($author$project$Breakers$Utils$candidates, $author$project$Breakers$CaseSwap$validCandidateData, segments));
		var totalCandidateCount = ((caseSwapCandidateCount + returnStatementCandidateCount) + parenthesisCandidateCount) + functionDeclarationCandidateCount;
		var viableBreakTypePossibilities = A2(
			$elm$core$List$filter,
			function (_v3) {
				var count = _v3.b;
				return count > 0;
			},
			_List_fromArray(
				[
					_Utils_Tuple2($author$project$Utils$Types$BreakType$CaseSwap, caseSwapCandidateCount),
					_Utils_Tuple2($author$project$Utils$Types$BreakType$RemoveReturn, returnStatementCandidateCount),
					_Utils_Tuple2($author$project$Utils$Types$BreakType$RemoveParenthesis, parenthesisCandidateCount),
					_Utils_Tuple2($author$project$Utils$Types$BreakType$ChangeFunctionArgs, functionDeclarationCandidateCount)
				]));
		var totalViableBreakTypes = $elm$core$List$length(viableBreakTypePossibilities);
		var breakTypeProbabilities = A2(
			$elm$core$List$map,
			function (_v2) {
				var breakType = _v2.a;
				var count = _v2.b;
				return _Utils_Tuple2(
					breakType,
					$author$project$Commands$Break$Update$determineChoiceProbability(
						{breakOpportunityCount: count, breakTypeCount: totalViableBreakTypes, totalBreakOpportunities: totalCandidateCount}));
			},
			viableBreakTypePossibilities);
		return A2(
			$author$project$Utils$List$pickRandom,
			breakTypeInt,
			A2(
				$elm$core$List$concatMap,
				function (_v1) {
					var breakType = _v1.a;
					var breakPercent = _v1.b;
					return A2($elm$core$List$repeat, breakPercent, breakType);
				},
				breakTypeProbabilities));
	});
var $author$project$Parsers$Generic$Segment$Segment = F3(
	function (offset, content, segmentType) {
		return {content: content, offset: offset, segmentType: segmentType};
	});
var $author$project$Breakers$Utils$chooseCandidate = F3(
	function (randomNumber, mapValidCandidate, segments) {
		return A2(
			$author$project$Utils$List$pickRandom,
			randomNumber,
			A2($author$project$Breakers$Utils$candidates, mapValidCandidate, segments));
	});
var $author$project$Breakers$Utils$segmentsToContent = function (segments) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Basics$append,
		'',
		A2(
			$elm$core$List$map,
			function ($) {
				return $.content;
			},
			segments));
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			var head = A2($elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			$elm_community$list_extra$List$Extra$updateAt,
			index,
			$elm$core$Basics$always(value));
	});
var $elm_community$string_extra$String$Extra$changeCase = F2(
	function (mutator, word) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var head = _v0.a;
					var tail = _v0.b;
					return A2(
						$elm$core$String$cons,
						mutator(head),
						tail);
				},
				$elm$core$String$uncons(word)));
	});
var $elm$core$Char$toLower = _Char_toLower;
var $elm_community$string_extra$String$Extra$decapitalize = function (word) {
	return A2($elm_community$string_extra$String$Extra$changeCase, $elm$core$Char$toLower, word);
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$Char$toUpper = _Char_toUpper;
var $elm_community$string_extra$String$Extra$toSentenceCase = function (word) {
	return A2($elm_community$string_extra$String$Extra$changeCase, $elm$core$Char$toUpper, word);
};
var $elm_community$string_extra$String$Extra$toTitleCase = function (ws) {
	var uppercaseMatch = A2(
		$elm$regex$Regex$replace,
		$elm_community$string_extra$String$Extra$regexFromString('\\w+'),
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.match;
			},
			$elm_community$string_extra$String$Extra$toSentenceCase));
	return A3(
		$elm$regex$Regex$replace,
		$elm_community$string_extra$String$Extra$regexFromString('^([a-z])|\\s+([a-z])'),
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.match;
			},
			uppercaseMatch),
		ws);
};
var $author$project$Utils$String$isTitleCase = function (string) {
	return _Utils_eq(
		$elm_community$string_extra$String$Extra$toTitleCase(string),
		string);
};
var $author$project$Utils$String$toggleTitleCase = function (string) {
	return $author$project$Utils$String$isTitleCase(string) ? $elm_community$string_extra$String$Extra$decapitalize(string) : $elm_community$string_extra$String$Extra$toTitleCase(string);
};
var $author$project$Breakers$CaseSwap$run = F2(
	function (randomNumber, segments) {
		return A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var index = _v0.a;
				var content = _v0.b.content;
				var offset = _v0.b.offset;
				var newWord = $author$project$Utils$String$toggleTitleCase(content);
				return _Utils_Tuple2(
					$author$project$Breakers$Utils$segmentsToContent(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							index,
							A3($author$project$Parsers$Generic$Segment$Segment, offset, newWord, $author$project$Parsers$Generic$Segment$Word),
							segments)),
					{
						breakType: $author$project$Utils$Types$BreakType$CaseSwap,
						replacementData: {
							newContent: {
								content: newWord,
								end: offset + $elm$core$String$length(newWord),
								start: offset
							},
							originalContent: {
								content: content,
								end: offset + $elm$core$String$length(content),
								start: offset
							}
						}
					});
			},
			A3($author$project$Breakers$Utils$chooseCandidate, randomNumber, $author$project$Breakers$CaseSwap$validCandidateData, segments));
	});
var $author$project$Parsers$Generic$Segment$FunctionDeclaration = function (a) {
	return {$: 'FunctionDeclaration', a: a};
};
var $author$project$Parsers$Generic$Segment$functionDeclarationDataToString = function (_v0) {
	var precedingWhitespace = _v0.precedingWhitespace;
	var declarationWord = _v0.declarationWord;
	var name = _v0.name;
	var _arguments = _v0._arguments;
	return precedingWhitespace + (declarationWord + (name + ('(' + (A2($elm$core$String$join, ', ', _arguments) + ')'))));
};
var $author$project$Breakers$ChangeFunctionArgs$run = F2(
	function (randomNumber, segments) {
		return A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var index = _v0.a;
				var segment = _v0.b.segment;
				var data = _v0.b.data;
				var newArguments = _v0.b.newArguments;
				var newFuncData = _Utils_update(
					data,
					{_arguments: newArguments});
				var newFuncString = $author$project$Parsers$Generic$Segment$functionDeclarationDataToString(newFuncData);
				return _Utils_Tuple2(
					$author$project$Breakers$Utils$segmentsToContent(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							index,
							A3(
								$author$project$Parsers$Generic$Segment$Segment,
								segment.offset,
								newFuncString,
								$author$project$Parsers$Generic$Segment$FunctionDeclaration(newFuncData)),
							segments)),
					{
						breakType: $author$project$Utils$Types$BreakType$ChangeFunctionArgs,
						replacementData: {
							newContent: {
								content: newFuncString,
								end: segment.offset + $elm$core$String$length(newFuncString),
								start: segment.offset
							},
							originalContent: {
								content: segment.content,
								end: segment.offset + $elm$core$String$length(segment.content),
								start: segment.offset
							}
						}
					});
			},
			A3($author$project$Breakers$Utils$chooseCandidate, randomNumber, $author$project$Breakers$ChangeFunctionArgs$validCandidateData, segments));
	});
var $elm$core$String$filter = _String_filter;
var $author$project$Breakers$RemoveParenthesis$isParenOrBracket = function (_char) {
	return A2(
		$elm$core$List$member,
		_char,
		_List_fromArray(
			[
				_Utils_chr('{'),
				_Utils_chr('}'),
				_Utils_chr('('),
				_Utils_chr(')'),
				_Utils_chr('['),
				_Utils_chr(']')
			]));
};
var $author$project$Breakers$RemoveParenthesis$run = F2(
	function (randomNumber, segments) {
		return A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var index = _v0.a;
				var content = _v0.b.content;
				var offset = _v0.b.offset;
				var newContent = A2(
					$elm$core$String$filter,
					A2($elm$core$Basics$composeL, $elm$core$Basics$not, $author$project$Breakers$RemoveParenthesis$isParenOrBracket),
					content);
				return _Utils_Tuple2(
					$author$project$Breakers$Utils$segmentsToContent(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							index,
							A3($author$project$Parsers$Generic$Segment$Segment, offset, newContent, $author$project$Parsers$Generic$Segment$ReturnStatement),
							segments)),
					{
						breakType: $author$project$Utils$Types$BreakType$RemoveParenthesis,
						replacementData: {
							newContent: {
								content: newContent,
								end: offset + $elm$core$String$length(newContent),
								start: offset
							},
							originalContent: {
								content: content,
								end: offset + $elm$core$String$length(content),
								start: offset
							}
						}
					});
			},
			A3($author$project$Breakers$Utils$chooseCandidate, randomNumber, $author$project$Breakers$RemoveParenthesis$validCandidateData, segments));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $author$project$Breakers$RemoveReturn$run = F2(
	function (randomNumber, segments) {
		return A2(
			$elm$core$Maybe$map,
			function (_v0) {
				var index = _v0.a;
				var content = _v0.b.content;
				var offset = _v0.b.offset;
				return _Utils_Tuple2(
					$author$project$Breakers$Utils$segmentsToContent(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							index,
							A3(
								$author$project$Parsers$Generic$Segment$Segment,
								offset,
								A2($elm$core$String$dropRight, 7, content),
								$author$project$Parsers$Generic$Segment$ReturnStatement),
							segments)),
					{
						breakType: $author$project$Utils$Types$BreakType$RemoveReturn,
						replacementData: {
							newContent: {
								content: '',
								end: offset + $elm$core$String$length(''),
								start: offset
							},
							originalContent: {
								content: content,
								end: offset + $elm$core$String$length(content),
								start: offset
							}
						}
					});
			},
			A3($author$project$Breakers$Utils$chooseCandidate, randomNumber, $author$project$Breakers$RemoveReturn$validCandidateData, segments));
	});
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $author$project$Parsers$Utils$Repeat$loopHelp = F2(
	function (parseOne, revList) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (stmt) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, stmt, revList));
						}),
					parseOne),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$List$reverse(revList));
					},
					$elm$parser$Parser$succeed(_Utils_Tuple0))
				]));
	});
var $author$project$Parsers$Utils$Repeat$oneOrMore = function (parseOne) {
	var loopRemaining = function (firstOne) {
		return A2(
			$elm$parser$Parser$loop,
			_List_fromArray(
				[firstOne]),
			$author$project$Parsers$Utils$Repeat$loopHelp(parseOne));
	};
	return A2($elm$parser$Parser$andThen, loopRemaining, parseOne);
};
var $author$project$Parsers$Generic$Segment$Other = {$: 'Other'};
var $author$project$Parsers$Generic$Segment$Whitespace = {$: 'Whitespace'};
var $author$project$Parsers$Generic$Segment$FunctionDeclarationData = F4(
	function (precedingWhitespace, declarationWord, name, _arguments) {
		return {_arguments: _arguments, declarationWord: declarationWord, name: name, precedingWhitespace: precedingWhitespace};
	});
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0.a;
	return $elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 'Bad') {
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _v1.b;
				var s1 = _v1.c;
				return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $author$project$Parsers$Utils$Whitespace$isValidWhiteSpace = function (_char) {
	return _Utils_eq(
		_char,
		_Utils_chr(' ')) || (_Utils_eq(
		_char,
		_Utils_chr('\n')) || (_Utils_eq(
		_char,
		_Utils_chr('\u000D')) || _Utils_eq(
		_char,
		_Utils_chr('\t'))));
};
var $author$project$Parsers$Utils$Whitespace$optional = $elm$parser$Parser$chompWhile($author$project$Parsers$Utils$Whitespace$isValidWhiteSpace);
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Parsers$Utils$Repeat$commaSeparator = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$backtrackable(
			A2(
				$elm$parser$Parser$ignorer,
				$author$project$Parsers$Utils$Whitespace$optional,
				$elm$parser$Parser$symbol(',')))),
	$author$project$Parsers$Utils$Whitespace$optional);
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $author$project$Parsers$Utils$Whitespace$one = $elm$parser$Parser$chompIf($author$project$Parsers$Utils$Whitespace$isValidWhiteSpace);
var $author$project$Parsers$Utils$Whitespace$oneOrMore = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$author$project$Parsers$Utils$Whitespace$one),
	$author$project$Parsers$Utils$Whitespace$optional);
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $author$project$Parsers$Generic$Parser$isWordCharacter = function (_char) {
	return $elm$core$Char$isAlphaNum(_char) || A2(
		$elm$core$List$member,
		_char,
		_List_fromArray(
			[
				_Utils_chr('_'),
				_Utils_chr('-')
			]));
};
var $author$project$Parsers$Generic$Parser$wordCharacter = $elm$parser$Parser$chompIf($author$project$Parsers$Generic$Parser$isWordCharacter);
var $author$project$Parsers$Generic$Parser$word = $elm$parser$Parser$getChompedString(
	$author$project$Parsers$Utils$Repeat$oneOrMore($author$project$Parsers$Generic$Parser$wordCharacter));
var $author$project$Parsers$Utils$Repeat$zeroOrMore = function (parseOne) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		$author$project$Parsers$Utils$Repeat$loopHelp(parseOne));
};
var $author$project$Parsers$Utils$Repeat$oneOrMoreWithSeparator = F2(
	function (separator, parseOne) {
		return A2(
			$elm$parser$Parser$andThen,
			function (firstElement) {
				return A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (theRest) {
							return A2($elm$core$List$cons, firstElement, theRest);
						}),
					$author$project$Parsers$Utils$Repeat$zeroOrMore(
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$backtrackable(separator)),
							parseOne)));
			},
			parseOne);
	});
var $author$project$Parsers$Utils$Repeat$zeroOrMoreWithSeparator = F2(
	function (separator, parseOne) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2($author$project$Parsers$Utils$Repeat$oneOrMoreWithSeparator, separator, parseOne),
					$elm$parser$Parser$succeed(_List_Nil)
				]));
	});
var $author$project$Parsers$Generic$Parser$functionDeclaration = $elm$parser$Parser$backtrackable(
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($author$project$Parsers$Generic$Segment$FunctionDeclarationData),
					$elm$parser$Parser$getChompedString($author$project$Parsers$Utils$Whitespace$oneOrMore)),
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$token('function '),
								$elm$parser$Parser$token('def ')
							])))),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$getChompedString($author$project$Parsers$Generic$Parser$word),
				$elm$parser$Parser$token('('))),
		A2(
			$elm$parser$Parser$ignorer,
			A2($author$project$Parsers$Utils$Repeat$zeroOrMoreWithSeparator, $author$project$Parsers$Utils$Repeat$commaSeparator, $author$project$Parsers$Generic$Parser$word),
			$elm$parser$Parser$token(')'))));
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $author$project$Parsers$Generic$Parser$functionDeclarationWithContent = A2(
	$elm$parser$Parser$andThen,
	function (string) {
		var _v0 = A2($elm$parser$Parser$run, $author$project$Parsers$Generic$Parser$functionDeclaration, string);
		if (_v0.$ === 'Ok') {
			var validFunctionDeclaration = _v0.a;
			return $elm$parser$Parser$succeed(
				_Utils_Tuple2(string, validFunctionDeclaration));
		} else {
			return $elm$parser$Parser$problem('Script error: parsed function declaration successfully once ' + 'and then failed just after with the same content???');
		}
	},
	$elm$parser$Parser$getChompedString($author$project$Parsers$Generic$Parser$functionDeclaration));
var $elm$parser$Parser$Advanced$getOffset = $elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $author$project$Parsers$Generic$Parser$isOtherCharacter = function (_char) {
	return (!$author$project$Parsers$Generic$Parser$isWordCharacter(_char)) && (!$author$project$Parsers$Utils$Whitespace$isValidWhiteSpace(_char));
};
var $author$project$Parsers$Generic$Parser$otherCharacter = $elm$parser$Parser$chompIf($author$project$Parsers$Generic$Parser$isOtherCharacter);
var $author$project$Parsers$Generic$Parser$parenthesisOrBracket = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			$elm$parser$Parser$token('{'),
			$elm$parser$Parser$token('}'),
			$elm$parser$Parser$token('('),
			$elm$parser$Parser$token(')'),
			$elm$parser$Parser$token('['),
			$elm$parser$Parser$token(']')
		]));
var $author$project$Parsers$Generic$Parser$parenthesisOrBracketAtStartOrEndOfLine = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(_Utils_Tuple0),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$elm$parser$Parser$backtrackable(
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed(_Utils_Tuple0),
								$elm$parser$Parser$token('\n')),
							$author$project$Parsers$Utils$Repeat$zeroOrMore(
								$elm$parser$Parser$token(' '))),
						$author$project$Parsers$Generic$Parser$parenthesisOrBracket),
					$author$project$Parsers$Utils$Repeat$zeroOrMore(
						$elm$parser$Parser$token(' ')))),
				$elm$parser$Parser$backtrackable(
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed(_Utils_Tuple0),
								$author$project$Parsers$Utils$Repeat$zeroOrMore(
									$elm$parser$Parser$token(' '))),
							$author$project$Parsers$Generic$Parser$parenthesisOrBracket),
						$author$project$Parsers$Utils$Repeat$zeroOrMore(
							$elm$parser$Parser$token(' '))),
					$elm$parser$Parser$token('\n')))
			])));
var $author$project$Parsers$Generic$Parser$returnStatement = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$backtrackable(
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(_Utils_Tuple0),
					$author$project$Parsers$Utils$Whitespace$oneOrMore),
				$elm$parser$Parser$token('return')))),
	$author$project$Parsers$Utils$Whitespace$one);
var $author$project$Parsers$Generic$Parser$segment = A2(
	$elm$parser$Parser$andThen,
	function (offset) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (content) {
						return A3($author$project$Parsers$Generic$Segment$Segment, offset, content, $author$project$Parsers$Generic$Segment$ReturnStatement);
					},
					$elm$parser$Parser$getChompedString($author$project$Parsers$Generic$Parser$returnStatement)),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						var content = _v0.a;
						var data = _v0.b;
						return A3(
							$author$project$Parsers$Generic$Segment$Segment,
							offset,
							content,
							$author$project$Parsers$Generic$Segment$FunctionDeclaration(data));
					},
					$author$project$Parsers$Generic$Parser$functionDeclarationWithContent),
					A2(
					$elm$parser$Parser$map,
					function (content) {
						return A3($author$project$Parsers$Generic$Segment$Segment, offset, content, $author$project$Parsers$Generic$Segment$ParenthesisOrBracket);
					},
					$elm$parser$Parser$getChompedString($author$project$Parsers$Generic$Parser$parenthesisOrBracketAtStartOrEndOfLine)),
					A2(
					$elm$parser$Parser$map,
					function (content) {
						return A3($author$project$Parsers$Generic$Segment$Segment, offset, content, $author$project$Parsers$Generic$Segment$Word);
					},
					$elm$parser$Parser$getChompedString($author$project$Parsers$Generic$Parser$word)),
					A2(
					$elm$parser$Parser$map,
					function (content) {
						return A3($author$project$Parsers$Generic$Segment$Segment, offset, content, $author$project$Parsers$Generic$Segment$Whitespace);
					},
					$elm$parser$Parser$getChompedString($author$project$Parsers$Utils$Whitespace$oneOrMore)),
					A2(
					$elm$parser$Parser$map,
					function (content) {
						return A3($author$project$Parsers$Generic$Segment$Segment, offset, content, $author$project$Parsers$Generic$Segment$Other);
					},
					$elm$parser$Parser$getChompedString(
						$author$project$Parsers$Utils$Repeat$oneOrMore($author$project$Parsers$Generic$Parser$otherCharacter)))
				]));
	},
	$elm$parser$Parser$getOffset);
var $author$project$Parsers$Generic$Parser$segments = $author$project$Parsers$Utils$Repeat$oneOrMore($author$project$Parsers$Generic$Parser$segment);
var $author$project$Parsers$Generic$Parser$run = function (string) {
	return A2($elm$parser$Parser$run, $author$project$Parsers$Generic$Parser$segments, string);
};
var $author$project$Model$SavedData$init = {changedFiles: $elm$core$Dict$empty};
var $author$project$Model$SavedData$savedDataOrInit = function (savedDataResult) {
	if (savedDataResult.$ === 'Ok') {
		var data = savedDataResult.a;
		return data;
	} else {
		return $author$project$Model$SavedData$init;
	}
};
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Model$SavedData$setChange = F2(
	function (_v0, model) {
		var filepath = _v0.filepath;
		var workingDirectory = _v0.workingDirectory;
		var fileContent = _v0.fileContent;
		var change = _v0.change;
		var changedFiles = model.changedFiles;
		return _Utils_update(
			model,
			{
				changedFiles: A3(
					$elm$core$Dict$update,
					A2($author$project$Model$SavedData$fullPathString, workingDirectory, filepath),
					function (maybeFileData) {
						if (maybeFileData.$ === 'Just') {
							var fileData = maybeFileData.a;
							return $elm$core$Maybe$Just(
								_Utils_update(
									fileData,
									{change: change}));
						} else {
							return $elm$core$Maybe$Just(
								{change: change, hintsGiven: 0, originalContent: fileContent});
						}
					},
					changedFiles)
			});
	});
var $author$project$Commands$Break$Update$update = F3(
	function (filepath, action, model) {
		var contents = action.a;
		var maybeChange = function () {
			var _v3 = $author$project$Parsers$Generic$Parser$run(contents);
			if (_v3.$ === 'Ok') {
				var segments = _v3.a;
				var maybeBreakType = A2($author$project$Commands$Break$Update$chooseBreakType, segments, model.randomNumbers);
				if (maybeBreakType.$ === 'Just') {
					switch (maybeBreakType.a.$) {
						case 'CaseSwap':
							var _v5 = maybeBreakType.a;
							return A2($author$project$Breakers$CaseSwap$run, model.randomNumbers.segmentToBreakInt, segments);
						case 'RemoveReturn':
							var _v6 = maybeBreakType.a;
							return A2($author$project$Breakers$RemoveReturn$run, model.randomNumbers.segmentToBreakInt, segments);
						case 'RemoveParenthesis':
							var _v7 = maybeBreakType.a;
							return A2($author$project$Breakers$RemoveParenthesis$run, model.randomNumbers.segmentToBreakInt, segments);
						default:
							var _v8 = maybeBreakType.a;
							return A2($author$project$Breakers$ChangeFunctionArgs$run, model.randomNumbers.segmentToBreakInt, segments);
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			} else {
				var error = _v3.a;
				return $elm$core$Maybe$Nothing;
			}
		}();
		if (maybeChange.$ === 'Just') {
			var _v2 = maybeChange.a;
			var newContents = _v2.a;
			var replacementData = _v2.b;
			var oldSavedData = $author$project$Model$SavedData$savedDataOrInit(model.savedDataResult);
			var newSavedData = A2(
				$author$project$Model$SavedData$setChange,
				{change: replacementData, fileContent: contents, filepath: filepath, workingDirectory: model.workingDirectory},
				oldSavedData);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						command: $author$project$Model$Break(filepath)
					}),
				$author$project$Ports$writeFileWith(
					{contents: newContents, dataToSave: newSavedData, path: filepath}));
		} else {
			return _Utils_Tuple2(
				model,
				$author$project$Ports$printAndExitFailure('Error: unable to find a good way to introduce an error into this file.'));
		}
	});
var $author$project$Commands$Explain$Update$update = F3(
	function (filepath, action, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Commands$Hint$Update$update = F3(
	function (filepath, action, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Commands$Reset$Update$update = F3(
	function (filepath, action, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Update$update = F3(
	function (_v0, action, model) {
		switch (action.$) {
			case 'BreakAction':
				var filepath = action.a;
				var subAction = action.b;
				var _v2 = A3($author$project$Commands$Break$Update$update, filepath, subAction, model);
				var newModel = _v2.a;
				var cmd = _v2.b;
				return _Utils_Tuple2(
					newModel,
					A2(
						$elm$core$Platform$Cmd$map,
						$author$project$Actions$BreakAction(filepath),
						cmd));
			case 'HintAction':
				var filepath = action.a;
				var subAction = action.b;
				var _v3 = A3($author$project$Commands$Hint$Update$update, filepath, subAction, model);
				var newModel = _v3.a;
				var cmd = _v3.b;
				return _Utils_Tuple2(
					newModel,
					A2(
						$elm$core$Platform$Cmd$map,
						$author$project$Actions$HintAction(filepath),
						cmd));
			case 'ExplainAction':
				var filepath = action.a;
				var subAction = action.b;
				var _v4 = A3($author$project$Commands$Explain$Update$update, filepath, subAction, model);
				var newModel = _v4.a;
				var cmd = _v4.b;
				return _Utils_Tuple2(
					newModel,
					A2(
						$elm$core$Platform$Cmd$map,
						$author$project$Actions$ExplainAction(filepath),
						cmd));
			default:
				var filepath = action.a;
				var subAction = action.b;
				var _v5 = A3($author$project$Commands$Reset$Update$update, filepath, subAction, model);
				var newModel = _v5.a;
				var cmd = _v5.b;
				return _Utils_Tuple2(
					newModel,
					A2(
						$elm$core$Platform$Cmd$map,
						$author$project$Actions$ResetAction(filepath),
						cmd));
		}
	});
var $author$project$Main$main = $dillonkearns$elm_cli_options_parser$Cli$Program$stateful(
	{config: $author$project$Main$programConfig, init: $author$project$Main$init, printAndExitFailure: $author$project$Ports$printAndExitFailure, printAndExitSuccess: $author$project$Ports$printAndExitSuccess, subscriptions: $author$project$Subscriptions$subscriptions, update: $author$project$Update$update});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (workingDirectory) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (versionMessage) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (randomNumber2) {
							return A2(
								$elm$json$Json$Decode$andThen,
								function (randomNumber1) {
									return A2(
										$elm$json$Json$Decode$andThen,
										function (dataFilePath) {
											return A2(
												$elm$json$Json$Decode$andThen,
												function (data) {
													return A2(
														$elm$json$Json$Decode$andThen,
														function (argv) {
															return $elm$json$Json$Decode$succeed(
																{argv: argv, data: data, dataFilePath: dataFilePath, randomNumber1: randomNumber1, randomNumber2: randomNumber2, versionMessage: versionMessage, workingDirectory: workingDirectory});
														},
														A2(
															$elm$json$Json$Decode$field,
															'argv',
															$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
												},
												A2(
													$elm$json$Json$Decode$field,
													'data',
													$elm$json$Json$Decode$oneOf(
														_List_fromArray(
															[
																$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
																A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $elm$json$Json$Decode$string)
															]))));
										},
										A2($elm$json$Json$Decode$field, 'dataFilePath', $elm$json$Json$Decode$string));
								},
								A2($elm$json$Json$Decode$field, 'randomNumber1', $elm$json$Json$Decode$int));
						},
						A2($elm$json$Json$Decode$field, 'randomNumber2', $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$field, 'versionMessage', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'workingDirectory', $elm$json$Json$Decode$string)))({"versions":{"elm":"0.19.1"},"types":{"message":"Actions.Action","aliases":{},"unions":{"Actions.Action":{"args":[],"tags":{"BreakAction":["Utils.Types.FilePath.FilePath","Commands.Break.Actions.Action"],"HintAction":["Utils.Types.FilePath.FilePath","Commands.Hint.Actions.Action"],"ExplainAction":["Utils.Types.FilePath.FilePath","Commands.Explain.Actions.Action"],"ResetAction":["Utils.Types.FilePath.FilePath","Commands.Reset.Actions.Action"]}},"Commands.Break.Actions.Action":{"args":[],"tags":{"ReceiveFileContents":["String.String"]}},"Commands.Explain.Actions.Action":{"args":[],"tags":{"NoOp":[]}},"Commands.Hint.Actions.Action":{"args":[],"tags":{"NoOp":[]}},"Commands.Reset.Actions.Action":{"args":[],"tags":{"NoOp":[]}},"Utils.Types.FilePath.FilePath":{"args":[],"tags":{"FilePath":["String.String"]}},"String.String":{"args":[],"tags":{"String":[]}}}}})}});}(this));
},{}],"ports/print.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function default_1(program) {
  program.ports.print.subscribe(function (message) {
    console.log(message);
  });
}

exports.default = default_1;
},{}],"ports/printAndExitFailure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function default_1(program) {
  program.ports.printAndExitFailure.subscribe(function (message) {
    console.error(message);
    process.exit(1);
  });
}

exports.default = default_1;
},{}],"ports/printAndExitSuccess.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function default_1(program) {
  program.ports.printAndExitSuccess.subscribe(function (message) {
    console.log(message);
    process.exit(0);
  });
}

exports.default = default_1;
},{}],"logging.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devLog = void 0;
var loggingIsOn = process.argv.includes('--log') || process.argv.includes('-l');

function devLog() {
  var messages = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    messages[_i] = arguments[_i];
  }

  if (loggingIsOn) {
    messages[0] = "[dev info]: " + messages[0];
    console.log.apply(console, messages);
  }
}

exports.devLog = devLog;
},{}],"ports/readFile.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs_1 = __importDefault(require("fs"));

var devLog = require('../logging').devLog;

function default_1(program) {
  program.ports.readFile.subscribe(function (filepath) {
    devLog("Reading contents of " + filepath + "...");
    fs_1.default.readFile(filepath, 'utf8', function (err, contents) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      program.ports.receiveFileContents.send(contents);
    });
  });
}

exports.default = default_1;
},{"../logging":"logging.ts"}],"../tests_end_to_end/testHelpers.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTestFile = exports.clearSaveFile = exports.readTestFile = exports.createTestFileWithContent = exports.runResetCommand = exports.runHintCommand = exports.runBreakCommand = exports.dataFileName = exports.testFileName = void 0;

var fs_1 = __importDefault(require("fs"));

var child_process_1 = require("child_process");

exports.testFileName = "testfile.txt";
exports.dataFileName = "debug_trainer_test_save_file.json";

function runBreakCommand() {
  return runCommand("break " + exports.testFileName);
}

exports.runBreakCommand = runBreakCommand;

function runHintCommand(hintNumber) {
  if (hintNumber) {
    return runCommand("hint --hint-number " + hintNumber + " " + exports.testFileName);
  } else {
    return runCommand("hint " + exports.testFileName);
  }
}

exports.runHintCommand = runHintCommand;

function runResetCommand() {
  return runCommand("reset " + exports.testFileName);
}

exports.runResetCommand = runResetCommand;

function runCommand(command) {
  return child_process_1.execSync("node ./bin/debug_trainer " + command + " --test").toString();
}

function createTestFileWithContent(content) {
  fs_1.default.writeFileSync(exports.testFileName, content);
}

exports.createTestFileWithContent = createTestFileWithContent;

function readTestFile() {
  return fs_1.default.readFileSync(exports.testFileName, 'utf8');
}

exports.readTestFile = readTestFile;

function clearSaveFile() {
  if (fs_1.default.existsSync(exports.dataFileName)) {
    fs_1.default.unlinkSync(exports.dataFileName);
  }
}

exports.clearSaveFile = clearSaveFile;

function clearTestFile() {
  if (fs_1.default.existsSync(exports.testFileName)) {
    fs_1.default.unlinkSync(exports.testFileName);
  }
}

exports.clearTestFile = clearTestFile;
},{}],"savedData.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.load = exports.dataFilePath = void 0;

var fs_1 = __importDefault(require("fs"));

var os_1 = __importDefault(require("os"));

var logging_1 = require("./logging");

var TestHelpers = __importStar(require("../tests_end_to_end/testHelpers"));

exports.dataFilePath = process.argv.includes('--test') ? TestHelpers.dataFileName : os_1.default.homedir() + "/.debug_trainer.json";

function load() {
  logging_1.devLog("Loading data from " + exports.dataFilePath + "...");

  if (fs_1.default.existsSync(exports.dataFilePath)) {
    return fs_1.default.readFileSync(exports.dataFilePath, 'utf8');
  } else {
    return null;
  }
}

exports.load = load;

function save(saveDataContents) {
  logging_1.devLog("Saving data to " + exports.dataFilePath + "...");

  if (!fs_1.default.existsSync(exports.dataFilePath)) {
    fs_1.default.closeSync(fs_1.default.openSync(exports.dataFilePath, 'w'));
  }

  var contents = JSON.stringify(saveDataContents, null, "  ");
  fs_1.default.writeFile(exports.dataFilePath, contents, function (err) {
    // console.log('contents:', contents)
    if (err) {
      console.error(err);
      process.exit(1);
    }

    logging_1.devLog('Data successfully saved!');
    process.exit(0);
  });
}

exports.save = save;
},{"./logging":"logging.ts","../tests_end_to_end/testHelpers":"../tests_end_to_end/testHelpers.ts"}],"ports/writeFile.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs_1 = __importDefault(require("fs"));

var SavedData = __importStar(require("../savedData"));

var logging_1 = require("../logging");

function default_1(program) {
  program.ports.writeFile.subscribe(function (fileData) {
    logging_1.devLog("Writing new contents of " + fileData.path + "...");
    fs_1.default.writeFile(fileData.path, fileData.contents, function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      logging_1.devLog('New file contents written!');
      SavedData.save(fileData.dataToSave); // console.log('Good luck debugging!')
      // process.exit(0)
    });
  });
}

exports.default = default_1;
},{"../savedData":"savedData.ts","../logging":"logging.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0; // @ts-ignore

var Main_elm_1 = require("../elm/Main.elm");

var print_1 = __importDefault(require("./ports/print"));

var printAndExitFailure_1 = __importDefault(require("./ports/printAndExitFailure"));

var printAndExitSuccess_1 = __importDefault(require("./ports/printAndExitSuccess"));

var readFile_1 = __importDefault(require("./ports/readFile"));

var writeFile_1 = __importDefault(require("./ports/writeFile"));

var SavedData = __importStar(require("./savedData"));

var logging_1 = require("./logging");

function run() {
  var data = SavedData.load();
  logging_1.devLog.apply(void 0, __spreadArrays(['process.argv:'], process.argv));
  logging_1.devLog('data:', data);
  var program = Main_elm_1.Elm.Main.init({
    flags: {
      argv: process.argv,
      randomNumber1: getRandomInt(1000000),
      randomNumber2: getRandomInt(1000000),
      dataFilePath: SavedData.dataFilePath,
      workingDirectory: process.cwd(),
      data: data,
      versionMessage: "3.2.0"
    }
  });
  var portFunctions = [print_1.default, printAndExitFailure_1.default, printAndExitSuccess_1.default, readFile_1.default, writeFile_1.default];
  portFunctions.forEach(function (portSetupFunction) {
    portSetupFunction(program);
  });
}

exports.run = run;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
},{"../elm/Main.elm":"../elm/Main.elm","./ports/print":"ports/print.ts","./ports/printAndExitFailure":"ports/printAndExitFailure.ts","./ports/printAndExitSuccess":"ports/printAndExitSuccess.ts","./ports/readFile":"ports/readFile.ts","./ports/writeFile":"ports/writeFile.ts","./savedData":"savedData.ts","./logging":"logging.ts"}]},{},["main.ts"], null)
//# sourceMappingURL=/debug_trainer.js.map
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

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


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
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
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
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Ports$print = _Platform_outgoingPort('print', $elm$json$Json$Encode$string);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Simple$init = F2(
	function (flags, _v0) {
		var maybeGreeting = _v0.maybeGreeting;
		var name = _v0.name;
		return $author$project$Ports$print(
			function (greeting) {
				return greeting + (' ' + (name + '!'));
			}(
				A2($elm$core$Maybe$withDefault, 'Hello', maybeGreeting)));
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Ports$printAndExitFailure = _Platform_outgoingPort('printAndExitFailure', $elm$json$Json$Encode$string);
var $author$project$Ports$printAndExitSuccess = _Platform_outgoingPort('printAndExitSuccess', $elm$json$Json$Encode$string);
var $author$project$Simple$GreetOptions = F2(
	function (name, maybeGreeting) {
		return {maybeGreeting: maybeGreeting, name: name};
	});
var $elm$core$Basics$identity = function (x) {
	return x;
};
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
var $dillonkearns$elm_cli_options_parser$Cli$Program$config = $dillonkearns$elm_cli_options_parser$Cli$Program$Config(
	{optionsParsers: _List_Nil});
var $dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError = function (a) {
	return {$: 'MatchError', a: a};
};
var $dillonkearns$elm_cli_options_parser$Occurences$Optional = {$: 'Optional'};
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
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$FlagOrKeywordArg = F3(
	function (a, b, c) {
		return {$: 'FlagOrKeywordArg', a: a, b: b, c: c};
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
var $dillonkearns$elm_cli_options_parser$Occurences$Required = {$: 'Required'};
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
var $dillonkearns$elm_cli_options_parser$Tokenizer$parsedOptionToString = function (_v0) {
	var name = _v0.a;
	var optionKind = _v0.b;
	return name;
};
var $dillonkearns$elm_cli_options_parser$Cli$Option$requiredKeywordArg = function (optionName) {
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
				return $elm$core$Result$Err(
					$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError(
						'Expected to find option ' + (optionName + (' but only found options ' + $dillonkearns$elm_cli_options_parser$Cli$Option$listToString(
							A2($elm$core$List$map, $dillonkearns$elm_cli_options_parser$Tokenizer$parsedOptionToString, options))))));
			} else {
				if (_v1.a.b.$ === 'KeywordArg') {
					var _v3 = _v1.a;
					var optionArg = _v3.b.a;
					return $elm$core$Result$Ok(optionArg);
				} else {
					return $elm$core$Result$Err(
						$dillonkearns$elm_cli_options_parser$Cli$Decode$MatchError('Expected option ' + (optionName + ' to have arg but found none.')));
				}
			}
		},
		A2($dillonkearns$elm_cli_options_parser$Cli$UsageSpec$keywordArg, optionName, $dillonkearns$elm_cli_options_parser$Occurences$Required));
};
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
var $author$project$Simple$programConfig = A2(
	$dillonkearns$elm_cli_options_parser$Cli$Program$add,
	A2(
		$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
		$dillonkearns$elm_cli_options_parser$Cli$Option$optionalKeywordArg('greeting'),
		A2(
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$with,
			$dillonkearns$elm_cli_options_parser$Cli$Option$requiredKeywordArg('name'),
			$dillonkearns$elm_cli_options_parser$Cli$OptionsParser$build($author$project$Simple$GreetOptions))),
	$dillonkearns$elm_cli_options_parser$Cli$Program$config);
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
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$length = _String_length;
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$String$slice = _String_slice;
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
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $dillonkearns$elm_cli_options_parser$Fuzzy$initialModel = _List_Nil;
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
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
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
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
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
var $dillonkearns$elm_cli_options_parser$Tokenizer$Flag = {$: 'Flag'};
var $dillonkearns$elm_cli_options_parser$Tokenizer$ParsedOption = F2(
	function (a, b) {
		return {$: 'ParsedOption', a: a, b: b};
	});
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $dillonkearns$elm_cli_options_parser$Cli$UsageSpec$flag = F2(
	function (flagName, occurences) {
		return A3(
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$FlagOrKeywordArg,
			$dillonkearns$elm_cli_options_parser$Cli$UsageSpec$Flag(flagName),
			$elm$core$Maybe$Nothing,
			occurences);
	});
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
var $dillonkearns$elm_cli_options_parser$Cli$Program$init = F2(
	function (options, flags) {
		var matchResult = A3($dillonkearns$elm_cli_options_parser$Cli$Program$run, options.config, flags.argv, flags.versionMessage);
		var cmd = function () {
			if (matchResult.$ === 'SystemMessage') {
				var exitStatus = matchResult.a;
				var message = matchResult.b;
				if (exitStatus.$ === 'Failure') {
					return options.printAndExitFailure(message);
				} else {
					return options.printAndExitSuccess(message);
				}
			} else {
				var msg = matchResult.a;
				return A2(options.init, flags, msg);
			}
		}();
		return _Utils_Tuple2(_Utils_Tuple0, cmd);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Platform$worker = _Platform_worker;
var $dillonkearns$elm_cli_options_parser$Cli$Program$stateless = function (options) {
	return $elm$core$Platform$worker(
		{
			init: $dillonkearns$elm_cli_options_parser$Cli$Program$init(options),
			subscriptions: function (_v0) {
				return $elm$core$Platform$Sub$none;
			},
			update: F2(
				function (msg, model) {
					return _Utils_Tuple2(_Utils_Tuple0, $elm$core$Platform$Cmd$none);
				})
		});
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$Simple$main = $dillonkearns$elm_cli_options_parser$Cli$Program$stateless(
	{config: $author$project$Simple$programConfig, init: $author$project$Simple$init, printAndExitFailure: $author$project$Ports$printAndExitFailure, printAndExitSuccess: $author$project$Ports$printAndExitSuccess});
_Platform_export({'Simple':{'init':$author$project$Simple$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (versionMessage) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (argv) {
					return $elm$json$Json$Decode$succeed(
						{argv: argv, versionMessage: versionMessage});
				},
				A2(
					$elm$json$Json$Decode$field,
					'argv',
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string)));
		},
		A2($elm$json$Json$Decode$field, 'versionMessage', $elm$json$Json$Decode$string)))(0)}});}(this));
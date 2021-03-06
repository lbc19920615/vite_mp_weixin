const getGlobal = function() {
	// if (typeof self !== 'undefined') { return self; }
	if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

export let global = getGlobal();

global.Object = Object
global.Array = Array
// global.Buffer = Buffer
global.DataView = DataView
global.Date = Date
global.Error = Error
global.Float32Array = Float32Array
global.Float64Array = Float64Array
global.Function = Function
global.Int8Array = Int8Array
global.Int16Array = Int16Array
global.Int32Array = Int32Array
global.Map = Map
global.Math = Math
global.Promise = Promise
global.RegExp = RegExp
global.Set = Set
global.String = String
global.Symbol = Symbol
global.TypeError = TypeError
global.Uint8Array = Uint8Array
global.Uint8ClampedArray = Uint8ClampedArray
global.Uint16Array = Uint16Array
global.Uint32Array = Uint32Array
global.WeakMap = WeakMap
global.clearTimeout = clearTimeout
global.isFinite = isFinite
global.parseInt = parseInt
global.setTimeout = setTimeout


import JSChaCha20 from "js-chacha20";
if (typeof global.crypto == "undefined") {
	const rand = makeRand();
	global.crypto = {
		getRandomValues(typedArray) {
			for (let i = 0; i < typedArray.length; i++) {
				typedArray[i] = rand(typedArray.BYTES_PER_ELEMENT);
			}
		}
	};
}

function makeRand() {
	// weakRand is used to generate start values.
	// The don't have to be "securely" random, but merely unpredictable.
	function weakRand(size) {
		let buf = new Uint8Array(size);
		for (let i = 0; i < size; i++) {
			buf[i] = Math.round(Math.random() * 256);
		}
		return buf;
	}
	const key = weakRand(32);
	const nonce = weakRand(12);
	const counter = 1;
	const chacha = new JSChaCha20(key, nonce, counter);

	// We will use the same buffer for keeping pre-generated bytes.
	// Start with a buffer of simply anything, as it will be turned into noise anyway.
	let buffer = new Uint8Array(Array(64).fill(1));

	// Pos is the number of invalid buffer bytes.
	let pos = buffer.length;

	// Returns a new random byte.
	function getByte() {
		// If all bytes in the buffer have been invalidated, generate a new one.
		if (pos >= buffer.length) {
			buffer = chacha.encrypt(buffer);
			pos = 0;
		}
		return buffer[pos++];
	}

	// Returns a new random integer of the given size in bytes.
	return function(size) {
		if (size < 1 || size > 16) {
			throw new Error("Invalid size argument: " + size);
		}
		let result = 0;
		while (size > 0) {
			size--;
			result = (result << 8) | getByte();
		}
		return result;
	};
};

import * as _ZY from './weapp.js';
global.ZY = _ZY;
export let ZY = _ZY;
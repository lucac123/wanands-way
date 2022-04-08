// const m = 65537,
// 	  a = 75,
// 	  c = 74;
// const m = 4294967296, //2^32, period of pseudorandom runction
// 	  a = 1664525, //seed value should be between 0 and modulus-1
// 	  c = 1;
const m = 2147483647, //made m prime for computation
	  a = 48271,
	  c = 0;
	  
const grid_size = 5;

class Noise {
	seed;
	x;

	values = [];

	constructor(seed) {
		this.seed = seed;
		this.x = seed;
	}

	
	perlin(x, count) {
		console.time('rand_x');
		for (let i = 0; i < count; i++) {
			this.rand_x(i);
		}
		console.timeEnd('rand_x');
		console.time('rand');
		for (let i = 0; i < count; i++) {
			// console.log(`${this.rand()} \t ${this.rand_x(i+1)}`);
			this.rand();
		}
		console.timeEnd('rand');
	}

	rand_x(k) {
		return this.mod_pow(a, k, m) * (this.seed % m) % m;
	}

	rand(rand_seed) {
		if (rand_seed === undefined) {
			this.x = (a * this.x) % m;
			return this.x;
		}
		return ((a * rand_seed) % m) / m;
	}
	interpolate(y1, y2, x) {
		let x2 = (1 - Math.cos(x*Math.PI))/2;
		return y1*(1-x2) + y2*x2;
	}

	mod_pow(base, exp, mod) {
		if (mod == 1)
			return 0;
		let c = 1;
		for (let i = 0; i < exp; i++) {
			c = (c*base) % mod;
			// console.log(`e' = ${i}, c=${c}, `)
		}
		
		return c;
	}
}



export {Noise};
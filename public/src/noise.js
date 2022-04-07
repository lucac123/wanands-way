const m = 4294967296, //2^32, period of pseudorandom runction
	  a = 1664525, //seed value should be between 0 and modulus-1
	  c = 1;

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
		for (let i = 0; i < count; i++) {
			console.log(`${this.rand()} \t ${this.rand_x(i+1)}`)
		}
	}

	rand_x(coord) {
		let a_k = this.mod_pow(a, coord, m);
		let seed = this.seed % m;
		let xnk = ((a_k*seed) % m + (a_k - 1)*c/(a-1) % m) % m;
		return xnk / m;
	}

	rand(rand_seed) {
		if (rand_seed === undefined) {
			this.x = (a * this.x + c) % m;
			return this.x/m;
		}
		return ((a * rand_seed + c) % m) / m;
	}
	interpolate(y1, y2, x) {
		let x2 = (1 - Math.cos(x*Math.PI))/2;
		return y1*(1-x2) + y2*x2;
	}

	mod_pow(base, exp, mod) {
		if (mod == 1)
			return 0;
		let c = 1;
		for (let i = 0; i < exp -1; i++)
			c = (c*base) % mod;
		
		return c;
	}
}



export {Noise};
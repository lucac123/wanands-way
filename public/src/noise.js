import { prng } from './constants.js';

export {Noise};

class Noise {
	constructor(seed) {
		this.seed = seed;
		this.x = seed;
		// * USED BY PERLIN FUNCTION
		// this.wavelength = wavelength;
		// this.points = [this.rand(), this.rand()];
	}
	
	// * RETURNS RANDOM VALUE FROM INDEX k USING EXPLICIT FORMULA
	// ** It works but is inefficient
	rand_x(k) {
		return this.mod_pow(prng.a, k, prng.m) * (this.seed % prng.m) % prng.m / prng.m;
	}
	
	// * RETURNS NEXT RANDOM VALUE, OR CALCULATES NEXT BASED ON <rand_seed>
	rand(rand_seed) {
		if (rand_seed === undefined) {
			this.x = (prng.a * this.x) % prng.m;
			return this.x / prng.m;
		}
		return ((prng.a * rand_seed) % prng.m) / prng.m;
	}

	// * USED FOR GENERATING RANDOM SEED
	rand_seed(rand_seed) {
		if (rand_seed === undefined) {
			this.x = (prng.a * this.x) % prng.m;
			return this.x;
		}
		return ((prng.a * rand_seed) % prng.m);
	}
	
	// * WORLD GEN BETTER WITHOUT PERLIN, REMOVED
	// perlin(x) {
	// 	let first = Math.floor(x/this.wavelength);
	// 	if (!(this.points.length > first+1)) {
	// 		for (let i = this.points.length; i <= first+1; i++) {
	// 			this.points[i] = this.rand();
	// 		}
	// 	}
	// 	return this.interpolate(this.points[first], this.points[first+1], x/this.wavelength-first);
	// }



	// *** HELPER FUNCTIONS ***

	// * USED BY PERLIN FUNCTION
	// interpolate(y1, y2, x) {
	// 	let x2 = (1 - Math.cos(x*Math.PI))/2;
	// 	return y1*(1-x2) + y2*x2;
	// }

	// * USED BY rand_x, TIME INTENSIVE AT HIGHER POWERS
	mod_pow(base, exp, mod) {
		if (mod == 1)
			return 0;
		let c = 1;
		for (let i = 0; i < exp; i++) {
			c = (c*base) % mod;
		}		
		return c;
	}
}
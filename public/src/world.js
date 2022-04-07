import { Noise, Noise as noise } from './noise.js';

export class World {
	constructor(app) {
		let noise = new Noise(1);
		noise.perlin(1, 100)
		console.log(noise.rand(1));
		console.log(noise.rand(100));
	}
}
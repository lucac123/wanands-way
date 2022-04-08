import { Noise, Noise as noise } from './noise.js';

export class World {
	constructor(app) {
		let noise = new Noise(30980909);
		noise.perlin(1, 10000)
	}
}
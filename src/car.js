import { pixi, game, cars } from './constants.js';
import { Noise } from './noise.js';

export { Car };

class Car {
	constructor(app, container, seed) {
		this.noise = new Noise(seed);
		this.row = pixi.container();

		this.generateCars();

		container.addChild(this.row);
	}

	generateCars() {
		let rand_num = this.noise.rand();

		
		
	}
}
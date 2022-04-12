import { Noise } from './noise.js';
import { prng, game, pixi } from './constants.js';

export { World };


class World {
	constructor(app) {
		this.seed = Math.floor(Math.random() * prng.m);
		this.noise = new Noise(this.seed);
		this.app = app;
		this.map = new pixi.container();
		this.width = app.renderer.width;
		this.height = app.renderer.height;
		for (let i = 0; i < 100; i++) {
			console.log((this.noise.rand() > 0.6)? 'grass' : 'road');
		}
	}
	
	draw() {
		let car = new pixi.sprite(pixi.textures['road_bot_lane.png']);
		car.scale.set(game.scale);
		car.position.set(200, 200);
		this.app.stage.addChild(car);

	}
}
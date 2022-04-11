import { Noise } from './noise.js';
import { SCALE, BLOCK, M } from './constants.js';

export { World };

// * ALIASES
const Container = PIXI.Container,
	TextureCache = PIXI.utils.TextureCache,
	Sprite = PIXI.Sprite;

class World {
	constructor(app) {
		this.seed = Math.floor(Math.random()*M);
		this.noise = new Noise(this.seed);
		this.app = app;
		this.map = new Container();
		this.width = app.renderer.width;
		this.height = app.renderer.height;
		for (let i = 0; i < 100; i++) {
			console.log((this.noise.rand() > 0.6)? 'grass' : 'road');
		}
	}
	
	draw() {
		let car = new Sprite(TextureCache['road_bot_lane.png']);
		car.scale.set(SCALE);
		car.position.set(200, 200);
		this.app.stage.addChild(car);

	}
}
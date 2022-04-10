import { Noise } from './noise.js';

// * ALIASES
const Application = PIXI.Application,
	Container = PIXI.Container,
	loader = PIXI.Loader.shared,
	TextureCache = PIXI.utils.TextureCache,
	Sprite = PIXI.Sprite;
const SCALE = 3;
const BLOCK = 16*SCALE;

export class World {
	constructor(app) {
		$('#console').append('ayoooo');
		let noise = new Noise(30980909);
		$('#console').append('<br/>ayo got here');
		noise.perlin(1);
		$('#console').append('<br/>noise');
		let car = new Sprite(TextureCache['galooeh.png']);
		car.scale.set(SCALE);
		// road.position.set(200, 200);
		$('#console').append('<br/>ayo');
		$('#console').append(`<br/>car: ${car.scale}`);
		app.stage.addChild(car);
		$('#console').append('<br/><br/>finished constructing world');
	}
}
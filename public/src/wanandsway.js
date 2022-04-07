import { World } from './world.js';

// * ALIASES
const Application = PIXI.Application,
	Container = PIXI.Container,
	loader = PIXI.Loader.shared,
	TextureCache = PIXI.utils.TextureCache,
	Sprite = PIXI.Sprite;

// * CREATE APPLICATION
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new Application({
	antialias: true,
	resizeTo: window
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
document.body.appendChild(app.view);

// * GLOBALS
// ** CONSTANTS
let state;

// ** OBJECTS
let map;

let setup = () => {
	let world = new World();
	state = single_player;
	app.ticker.add(game_loop);
}

loader
	.add('images/assets.json')
	.load(setup);

let game_loop = (delta) => {
	state(delta);
}

let single_player = (delta) => {
	
}
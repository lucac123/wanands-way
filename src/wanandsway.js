import { World } from './world.js';
import { Gui } from './gui.js';
import { game, pixi } from './constants.js';


// * CREATE APPLICATION
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new pixi.application({
	antialias: true,
	resizeTo: window
	// backgroundAlpha: 0.2
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
document.body.appendChild(app.view);

// * GLOBALS
// ** CONSTANTS
let state;

// ** OBJECTS
let world, gui;

let setup = () => {
	world = new World(app);
	gui = new Gui();
	state = single_player;
	app.ticker.add(game_loop);
}

pixi.loader
	.add('images/assets.json')
	.load(setup);

let game_loop = (delta) => {
	// console.log(app.ticker.FPS + ' ' + delta);
	state(delta);
}

let single_player = (delta) => {
	world.loop();
	if (world.calculate_collisions()) {
		state = game_over;
		world.end();
	}
	gui.draw_fps(delta);
}

let game_over = (delta) => {

}
import { pixi, game } from './constants.js';
import { Key } from './keyboard.js';

const score = new Event('score');

export { Player };

class Player {
	constructor(app, container, name) {
		this.height = 0;
		this.score = 0;

		this.sprite = new pixi.sprite(pixi.textures[name]);
		this.sprite.scale.set(game.scale);
		this.sprite.anchor.set(0.5, 1);
		this.sprite.position.set(app.renderer.width/2, app.renderer.height - game.player_pixel_height*game.scale);
		this.sprite._zIndex = 2;

		this.keys = {
			up: new Key("ArrowUp"),
			right: new Key("ArrowRight"),
			left: new Key("ArrowLeft"),
			down: new Key("ArrowDown")
		};

		this.keys.up.press = () => {
			this.sprite.y -= game.block*game.scale;
			this.height++;
			if (this.score < this.height) {
				this.score++;
				document.body.dispatchEvent(score);
			}
		};
		this.keys.right.press = () => {
			if (this.sprite.x < app.renderer.width - this.sprite.width)
				this.sprite.x += game.block*game.scale;
		};
		this.keys.left.press = () => {
			if (this.sprite.x > this.sprite.width)
				this.sprite.x -= game.block*game.scale;
		};
		this.keys.down.press = () => {
			if (this.sprite.getGlobalPosition().y < app.renderer.height - game.block*game.scale) {
				this.sprite.y += game.block*game.scale;
				this.height--;
			}
		};

		container.addChild(this.sprite);
	}
}
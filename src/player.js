import { pixi, game } from './constants.js';
import { Key } from './keyboard.js';

const score = new Event('score');

export { Player };

class Player {
	constructor(app, container, name) {
		this.app = app;
		this.height = 0;
		this.score = 0;

		this.sprite = new pixi.sprite(pixi.textures[name]);
		this.sprite.scale.set(game.scale);
		this.sprite.anchor.set(0.5, 1);
		this.sprite.position.set(app.renderer.width/2, app.renderer.height - game.player_pixel_height*game.scale);
		this.sprite._zIndex = 2;

		this.keys = {
			up: new Key(["ArrowUp", "w"]),
			right: new Key(["ArrowRight", "d"]),
			left: new Key(["ArrowLeft", "a"]),
			down: new Key(["ArrowDown", "s"])
		};

		this.keys.up.press = this.up.bind(this);
		this.keys.right.press = this.right.bind(this);
		this.keys.left.press = this.left.bind(this);
		this.keys.down.press = this.down.bind(this);

		container.addChild(this.sprite);
	}

	up() {
		this.sprite.y -= game.block*game.scale;
		this.height++;
		if (this.score < this.height) {
			this.score++;
			document.body.dispatchEvent(score);
		}
	}

	right() {
		if (this.sprite.x < this.app.renderer.width - this.sprite.width)
			this.sprite.x += game.block*game.scale;
	}
	
	left() {
		if (this.sprite.x > this.sprite.width)
			this.sprite.x -= game.block*game.scale;
	}
	
	down() {
		if (this.sprite.getGlobalPosition().y < this.app.renderer.height - game.block*game.scale) {
			this.sprite.y += game.block*game.scale;
			this.height--;
		}
	}
}
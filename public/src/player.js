import { pixi, game } from './constants.js';
import { Key } from './keyboard.js';

export { Player };

class Player {
	constructor(app, container, name) {
		this.sprite = new pixi.sprite(pixi.textures[name]);
		this.sprite.scale.set(game.scale);
		this.sprite.anchor.set(0.5, 1);
		this.sprite.position.set(app.renderer.width/2, app.renderer.height -10);
		this.sprite._zIndex = 2;

		this.up = new Key("ArrowUp");
		this.right = new Key("ArrowRight");
		this.left = new Key("ArrowLeft");
		this.down = new Key("ArrowDown");

		this.up.press = () => { this.sprite.y -= game.block*game.scale };
		this.right.press = () => {
			if (this.sprite.x < app.renderer.width - this.sprite.width)
				this.sprite.x += game.block*game.scale;
		};
		this.left.press = () => {
			if (this.sprite.x > this.sprite.width)
				this.sprite.x -= game.block*game.scale;
		};
		this.down.press = () => {
			if (this.sprite.getGlobalPosition().y < app.renderer.height - game.block*game.scale)
				this.sprite.y += game.block*game.scale;
		};

		container.addChild(this.sprite);
	}
}
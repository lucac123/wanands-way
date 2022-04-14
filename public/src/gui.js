import { pixi, game, text } from './constants.js';

export { Gui };

class Gui {
	constructor(app, player, debug) {
		this.gui = new pixi.container();
		this.debug = debug;
		this.dogica_regular = new pixi.text_style(text.dogica_regular);

		this.player = player;

		if (this.debug) {
			this.fps = 60;
			this.fps_text = this.make_debug(this.fps + ' fps', 10, 10);
			
			this.gui.addChild(this.fps_text);
		}

		this.score = new pixi.text(0, this.dogica_regular);
		this.score.anchor.set(0.5, 0);
		this.score.position.set(app.renderer.width/2, 10);
		// this.score.scale.set(0.4, 0.4);
		this.gui.addChild(this.score);

		document.body.addEventListener('score', this.set_score.bind(this));

		app.stage.addChild(this.gui);
	}

	set_score() {
		this.score.text = this.player.score;
	}

	draw_fps(delta) {
		if (this.debug) {
			const temp_fps = Math.round(60/delta * 100)/100;
			if (Math.abs(temp_fps - this.fps) > 10) {
				this.fps = temp_fps;
				this.fps_text.text = this.fps + ' fps';
			}
		}
	}

	make_debug(start, x, y) {
		const text_sprite = new pixi.text(start, this.dogica_regular);
		text_sprite.scale.set(0.2, 0.2);
		text_sprite.x = x;
		text_sprite.y = y;
		return text_sprite;
	}
}
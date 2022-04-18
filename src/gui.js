import { pixi, game, text } from './constants.js';

export { Gui };

class Gui {
	constructor(app, player, debug) {
		this.app = app;
		this.gui = new pixi.container();
		this.score_style = new pixi.text_style(text.score);
		this.gameover_style = new pixi.text_style(text.gameover);
		this.debug_style = new pixi.text_style(text.debug);

		this.player = player;
		
		this.debug = debug;

		this.gen_text_sprites();

		if (this.debug) {
			this.debug_timer = Date.now();
			this.debug_text.visible = true;
			this.fps = 60;
		}


		document.body.addEventListener('score', this.set_score.bind(this));

		app.stage.addChild(this.gui);
	}

	loop() {
		if (this.debug) {
			if (Date.now() - this.debug_timer > 500) {
				this.debug_text.text = this.get_fps();
				this.debug_timer = Date.now();
			}
		}
	}

	gen_text_sprites() {
		let debug_text = new pixi.text(this.get_fps(), this.debug_style);
		debug_text.position.set(10, 10);
		debug_text.visible = false;
		this.debug_text = debug_text;
		
		let score_text = new pixi.text(0, this.score_style);
		score_text.anchor.x = 0.5;
		score_text.position.set(this.app.renderer.width/2, 10);
		this.score_text = score_text;
		
		let gameover_text = new pixi.text('AYO CMON NOW', this.gameover_style);
		gameover_text.anchor.set(0.5, 0.5);
		gameover_text.position.set(this.app.renderer.width/2, this.app.renderer.height/2);
		gameover_text.visible = false;
		this.gameover_text = gameover_text;
		
		this.gui.addChild(this.debug_text);
		this.gui.addChild(this.score_text);
		this.gui.addChild(this.gameover_text);
	}

	get_fps() {
		return `${Math.floor(this.app.ticker.FPS * 100)/100} fps`;
	}

	set_score() {
		this.score_text.text = this.player.score;
	}
}
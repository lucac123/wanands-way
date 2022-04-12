import { Noise } from './noise.js';
import { prng, game, pixi } from './constants.js';

export { World };


class World {
	constructor(app) {
		this.seed = Math.floor(Math.random() * prng.m);
		this.noise = new Noise(this.seed);
		this.app = app;
		this.map = new pixi.container();
		this.app_width = app.renderer.width;
		this.app_height = app.renderer.height;
		this.height = 0;

		for (let i = 0; i < 50; i++) {
			let n = this.noise.rand();
			if (n > 0.6) {
				this.draw_row('grass.png');
			}
			else {
				let road_size = 0;
				while ((n = this.noise.rand()) <= 0.6)
					road_size++;
				if (road_size == 1)
					this.draw_row('road_one_lane.png');
				else {
					this.draw_row('road_bot_lane.png');
					for (let j = 0; j < road_size-2; j++)
						this.draw_row('road_mid_lane.png');
					this.draw_row('road_top_lane.png');
				}
				this.draw_row('grass.png');
			}
		}

		this.app.stage.addChild(this.map);
	}
	
	draw() {
		this.map.position.y+=5;
	}

	draw_row(name) {
		let sprite = new pixi.tiling_sprite(pixi.textures[name], this.app_width, game.block);
		sprite.scale.y = game.scale;
		sprite.position.y = this.app_height - (this.height+1) * game.scale * game.block;
		this.map.addChild(sprite);
		this.height++;
	}
}
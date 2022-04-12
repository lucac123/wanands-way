import { Noise } from './noise.js';
import { Key } from './keyboard.js';
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
		this.block_height = this.app_height/(game.block*game.scale);
		this.height = 0;

		this.fill_stage();
		
		this.app.stage.addChild(this.map);
	}

	fill_stage() {
		while (this.height < this.block_height)
			this.gen_row();
	}
	
	move_up() {
		this.map.y++;
		this.cull_rows();
	}

	cull_rows() {
		let children = this.map.children();
		children.forEach((sprite) => {
			if (sprite.y > this.app_height)
				sprite.destroy();
		});

		if (children[children.length-1].y > 0-game.scale*game.block)
			gen_row();
	}

	gen_row() {
		let n = this.noise.rand();
		if (n > game.grass_threshold) {
			this.draw_row('grass.png');
		}
		else {
			let road_size = 1;
			while ((n = this.noise.rand()) <= game.grass_threshold)
				road_size++;
			this.draw_road(road_size);
			this.draw_row('grass.png');
		}
	}
	
	draw_road(road_size) {
		if (road_size == 1)
			this.draw_row('road_one_lane.png');
		else {
			this.draw_row('road_bot_lane.png');
			for (let j = 0; j < road_size-2; j++)
				this.draw_row('road_mid_lane.png');
			this.draw_row('road_top_lane.png');
		}
	}
	
	draw_row(name) {
		let sprite = new pixi.tiling_sprite(pixi.textures[name], this.app_width, game.block);
		this.map.addChild(sprite);
		sprite.scale.y = game.scale;
		sprite.y = this.app_height - (this.height+1) * game.scale * game.block;

		this.height++;
	}
}
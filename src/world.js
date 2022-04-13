import { Noise } from './noise.js';
import { Key } from './keyboard.js';
import { prng, game, pixi } from './constants.js';
import { Player } from './player.js';

export { World };


class World {
	constructor(app) {
		this.seed = Math.floor(Math.random() * prng.m);
		this.noise = new Noise(this.seed);
		this.app = app;
		this.map = new pixi.container();
		this.world = new pixi.container();
		this.world.sortableChildren = true;
		this.app_width = app.renderer.width;
		this.app_height = app.renderer.height;
		this.block_height = this.app_height/(game.block*game.scale);
		this.height = 0;

		this.player = new Player(this.app, this.world, 'galooeh.png');

		this.fill_stage();
		
		this.world.addChild(this.map);

		this.app.stage.addChild(this.world);
	}

	fill_stage() {
		for (let i = 0; i < game.safe_start; i++)
			this.draw_row('grass.png');
		while (this.height < this.block_height)
			this.gen_row();
	}
	
	loop() {
		let player_height = this.player.sprite.getGlobalPosition().y;
		if (player_height < this.app_height - 5 * game.scale * game.block - 10) {
			this.world.y += ((this.app_height - 5 * game.scale * game.block - 10) - player_height)/30;
			this.cull_rows();
		}
	}

	cull_rows() {
		let children = this.map.children;
		children.forEach((sprite) => {
			if (sprite.getGlobalPosition().y > this.app_height)
				sprite.destroy();
		});

		if (children[children.length-1].getGlobalPosition().y > 0)
			this.gen_row();
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
		// sprite._zIndex = 0;

		this.height++;
	}
}
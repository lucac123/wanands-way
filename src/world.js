import { Noise } from './noise.js';
import { Key } from './keyboard.js';
import { prng, game, pixi } from './constants.js';
import { Player } from './player.js';
import { Car } from './car.js';

export { World };


class World {
	constructor(app) {
		this.world_start = Date.now();
		this.seed = Math.floor(Math.random() * prng.m);
		// this.seed = 12039120;
		this.noise = new Noise(this.seed);
		this.app = app;

		this.map = new pixi.container();
		this.map._zIndex = 0;

		this.car_seed = this.seed;
		this.cars = [];
		this.cars_container = new pixi.container();
		this.cars_container._zIndex = 1;
		
		this.world = new pixi.container();
		this.world.sortableChildren = true;
		this.app_width = app.renderer.width;
		this.app_height = app.renderer.height;
		this.block_height = this.app_height/(game.block*game.scale);
		this.height = 0;

		this.player = new Player(this.app, this.world, 'galooeh.png');

		this.fill_stage();
		
		this.world.addChild(this.map);
		this.world.addChild(this.cars_container);

		this.app.stage.addChild(this.world);
	}

	fill_stage() {
		for (let i = 0; i < game.safe_start; i++)
			this.draw_row('grass.png');
		while (this.height < this.block_height)
			this.gen_row();
	}
	
	loop() {
		this.cars.forEach((car) => car.move());
		const player_height = this.player.sprite.getGlobalPosition().y;
		const height = Math.floor(this.block_height * game.player_height);
		if (player_height < this.app_height - height * game.scale * game.block - (game.player_pixel_height) * game.scale) {
			this.world.y += Math.max(0.5, ((this.app_height - height * game.scale * game.block - (game.player_pixel_height) * game.scale) - player_height)/30);
			this.cull_rows();
			this.cull_cars();
		}
	}

	calculate_collisions() {
		let car_index;
		for (let i = 0; i < this.cars.length && this.cars[i].height <= this.player.height; i++) {
			if (this.cars[i].height == this.player.height) car_index = i;
		}

		if (car_index != undefined) {
			const cars = this.cars_container.children[car_index].children;
			const playerx = this.player.sprite.getGlobalPosition().x;
			for(const car of cars) {
				const direction = this.cars[car_index].direction/2;
				const distance = playerx - car.getGlobalPosition().x;
				if (distance >=  (direction-0.5) * (car.width) - 6*game.scale && distance <= (direction+0.5) * (car.width) + 6*game.scale)
					return true;
			}
		}

		return false;
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

	cull_cars() {
		for (let i = 0; i < this.cars.length; i++) {
			if (this.cars_container.children[i].getGlobalPosition().y > this.app_height) {
				this.cars_container.children[i].destroy();
				this.cars.shift();
				break;
			}
		}
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
		this.draw_car();
		if (road_size == 1) {
			this.draw_row('road_one_lane.png');
		}
		else {
			this.draw_row('road_bot_lane.png');
			for (let j = 0; j < road_size-2; j++) {
				this.draw_car();
				this.draw_row('road_mid_lane.png');
			}
			this.draw_car();
			this.draw_row('road_top_lane.png');
		}
	}
	
	draw_row(name) {
		let sprite = new pixi.tiling_sprite(pixi.textures[name], this.app_width/game.scale, game.block);
		this.map.addChild(sprite);
		sprite.scale.set(game.scale, game.scale);
		sprite.y = this.app_height - (this.height+1) * game.scale * game.block;
		this.height++;
	}

	draw_car() {
		this.cars.push(new Car(this.app, this.cars_container, this.get_car_seed(), this.height, this.player.score));
	}

	get_car_seed() {
		this.car_seed = this.noise.rand_seed(this.car_seed*2 % prng.m);
		return this.car_seed;
	}
	
	end() {
		Object.keys(this.player.keys).forEach((name) => this.player.keys[name].unsubscribe());
	}
}
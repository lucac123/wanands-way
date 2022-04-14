import { pixi, game, cars } from './constants.js';
import { Noise } from './noise.js';

export { Car };

class Car {
	constructor(app, container, seed, height, score) {
		this.height = height;
		this.app_height = app.renderer.height;
		this.app_width = app.renderer.width;

		this.left_bound = -0.5 *(cars.width - this.app_width);
		this.right_bound = this.left_bound + cars.width;

		this.noise = new Noise(seed);
		this.row = new pixi.container();
		this.row.width = cars.width;
		this.row.x = this.left_bound;

		this.direction = this.noise.rand() < 0.5? 1 : -1;
		this.speed = (Math.floor(this.noise.rand() * cars.speed_var) + cars.speed_const + score/cars.speed_denom) * this.direction;
		
		
		this.num_cars = 0;

		this.generate_cars();

		this.row.y = this.app_height - (height+1) * game.scale * game.block;

		container.addChild(this.row);
	}

	generate_cars() {
		let rand_num = this.noise.rand();
		
		cars.thresholds.forEach(t => { if (rand_num > t) this.num_cars++ });

		for (let i = 0; i < this.num_cars; i++)
			this.gen_car();

	}

	gen_car() {
		let name_index = Math.floor(this.noise.rand() * cars.names.length);
		let sprite = new pixi.sprite(pixi.textures[cars.names[name_index]]);

		sprite.scale.set(this.direction * game.scale, game.scale);

		sprite.x = Math.floor(this.noise.rand() * 4000/cars.block_width) * cars.block_width;
		sprite.y = 2 * game.scale;

		this.row.addChild(sprite);
	}

	move() {
		this.row.children.forEach((car) => {
			if (car.getGlobalPosition().x > -2 * cars.block && car.getGlobalPosition().x < this.app_width + 2 * cars.block) {
				car.renderable = true;
			}
			else {
				car.renderable = false;
			}
			car.x -= this.speed;
			if (car.x > cars.width)
				car.x = 0;
			else if (car.x < 0)
				car.x = cars.width;

		});
	}
}
export { prng, game, pixi, cars, text };

// * NOISE CONSTANTS
const prng = {
	m: 2147483647,
	a: 48271
}

// * GAME CONSTANTS
const game = {
	safe_start: 3,
	scale: 3,
	block: 16,
	grass_threshold: 0.6,
	player_height: 0.3,
	player_pixel_height: 1
}


// * PIXI ALIASES
const pixi = {
	application: PIXI.Application,
	container: PIXI.Container,
	particle_container: PIXI.ParticleContainer,
	textures: PIXI.utils.TextureCache,
	loader: PIXI.Loader.shared,
	sprite: PIXI.Sprite,
	tiling_sprite: PIXI.TilingSprite,
	text: PIXI.Text,
	text_style: PIXI.TextStyle
}

// * TEXT STYLES
const text  = {
	dogica_regular: {
		fontFamily: 'Dogica',
		fontweight: 'regular',
		fill: 'white',
		fontSize: '50pt'
	},
	dogica_bold: {
		fontFamily: 'DogicaPixelBold',
		fontweight: 'bold',
		fill: 'white'
	}
};

// * CAR PICTURE NAMES
const cars = {
	names: [
		'car_black.png',
		'car_blue.png',
		'car_red.png'
	],
	freq: [
		1,
		1,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		6,
		5,
		4,
		3,
		2
	],
	thresholds: [],
	width: 4000,
	block: game.block*2,
	speed_var: 4,
	speed_const: 3,
	speed_denom: 20
};

let count = 0;
cars.freq.forEach((n) => {
	count += n;
})

let cur = 0;
cars.freq.forEach((n, i) => {
	cars.thresholds[i] = cur;
	cur += n/count;
})

cars.block_width = Math.floor(cars.width/cars.block);

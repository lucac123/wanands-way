export { prng, game, pixi };

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
	player_height: 0.3
}

// * PIXI ALIASES
const pixi = {
	application: PIXI.Application,
	container: PIXI.Container,
	particle_container: PIXI.ParticleContainer,
	textures: PIXI.utils.TextureCache,
	loader: PIXI.Loader.shared,
	sprite: PIXI.Sprite,
	tiling_sprite: PIXI.TilingSprite
}

// * CAR PICTURE NAMES
const cars = {
	names: [
		'car_black.png',
		'car_blue.png',
		'car_red.png'
	],
	freq: [
		0.15,
		0.25,
		0.25,
		0.2,
		0.1,
		0.05
	],
	thresholds: [],
	width: 4000
};

let cur = 0;
cars.freq.forEach((n, i) => {
	cars.thresholds[i] = cur;
	cur += n;
})
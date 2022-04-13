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
	grass_threshold: 0.6
}

// * PIXI ALIASES
const pixi = {
	application: PIXI.Application,
	container: PIXI.Container,
	textures: PIXI.utils.TextureCache,
	loader: PIXI.Loader.shared,
	sprite: PIXI.Sprite,
	tiling_sprite: PIXI.TilingSprite
}
export { prng, game, pixi };

// * NOISE CONSTANTS
let prng = {
	m: 2147483647,
	a: 48271
}

// * GAME CONSTANTS
let game = {
	scale: 3,
	block: 16
}

// * PIXI ALIASES
let pixi = {
	application: PIXI.Application,
	container: PIXI.Container,
	textures: PIXI.utils.TextureCache,
	loader: PIXI.Loader.shared,
	sprite: PIXI.Sprite,
	tiling_sprite: PIXI.TilingSprite
}
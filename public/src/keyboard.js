export { Key };

class Key {
	constructor(value) {
		this.value = value;
		this.isDown = false;
		this.isUp = true;
		this.press = undefined;
		this.release = undefined;

		this.downListener = this.downHandler.bind(this);
		this.upListener = this.upHandler.bind(this);
		window.addEventListener('keydown', this.downListener, false);
		window.addEventListener('keyup', this.upListener, false);
	}

	downHandler(event) {
		if (event.key === this.value) {
			if (this.isUp && this.press)
				this.press();
			this.isDown = true;
			this.isUp = false;
			event.preventDefault();
		}
	}

	upHandler(event) {
		if (event.key === this.value) {
			if (this.isDown && this.release)
				this.release();
			this.isDown = false;
			this.isUp = true;
			event.preventDefault();
		}
	}

	unsubscribe() {
		window.removeEventListener('keydown', this.downListener);
		window.removeEventListener('keyup', this.upListener);
	}
}
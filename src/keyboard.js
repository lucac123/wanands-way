export { Key };

class Key {
	constructor(value) {
		if (typeof value == 'string')
			this.multi_val = false;
		else
			this.multi_val = true;
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
		let isdown = false;
		if (this.multi_val)
			this.value.forEach(val => {
				if (val === event.key) isdown = true;
			});
		else
			isdown = (event.key === this.value);
		if (isdown) {
			if (this.isUp && this.press)
				this.press();
			this.isDown = true;
			this.isUp = false;
			event.preventDefault();
		}
	}

	upHandler(event) {
		let isup = false;
		if (this.multi_val)
			this.value.forEach(val => {
				if (val === event.key) isup = true;
			});
		else
			isup = (event.key === this.value);
		if (isup) {
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
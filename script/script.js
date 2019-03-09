import Vue from "vue";
import Selector from "./../components/selector.vue";
import Films from "./../components/films.vue";
import Characters from "./../components/characters.vue";

new Vue({
	el: '#app',
	data: {
		mode: 'selector'
	},
	components: {
		'selector': Selector,
		'films': Films,
		'characters': Characters
	},
	methods: {
		handleModeChange(mode) {
			this.mode = mode;
		}
	}
});
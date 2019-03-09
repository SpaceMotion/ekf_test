<template>
	<div class='selector'>
		<h2>Make your choice:</h2>
		<div class="selector__buttons-block">
			<a href="#" class='selector__button selector__button_type_films' @click.prevent='onSelectorClick("films")'>Films</a>
			<a href="#" class='selector__button selector__button_type_characters' @click.prevent='onSelectorClick("characters")'>Characters</a>
		</div>
	</div>	
</template>

<script>
	export default {
		methods: {
			onSelectorClick(mode) {
				this.$emit('mode-changed', mode);
			}		
		}
	};	
</script>
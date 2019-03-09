<template>
	<div>
		<a href='#' class='selector__button' @click.prevent='onBackButtonClick'>Back to choice</a>
		<hr/>
		<div v-if="processing">Loading films...</div>
		<table v-else class='table'>
			<thead>
				<tr>
					<th class='table__header'>Title</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='film in films'>
					<td class='table__data'>{{film.title}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import CONSTANTS from "./../script/constants";

	export default {
		data() {
			return {
				films: [],
				processing: true
			};
		},
		created() {
			fetch(`${CONSTANTS.API_ROOT_URL}films/`, {
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(response => response.json()).then(data => {
				this.processing = false;
				this.films = data.results;
			});
		},
		methods: {
			onBackButtonClick() {
				this.$emit('mode-changed', 'selector');
			}
		}
	};
</script>
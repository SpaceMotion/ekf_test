<template>
	<div>
		<a href='#' class='selector__button' @click.prevent='onBackButtonClick'>Back to choice</a><br/>
		Type text to search (case insensitive): <input type='text' v-model='searchText'/> <input type='button' value='Search' @click='onSearchButtonClick'  :disabled='processing'/> <input type='button' value='View all' @click='doRequest()' :disabled='processing'/>
		<hr/>
		<div class='pagination'>
			<a href='#' @click.prevent='onPaginationButtonClick("previous")' :class='{selector__button: true, selector__button_state_disabled: !previousURL || processing}'>Previous</a>
			<a href='#' @click.prevent='onPaginationButtonClick("next")' :class='{selector__button: true, selector__button_state_disabled: !nextURL || processing}'>Next</a>
		</div>
		<hr/>
		<span v-if='processing'>Loading characters...</span>
		<span v-else-if='!characters.length'>No characters found :(</span>
		<table class='table' v-else>
			<thead>
				<tr>
					<th class='table__header'>Name</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='character in characters'>
					<td class='table__data'>{{character.name}}</td>
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
				characters: [],
				searchText: '',
				previousURL: null,
				nextURL: null,
				processing: true
			};
		},
		created() {
			this.doRequest();
		},
		methods: {
			onSearchButtonClick() {
				if (this.searchText.trim().length) {
					this.doRequest(`${CONSTANTS.API_ROOT_URL}people/?search=${this.searchText}`);
				} else {
					alert("Oh, sorry, but it can't make search with empty string");
				}
			},
			doRequest(url = `${CONSTANTS.API_ROOT_URL}people/`) {
				this.processing = true;
				fetch(url, {
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				}).then(response => response.json()).then(data => {
					this.characters = data.results;
					this.previousURL = data.previous;
					this.nextURL = data.next;
					this.processing = false;
				});
			},
			onPaginationButtonClick(type) {
				const url = type === 'previous' ? this.previousURL : type === 'next' ? this.nextURL : null;
				if (url && !this.processing) {
					this.doRequest(url);			
				}
			},
			onBackButtonClick() {
				this.$emit('mode-changed', 'selector');
			}
		}
	};
</script>
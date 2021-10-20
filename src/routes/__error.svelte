<script context="module">
	export function load ({ status, error }) {
		return {
			props: {
				status,
				error
			}
		}
	}
</script>

<script>
	export let status
	export let error
</script>


<svelte:head>
	<title>{status}: {error.message}</title>
</svelte:head>

<div class="container">
	<div class="code">{status}</div>
	<div class="message">{error.message}</div>
</div>

<div class="footer">
	<div class="button" on:click={() => window.location.reload()}>reload</div>
	<div class="button" on:click={() => window.history.back()}>back</div>
	<a class="button" href="/">home</a>
</div>


<style>
	.button, .code {
		user-select: none;
	}

	@media only screen and (max-width: 750px) {
		.container {
			padding-top: 15vh !important;
		}

		.code {
			height: 50vw !important;

			font-size: 50vw !important;
		}

		.message {
			font-size: 6vw !important;
		}
	}

	@media only screen and (max-height: 800px) {
		.container {
			padding-top: 8vh !important;
		}
	}

	@media only screen and (max-height: 600px) {
		.container {
			padding-top: 10vh !important;
		}

		.code {
			height: 45vh !important;

			font-size: 45vh !important;
		}

		.message {
			font-size: 5vh !important;
		}
	}

	.container {
		padding: 10vh 0 0;
	}

	.code {
		height: 45vh;

		color: #ff806066;
		font-size: 45vh;
		text-align: center;
	}

	.message {
		top: 50vh;

		font-size: 5vh;
		text-align: center;
	}

	.footer {
		position: absolute;
		right: 5vw;
		bottom: 40px;
		left: 5vw;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		border-top: 4px solid #3000e040;
	}

	.button {
		height: calc(3vh + 30px);

		display: grid;
		place-items: center;

		color: #000000;
		font-size: 22px;
		text-align: center;
		text-decoration: none;

		cursor: pointer;

		transition: .2s background-color;
	}

	.button:hover {
		background: #3000e040;
	}
</style>

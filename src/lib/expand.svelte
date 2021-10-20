<!-- -- Element zum Ausklappen von Text -- -->
<script>
	// Text, der immer angezeigt werden soll
	export let preview

	// Elemente
	let txt
	let prev

	// Zustand: ist ausgeklappt
	let expanded = false
	function expand () {
		expanded = !expanded

		// zeigen oder verstecken
		txt.style = `display: ${expanded ? "block" : "none"}`
		prev.classList[!expanded ? "add" : "remove"]("closed")
	}
</script>

<!-- Element -->
<div class="main">
	<!-- angezeigter Text -->
	<div bind:this={prev} on:click={expand} class="preview closed">{preview}</div>
	<!-- versteckte Elemente -->
	<div style="display: none" bind:this={txt} class="txt">	
		<slot />
	</div>
</div>


<style>
	/* Vorschautext */
	.preview {
		margin: 10px 0 5px 0;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		display: inline-block;
	}

	/* Vorschautext, wenn eingeklappt */
	.preview.closed {
		margin: 10px 0 0 0;
	}
</style>

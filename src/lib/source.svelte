<!-- -- Element für die Quelle -->
<script>
	let el
	let clicked = false
	function toggle () {
		clicked = !clicked
		el.style = `display: ${clicked ? "block" : "none"}`
	}
</script>


<div bind:this={el} style="display: none" class="txt">
	<slot />
</div>

<div on:click={toggle} class="show">quellen</div>


<style>
	.show {
		position: fixed;
		right: 20px;
		bottom: 20px;
		padding: 20px;
		background-color: #dddddd;
		border-radius: 100px;
		font-weight: 500;
		cursor: pointer;
		transition: 0.4s background-color;
		user-select: none;
	}

	.show:hover {
		background-color: #aaaaaa;
	}

	.txt {
		width: 20%;
		position: fixed;
		right: 20px;
		border-radius: 20px;
		border: 4px solid #dddddd;
		padding: 20px;
		bottom: 90px;
		background-color: white;
	}
</style>

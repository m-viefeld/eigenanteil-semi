<!-- -- Element zur Navigation -- -->
<script>
	export let prev
	export let next
</script>


<div class="main">
	<div class="grid">
		{#if prev}
		<a href="/{prev.path}" class="prev">
			<div class="label">VORHERIGE SEITE</div>
			<div class="name">{prev.name}</div>
		</a>
		{/if}
		{#if next}
		<a href="/{next.path}" class="next">
			<div class="label">NÄCHSTE SEITE</div>
			<div class="name">{next.name}</div>
		</a>
		{/if}
	</div>
</div>


<style>
	a {
		color: black;
		text-decoration: none;
		background-color: #cccccc33;
		transition: 0.4s background-color;
		padding: 10px;
	}

	a:hover {
		background-color: #cccccc55;
	}

	.label {
		font-weight: 500;
		font-size: .6em;
		font-family: "Russo One";
	}

	.main {
		margin: 40px 0;
		display: block;
		width: 100%;
	}

	.grid {
		margin: 0 auto;
		margin-top: 20px;
		width: 20%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		bottom: 2em;
	}

	.name {
		font-size: 1.2em;
	}
	
	.name, .label {
		text-align: center;
		transition: 0.4s color;
	}

	a:hover .label, a:hover .name {
		color: #3f7fbf;
	}
</style>

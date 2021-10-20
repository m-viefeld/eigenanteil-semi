<!-- korrespondiert zu / -->
<script context="module">
	export const prerender = true
</script>

<script>
	import "$lib/main.css"
</script>


<h1>main</h1>


<a href="/data" class="block">
	<h2>daten</h2>
	<p>eine simple einführung zu verwendeten Daten and linearer Korrelation</p>
</a>

<a href="/simple" class="block">
	<h2>simpel</h2>
	<p>eine sehr simple Visualisierung zu überwachtem maschinellen Lernen mit selbst erstellten Daten</p>
</a>

<a href="/students" class="block">
	<h2>schüler</h2>
	<p>eine Anwendung des maschinellen Lernens an echten Daten</p>
</a>

<style>
	.block {
		color: black;
		text-decoration: none;
		transition: .4s color;
		margin: 10px;
		display: block;
		padding: 10px;
		width: fit-content;
	}

	.block:hover {
		color: blue;
	}

	h2 {
		margin-bottom: 5px;
	}
</style>

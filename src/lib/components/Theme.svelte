<script>
	import { theme } from '$lib/scripts/writableData';
	import { beforeUpdate, onMount } from 'svelte';

	beforeUpdate(async () => {
		if (!localStorage.getItem('theme')) {
			localStorage.setItem('theme', 'dark');
		}
		$theme = localStorage.getItem('theme') || 'dark';
	});
</script>

<svelte:head>
	<link href="/bootstrap.{$theme == '' ? 'dark' : $theme}.min.css" rel="stylesheet" />
</svelte:head>

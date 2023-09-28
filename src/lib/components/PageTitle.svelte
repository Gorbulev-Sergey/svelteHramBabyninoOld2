<script>
	export let titleSpecial = '';
	export let title = 'Публикации';
	export let description = 'Храм Кукши Печерского';
	export let author = '';
	export let copyright = 'Храм Кукши Печерского';
	export let address = '';
	export let keywords = '';
	export let _class = '';
</script>

<svelte:head>
	<title>{titleSpecial == '' ? title : titleSpecial}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="copyright" content={copyright} />
	<meta name="address" content={address} />
	<meta name="keywords" content={keywords} />
	<meta name="keywords" content="Храм Кукши Печерского" />
</svelte:head>

<div class="d-flex justify-content-between flex-nowrap align-items-center mb-3 no-print {_class}">
	<div class="d-flex justify-content-between align-items-baseline">
		<h4 class="text-dark ms-1 mb-0 me-3 text-nowrap">
			{@html title}
		</h4>
		<slot name="center" />
	</div>
	<slot name="navigation" />
</div>

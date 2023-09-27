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

<div class="d-flex justify-content-between flex-wrap align-items-center mb-3 no-print {_class}">
	<div class="d-flex justify-content-between align-items-center flex-wrap">
		<h4 class="text-dark ms-1 my-0 me-3 text-nowrap">
			{title}
		</h4>
		<div class="mt-2 my-md-0">
			<slot name="center" />
		</div>
	</div>
	<div class="mt-2 my-md-0">
		<slot name="navigation" />
	</div>
</div>

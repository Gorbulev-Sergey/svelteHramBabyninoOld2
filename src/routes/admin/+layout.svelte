<script>
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import IsAuth from '$lib/components/IsAuth.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { isAdmin } from '$lib/scripts/writableData';
	import { onMount } from 'svelte';

	let routesLeft = [
		{
			url: '/admin/posts',
			title: 'Публикации'
		},
		{
			url: '/admin/schedule',
			title: 'Расписание'
		},
		{
			url: '/admin/photos',
			title: 'Фотографии'
		},
		{
			url: '/admin/tags',
			title: 'Теги'
		},
		{
			url: '/admin/contacts',
			title: 'Контакты'
		},
		{
			url: '/admin/storage',
			title: 'Хранилище'
		}
	];
	let routesRight = [
		{
			url: '/posts',
			title: 'Сайт'
		}
	];

	onMount(() => {
		if (!$isAdmin) goto('/');
	});
</script>

<IsAuth>
	<Navigation title="Панель управления" {routesLeft} {routesRight} />
	<div class="container my-4" style="min-height:90vh;">
		<slot />
	</div>
	<Footer />
</IsAuth>

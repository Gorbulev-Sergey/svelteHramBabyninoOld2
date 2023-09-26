<script>
	// @ts-nocheck
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { storage } from '$lib/scripts/firebase';
	import { uploadBytes, ref, getDownloadURL, listAll, getMetadata, uploadString, deleteObject } from 'firebase/storage';
	import { onMount } from 'svelte';

	let folders = [];
	let photos = [];

	// Корневая папка для фотографий
	let albumsFolder = '/Photos';
	let albumsRef = ref(storage, `${albumsFolder}`);
	let newFolderName = '';
	let selectedFolder = 0;

	let getFolders = () => listAll(ref(storage, albumsRef)).then(result => (folders = result.prefixes));
	let getPhotos = () => {
		if (folders.length > 0) {
			console.log(folders[selectedFolder].fullPath);
			listAll(ref(storage, ref(storage, folders[selectedFolder].fullPath))).then(s => {
				photos = s.items.filter(p => p.name != 'empty');
				// getDownloadURL(ref(storage, photos[0].fullPath)).then(s => {
				// 	console.log(s);
				// });
			});
		}
	};

	onMount(async () => {
		getFolders().then(() => {
			getPhotos();
		});
	});
</script>

<PageTitle title="Папки с фотографиями">
	<div slot="navigation">
		<div class="input-group">
			<div class="input-group-text border-0">Создать папку:</div>
			<input class="form-control bg-light text-dark border-0" bind:value={newFolderName} placeholder="имя новой папки" />
			<button class="btn btn-light text-dark" on:click={() => (newFolderName = '')}><i class="fa-solid fa-delete-left" /></button>
			<button
				class="btn btn-dark"
				on:click={() => {
					// Пустой объект для создания новой папки
					const empty = ref(storage, `${albumsFolder}/${newFolderName}/empty`);
					// Создаём папку и записываем в неё пустой объект
					uploadString(empty, 'Строка для инициализации папки').then(s => {
						newFolderName = '';
						getFolders();
					});
				}}>Создать</button>
		</div>
	</div>
</PageTitle>

<div class="d-flex justify-content-start align-items-start gap-2 mb-4">
	{#each folders as item}
		<div class="d-flex align-items-center bg-light px-2 rounded-1">
			<div class="p-2">{item.name}</div>
			<button
				class="btn btn-sm btn-light text-danger"
				on:click={() => {
					listAll(ref(storage, `/${item.fullPath}`)).then(s => {
						if (s.items.filter(p => p.name != 'empty').length == 0) {
							deleteObject(ref(storage, `${item.fullPath}/empty`)).then(() => getFolders());
						}
					});
				}}><i class="fa-solid fa-xmark" /></button>
		</div>
	{/each}
</div>

{#if photos.length > 0}
	<h4 class="mb-3">Фотографии в папке "{folders[selectedFolder].name}"</h4>
	{#each photos as photo}
		{#await getDownloadURL(ref(storage, photo.fullPath)) then s}
			<div
				class="rounded-1 w-25"
				style="background-image: url({s}); background-repeat: no-repeat; background-position: center; background-size: cover; min-height:12em;" />
		{/await}
	{/each}
{/if}

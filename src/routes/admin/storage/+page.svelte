<script>
	// @ts-nocheck
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { storage } from '$lib/scripts/firebase';
	import { uploadBytes, ref, getDownloadURL, listAll, getMetadata, uploadString, deleteObject } from 'firebase/storage';
	import { onMount } from 'svelte';

	let folders = [];
	let photos = [];
	let photosForUpload = [];

	// Корневая папка для фотографий
	let albumsFolder = '/Photos';
	let albumsRef = ref(storage, `${albumsFolder}`);
	let newFolderName = '';
	let selectedFolder = 0;
	let labelFakeForUploadButton = 'Выберите фотографии для загрузки';

	let getFolders = () => listAll(ref(storage, albumsRef)).then(result => (folders = result.prefixes));
	let getPhotos = () => {
		if (folders.length > 0) {
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
		<div class=" input-group">
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

<div class="d-flex flex-wrap justify-content-start align-items-start gap-2 mb-5">
	{#each folders as item, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="d-flex align-items-center {selectedFolder == i ? 'bg-dark text-light' : 'bg-light'}  px-2 rounded-1"
			style=" cursor:pointer"
			on:click={() => {
				selectedFolder = i;
				getPhotos();
			}}>
			<div class="p-2">{item.name}</div>
			<button
				class="btn btn-sm {selectedFolder == i ? 'btn-dark' : 'btn-light'} text-danger"
				on:click|stopPropagation={() => {
					listAll(ref(storage, `/${item.fullPath}`)).then(s => {
						if (s.items.filter(p => p.name != 'empty').length == 0) {
							deleteObject(ref(storage, `${item.fullPath}/empty`)).then(() => getFolders());
						}
					});
				}}><i class="fa-solid fa-xmark" /></button>
		</div>
	{/each}
</div>

<PageTitle title={`Фотографии в папке "${folders[selectedFolder]?.name ?? ''}"`}>
	<div slot="navigation">
		<div class="input-group">
			<button
				class="btn btn-light border-0"
				on:click={() => {
					document.querySelector('#buttonSelectPhotos').click();
				}}>{labelFakeForUploadButton}</button>
			<input
				id="buttonSelectPhotos"
				hidden
				type="file"
				accept="image/png, image/jpeg"
				multiple
				class="form-control bg-light text-dark border-0"
				bind:files={photosForUpload}
				on:change={() =>
					(labelFakeForUploadButton =
						photosForUpload.length > 1 ? `Выбрано ${photosForUpload.length} фотографий` : photosForUpload[0].name)} />
			<button
				class="btn btn-dark"
				on:click={() => {
					console.log(photosForUpload);
					Array.from(photosForUpload).forEach((p, i, a) => {
						uploadBytes(
							ref(storage, `/${albumsFolder}/${folders[selectedFolder].name}/${p.name.replace('(', '').replace(')', '')}`),
							p
						).then(() => {
							if (i == a.length - 1) {
								getPhotos();
							}
						});
					});
					photosForUpload = [];
					labelFakeForUploadButton = 'Выберите фотографии для загрузки';
				}}>Загрузить</button>
		</div>
	</div>
</PageTitle>
{#if photos.length > 0}
	<div class="d-flex flex-wrap gap-2">
		{#each photos as photo}
			{#await getDownloadURL(ref(storage, photo.fullPath)) then s}
				<div
					class="d-flex align-items-start justify-content-end rounded-1"
					style="width:23%; background-image: url({s}); background-repeat: no-repeat; background-position: center; background-size: cover; min-height:12em;">
					<button
						class="btn btn-sm btn-light bg-light bg-opacity-25 m-1 border-0 text-dark"
						title="Скопировать url"
						on:click={() => {
							navigator.clipboard.writeText(s).then(s => {});
						}}><i class="fa-solid fa-copy" /></button>
					<button
						class="btn btn-sm btn-light bg-light bg-opacity-25 m-1 border-0 text-danger"
						title="Удалить фото"
						on:click={() => {
							deleteObject(ref(storage, `/${albumsFolder}/${folders[selectedFolder].name}/${photo.name}`));
							getPhotos();
						}}>
						<i class="fa-solid fa-xmark" />
					</button>
				</div>
			{/await}
		{/each}
	</div>
{/if}

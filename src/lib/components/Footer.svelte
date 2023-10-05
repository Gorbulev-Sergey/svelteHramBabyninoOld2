<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { isAdmin } from '$lib/scripts/writableData';
</script>

<footer class="bg-light text-dark no-print">
	<div class="p-3">
		<div class="d-flex flex-column justify-content-center align-items-center">
			<div class="pt-2 text-center">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<i
					class="fa-solid fa-copyright me-1"
					style="cursor: pointer;"
					title={$isAdmin ? 'Выйти из аккаунта' : 'Вход для администраторов'}
					on:click={() => {
						if ($isAdmin) {
							auth.signOut();
							goto('/');
						} else {
							goto('/auth/login');
						}} />
				</IsAuth>
				<span>Храм великомученика Кукши Печерского, посёлок Лесной, Калужская область, {new Date(Date.now()).getFullYear()} год</span>
			</div>
			<div class="pb-1 text-center">
				Контакты:
				<span>
					иерей Георгий:
					<a
						class="text-success"
						style="text-decoration: none;"
						href="https://api.whatsapp.com/send?phone=79169547275"
						target="_blank"
						title="Написать в Whatsapp"
						rel="noopener noreferrer">
						<i class="fa-brands fa-whatsapp" />
					</a>
					<a class="badge bg-primary text-dark" style="text-decoration: none;" href="tel:89169547275">8-916-954-72-75</a>
				</span>
			</div>
		</div>
	</div>
</footer>

<script>
	import IsAuth from '$lib/components/IsAuth.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
</script>

<footer class="bg-light text-dark no-print">
	<div class="p-3">
		<div class="d-flex flex-column justify-content-center align-items-center">
			<div class="pt-2 text-center">
				<IsAuth>
					<i
						class="fa-solid fa-copyright me-1"
						style="cursor: pointer;"
						title="Выйти из аккаунта"
						on:click={() => {
							auth.signOut();
							goto('/');
						}} />
					<i
						slot="notAuth"
						class="fa-solid fa-copyright me-1"
						style="cursor: pointer;"
						title="Вход для администраторов"
						on:click={() => {
							goto('/auth/login');
						}} />
				</IsAuth>
				<span>Храм "Вознесения Господня", посёлок Бабынино, Калужская область, {new Date(Date.now()).getFullYear()} год</span>
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

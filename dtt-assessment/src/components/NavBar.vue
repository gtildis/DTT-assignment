<script>
export default {
	methods: {
		isActive(route) {
			return this.$route.path === route;
		},
	},
};
</script>

<template>
	<header class="header">
		<nav class="nav-container-mobile">
			<div class="nav-image-mobile">
				<router-link to="/" class="nav-link" v-if="isActive('/')">
					<img
						src="../assets/ic_mobile_navigarion_home_active@3x.png"
						alt="Home logo"
					/>
				</router-link>
				<router-link to="/" class="nav-link" v-else>
					<img
						src="../assets/ic_mobile_navigarion_home@3x.png"
						alt="Home logo"
					/>
				</router-link>
			</div>
			<div class="nav-image-mobile">
				<router-link to="/about" class="nav-link" v-if="isActive('/about')">
					<img
						src="../assets/ic_mobile_navigarion_info_active@3x.png"
						alt="Info logo"
					/>
				</router-link>
				<router-link to="/about" class="nav-link" v-else>
					<img
						src="../assets/ic_mobile_navigarion_info@3x.png"
						alt="Info logo"
					/>
				</router-link>
			</div>
		</nav>
		<nav class="nav-container-desktop">
			<div>
				<img src="../assets/img_logo_dtt@3x.png" alt="DTT logo" />
			</div>
			<div class="nav-links">
				<router-link to="/" class="nav-link" :class="{ active: isActive('/') }"
					>Houses</router-link
				>
				<router-link
					to="/about"
					class="nav-link"
					:class="{ active: isActive('/about') }"
					>About</router-link
				>
			</div>
		</nav>
	</header>
</template>

<style scoped>
.header {
	background-color: #ffffff;
	width: 100%;
}
nav img {
	height: 3rem;
}

.nav-link {
	text-decoration: none;
	font-size: 18px;
	padding: 5px 10px;
	color: #c3c3c3;
	font-weight: 500;
	padding-left: 3rem;
}

.nav-link.active {
	font-family: "Montserrat", sans-serif;
	color: #000000;
	border-radius: 4px;
	font-weight: 700;
}
@media (max-width: 768px) {
	/* Styles for mobile */
	.nav-container-mobile {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		background-color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		z-index: 10;
	}

	.nav-image-mobile {
		width: 50%;
	}

	.nav-link img {
		height: 30px;
		width: 30px;
		text-decoration: none;
		color: #c3c3c3;
	}

	.nav-container-desktop {
		display: none;
		z-index: 10;
	}
}

/* Styles for desktop */
@media (min-width: 769px) {
	.nav-container-desktop {
		max-width: 70%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 1rem 0;
	}

	nav img {
		height: 3rem;
	}

	.nav-link {
		text-decoration: none;
		font-size: 18px;
		padding: 5px 10px;
		color: #c3c3c3;
		font-weight: 500;
		padding-left: 3rem;
	}

	.nav-link.active {
		color: #000000;
		border-radius: 4px;
		font-weight: 700;
	}

	.nav-container-mobile {
		display: none;
	}
}
</style>

<script setup></script>

<template>
	<router-link to="/" class="back-to-overview">
		<img
			src="../assets/ic_back_white@3x.png"
			alt="Back to overview"
			class="mobile"
		/>
		<img
			src="../assets/ic_back_grey@3x.png"
			alt="Back to overview"
			class="desktop"
		/>
		<span>Back to overview</span>
	</router-link>
</template>

<style scoped>
.back-to-overview {
	display: flex;
	align-items: center;
	text-decoration: none;
	margin: 2rem 0;
	color: #000000;
}

.back-to-overview img {
	width: 18px;
	height: 18px;
	margin-right: 10px;
}

.back-to-overview span {
	font-weight: 700;
	font-family: "Montserrat", sans-serif;
}
.mobile {
	display: none;
}

@media (max-width: 767px) {
	/* Styles for mobile */

	.back-to-overview {
		position: absolute;
		top: -0.5rem;
		left: 0;
	}
	.back-to-overview span {
		display: none;
	}
	.mobile {
		display: block;
	}
	.desktop {
		display: none;
	}
}
</style>

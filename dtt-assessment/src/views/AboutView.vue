<script setup></script>

<template>
	<div class="container">
		<div class="mobile">
			<h1>About</h1>
		</div>
		<div class="about-container">
			<h1>About DTT Real Estate</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
				reiciendis totam temporibus harum minus vel eum accusantium eligendi
				voluptas ex possimus minima pariatur vero obcaecati, odit, fugit quam
				deserunt non!Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
				reiciendis totam temporibus harum minus vel eum accusantium eligendi
				voluptas ex possimus minima pariatur vero obcaecati, odit, fugit quam
				deserunt non!Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
				reiciendis totam temporibus harum minus vel eum accusantium
			</p>
			<h1>Design and Development</h1>
			<div class="logo-container">
				<img src="../assets/img_logo_dtt@3x.png" alt="DTT logo" />
				<div class="link-container">
					<p>By DTT</p>
					<a href="https://www.d-tt.nl/" target="_blank"
						>https://www.d-tt.nl/</a
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	background-color: #f6f6f6;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: "Open Sans" sans-serif;
	margin-top: 5rem;
}
.mobile {
	display: none;
}

h1 {
	font-family: "Montserrat", sans-serif;
	font-size: 32px;
	font-weight: 700;
}

.about-container {
	width: 70%;
	margin: 2rem 0;
}
.about-container p {
	margin: 2.5rem 0;
}

.logo-container {
	display: flex;
	align-items: center;
}

.logo-container img {
	height: 70px;
	margin-right: 2rem;
}

.link-container p {
	margin: 0.5rem 0;
}

a {
	text-decoration: none;
	color: #067bc2;
}

@media (max-width: 767px) {
	span {
		display: none;
	}
	.container {
		margin-top: 0rem;
	}

	.mobile {
		display: block;
	}

	.about-container {
		width: 90%;
		margin: 0;
	}

	.mobile h1,
	.about-container h1 {
		font-size: 22px;
		font-weight: 900;
		font-family: "Mont-serrat", sans-serif;
	}

	.about-container h1 {
		font-size: 18px;
	}

	.about-container p {
		font-size: 14px;
		margin: 1rem 0;
	}
	.container {
		height: 100vh;
	}
	.logo-container img {
		height: 30px;
		margin-right: 1rem;
	}

	a {
		font-size: 14px;
	}
}
</style>

<script>
import homeImageActive from "../assets/ic_mobile_navigarion_home_active@3x.png";
import homeImage from "../assets/ic_mobile_navigarion_home@3x.png";
import infoImageActive from "../assets/ic_mobile_navigarion_info_active@3x.png";
import infoImage from "../assets/ic_mobile_navigarion_info@3x.png";
export default {
	data() {
		return {
			activeTab: "houses",
		};
	},
	methods: {
		activateTab(tabName) {
			this.activeTab = tabName;
		},
		getHomeImageSource() {
			return this.activeTab === "houses" ? homeImageActive : homeImage;
		},
		getInfoImageSource() {
			return this.activeTab === "about" ? infoImageActive : infoImage;
		},
	},
};
</script>

<template>
	<header class="header">
		<nav class="nav-container-mobile">
			<ul class="nav-link-container">
				<router-link to="/" class="nav-link">
					<li>
						<a
							@click="activateTab('houses')"
							:class="{ active: activeTab === 'houses' }"
						>
							<slot name="houses">
								<img :src="getHomeImageSource()" alt="Home logo" />
							</slot>
						</a>
					</li>
				</router-link>
				<router-link to="/about" class="nav-link">
					<li>
						<a
							@click="activateTab('about')"
							:class="{ active: activeTab === 'about' }"
						>
							<slot name="about">
								<img :src="getInfoImageSource()" alt="about logo" />
							</slot>
						</a>
					</li>
				</router-link>
			</ul>
		</nav>
		<nav class="nav-container-desktop">
			<div class="nav-desktop">
				<div>
					<img src="../assets/img_logo_dtt@3x.png" alt="DTT logo" />
				</div>
				<div class="nav-links">
					<ul>
						<router-link to="/">
							<li>
								<a
									@click="activateTab('houses')"
									:class="{ active: activeTab === 'houses' }"
								>
									<slot name="houses">Houses</slot>
								</a>
							</li>
						</router-link>
						<router-link to="/about">
							<li>
								<a
									@click="activateTab('about')"
									:class="{ active: activeTab === 'about' }"
								>
									<slot name="about">About</slot>
								</a>
							</li>
						</router-link>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<style scoped>
ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline;
	margin-right: 20px;
}

a {
	font-family: "Montserrat", sans-serif;
	text-decoration: none;
	font-size: 18px;
	color: #c3c3c3;
	font-weight: 500;
	padding-left: 2rem;
	text-align: center;
}

a.active {
	font-family: "Montserrat", sans-serif;
	color: #000000;
	font-weight: 900;
}

.nav-container-desktop {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: #ffffff;
	min-width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
}
.nav-desktop {
	width: 70%;
	display: flex;
	align-items: center;
}

nav img {
	height: 3rem;
}

.nav-link {
	text-decoration: none;
	font-size: 18px;
	color: #c3c3c3;
	font-weight: 500;
	padding-left: 3rem;
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
		z-index: 10;
	}
	.nav-link-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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

	nav img {
		height: 3rem;
	}
	.nav-link {
		padding-left: 0;
		width: 100%;
	}
	.nav-link li a {
		width: 100%;
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

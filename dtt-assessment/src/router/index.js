import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
		{
			path: "/houses/:houseId",
			name: "house-details",
			component: () => import("../views/HouseDetailsView.vue"),
			props: true,
			key: (route) => route.params.houseId,
		},
		{
			path: "/create-listing",
			name: "create-listing",
			component: () => import("../views/CreateListingView.vue"),
		},
		{
			path: "/edit-listing/:listingId",
			name: "edit-listing",
			component: () => import("../views/EditListingView.vue"),
			props: true,
			key: (route) => route.params.listingId,
		},
	],
});

export default router;

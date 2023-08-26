<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chilltime from '$lib/back.gif';

	let mapElement;
	let map;
	let latlng_user = { lat: 0, lng: 0 };

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			if ('geolocation' in navigator) {
				window.navigator.geolocation.getCurrentPosition((position) => {
					latlng_user.lat = position.coords.latitude;
					latlng_user.lng = position.coords.longitude;
				});
			} else {
				console.log('location not found');
			}

			map = leaflet.map(mapElement).setView([latlng_user.lat, latlng_user.lng], 4);

			let myIcon = leaflet.icon({
				iconUrl: Chilltime,
				iconSize: [100, 100],
				iconAnchor: [22, 94]
			});

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);
			let m1 = leaflet.marker([latlng_user.lat, latlng_user.lng]).addTo(map);

			map.on('click', (e) => {
				let markerbyclick = new leaflet.marker([e.latlng.lat, e.latlng.lng], {
					icon: myIcon
				}).addTo(map);
				latlng_user.lat = e.latlng.lat;
				latlng_user.lng = e.latlng.lng;
			});

			leaflet
				.marker([51.5, -0.09], { icon: myIcon })
				.addTo(map)
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
			// .openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});

	$: console.log(latlng_user);
</script>

<button
	on:click={() => {
		window.navigator.geolocation.getCurrentPosition(console.log, console.log);
	}}>Upload</button
>
<main>
	<div bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		height: 500px;
	}
</style>

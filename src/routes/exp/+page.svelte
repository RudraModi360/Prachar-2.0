<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chilltime from '$lib/back.gif';

	let mapElement;
	let map;
	let lat;
	let long;
	let doupdate = true;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			function update() {
				if ('geolocation' in navigator && doupdate) {
					window.navigator.geolocation.getCurrentPosition((position) => {
						lat = position.coords.latitude;
						long = position.coords.longitude;
						// console.log([lat, long]);
						m1.setLatLng([lat, long]);
						map.setView([lat, long], 8);
						doupdate = false;
					});
				} else {
					console.log('location not found');
				}
			}

			map = leaflet.map(mapElement).setView([0, 0], 4);

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
			let m1 = leaflet.marker([0, 0]).addTo(map);

			map.on('click', (e) => {
				let markerbyclick = new leaflet.marker([e.latlng.lat, e.latlng.lng], {
					icon: myIcon
				}).addTo(map);
				lat = e.latlng.lat;
				long = e.latlng.lng;
			});

			leaflet
				.marker([51.5, -0.09], { icon: myIcon })
				.addTo(map)
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
			// .openPopup();

			setInterval(update, 1000);
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});

	// $: console.log(latlng_user);
</script>

<button
	on:click={() => {
		window.navigator.geolocation.getCurrentPosition(console.log, console.log);
		doupdate = true;
	}}>Upload</button
>
<main>
	<div bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		height: 600px;
	}
</style>

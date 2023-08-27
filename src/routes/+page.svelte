<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chilltime from '$lib/back.gif';
	import Ideal from '$lib/ideal.gif';
	import { error, redirect } from '@sveltejs/kit';
	import locate from '$lib/locate-icon.svg';

	let mapElement;
	let map;
	let lat;
	let long;
	let doupdate = true;
	let moveftime = true;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			function update() {
				if ('geolocation' in navigator) {
					window.navigator.geolocation.getCurrentPosition((position) => {
						lat = position.coords.latitude;
						long = position.coords.longitude;
						// console.log([lat, long]);
						m1.setLatLng([lat, long]);
						if (moveftime) {
							map.setView([lat, long], 8);
							moveftime = false;
						}
						doupdate = false;
					});
				} else {
					console.log('location not found');
				}
				return doupdate;
			}

			map = leaflet.map(mapElement).setView([0, 0], 4);

			let myIcon = leaflet.icon({
				iconUrl: Chilltime,
				iconSize: [100, 100],
				iconAnchor: [22, 94]
			});
			let myIcon2 = leaflet.icon({
				iconUrl: Ideal,
				iconSize: [100, 100],
				iconAnchor: [22, 94]
			});

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);
			let m1 = leaflet
				.marker([0, 0], { icon: myIcon2 })
				.on('click', function (e) {
					window.location = '/exp/123';
				})
				.addTo(map);
			// m1.on('click', alert('active'));
			map.on('click', (e) => {
				let markerbyclick = new leaflet.marker([e.latlng.lat, e.latlng.lng], {
					icon: myIcon
				}).addTo(map);
				lat = e.latlng.lat;
				long = e.latlng.lng;
			});

			let circle = leaflet
				.circle([51.508, -0.11], {
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 500
				})
				.addTo(map);
			circle.bindPopup(console.log('active'));
			leaflet
				.marker([51.5, -0.09], { icon: myIcon })
				.addTo(map)
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
			// .openPopup();
			if (doupdate) {
				setInterval(update, 1000);
			}
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

<!-- <button
	on:click={() => {
		window.navigator.geolocation.getCurrentPosition(console.log, console.log);
		doupdate = true;
	}}>Upload</button
>
{lat} -->

<main>
	<div bind:this={mapElement} />
</main>
<button
	on:click={() => {
		window.location = `/exp/${lat}`;
	}}
	class="addplace"
>
	Add Place</button
>
<button
	on:click={() => {
		doupdate = true;
		moveftime = true;
	}}
	class="locate"
>
	<img src={locate} alt="locate" /></button
>

<style>
	@import 'leaflet/dist/leaflet.css';
	main div {
		height: 90vh;
		bottom: 10vh;
		/* z-index: -1; */
	}
	.locate {
		margin-left: 3vw;
		margin-bottom: 0vh;
		float: left;
		position: fixed;
		bottom: 3vh;
		/* z-index: 5; */
		background-color: white;
	}
	img {
		height: 50px;
	}
	.addplace {
		width: 70vw;
		bottom: 9vh;
		font-size: 6vh;
		position: relative;
	}
</style>

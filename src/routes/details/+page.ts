import type { PageLoad } from './$types';

export const load = (async () => {
    const locations = [
        {
            name: "New York City",
            latitude: 40.7128,
            longitude: -74.0060,
            country: "United States",
        },
        {
            name: "Los Angeles",
            latitude: 34.0522,
            longitude: -118.2437,
            country: "United States",
        },
        {
            name: "London",
            latitude: 51.5074,
            longitude: -0.1278,
            country: "United Kingdom",
        },
        {
            name: "Paris",
            latitude: 48.8566,
            longitude: 2.3522,
            country: "France",
        },
        {
            name: "Tokyo",
            latitude: 35.682839,
            longitude: 139.759455,
            country: "Japan",
        },
        {
            name: "Sydney",
            latitude: -33.8651,
            longitude: 151.2093,
            country: "Australia",
        },
        {
            name: "Rio de Janeiro",
            latitude: -22.9068,
            longitude: -43.1729,
            country: "Brazil",
        },
        {
            name: "Cairo",
            latitude: 30.0444,
            longitude: 31.2357,
            country: "Egypt",
        },
        {
            name: "Cape Town",
            latitude: -33.9249,
            longitude: 18.4241,
            country: "South Africa",
        },
        {
            name: "Dubai",
            latitude: 25.276987,
            longitude: 55.296249,
            country: "United Arab Emirates",
        },
    ];

    return { locations };
}) satisfies PageLoad;
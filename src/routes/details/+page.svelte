<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.locations as loc}
	{loc.country}
{/each}

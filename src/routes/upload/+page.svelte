<!-- <script>
    /** @type {import('./$types').PageData} */
    export let data;
</script> -->
<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    // import Tempo from "$lib/tempo.gif"
    const frameworks = [
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "next",
            label: "Next.js",
        },
        {
            value: "astro",
            label: "Astro",
        },
        {
            value: "nuxt",
            label: "Nuxt.js",
        },
    ];
</script>

<div class="flex flex-col justify-between">
    <Card.Root class="w-[96vw]  p-0 h-[525px] dark m-[2vw] border-none">
        <Card.Header>
            <Card.Title class="text-xl">Details</Card.Title>
        </Card.Header>
        <Card.Content class="flex justify-center">
            <img src="./favicon.png" alt="meme" class="h-52" />
        </Card.Content>
        <Card.Footer
            class="flex flex-col mx-5  w-fit p-0 h-52 justify-between  "
        >
            <div class="w-fit p-0 mx-0">Description</div>
            <div class="flex flex-col gap-3">
                <div class="w-fit p-0 mt-0">Start-date:</div>
                <div class="w-fit p-0 mx-0">End-date:</div>
            </div>
        </Card.Footer>
    </Card.Root>

    <div class="flex justify-center mt-36 ">
        <Button class="w-80 border p-6 z-10  fixed bottom-4">Add Photos</Button>
    </div>
</div>
<!-- <style>
    .addbtu{
        display: flex;

    }
 </style> -->

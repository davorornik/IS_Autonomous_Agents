<script>
    import Canvas from './Canvas.svelte';
    import Background from './Background.svelte';
    import Selector from './Selector.svelte';
    import FPS from './FPS.svelte';
    import Navbar from "./Navbar.svelte";
    import Boids from "./Boids.svelte";

</script>

<svelte:head>
    <title>Autonomous agents</title>
    <html lang="en"></html>
</svelte:head>


<Navbar/>
<Canvas>
    <Background/>
    <Boids/>
    <Selector/>
    <FPS/>
</Canvas>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow: clip;
    }
</style>
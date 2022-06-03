<script>
    import {boids, force, height, speed, view, width, fSeek, fSeparate, fAlignment, fCohesion} from "./game";
    import {navHeight} from './constants';

    let size = 100;
    changeSize()

    function changeSize() {
        if (size < 1)
            size = 1;
        if (size > 300)
            size = 300;
        boids.create([size, $width, $height]);
    }

    $: if ($speed > 10) {
        $speed = 10;
    }
    $: if ($view > 360) {
        $view = 360;
    }
    $: if ($view < 0) {
        $view = 1;
    }


</script>

<div style="--navHeight: {navHeight}"></div>

<div class="navbar">
    <div class="grid">
        <span class="row">
            <span class="col">
                <span class="row"><input type="number" on:change={() => changeSize() }
                                         bind:value={size} min=1 name="boids"/></span>
                <span class="row">boids</span>
            </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$speed} min=1 max=10 name="speed"/></span>
                <span class="row">speed</span>
            </span>
               <span class="col">
                   <span class="row"><input type="number" bind:value={$force} min=0.01 max=1 name="speed"
                                            step=".02"/></span>
                   <span class="row">force</span>
                </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$view} min=1 max=360 name="speed"/></span>
                <span class="row">view</span>
            </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$fSeek} min=1/></span>
                <span class="row">Seek</span>
            </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$fSeparate} min=1/></span>
                <span class="row">Separate</span>
            </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$fAlignment} min=1/></span>
                <span class="row">Alignment</span>
            </span>
            <span class="col">
                <span class="row"><input type="number" bind:value={$fCohesion} min=1/></span>
                <span class="row">Cohesion</span>
            </span>
       </span>
    </div>
</div>

<style>
    .navbar {
        background-color: #cccccc;
        height: calc(var(--navHeight) * 1px);
        max-height: calc(var(--navHeight) * 1px);
    }

    .grid {
        display: table;
        height: 100px;
        text-align: center;
    }

    .row {
        display: table-row;
        vertical-align: middle;
    }

    .col {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        margin: auto;
    }

    input[type='number'] {
        width: auto;
        max-width: 80px;
        height: 30px;
    }


</style>
<script>
    import {height, width, renderable, mouseDown} from './game.js';
    import {navHeight, r} from "./constants";
    import Text from './Text.svelte';

    export let color = '#ff0000';
    export let thickness = 2;

    let m = [0, 0];
    let text;
    let onCanvas = false;

    $: text = onCanvas ? m.map(n => Math.round(n)).join(', ') : '';

    renderable((props) => {
        const {context, mouse} = props;
        mouse[0] = m[0];
        mouse[1] = m[1];

        if (!onCanvas)
            return;
        context.save();
        context.lineCap = 'round';
        context.beginPath();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.lineWidth = thickness;
        context.arc(m[0], m[1], r, 0, Math.PI * 2);
        context.stroke();
        context.restore();
    });


    function handleMouseMove(event) {
        if (event.pageY > navHeight) {
            m = [event.pageX, event.pageY - navHeight];
            onCanvas = true;
        } else {
            onCanvas = false;
        }
    }

    function handleMouseDown(event) {
        if (event.buttons === 4) { //  middle mouse
            event.preventDefault();
        }
        $mouseDown = event.buttons === 1;
        handleMouseMove(event);
    }

    function handleMouseUp(event) {
        handleMouseMove(event);
        $mouseDown = false;
    }

</script>

<svelte:window
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
        on:mousemove={handleMouseMove}
/>

<Text
        {text}
        fontSize={12}
        align='right'
        baseline='bottom'
        x={$width - 30}
        y={$height - 30}/>
<slot></slot>
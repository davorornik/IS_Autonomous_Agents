<script>
    import {renderable} from './game.js';
    import {pad} from "./constants";

    export let color = "#333333";

    renderable(props => {
        const {context, width, height} = props;
        context.clearRect(0, 0, width, height);
        if (color) {
            context.fillStyle = color;
            context.fillRect(0, 0, width, height);
        }
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "#ffffff";
        context.rect(pad, pad, width - 2 * pad, height - 2 * pad);
        context.stroke();
    });
</script>

<slot></slot>
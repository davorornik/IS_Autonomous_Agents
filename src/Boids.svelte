<script>
    import {fAlignment, fCohesion, fSeek, fSeparate, renderable} from './game.js';
    import {Vector} from "./vector";
    import {r} from './constants'

    const color = "#ffff33";
    const a = ((Math.PI * 2) / 3); // 60° in rad
    const t = 0.3;

    renderable((props) => {
        const {
            context, boids, mouse, width, height, mouseDown, speed, view,
            force, fSeek, fSeparate, fAlignment, fCohesion
        } = props;

        let target = new Vector(mouse[0], mouse[1]);
        context.save();
        context.fillStyle = color;
        context.strokeStyle = color;


        boids.forEach(b => {
            b.setMaxSpeed(speed);

            if (!mouseDown)
                target = b.advanceForward(speed * 2);

            let seek = b.seek(target, force);
            let separate = b.separate(boids, view, force);
            let alignment = b.alignment(boids, view, force);
            let cohesion = b.cohesion(boids, view, force);

            b.applyForce(Vector.multiply(seek, fSeek));
            b.applyForce(Vector.multiply(separate, fSeparate));
            b.applyForce(Vector.multiply(alignment, fAlignment));
            b.applyForce(Vector.multiply(cohesion, fCohesion));
            b.update(width, height);

            context.beginPath();
            context.lineTo(b.location.x + r * Math.cos(b.angle), b.location.y + r * Math.sin(b.angle));
            context.lineTo(b.location.x + r * Math.cos(a + b.angle + t), b.location.y + r * Math.sin(a + b.angle + t));
            context.lineTo(b.location.x - (r * 0.5) * Math.cos(b.angle), b.location.y - (r * 0.5) * Math.sin(b.angle));
            context.lineTo(b.location.x + r * Math.cos(a * 2 + b.angle - t), b.location.y + r * Math.sin(a * 2 + b.angle - t));
            context.closePath();
            context.fill();
        })
        context.restore();

    });


</script>

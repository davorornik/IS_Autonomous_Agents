import {Vector} from './vector'
import {pad, neighbordist, r} from "./constants";

export class Boid {

    constructor(x, y) {
        if (x === undefined) {
            this.makeRandom();
        } else if (y === undefined) {
            this.makeRandom(x);
        } else {
            this.angle = Math.random() * 2 * Math.PI;
            this.location = new Vector(x, y);
            this.velocity = new Vector();
            this.acceleration = new Vector();
        }
        this.maxSpeed = 3;
    }

    setMaxSpeed(speed) {
        this.maxSpeed = speed;
    }

    makeRandom(size = 1000) {
        this.location = new Vector(Math.round(Math.random() * size), Math.round(Math.random() * size));
        this.angle = Math.random() * 2 * Math.PI;
    }

    calcVelocity() {
        this.velocity.add(this.acceleration);
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity = this.velocity.normalize().multiply(this.maxSpeed);
        }
    }


    update(w, h) {
        let oldL = new Vector(this.location.x, this.location.y);
        this.calcVelocity();
        let newL = Vector.add(this.location, this.velocity);
        let reversed = false;

        //  note reverse direction
        if (newL.x < pad || newL.x > (w - pad)) {
            this.velocity.x = -this.velocity.x * this.maxSpeed;
            reversed = true;
        }
        if (newL.y > (h - pad) || newL.y < pad) {
            this.velocity.y = -this.velocity.y * this.maxSpeed;
            reversed = true;
        }
        if (reversed) {
            newL = Vector.add(this.location, this.velocity);
            this.angle = -this.angle;
        } else {
            this.angle = Math.atan2(newL.y - oldL.y, newL.x - oldL.x);
        }
        this.location = newL;
        this.acceleration = new Vector(0, 0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target, force) {
        let desired = Vector.subtract(target, this.location);
        let d = desired.length();
        desired = desired.normalize();
        if (d < 100)
            desired = Vector.lerp(Vector.ZERO(), desired, d / r);
        else desired.multiply(this.maxSpeed);
        let steer = Vector.subtract(desired, this.velocity);
        if (steer.length() > force) {
            steer = steer.normalize();
            steer = steer.multiply(force);
        }
        return steer;
    }

    inView(v) {
        let one = Math.atan2(this.location.y - v.location.y, this.location.x - v.location.x);
        let two = Math.atan2(this.velocity.y, this.velocity.x);
        return Math.abs(one - two);
    }

    cohesion(ve, maxView, force) {
        let angle = (maxView / 180 * Math.PI);
        let sum = Vector.ZERO();
        let count = 0;

        ve.filter(v => !Vector.equals(v, this)).forEach(v => {
            let d = Vector.subtract(location, v.location);
            d = d.length();
            if ((d > 0) &&
                (d < neighbordist) &&
                this.inView(v) < angle) {
                sum = Vector.add(sum, v.location);
                count++;
            }
        })

        if (count > 0) {
            sum = Vector.divide(sum, count);
            return this.seek(sum, force);
        }
        return Vector.ZERO();
    }

    alignment(ve, maxView, force) {
        let angle = (maxView / 180 * Math.PI);
        let alignment = 50;
        let sum = Vector.ZERO();
        let count = 0;

        ve.filter(v => !Vector.equals(v, this)).forEach(v => {
            let d = (location - v.location).length();
            if ((d > 0) && (d < alignment) && Math.abs(Math.atan2(this.location.y - v.location.y, this.location.x - v.location.x) - Math.atan2(this.velocity.y, this.velocity.x)) < angle) {
                sum = Vector.add(sum, v.velocity);
                count++;
            }
        })
        if (count > 0) {
            sum = Vector.divide(sum, count);
            sum = sum.normalize();
            sum = Vector.multiply(sum, this.maxSpeed);
            let steer = Vector.subtract(sum, this.velocity);
            if (steer.length() > force) {
                steer = steer.normalize();
                steer = Vector.multiply(steer, force);
            }
            return steer;
        }
        return Vector.ZERO();
    }


    separate(ve, maxView, force) {
        let angle = (maxView / 180 * Math.PI);
        let separation = 20;
        let count = 0;
        let sum = Vector.ZERO();


        ve.filter(v => Vector.equals(v, this)).forEach(v => {

            let d = Vector.subtract(this.location, v.location);
            d = d.length();

            if ((d > 0) && (d < separation) && Math.abs(Math.atan2(this.location.y - v.location.y, this.location.x - v.location.x) - Math.atan2(this.velocity.y, this.velocity.x)) < angle) {
                let dif = Vector.subtract(this.location, v.location);
                dif = dif.normalize();
                dif = dif.divide(d);
                sum = sum.add(dif);
                count++;
            }
        })
        if (count > 0) {
            sum = Vector.divide(sum, count);
            sum = sum.normalize();
            sum = sum.multiply(this.maxSpeed);
            let steer = sum.subtract(this.velocity);
            if (steer.length() > force) {
                steer = steer.normalize();
                steer = Vector.multiply(steer, force);
            }
            return steer;
        }
        return Vector.ZERO();
    }

    advanceForward(distance = this.maxSpeed) {
        return new Vector(
            this.location.x + Math.cos(this.angle) * distance,
            this.location.y + Math.sin(this.angle) * distance
        );
    }


}
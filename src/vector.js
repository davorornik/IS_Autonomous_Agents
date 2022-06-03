export function Vector(x, y) {
    if (x === undefined) {
        this.x = 0.0;
        this.y = 0.0;
    } else if (x instanceof Vector) {
        this.x = x.x;
        this.y = x.y;
    } else {
        this.x = x || 0.0;
        this.y = y || 0.0;
    }
}

/* INSTANCE  */
Vector.prototype = {
    negative: function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },
    add: function (v) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    },
    subtract: function (v) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    },
    multiply: function (v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    },
    divide: function (v) {
        if (v instanceof Vector) {
            if (v.x !== 0) this.x /= v.x;
            if (v.y !== 0) this.y /= v.y;
        } else {
            if (v !== 0) {
                this.x /= v;
                this.y /= v;
            }
        }
        return this;
    },
    equals: function (v) {
        return this.x === v.x && this.y === v.y;
    },
    dot: function (v) {
        return this.x * v.x + this.y * v.y;
    },
    cross: function (v) {
        return this.x * v.y - this.y * v.x
    },
    length: function () {
        return Math.sqrt(this.dot(this));
    },
    normalize: function () {
        return this.divide(this.length());
    },
    x: function () {
        return this.x;
    },
    y: function () {
        return this.y;
    },
};

/* STATIC  */
Vector.negative = function (v) {
    return new Vector(-v.x, -v.y);
};
Vector.ZERO = function () {
    return new Vector(0, 0);
};
Vector.add = function (a, b) {
    if (b instanceof Vector) return new Vector(a.x + b.x, a.y + b.y);
    else return new Vector(a.x + b, a.y + b);
};
Vector.subtract = function (a, b) {
    if (b instanceof Vector) return new Vector(a.x - b.x, a.y - b.y);
    else return new Vector(a.x - b, a.y - b);
};
Vector.multiply = function (a, b) {
    if (b instanceof Vector) return new Vector(a.x * b.x, a.y * b.y);
    else return new Vector(a.x * b, a.y * b);
};
Vector.divide = function (a, b) {
    if (b instanceof Vector) return new Vector(a.x / b.x, a.y / b.y);
    else return new Vector(a.x / b, a.y / b);
};
Vector.equals = function (a, b) {
    return a.x === b.x && a.y === b.y;
};
Vector.dot = function (a, b) {
    return a.x * b.x + a.y * b.y;
};
Vector.cross = function (a, b) {
    return a.x * b.y - a.y * b.x;
};
Vector.lerp = function (value1, value2, amount) {
    return new Vector(
        value1.y + (value2.x - value1.x) * amount,
        value1.y + (value2.y - value1.y) * amount);
};


import {getContext, onMount} from 'svelte';
import {derived, writable} from 'svelte/store';
import {Boid} from './Boid';
import {navHeight, pad} from "./constants";


export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight - navHeight);
export const pixelRatio = writable(window.devicePixelRatio);
export const context = writable();
export const canvas = writable();
export const time = writable(0);
export const mouse = writable([0, 0]);//  x,y
export const mouseDown = writable(false);
export const speed = writable(3);
export const view = writable(180);
export const force = writable(0.1);
export const fSeek = writable(2);
export const fSeparate = writable(5);
export const fAlignment = writable(4);
export const fCohesion = writable(10);


function createBoidsStore() {
    const {subscribe, set, update} = writable([]);

    function create(size, w, h) {
        if (size === undefined)
            size = 1;
        if (w === undefined)
            w = 1000;
        if (h === undefined)
            h = 1000;
        let newValues = [];
        for (let i = 0; i < size; i++) {
            newValues.push(new Boid(
                Math.round(Math.random() * (w - 2 * pad) + pad),
                Math.round(Math.random() * (h - 2 * pad) + pad),
            ));
        }
        set(newValues);
    }

    return {
        subscribe,
        reset: () => set([]),
        create: (args) => create(...args),
        add: (boid) => update(n => [...n, boid])
    };
}

export const boids = createBoidsStore();

// A more convenient store for grabbing all game props
export const props = deriveObject({
    context,
    canvas,
    width,
    height,
    pixelRatio,
    time,
    boids,
    mouse,
    mouseDown,
    speed,
    view,
    force,
    fSeek,
    fSeparate,
    fAlignment,
    fCohesion
});

export const key = Symbol();

export const renderable = (render) => {
    const api = getContext(key);
    const element = {
        ready: false,
        mounted: false
    };
    if (typeof render === 'function') element.render = render;
    else if (render) {
        if (render.render) element.render = render.render;
        if (render.setup) element.setup = render.setup;
    }
    api.add(element);
    onMount(() => {
        element.mounted = true;
        return () => {
            api.remove(element);
            element.mounted = false;
        };
    });
}

function deriveObject(obj) {
    const keys = Object.keys(obj);
    const list = keys.map(key => {
        return obj[key];
    });
    return derived(list, (array) => {
        return array.reduce((dict, value, i) => {
            dict[keys[i]] = value;
            return dict;
        }, {});
    });
}
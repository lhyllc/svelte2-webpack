<script>
    import {onMount} from 'svelte';
    import {dogStore} from '../store/index';
    import Outer from "./Outer.svelte";
    import {writable,readable} from "svelte/store";
    import FancyList from "./FancyList.svelte";
    import { setContext,getContext} from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';

    let coords = spring({ x: 50, y: 50 }, {
        stiffness: 0.1,
        damping: 0.25
    });

    let size = spring(10);

    setContext('answer', {num:42,title:'我是content'});
    let dog=$dogStore;
    console.log(dog);
    let name = 123;
    //初始值
    /*$: $size = true? 1 : 0.2;
    //
    const size = tweened(1, {
        duration: 3000,
        easing: cubicOut
    });*/

    function handleClickSize() {
        // this is equivalent to size.update(n => n + 1)
        $size += 0.1;
    }
    // 这里需要Parens才能知道开放的大括号不是块的开头。
    $: ({age, say, name} = $dogStore);
    const time = readable(new Date(), set => {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);

        return () => clearInterval(interval);
    });
    const countk = writable(0, () => {
        console.log('got a subscriber');
        return () => console.log('no more subscribers');
    });

    countk.set(1); // does nothing

    const unsubscribe = countk.subscribe(value => {
        console.log(value);
    }); // logs 'got a subscriber', then '1'

    unsubscribe(); // log
    let fillings = 'Cheese';
    let active = true;
    let count = 10;
    let value = "输入";
    let items = [{text: 'anni'}, {text: 'hrjj'}];
    let post = {
        title: '头部',
        content: '<div><p><span>我是内容部分</span></p></div>'
    };
    let dom;
    onMount(() => {
        dom = document.getElementById('h1');
        console.log(dom);
    });


    function handGetValue() {
        console.log(fillings);
    }

    let p = new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve();
                }, 1000);

            }
    );

    function foo(node, bar) {
        // the node has been mounted in the DOM

        return {
            update(bar) {
                // the value of `bar` has changed
                console.log('456')
            },

            destroy() {
                console.log('销毁');
                // the node has been removed from the DOM
            }
        };
    }

    function handleClick(e) {
        console.log(e);
        alert('clicked');
    }
    function changeDog() {
        // 方法 #1 - 创建新对象
        //dogStore.set({age: 2, breed: 'GSP', name: 'Oscar'});

        // 方法 #2 - 调整并复用对象
        dog.name = '大黄';
        dogStore.set(dog);
    }
</script>
<style>

</style>
<!--<button
        on:click={handleClickSize}
        style="transform: scale({$size}); transform-origin: 0 0"
>embiggen</button>-->
<span on:click={changeDog}>{countk}</span>
<span>{dog.name}{say}</span>
<Outer on:click={handleClick} on:message={e=>alert(e.detail.text)}></Outer>
<h1 id="h1" bind:this={dom} use:foo={fillings}>Hello {name}!</h1>
<input type="checkbox" bind:group={fillings} value="Rice"/>
<input type="checkbox" bind:group={fillings} value="Beans"/>
<input type="checkbox" bind:group={fillings} value="Cheese"/>
<div class:active={active} on:click={()=>active=!active}>点击</div>
<div transition:fade="{{ duration: 2000 }}">
    flies in, fades out over two seconds
</div>
<div style="position: absolute; right: 1em;">
    <label>
        <h3>stiffness ({coords.stiffness})</h3>
        <input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01">
    </label>

    <label>
        <h3>damping ({coords.damping})</h3>
        <input bind:value={coords.damping} type="range" min="0" max="1" step="0.01">
    </label>
</div>

<svg
        on:mousemove="{e => coords.set({ x: e.clientX, y: e.clientY })}"
        on:mousedown="{() => size.set(30)}"
        on:mouseup="{() => size.set(10)}"
>
    <circle cx={$coords.x} cy={$coords.y} r={$size}></circle>
</svg>
{@html post.content}


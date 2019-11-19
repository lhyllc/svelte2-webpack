<script>
    import { beforeUpdate,tick,createEventDispatcher } from 'svelte';
    import { getContext} from 'svelte';

    const answer = getContext('answer');
    console.log(answer);
    const dispatch = createEventDispatcher();
    let number=0;
    let title='测试';

    beforeUpdate(async () => {
        console.log('the component is about to update');
        await tick();
        console.log('the component just updated');
    });
    async function sayHello() {
        dispatch('message', {
            text: 'Hello!'
        });
        number++;
        await tick();//其实就是需要修改dom状态的时候,在这个方法之前执行。不需要的时候在后面执行。避免重复渲染带来额外的开销。
        title=title+'+1';
    }
</script>
<span>{number}</span>
<span>{title}</span>
<button on:click={sayHello}>
    Click to say hello
</button>

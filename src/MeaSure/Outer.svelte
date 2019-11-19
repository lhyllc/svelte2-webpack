<script>
    import Input from "./Input.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let onclick=function(){};
</script>
<Input on:message/>
<button on:click>点击</button>
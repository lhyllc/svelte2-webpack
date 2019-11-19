import {writable} from 'svelte/store';

export const dogStore = writable({}, async set => {
    // 订阅计数由0到1时调用。
    // 计算初始值并传递给set函数。
    const dogs = {name:'旺财',say:'旺旺',age:'1'};
    set(dogs);

    return () => {
        // 订阅计数归零时调用。
    };
});
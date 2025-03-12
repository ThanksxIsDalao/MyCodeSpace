# 节流 throttle 和防抖 debounce 的用途，区别，实现及应用场景



# 1.用途

两者都是前端优化手段，主要用于控制高频触发的事件，如resize、scroll、input、mousemove等，都会不断的调用绑定在事件上的回调函数，会极大地浪费资源，降低前端性能，为了优化性能，这时候就可以采用节流(throttle)和防抖(debounce)来减少调用频率。

# 定义

- 节流：固定时间内只能触发一次，其余不作响应
- 防抖：在事件触发后，一定时间内如果没有再次触发，则执行回调

**举例**

- 节流：相当于王者荣耀技能cd，一定时间内只能触发一次，需等待cd恢复后可触发下一次
- 防抖：用户在搜索框中输入文字，只有**用户停止输入**一段时间后，才发送请求；王者中连续点击回城，只有最后一下才会真正开始回城，前面都会打断

# 2.代码实现

### 节流

```js
function throttle(fn, interval) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

function onScroll() {
    console.log("滚动事件触发", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScroll);
```

### 防抖

```js
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function search(query) {
    console.log("搜索请求：" + query);
}

const debounceSearch = debounce(search, 500);

// 假设用户输入："hello"
debounceSearch("h");
debounceSearch("he");
debounceSearch("hel");
debounceSearch("hell");
debounceSearch("hello"); 
// 只有 "hello" 会执行 search，因为前面的调用都在 500ms 内被清除
```

# 3.区别

### 相同点

- 通过使用 `setTimeout` 实现
- 目的都是，降低回调执行频率。节省计算资源

### 不同点

- 函数防抖，在一段连续操作结束后，处理回调，利用`clearTimeout`和 `setTimeout`实现。函数节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能
- 函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次

# 4.应用场景

### 节流

- 滚动加载，加载更多或滚到底部监听
- 验证码的发送按钮

### 防抖

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染
# **apply、call 和 bind 的作用及区别**



在 JavaScript 中，apply、call 和 bind 都可以用来**改变 this 指向**，让一个对象借用另一个对象的方法，但它们的使用方式略有不同。

**1. call 方法**

**作用**

call 方法用于**立即调用**一个函数，并显式指定 this 以及传递参数。

**语法**

```
func.call(thisArg, arg1, arg2, ...)
```

**示例**

```
function greet(age, city) {
    console.log(`我是 ${this.name}，今年 ${age} 岁，来自 ${city}`);
}

const person = { name: "张三" };
greet.call(person, 25, "北京");
// 输出: 我是 张三，今年 25 岁，来自 北京
```

​	•	call 立即执行 greet，并且将 this 指向 person，然后把 age 和 city 作为参数传入。



**2. apply 方法**

**作用**

apply 和 call 一样，也是**立即调用**函数，并显式指定 this，但它的**参数必须是一个数组**。

**语法**

```
func.apply(thisArg, [arg1, arg2, ...])
```

**示例**

```
function greet(age, city) {
    console.log(`我是 ${this.name}，今年 ${age} 岁，来自 ${city}`);
}

const person = { name: "李四" };
greet.apply(person, [30, "上海"]);
// 输出: 我是 李四，今年 30 岁，来自 上海
```

​	•	apply 也是立即执行 greet，但是参数要用数组的形式传递。



**apply vs call**

​	•	call 用 **逗号分隔** 传参，如 call(thisArg, param1, param2)

​	•	apply 用 **数组** 传参，如 apply(thisArg, [param1, param2])



​	**何时使用 apply？**

​		•	当参数是一个数组时，apply 更方便，比如 Math.max.apply(null, [1, 5, 3, 9])。



**3. bind 方法**

**作用**

bind **不会立即调用**函数，而是返回一个新的函数，并永久绑定 this 和传递的参数。

**语法**

```
const newFunc = func.bind(thisArg, arg1, arg2, ...)
```

**示例**

```
function greet(age, city) {
    console.log(`我是 ${this.name}，今年 ${age} 岁，来自 ${city}`);
}

const person = { name: "王五" };
const boundGreet = greet.bind(person, 40);
boundGreet("深圳");
// 输出: 我是 王五，今年 40 岁，来自 深圳
```

​	•	bind **不会立即执行** greet，而是返回一个新的函数 boundGreet，this 绑定到 person，age 绑定为 40，调用时再传入 city。



**bind vs call/apply**

​	•	call/apply 立即执行函数

​	•	bind 只是**返回一个新函数**，需要手动调用



**4. 主要区别总结**

| **方法**  | **是否立即执行**       | **传参方式**       | **返回值**       |
| --------- | ---------------------- | ------------------ | ---------------- |
| **call**  | ✅ 立即执行             | 逗号分隔的参数列表 | 调用的函数返回值 |
| **apply** | ✅ 立即执行             | **数组** 传参      | 调用的函数返回值 |
| **bind**  | ❌ 不执行，只返回新函数 | 逗号分隔的参数列表 | **新的函数**     |



**5. 使用场景**

| **场景**                    | **适合的方法** | **说明**                               |
| --------------------------- | -------------- | -------------------------------------- |
| **改变 this 立即执行函数**  | call / apply   | 适用于普通方法调用                     |
| **参数是数组的情况**        | apply          | 适用于 Math.max.apply(null, [1, 2, 3]) |
| **绑定 this，但稍后再执行** | bind           | 适用于事件监听、定时器、回调           |



**6. 真实应用示例**



**（1）Math.max 使用 apply**

```
const nums = [3, 9, 2, 5, 7];
console.log(Math.max.apply(null, nums)); // 输出 9
```

​	Math.max 不能直接传数组，apply 可以展开数组。



**（2）定时器 bind**

```
const obj = {
    name: "Alice",
    sayHi() {
        setTimeout(this.greet.bind(this), 1000);
    },
    greet() {
        console.log(`你好，我是 ${this.name}`);
    }
};
obj.sayHi();
// 1 秒后输出: 你好，我是 Alice
```

​	这里 setTimeout(this.greet, 1000) 会导致 this 丢失，所以用 bind(this) 绑定。



**（3）事件监听 bind**

```
const button = document.getElementById("myBtn");
const person = {
    name: "Bob",
    sayHi() {
        console.log(`你好，我是 ${this.name}`);
    }
};
button.addEventListener("click", person.sayHi.bind(person));
```

​	bind 确保 this 始终指向 person，而不会变成 button。



**总结**

​	•	call 和 apply 立即执行，bind 只是返回新函数。

​	•	call 和 apply 主要区别是**参数传递方式**（apply 用数组）。

​	•	bind 适用于**延迟执行**的场景，如**事件监听、定时器、回调**等。



🔥 **口诀**：

​	•	**要立即执行**？用 call 或 apply（参数数组就用 apply）。

​	•	**要返回新函数**？用 bind。
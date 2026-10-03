"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resString = {
    success: true,
    data: 'haha',
    timestamp: new Date(),
};
const resNumber = {
    success: true,
    data: [2, 4, 5, 6],
    timestamp: new Date(),
};
const user = {
    success: 'success',
    data: { id: 3, email: "lolka@gmail.com" },
    timestamp: new Date()
};
const post = {
    success: 'success',
    data: { id: 3, title: "hello" },
    timestamp: new Date()
};
class Queue {
    queue = [];
    enqueue(item) {
        this.queue.push(item);
    }
    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.pop();
        }
        else {
            return undefined;
        }
    }
    size() {
        return this.queue.length;
    }
}
const q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.dequeue(); // "a"
q.size(); // 1
// q.enqueue(42);   // має бути помилка
// async function task(){
//     async function fetchUser(): Promise<User> {
//         return {id:334,email:"lolka@gmail.com"}
//     }
//     async function fetchPosts(): Promise<Post[]> {
//         return [{id:4342,title:"funny post"}]
//     }
//     async function withLogging<T, R>(name:T, fn: () => Promise<R>) {
//         console.log(`Start: ${name}`);
//         const res = await fn();
//         console.log(`End: ${name}`);
//         return res
//     }
//     const userLog = await withLogging('fetchUser', ()=> fetchUser());
//     const postsLog = await withLogging('fetchPosts', ()=> fetchPosts());
// }
// task()
// А
function logValue(value) {
    console.log(value);
}
// Б
function parseJson(json) {
    return JSON.parse(json);
}
const userParse = parseJson('{"id": 1}');
console.log(userParse);
//# sourceMappingURL=main.js.map
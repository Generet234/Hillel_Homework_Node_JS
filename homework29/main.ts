interface Result<T> {
    success: boolean;
    data:T,
    timestamp: Date
}

const resString : Result<string> = {
    success:true,
    data: 'haha',
    timestamp: new Date(),
}

const resNumber : Result<number[]> = {
    success:true,
    data: [2,4,5,6],
    timestamp: new Date(),
}

interface ApiResponse<T> {
    success: 'success' | 'error',
    data:T,
    timestamp: Date
}

interface User{
    id: number,
    email: string,
}
interface Post{
    id: number,
    title: string,
}

const user: ApiResponse<User> = {
    success: 'success' ,
    data:{id:3,email:"lolka@gmail.com"},
    timestamp: new Date()
}

const post: ApiResponse<Post> = {
    success: 'success' ,
    data:{id:3,title:"hello"},
    timestamp: new Date()
}


class Queue<T extends string> {
    queue:string[] = [];
    enqueue(item: T):void{
        this.queue.push(item);
    }
    dequeue():string | undefined{
        if(this.queue.length > 0 ){
            return this.queue.pop()

        }
        else {
            return undefined
        }
    }
    size():number {
        return this.queue.length;
    }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
q.dequeue();   // "a"
q.size();      // 1

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
function logValue(value: unknown): void {
    console.log(value);
}
interface UserF {
    id: number
}
// Б
function isUserF(obj:any): obj is UserF{
    return typeof obj === 'object' && obj !== null && obj.id === 'number'
}
function parseJson<T>(json: string): UserF {
    const parsed = JSON.parse(json);
    if(isUserF(parsed)){
        return parsed;
    }
    else {
        throw new Error("Unknown JSON string");
    }
}

const userParse = parseJson<UserF>('{"id": 1}');
console.log(userParse);
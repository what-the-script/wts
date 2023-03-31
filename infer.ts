function add(a: number, b: number): number {
    return a + b;
}

type Return = MyReturnType<typeof add>;
//   ^?

type MyReturnType<T> = T extends (...args: any[]) => infer R
? R
: never;



type PromiseType = Awaited<Promise<Promise<Promise<string>>>>;
//   ^?

type Unwrap<T> = T extends Array<infer Inner>
? Unwrap<Inner>
: T;

type ArrayType = Unwrap<Array<Array<Array<number>>>>;
//   ^?

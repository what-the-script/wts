
type Brackets = '(' | ')';
type Signs = '*' | '/' | '+' | '-';


type isDigit<T> = T extends `${number}` ? true : false;

type checkDone<openParentCount extends 0[], lastWasOp extends boolean, lastWasOpen extends boolean> = 
true extends isNotEmpty<openParentCount> | lastWasOp | lastWasOpen ? false : true;

type isEmpty<T extends 0[]> = T['length'] extends 0 ? true : false;
type isNotEmpty<T extends 0[]> = isEmpty<T> extends true ? false : true;

type isValid<T extends string, openParentCount extends 0[] = [], lastWasOp extends boolean = false, lastWasOpen extends boolean = false> = T extends `${infer c}${infer rest}`
? c extends ' '
    ? isValid<rest, openParentCount, lastWasOp, lastWasOpen>
    : c extends '(' 
        ? isValid<rest, [0, ...openParentCount], lastWasOp, true>
        : c extends ')'
        ? HandleClosingBracket<rest, openParentCount, lastWasOp>
        : c extends Signs
            ? HandleSign<rest, openParentCount, lastWasOp, lastWasOpen>
            : isDigit<c> extends true
              ? isValid<rest, openParentCount, false, false>
              : false
: checkDone<openParentCount, lastWasOp, lastWasOpen>;


type HandleClosingBracket<rest extends string, openParentCount extends 0[], lastWasOp extends boolean> = true extends isEmpty<openParentCount> | lastWasOp
    ? 'checkClosingBracketError'
    : openParentCount extends [infer Head, ...infer Tail extends 0[]]
      ? isValid<rest, Tail, false, false>
      : 'Wrong closing bracket';

type HandleSign<Rest extends string, openParentCount extends 0[], lastWasOp extends boolean, lastWasOpen extends boolean> = 
true extends lastWasOp | lastWasOpen ? 'multiple operators' : isValid<Rest, openParentCount, true, lastWasOpen>


type Validator<T extends string> = T extends `${Signs}${infer Rest}` | `${infer Start}${Signs}` ? never : isValid<T> extends true ? T : never;



function validator<T extends string>(input: Validator<T>): Validator<T> {
    return input as unknown as Validator<T>;
}



const v1 =  validator("2 + 3 * (4 - 1)");
const v2 = validator("3 * (5 + 2) / (4 - 1)");
const v3 = validator("((7 - 2) * 4) / (3 + 1)");
const v4 = validator("10 - ((2 + 3) * 4)");
const v5 = validator("((2 * 3) + 5) / (6 - 1)");
const v6 = validator("(1 + 2) * 3 - 4 / (5 + 6)");
const v7 = validator("2 * ((3 + 4) * (5 - 1)) / 6");
const v8 = validator("((8 / 2) + (7 * 2)) * (9 - 1)");
const v9 = validator("(2 * (3 + 4) / (5 - 1))");
const v10 = validator("(10 - 2) / (3 + (5 - 4))");

const e1 = validator("2 + 3 * (4 - 1"); //(missing closing bracket)
const e2 = validator("(4 * 6 + 3) / )2 - 1(");//(mismatched brackets)
const e3 = validator("3 * / 2");//(missing operand)
const e4 = validator("(2+3)*(4-)"); //(missing operand)
const e5 = validator("5 + * 3"); // (misplaced operator)
const e6 = validator("((7 - 2) * 4 / (3 + 1)"); // (missing closing bracket)
const e7 = validator("2 * (3 + 4)) * (5 - 1)) / 6"); // (mismatched brackets)
const e8 = validator("((8 / 2) + (7 * 2)) * (9 - 1"); // (missing closing bracket)
const e9 = validator("2 * (3 + 4) / (5 - 1))"); // (mismatched brackets)
const e10 = validator("(10 - 2) / (3 + (5 - 4)) + "); // (missing operand)

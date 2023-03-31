type Rgb = TupleType<number, 3>;
//   ^?


const rgb: Rgb = [255, 255, 0];


type TupleType<TType, Length extends number, Acc extends TType[] = []> 
= Acc['length'] extends Length
? Readonly<Acc>
: TupleType<TType, Length, [...Acc, TType]>;

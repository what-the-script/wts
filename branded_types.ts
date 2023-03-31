const normalNumber = 1;

type PositiveNr = number & {__brand: 'PositiveNr'};


function savePositiveNr(nr: PositiveNr) {

}

function isPositiveNr(nr: number): nr is PositiveNr {
    return nr >= 0;
}

if(isPositiveNr(normalNumber)) {
    const test: PositiveNr = normalNumber;
    savePositiveNr(normalNumber);
}

savePositiveNr(1);

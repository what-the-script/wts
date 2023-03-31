

type NoEmptyString<T extends string> = T extends '' ? never : T;

function noEmptyString<T extends string>(input: NoEmptyString<T>){

}

noEmptyString('');
noEmptyString('working');

type Locations = 'Zurich' | 'London' | 'Oslo';

function getLocationCountry(location: Locations): string {
    switch(location) {
        case 'Zurich':
            return 'Switzerland';
        case 'London':
            return 'England';
        case 'Oslo':
            return 'Norway';
        default:
            const exhaustive: never = location;
            throw new Error(`${location} is not known`);
    }
}

getLocationCountry('Oslo');

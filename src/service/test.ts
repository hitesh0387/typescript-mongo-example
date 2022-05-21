const s1 = 'abcdef';
const s2: string = 'efabc';

function findLargestCommonSubstring(): string {
    let substring: string = '';

    if (s1 === s2) {
        return s1;
    }

    let temp: string = '';
    for (let i = 0; i < s1.length; i++) {
        for (let j = i; j < s1.length; j++) {
            temp = s1.substring(i, j);
            if (s2.substring(s2.indexOf(temp), temp.length) === temp) {
                if (temp.length > substring.length) {
                    substring = temp;
                }
            }
        }
    }

    return substring;
}

function findDenomination(amount: number): number[] {

    if (amount <= 0 || amount < 20 || amount >= 10000) {
        return [];
    }

    let balance = amount;
    let hundreds = 0;
    let fiftys = 0;
    let twenties = 0;
    let adjustHundreds = true;

    if (balance >= 100) {
        hundreds = Math.floor(balance / 100);
        balance = balance - 100 * hundreds;

        if (balance < 50 && balance % 20 !== 0) {
            adjustHundreds = false;
            while (true) {
                if (hundreds > 0 && balance < 50) {
                    balance = amount;
                    hundreds = hundreds - 1;
                    balance = balance - hundreds * 100;
                } else {
                    break;
                }
            }
        }
    }

    if (balance >= 50 && balance % 20 !== 0) {
        fiftys = Math.floor(balance / 50);
        balance = balance - 50 * fiftys;

        while (balance % 20 !== 0) {
            if (adjustHundreds && hundreds > 0) {
                balance = amount;
                hundreds = hundreds - 1;
                balance = balance - hundreds * 100;
            } else if (fiftys > 0) {
                adjustHundreds = false;
                fiftys = fiftys - 1;
                balance = amount - hundreds * 100 - fiftys * 50;
            } else {
                break;
            }
        }
    }

    if(balance % 20 !== 0) {
        return [];
    }

    twenties = balance / 20;

    balance = balance - 20 * twenties;

    if(balance % 20 !== 0) {
        return [];
    }

    return [hundreds, fiftys, twenties];
}

const amounts: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 230, 250, 260, 270, 280, 290, 300];

amounts.forEach((amount: number) => console.log(amount, ' : ', findDenomination(amount)));

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public displayContent = '0';
    public markButton = 'none';
    public deleteButton = 'AC';
    public scaling = 0;
    public numberButtonSequence = [7, 8, 9, 4, 5, 6, 1, 2, 3];
    private number1 = '';
    private number2 = '';
    private operator = '';
    private firstOperation = true;

    constructor() {
    }

    ngOnInit() {
    }

    public setNumber(number) {
        if (this.firstOperation === true && this.number1.length < 9) {
            this.number1 += number;
            this.number1 = this.display(this.number1);
            if (parseInt(this.number1, 10) === 0) {
                this.number1 = '';
            }
        } else if (this.operator === '') {
            console.error('operator nicht ausgewählt');
        } else if (this.operator !== '' && this.number2.length < 9) {
            this.number2 += number;
            this.display(this.number2);
            if (parseInt(this.number2, 10) === 0) {
                this.number2 = '';
            }
        }
        this.markButton = 'none';
        this.deleteButton = 'C';
    }

    public display(newContent: string) {
        if (newContent.toString().length > 9) {
            let array = newContent.toString().split('.');
            if (array.length === 2 && 9 - array[0].toString().length > 0) {
                array = parseFloat(newContent).toFixed(9 - array[0].length).split('.');
            }
            for (let j = 0; array.length > 1 && j < array[1].length + 24; j++) {
                if (parseInt(array[1].charAt(array[1].length - 1), 10) === 0) {
                    array[1] = array[1].substring(0, array[1].length - 1);
                } else {
                    break;
                }
            }
            if (array.length === 2) {
                newContent = array[0].toString() + '.' + array[1].toString();
            } else {
                newContent = array[0].toString();
            }
            console.log(array);
            if (newContent.length > 10) {
                this.scaling = 1;
            } else {
                this.scaling = 0;
            }
        } else {
            this.scaling = 0;
        }
        this.displayContent = newContent;
        if (newContent.length > 24) {
            this.scaling = 0;
            this.displayContent = 'ERROR';
            this.deleteButton = 'AC';
        }
        return newContent;
    }

    public calculate() {
        if (this.number1 !== '' && this.number2 !== '') {
            if (Math.sign(parseFloat(this.number2)) < 0 && this.operator === '-') {
                this.operator = '+';
                this.number2 = Math.abs(parseFloat(this.number2)).toString();
            }
            const result = eval(this.number1 + this.operator + this.number2);
            this.number1 = this.display(result);
            this.number2 = this.operator = '';
            this.deleteButton = 'AC';
        }
    }


    public setOperator(newOperator) {
        if (this.number1 !== '') {
            if (this.number2 !== '') {
                this.calculate();
                this.operator = newOperator;
            } else {
                this.operator = newOperator;
            }
            this.markButton = newOperator;
            this.firstOperation = false;
        }
    }

    public plusMinus() {
        let n = 2;
        let temp;
        if (this.firstOperation) {
            n = 1;
            temp = this.number1;
        } else {
            temp = this.number2;
        }
        if (temp.charAt(0) === '-') {
            temp = parseFloat(temp) * -1;
            temp = temp.toString();
        } else {
            temp = '-' + temp;
        }
        if (n === 1) {
            this.number1 = temp;
        } else {
            this.number2 = temp;
        }
        this.display(temp);
    }

    public percent() {
        if (this.number2 === '') {
            const temp = parseFloat(this.number1) / 100;
            this.number1 = temp.toString();
            this.display(this.number1);
        } else if (this.number2 !== '' && this.operator !== '') {
            this.number2 = eval(this.number1 + '/' + '100' + '*' + this.number2);
            this.display(this.number2);
        }
    }

    public resetButton() {
        if (this.deleteButton === 'AC') {
            this.markButton = this.operator = this.number2 = this.number1 = '';
            this.firstOperation = true;
            this.display('0');
        } else {
            this.deleteButton = 'AC';
            this.display('0');
            if (this.operator === '') {
                this.number1 = '';
            } else {
                this.number2 = '';
                this.markButton = this.operator;
            }
        }
    }

    public buttonNG(temp) {
        const array = [];
        for (let j = parseInt(temp, 10); j < temp + 3; j++) {
            array.push(j);
            console.log(array);
        }
    }
}

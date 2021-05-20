import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto'
import moment from 'moment';
import Order from '../models/order';

export const generateUuid = () => {
    return uuidv4();
}

export const generateSalt = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
}

export const sha256 = (password, salt) => {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password)
    let value = hash.digest('hex');
    return {
        salt: salt,
        hash: value
    }
}

export const generatePassword = (password, saltLength) => {
    let salt = generateSalt(saltLength);
    return sha256(password, salt)

}


export const validationPass = (password, salt, passwordDB) => {
    const passwordHash = sha256(password, salt)
    if (passwordHash.hash === passwordDB) {
        return true
    }
    return false
}

function romanNumeralGenerator(int) {
    let roman = '';

    roman += 'M'.repeat(int / 1000); int %= 1000;
    roman += 'CM'.repeat(int / 900); int %= 900;
    roman += 'D'.repeat(int / 500); int %= 500;
    roman += 'CD'.repeat(int / 400); int %= 400;
    roman += 'C'.repeat(int / 100); int %= 100;
    roman += 'XC'.repeat(int / 90); int %= 90;
    roman += 'L'.repeat(int / 50); int %= 50;
    roman += 'XL'.repeat(int / 40); int %= 40;
    roman += 'X'.repeat(int / 10); int %= 10;
    roman += 'IX'.repeat(int / 9); int %= 9;
    roman += 'V'.repeat(int / 5); int %= 5;
    roman += 'IV'.repeat(int / 4); int %= 4;
    roman += 'I'.repeat(int);

    return roman;
}


export const generateOrderNumber = async () => {
    const order = await Order.query()
        .select('*')
        .whereRaw(`EXTRACT(MONTH FROM order_date) = ${moment().format('M')}`)
        .orderBy('order_date', 'DESC')
        .limit(1)

    let result;
    if (order.length < 1) {
        result = 1;
    } else {
        const orderNumber = order[0].order_number;
        const po = orderNumber.split('/');
        const number = po[0].split('-');
        result = parseInt(number[1]) + 1
    }

    const month = romanNumeralGenerator(moment().format('M'))
    const year = moment().format('YYYY')
    return `PO-${result}/${month}/${year}`
}
const logger = require('./logger');

const errorHandlingMiddleware = (req, res, next) => {
    const { num1, num2 } = req.body;
    const maxAllowedValue = 10000000;
    const minAllowedValue = -10000000;

    let errorMessage = '';
    if (num1 === undefined || num2 === undefined) {
        errorMessage = 'Missing required parameters: num1 and num2';
    } else {
        if (!/^\-?\d+(\.\d+)?$/.test(num1) || !/^\-?\d+(\.\d+)?$/.test(num2)) {
            errorMessage = 'Inputs must be valid numbers';
        } else {
            let num1Converted = parseFloat(num1);
            let num2Converted = parseFloat(num2);

            if (num1Converted > maxAllowedValue || num1Converted < minAllowedValue || num2Converted > maxAllowedValue || num2Converted < minAllowedValue) {
                errorMessage = `Inputs must be between ${minAllowedValue} and ${maxAllowedValue}`;
            } else if (req.path === '/divide' && num2Converted === 0) {
                errorMessage = 'Cannot divide by zero';
            }
        }
    }

    if (errorMessage) {
        logger.error(errorMessage);
        return res.status(400).json({ status: 'error', message: errorMessage });
    }

    next();
};

module.exports = errorHandlingMiddleware;

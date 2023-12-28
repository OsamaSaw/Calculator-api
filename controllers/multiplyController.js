const multiplyController = (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 * num2;
    res.json({ status: 'success', message: 'The sum of the two numbers', value: result });
};

module.exports = multiplyController;
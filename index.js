const express = require('express');
const app = express();
const PORT = process.env.PORT || 9878;

app.use(express.json());

const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

const fibonacci = (num) => {
    let a = 0, b = 1, result = [];
    while (b <= num) {
        result.push(b);
        [a, b] = [b, a + b];
    }
    return result;
};

const findPrimes = (arr) => arr.filter(isPrime);
const findFibonacci = (arr) => arr.filter(num => fibonacci(num).includes(num));
const findEvens = (arr) => arr.filter(num => num % 2 === 0);
const generateRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.post('/find-primes', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).send('Invalid input. Expected an array of numbers.');
    }
    const primes = findPrimes(numbers);
    res.json({ primes });
});

app.post('/find-fibonacci', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).send('Invalid input. Expected an array of numbers.');
    }
    const fibonacciNumbers = findFibonacci(numbers);
    res.json({ fibonacci: fibonacciNumbers });
});

app.post('/find-evens', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).send('Invalid input. Expected an array of numbers.');
    }
    const evens = findEvens(numbers);
    res.json({ evens });
});

app.post('/generate-random', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).send('Invalid input. Expected an array of numbers.');
    }
    const random = generateRandom(numbers);
    res.json({ random });
});

app.post('/average', (req, res) => {
  try {
    const { numbers } = req.body;
    if (!numbers || !Array.isArray(numbers)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of numbers.' });
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    return res.json({ average });
  } catch (error) {
    return res.status(500).json({ error: 'Error calculating average.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

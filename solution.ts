
// ---------------- Problem 1 -------------------
// function accepts string | number | boolean
// we check the type using typeof
// then return based on the rules
function formatValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === "string") {
    // string → uppercase
    return value.toUpperCase();
  } else if (typeof value === "number") {
    // number → multiply by 10
    return value * 10;
  } else {
    // boolean → opposite value
    return !value;
  }
}

// ---------------- Problem 2 -------------------
// value can be a string or an array
// string.length = number of characters
// array.length = number of items
function getLength(value: string | any[]): number {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  }
  return 0; // fallback (not needed but safe)
}

// ---------------- Problem 3 -------------------
// class with 2 properties: name, age
// constructor runs when new Person() is created
// getDetails returns exact formatted text
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// ---------------- Problem 4 -------------------
// items = array of objects {title, rating}
// filter() → returns new array
// keep only items with rating >= 4
function filterByRating(
  items: { title: string; rating: number }[]
): { title: string; rating: number }[] {
  return items.filter((item) => item.rating >= 4);
}

// ---------------- Problem 5 -------------------
// filter users where isActive = true
// also keeps original array unchanged
function filterActiveUsers(
  users: { id: number; name: string; email: string; isActive: boolean }[]
): { id: number; name: string; email: string; isActive: boolean }[] {
  return users.filter((user) => user.isActive === true);
}

// ---------------- Problem 6 -------------------
// interface defines the structure of a Book
// printBookDetails prints formatted text
interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

function printBookDetails(book: Book): void {
  const availability = book.isAvailable ? "Yes" : "No";
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`
  );
}

// ---------------- Problem 7 -------------------
// unique values without using built-in methods like Set
// use simple loops + .includes
function getUniqueValues(
  arr1: (string | number)[],
  arr2: (string | number)[]
): (string | number)[] {
  const result: (string | number)[] = [];

  // first array values
  for (const value of arr1) {
    if (!result.includes(value)) {
      result.push(value);
    }
  }

  // second array values
  for (const value of arr2) {
    if (!result.includes(value)) {
      result.push(value);
    }
  }

  return result;
}

// ---------------- Problem 8 -------------------
/**
 * Interface for a single product object.
 * The 'discount' property is optional.
 */
interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number; // Optional number from 0-100
}

/**
 * Calculates the total price of all products in an array, applying any available discounts.
 *
 * @param products - An array of Product objects.
 * @returns The total calculated price as a number. Returns 0 if the array is empty.
 */
const calculateTotalPrice = (products: Product[]): number => {
  // Use the 'reduce' array method to iterate over the products and accumulate the total price.
  return products.reduce((accumulator, product) => {
    // 1. Calculate the base total price for the current product (price * quantity).
    const basePrice = product.price * product.quantity;

    // 2. Check if a 'discount' property exists and is a valid number (between 0 and 100).
    const discountPercentage = product.discount !== undefined && product.discount >= 0 && product.discount <= 100
      ? product.discount // Use the provided discount
      : 0; // No discount if not provided or invalid

    // 3. Calculate the actual price after applying the discount.
    // Discount factor is (1 - discountPercentage / 100).
    // E.g., a 10% discount means the product is sold for 90% of its base price, so the factor is (1 - 0.10) = 0.9.
    const finalPrice = basePrice * (1 - discountPercentage / 100);

    // 4. Add the final price of the current product to the accumulator.
    return accumulator + finalPrice;
  }, 0); // Start the accumulator with an initial value of 0.
};

// Sample Input:
const products: Product[] = [
  { name: 'Pen', price: 10, quantity: 2 },            // Base: 10 * 2 = 20. Discount: 0%. Final: 20 * (1 - 0) = 20
  { name: 'Notebook', price: 25, quantity: 3, discount: 10 }, // Base: 25 * 3 = 75. Discount: 10%. Final: 75 * (1 - 0.1) = 67.5
  { name: 'Bag', price: 50, quantity: 1, discount: 20 },      // Base: 50 * 1 = 50. Discount: 20%. Final: 50 * (1 - 0.2) = 40
]; // Total: 20 + 67.5 + 40 = 127.5

console.log(calculateTotalPrice(products)); // Expected Output: 127.5

// 30 beginner-friendly quiz questions for neuramind (10 Easy, 10 Medium, 10 Hard)
// Each object: id, question, options (4 choices), correctAnswer (exact string from options), difficulty
export const QUESTIONS = [
  // Easy (1-10)
  {
    id: 1,
    question: "What is the capital city of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which planet is the largest in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    correctAnswer: "Jupiter",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What color do you get when you mix red and blue paint?",
    options: ["Green", "Orange", "Purple", "Brown"],
    correctAnswer: "Purple",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    correctAnswer: "12",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "At what temperature (°C) does water freeze at standard pressure?",
    options: ["-10°C", "0°C", "25°C", "100°C"],
    correctAnswer: "0°C",
    difficulty: "Easy"
  },
  {
    id: 6,
    question: "Which gas makes up the largest portion of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctAnswer: "Nitrogen",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "How many days are there in a leap year?",
    options: ["365", "366", "364", "360"],
    correctAnswer: "366",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "What shape has four equal sides and four right angles?",
    options: ["Rectangle", "Rhombus", "Square", "Trapezoid"],
    correctAnswer: "Square",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "Which word is the opposite of 'hot'?",
    options: ["Warm", "Cold", "Boiling", "Humid"],
    correctAnswer: "Cold",
    difficulty: "Easy"
  },
  {
    id: 10,
    question: "What is the chemical formula H2O commonly known as?",
    options: ["Salt", "Water", "Oxygen", "Hydrogen"],
    correctAnswer: "Water",
    difficulty: "Easy"
  },

  // Medium (11-20)
  {
    id: 11,
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correctAnswer: "Tokyo",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "What process do plants use to convert sunlight into chemical energy?",
    options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"],
    correctAnswer: "Photosynthesis",
    difficulty: "Medium"
  },
  {
    id: 13,
    question: "What is 7 × 8?",
    options: ["48", "54", "56", "64"],
    correctAnswer: "56",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "At what temperature (°C) does pure water boil at sea level?",
    options: ["0°C", "50°C", "100°C", "212°C"],
    correctAnswer: "100°C",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Pound sterling", "Dollar", "Franc"],
    correctAnswer: "Pound sterling",
    difficulty: "Medium"
  },
  {
    id: 16,
    question: "Which human organ pumps blood throughout the body?",
    options: ["Lungs", "Liver", "Kidneys", "Heart"],
    correctAnswer: "Heart",
    difficulty: "Medium"
  },
  {
    id: 17,
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    difficulty: "Medium"
  },
  {
    id: 18,
    question: "Which animal is known as the fastest land animal?",
    options: ["Lion", "Cheetah", "Horse", "Gazelle"],
    correctAnswer: "Cheetah",
    difficulty: "Medium"
  },
  {
    id: 19,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    correctAnswer: "Au",
    difficulty: "Medium"
  },
  {
    id: 20,
    question: "Which continent is the largest by land area?",
    options: ["Africa", "Antarctica", "Asia", "Europe"],
    correctAnswer: "Asia",
    difficulty: "Medium"
  },

  // Hard (21-30)
  {
    id: 21,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare",
    difficulty: "Hard"
  },
  {
    id: 22,
    question: "A 'light-year' is a unit that measures what?",
    options: ["Time", "Mass", "Distance", "Brightness"],
    correctAnswer: "Distance",
    difficulty: "Hard"
  },
  {
    id: 23,
    question: "What is the first element on the periodic table?",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
    correctAnswer: "Hydrogen",
    difficulty: "Hard"
  },
  {
    id: 24,
    question: "Which cell organelle is commonly referred to as the 'powerhouse of the cell'?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correctAnswer: "Mitochondria",
    difficulty: "Hard"
  },
  {
    id: 25,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
    correctAnswer: "Leonardo da Vinci",
    difficulty: "Hard"
  },
  {
    id: 26,
    question: "Which theorem states that in a right-angled triangle, c² = a² + b²?",
    options: ["Fermat's Last Theorem", "Pythagorean Theorem", "Binomial Theorem", "Taylor's Theorem"],
    correctAnswer: "Pythagorean Theorem",
    difficulty: "Hard"
  },
  {
    id: 27,
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correctAnswer: "Ottawa",
    difficulty: "Hard"
  },
  {
    id: 28,
    question: "Which scientist proposed the three laws of motion?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Isaac Newton",
    difficulty: "Hard"
  },
  {
    id: 29,
    question: "What is the term for an animal that eats both plants and meat?",
    options: ["Herbivore", "Carnivore", "Omnivore", "Detritivore"],
    correctAnswer: "Omnivore",
    difficulty: "Hard"
  },
  {
    id: 30,
    question: "Which planet is known for its prominent ring system?",
    options: ["Saturn", "Neptune", "Uranus", "Mercury"],
    correctAnswer: "Saturn",
    difficulty: "Hard"
  }
];

export default QUESTIONS;

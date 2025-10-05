export const bmiCal = (height: number, weight: number) => {
  const bmi = weight / ((height * height) / 10000);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

// console.log(bmiCal(180, 74));
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(`Height: ${height} cm, Weight: ${weight} kg`);
console.log(`BMI Category: ${bmiCal(height, weight)}`);

export function calculateTotalAmount(categories) {
  return parseFloat(
    (
      categories.reduce((total, category) => {
        return total + category.totalAmount;
      }, 0) || 0
    ).toFixed(2),
  );
}

export const random = (min: number, max: number, decimal: number): number => {
    return Number((Math.random() * (max - min + 1) + min).toFixed(decimal));
  };
  
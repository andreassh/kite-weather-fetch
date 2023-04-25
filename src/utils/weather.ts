export const degreesToCompass = (dir:number):string => {
  const val =  Math.floor((dir / 45) + 0.5);
  const arr = ["N","NE","E", "SE","S","SW","W","NW"];
  return arr[(val % 8)];
}
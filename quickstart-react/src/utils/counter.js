/* eslint-disable array-callback-return */

export function counter(rawData) {
  let dataFilter = [];
  let valuez = [];
  let valueu = [];

  const data = rawData.flat();

  //para cada elemento do array percorrido, ele verifica se é undefined
  data.forEach((x) => {
    if (x !== undefined) {
      dataFilter.push(x);
    }
  });

  //3 var, 1º acc(acumulador) = valor resultante da rodada anterior, 2º current = valor atual, 3º current index (i)
  const result = dataFilter.reduce((acc, current) => {
    //entries = pega tanto o object.keys, object.value array de arrays
    const entries = Object.entries(current);

    entries.forEach(([k, v]) => {
      if (!acc[k]) {
        acc[k] = [0, 0];
      }
      acc[k][0] += current[k][0];
      acc[k][1] += current[k][1];
    });

    return acc;
  }, {});

  const value = Object.values(result);
  value.map((x) => {
    x[0] ? valuez.push(x[0]) : valuez.push(0);
    x[1] ? valueu.push(x[1]) : valueu.push(0);
  });

  const chave = Object.keys(result);

  return [chave, valuez, valueu];
}

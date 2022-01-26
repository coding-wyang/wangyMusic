function formatArtist(value) {
  const saveArr = [];
  value.forEach((element) => {
    let sum = '';
    (element.artists || element.ar).forEach((element, flag) => {
      if (flag === 0) {
        sum = `${element.name}`;
      } else {
        sum = `${sum}/${element.name}`;
      }
    });
    saveArr.push(sum);
    sum = '';
  });
  return saveArr;
}

export default formatArtist;

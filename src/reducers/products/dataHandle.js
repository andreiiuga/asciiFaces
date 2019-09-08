export const saveData = (products, newOne) => {
  const result = products.splice(0);
  const product = result.find(item => item.idproduct === newOne.idproduct);

  if (product) {
    product.name = newOne.name;
    product.description = newOne.description;
    product.points = newOne.points;
    product.active = newOne.active;
    product.imgUrl = newOne.imgUrl;
    product.type = newOne.type;
    return result;
  }

  result.push(newOne);
  return result;
};

export const removeData = (products, idproduct) => {
  const result = products.filter(item => item.idproduct !== idproduct);
  return result;
};

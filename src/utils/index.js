export const getProduct = (item) => {
  return {
    ...item,
    name: item.productTitle,
    image: item.mainImage.imageUrl,
    // price: item.price,
    rating: item.rating ? parseFloat(item.rating.split(" ")[0]) : 3.5,
    // "4.7 out of 5 stars",
    // value={
    //   product.rating.length
    //     ? parseFloat(product.rating.split.split(' ')[0])
    //     : '4.1'
    // }
    // numReviews: item.reviews.length,
    numReviews: item.countReview,
    _id: item.asin,
    id: item.asin,
  };
};

export const compareValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

// export const compareDates =(a, b) =>{
//   return Date.parse(new Date(a.birthdate)) - Date.parse(new Date(b.birthdate))
// }
export const compareProductDates_asc = (a, b) => {
  return (
    Date.parse(new Date(a.dateFirstAvailable)) -
    Date.parse(new Date(b.dateFirstAvailable))
  );
};
export const compareProductDates_desc = (a, b) => {
  return (
    Date.parse(new Date(b.dateFirstAvailable)) -
    Date.parse(new Date(a.dateFirstAvailable))
  );
};

// =====================
// ***  Cart Utils  ***
// =====================
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.quantity) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

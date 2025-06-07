function currencyFormatter(x) {
  return "₹ " + x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "";
}

function stringCapitalization(inputString) {
  return (
    inputString?.charAt(0).toUpperCase() + inputString?.slice(1) || inputString
  );
}

export { currencyFormatter, stringCapitalization };

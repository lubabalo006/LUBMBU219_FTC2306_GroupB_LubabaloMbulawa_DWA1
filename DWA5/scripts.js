// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerText = Math.floor(dividend / divider);

  try{

    if (dividend.trim() ==="" || divider.trim() === "") {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
    }else {
        if (divider < 0) {
            result.innerText = "Division not performed. Invalid number provided. Try again";
            console.error("Division by negative number attempted.")
        };

        if (isNaN(dividend) || isNaN(divider)) {
                
            console.error("Critical Error: Something critical went wrong. Please reload the page")
            document.body.innerHTML = /* html */ `
            Something critical went wrong. Please reload the page
            `;
        };
    };
}
catch(error){
    console.error("Critical Error: " + error.message);
    }     
});

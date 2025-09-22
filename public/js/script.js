(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

//category input
document.addEventListener("DOMContentLoaded", function () {
  const categoryInput = document.getElementById("category");
const input =  document.querySelectorAll(".dropdown-item");
 input.forEach(function(item){
  item.addEventListener("click",function(){
    //event.preventDefault();
    const selected = this.textContent.trim();
    categoryInput.value = selected;
            console.log("Selected:", selected);
   
    
  });
 });
});
document.addEventListener('DOMContentLoaded', function() {
        const myDropdown = document.getElementById('myDropdown');
        const myInputField = document.getElementById('myInputField');

        myDropdown.forEach(function(item){
          item.addEventListener("click",function(){
            const select= this.textContent.trim();
            myInputField.value=select;
            console.log("selected",select);
          });
        })
    });

//for suggesstion input

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
    "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
    "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
];

const searchInput = document.getElementById("searchInput");
const suggestionsBox= document.getElementById("suggestion");

searchInput.addEventListener("input",()=>{
  const query= searchInput.value.trim().toLowerCase();
  suggestionsBox.innerHTML ="";

  if(query ===""){
    suggestionsBox.style.display ="none";
    return;
  }

  
    const filtered = countries.filter((country)=>{
     return country.toLowerCase().includes(query);
    });
    if(filtered.length===0){
      suggestionsBox.innerHTML = <div class="items">No results found</div>

    }else{
      filtered.forEach(country=>{
        const div = document.createElement("div");
        div.classList.add("items");
        div.textContent = country;
        div.onclick=()=>{
          searchInput.value = country;
          suggestionsBox.style.display="none";
        };
        suggestionsBox.appendChild(div);
      });
    }
    suggestionsBox.style.display = "block";

    
  


});
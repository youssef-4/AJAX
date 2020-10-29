const URLs = {
    countries: 'https://restcountries.eu/rest/v2/all',
    neighbours: 'https://api.geodatasource.com/neighbouring-countries?key=7PUKVKJJCBNQHZQOQO3ZJVBCVHZJHTEP&country_code='
}

let select = document.querySelector('.select-country');

const fetchData = async (url)=>
{
    try {

        let response = await fetch(url);
        if(response.ok)
            return await response.json();
            
    } catch (error) {
        throw error;        
    }
}

const createElementOption = (country)=>{
    
    let option = new Option(country.name);
        option.value = country.alpha2Code;
 
    return option;    
}

const loadCountries = async () => {

    try {

         select.options[0] = new Option("-- selecciona --");

         (await fetchData(URLs.countries))
             .map(country => select.add(createElementOption(country)));
        
         select.addEventListener('change',loadNeighbours);
        
    } catch (error) {
        console.log(error);    
    }

}

const loadNeighbours = async ()=>{

    try {
        let parametros = {method: 'get',
                          mode: 'no-cors',
                          cache: 'no-cache',
                          credentials: 'include',
                          headers:{
                            
                            'Access-Control-Allow-Origin': 'https://localhost:3000'
                          }}
        let countryCode = select.options[select.selectedIndex].value;
        let neighbours  = await fetchData(URLs.neighbours.concat(countryCode),parametros);
        console.log(neighbours);
        
        document.querySelector('#neighbours').innerHTML = 
                neighbours.reduce((ac,neighbour)=>ac+"\n"+neighbour.country_name,"");
             
    } catch (error) {
        console.log(error);
    }
}


window.addEventListener('load',loadCountries);
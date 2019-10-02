(function() {
    document.getElementById('auto-complete-input').addEventListener('keyup',(element)=>{
        debounce(remoterCall,300)(element.target.value);
    })

    async function remoterCall(input){
        document.getElementById('dropdown-content').innerHTML = '';
        var response = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=c2NaQFDA4Z8RgPb7ymQi&app_code=tW2AcIJC1znWusv4LZ32SA&query=${input}&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5`)
        var responseJson = await response.json();
        if(!responseJson.suggestions){
            return;
        }
        responseJson.suggestions.forEach(element => {
            document.getElementById('dropdown-content').insertAdjacentHTML('beforeend', `
            <a href="#" class="dropdown-item">
                ${element.label}
            </a>
            `)
        });
    }
    var inThrottle;
    var inDebounce;
    const throttle = (func, limit) => {

        return function() {
          const args = arguments
          const context = this
          if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
          }
        }
      }

    const debounce = (func, delay) => {
    
        return function() {
          const context = this
          const args = arguments
          clearTimeout(inDebounce)
          inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
      }
}());
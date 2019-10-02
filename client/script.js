
(function () {
  document.getElementById('autocomplete-input').addEventListener('keyup', (element) => {
    document.getElementById('autocomplete-control').classList.add('is-loading');
    debounce(fireSearch, 1000)(element.target.value);
  });
  const fireSearch = async (input) => {
    document.getElementById('autocomplete-dropdown-items').innerHTML = '';
    document.getElementById('dropdown-menu').classList.add('is-hidden');
    document.getElementById('autocomplete-control').classList.remove('is-loading');

    const response = await remoterCall(input);
    document.getElementById('autocomplete-control').classList.remove('is-loading');

    if (!response.suggestions) {
      document.getElementById('dropdown-menu').classList.add('is-hidden');
      return;
    }
    response.suggestions.forEach(element => {
      document.getElementById('dropdown-menu').classList.remove('is-hidden');
      document.getElementById('autocomplete-dropdown-items').insertAdjacentHTML('beforeend', `
        <a href="#" onclick="setInputValue(this)" class="dropdown-item">
            ${element.label}
        </a>
        `)
    });

  }

  async function remoterCall(input) {
    const response = await fetch(`/api/autocomplete/${input}`);
    return await response.json();
  }
  var inThrottle;
  var inDebounce;
  const throttle = (func, limit) => {

    return function () {
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

    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }
}());

const setInputValue = element => {
  document.getElementById('autocomplete-input').value = element.innerText;
  document.getElementById('autocomplete-dropdown-items').innerHTML = '';
  document.getElementById('dropdown-menu').classList.add('is-hidden');
}

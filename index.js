const form = document.querySelector('form')

form.onsubmit = async event => {
  event.preventDefault();
  
  const amount = document.querySelector('#amount').value
  const paidFiat = document.querySelector('#paidFiat').value

  const { coin } = await fetch('https://api.coinstats.app/public/v1/coins/ethereum?currency=USD')
    .then(response => response.json())

  const resultOtc = document.querySelector('#result-otc')
  const resultCurrent = document.querySelector('#result-current')
  const resultPercentageDiff = document.querySelector('#result-percentage-diff')
  const resultUsdDiff = document.querySelector('#result-usd-diff')


  resultOtc.innerHTML = paidFiat / amount
  resultCurrent.innerHTML = coin.price.toFixed(2)

  const modifier = (paidFiat / amount) > coin.price.toFixed(2) ? -1 : 1

  resultPercentageDiff.innerHTML = ((((paidFiat / amount) - coin.price.toFixed(2)) / coin.price.toFixed(2)) * 100).toFixed(2) * modifier
  resultUsdDiff.innerHTML = ((paidFiat / amount) - coin.price.toFixed(2) ).toFixed(2) * modifier

  resultPercentageDiff.parentElement.classList.add(modifier === -1 ? 'card-negative' : 'card-positive')
  resultUsdDiff.parentElement.classList.add(modifier === -1 ? 'card-negative' : 'card-positive')

  document.querySelector('.result').classList.add('result-display')
}


import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "fca_live_n9gHQb5VOCY86R6UsAXVJ8pvnU5S0HDeMul0ldg0",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem"}}> Accurate Currency Conversions</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
        </Box>
      ) : ""}
       <Typography fontSize="10px" sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
        <Link target="_blank" rel="noopener" href="https://github.com/tousif7632?tab=repositories">Follow me Github Tousif</Link>
      </Typography>
    </Container>
  )
}

export default App
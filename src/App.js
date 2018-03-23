import React, { Component } from 'react';
import './App.css';
import data from './data/Data';
import SelectCurrency from './components/SelectCurrency';
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, form, InputGroup} from "react-bootstrap";


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currencies: data.currencies,
      currencyA: data.currencies[0],
      currencyB: data.currencies[1],
      currencyAval: data.currencies[0].sellRate,
      currencyBval: data.currencies[1].sellRate
    }

    this.onSelectCurrency = this.onSelectCurrency.bind(this);

  }

  onSelectCurrency(code){
    //console.log('selecting currency: '+code);
    const {currencies, currencyAval} = this.state;
    const currency = currencies.filter(currency => currency.code === code);
    this.setState({
      currencyB: currency[0], // this is an array with one item
      currencyBval: currencyAval * currency[0].sellRate
    })
  }

  onChangeHandler(e, currency){

    const {currencyA, currencyB} = this.state;

    if(currency === 'A'){
      
      const newValueA = e.target.value;
      this.setState({
        currencyAval: newValueA,
        currencyBval: newValueA * currencyB.sellRate
      })

    } else if(currency === 'B'){
      
      const newValueB = e.target.value;
      this.setState({
        currencyAval: newValueB / currencyB.sellRate,
        currencyBval: newValueB
      })

    }

  }

  render(){
    const {currencies, currencyA, currencyB, currencyAval, currencyBval} = this.state;
    return (
      <div className="container">
        <header>
          <h1>Currency Converter</h1>
        </header>
        <div className="content">
          <div>
            <div>
              <h2>Select Currency</h2>
              <p>
                {
                  //Select currency
                }
                <SelectCurrency currencies={currencies} onSelectCurrency={this.onSelectCurrency} />
              </p>
            </div>
          </div>
          
          <div>
            <div>
              <h3>{currencyA.name}</h3>
              {
                  //Currency A input
              }
              <InputGroup>
                <InputGroup.Addon>{currencyA.sign}</InputGroup.Addon>
                <FormControl type="number" value={currencyAval}  step="1" pattern="\d\.\d{2}" onChange={(e) => {
                  this.onChangeHandler(e, 'A');
                }} />
                <InputGroup.Addon>{currencyA.code}</InputGroup.Addon>
              </InputGroup>

            </div>
            <div>
              <h3>{currencyB.name}</h3>
              {
                  //Currency B input
              }
              <InputGroup>
                <InputGroup.Addon>{currencyB.sign}</InputGroup.Addon>
                <FormControl type="number" value={currencyBval}  step="1" pattern="\d\.\d{2}"  onChange={(e) => {
                  this.onChangeHandler(e, 'B');
                }}/>
                <InputGroup.Addon>{currencyB.code}</InputGroup.Addon>
              </InputGroup>

            </div>
          </div>
          <div >
            <div >
              {
                  //Update to currently selected currency
              }
              <p>
                Exchange Rate {`${currencyA.sellRate} ${currencyA.code}`} = {`${currencyB.sign} ${currencyB.sellRate} ${currencyB.code}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
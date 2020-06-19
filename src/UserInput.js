import React from 'react'
import { fx, fxDerivative, poly, raphson, totalFx, totalDeriv } from './functions/functions'
import { Button } from 'react-bootstrap';

import styles from './UserInput.module.css'

class UserInput extends React.Component {
    constructor() {
        super()
        this.state = {
            co: 0,
            pow: 0,
            poly: '',
            formatPoly: '',
            result: 0,
            guess: '',
            error: '',
        }
    }

    handleCalculateClick = () => {
        const result = raphson(this.state.poly, this.state.guess, parseFloat(this.state.error))
        this.setState(() => ({ result }))
        this.setState(() => ({ poly: '' }))
    }

    coOnChange = (e) => {
        const co = e.target.value
        this.setState(() => ({ co }))
    }

    powOnChange = (e) => {
        const pow = e.target.value
        this.setState(() => ({ pow }))
    }

    formatPoly = () => {
        setTimeout(() => {
            const strToFormat = this.state.poly
            const arr = strToFormat.split('+')
            let result = ''
            for(let i of arr) {
                if(i[2] == 0) {
                    if(i[3] === 'a') {
                    result += ` ${i[0]}`
                } else {
                    result += ` -${i[0]}`
                }
                } else {
                    if (i[3] === 'a') {
                    result += ` ${i[0]} X ** ${i[2]}`
                } else {
                    result += ` -${i[0]} X ** ${i[2]}`
                }
            }
        }

        this.setState(() => ({ formatPoly: result }))
        }, 100)
        
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        let stringToSubmit = ''
        const co = this.state.co
        if (co > 0) {
            stringToSubmit = `${this.state.co}x${this.state.pow}a`
        } else if(co < 0) {
            const removedMinus = parseInt(this.state.co.toString().substr(1))
            stringToSubmit = `${removedMinus}x${this.state.pow}b`
        }
        this.setState((prevState) => {
            return !prevState.poly 
            ? 
            { poly: stringToSubmit}
            :
            { poly: `${prevState.poly}+${stringToSubmit}`}
        })
        this.setState(() => ({ co: 0}))
        this.setState(() => ({ pow: 0}))

        this.formatPoly()
    }

    onGuessChange = (e) => {
        const guess = parseInt(e.target.value)
        this.setState(() => ({ guess }))
    }

    onErrorChange = (e) => {
        const error = e.target.value
        this.setState(() => ({ error }))
    }

    render() {
        return (
            <div className={styles.container}>
                <form onSubmit={this.onFormSubmit}>
                        <span>f(x) = </span>
                        <input type="number" name="co" value={this.state.co} onChange={this.coOnChange}/>
                        <span>X ** </span>
                        <input type="number" name="pow" value={this.state.pow} onChange={this.powOnChange}/>
                        <button variant="secondary" className={styles.button}>Add</button>
                </form>
                <div className={styles.display}>
                    f(x) = {this.state.formatPoly}
                </div>
                <input placeholder="Enter your initial guess" value={this.state.guess} onChange={this.onGuessChange}/>
                <input placeholder="Enter the error" value={this.state.error} onChange={this.onErrorChange} />
                <Button onClick={this.handleCalculateClick} variant="primary">Calculate</Button>
                <h2 className={styles.result} >result: {this.state.result?this.state.result:null}</h2>
            </div>
        )
    }
}

export default UserInput
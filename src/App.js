import React from 'react'
import Header from './Header'
import UserInput from './UserInput'


import styles from './App.module.css'

class App extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Header />
                <UserInput />
            </div>
        )
    }
}

export default App
import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Result',
      userNumber: '',
      randomNumber: Math.floor(Math.random() * this.props.max -
      this.props.min) + this.props.min,
      count: 0,
      btnText: true,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Print a number',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber}  more then we guess`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} less then we gues`,
        };
      }
      return {
        result: `You are guess, guess number ${state.userNumber},
        number of attemps ${state.count} `,
        btnText: false,
      };
    });
    this.setState(state => ({
      userNumber: '',
    }));
  };
  handleChange = e => {
    this.setState((state, props) => {
      console.log(state, props);
      return {
        userNumber: e.target.value,
        btnText: true,
      };
    });
    console.log(this.state);
  };
  handlePlay = e => {
    this.setState(state => ({
      count: 0,
      btnText: true,
      result: 'Print a number',
      randomNumber: Math.floor(Math.random() * this.props.max -
      this.props.min) + this.props.min,
    }));
  };
  render() {
    let button;
    if (this.state.btnText) {
      button = <button className={style.btnMore}></button>;
    } else {
      button = <button className={style.btnActive}
        onClick={this.handlePlay}>Play again</button>;
    }
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        {button}

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}/>
          <button className={style.btn}>Угадать</button>
        </form>
      </div>
    );
  }
}
ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};

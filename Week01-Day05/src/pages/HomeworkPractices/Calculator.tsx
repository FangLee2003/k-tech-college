import React, { useState } from 'react';
import styles from './Calculator.module.css'; // CSS Modules import

interface CalculatorState {
  display: string;
  expression: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    expression: '',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
  });

  const inputNumber = (num: string) => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: num,
        expression: state.expression + num,
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        display: state.display === '0' ? num : state.display + num,
        expression:
          state.expression === ''
            ? num
            : state.expression.match(/[+\-×÷]$/)
              ? state.expression + num
              : state.expression.replace(/[0-9.]+$/, state.display === '0' ? num : state.display + num),
      });
    }
  };

  const inputDecimal = () => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: '0.',
        expression: state.expression + '0.',
        waitingForOperand: false,
      });
    } else if (!state.display.includes('.')) {
      setState({
        ...state,
        display: state.display + '.',
        expression: state.expression + '.',
      });
    }
  };

  const clear = () => {
    setState({
      display: '0',
      expression: '',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    });
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue === 0 ? 0 : firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === null) {
      setState({
        ...state,
        previousValue: inputValue,
        operation: nextOperation,
        expression: state.expression + ' ' + nextOperation + ' ',
        waitingForOperand: true,
      });
    } else if (state.operation) {
      const newValue = calculate(state.previousValue, inputValue, state.operation);
      setState({
        ...state,
        display: String(newValue),
        expression: state.expression + ' ' + nextOperation + ' ',
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue !== null && state.operation) {
      if (state.operation === '÷' && inputValue === 0) {
        setState({
          ...state,
          display: 'Error',
          expression: state.expression + ' = Error',
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        });
        return;
      }

      const newValue = calculate(state.previousValue, inputValue, state.operation);
      setState({
        display: String(newValue),
        expression: state.expression + ' = ' + String(newValue),
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      });
    }
  };

  // Reusable Button using CSS Modules classes
  interface ButtonProps {
    onClick: () => void;
    styleClass: keyof typeof styles;
    children: React.ReactNode;
  }

  const Button: React.FC<ButtonProps> = ({ onClick, styleClass, children }) => (
    <button onClick={onClick} className={styles[styleClass]}>
      {children}
    </button>
  );

  return (
    <div className={styles.calculator}>
      {/* Display */}
      <div className={styles.display}>
        <div className={styles['expression-text']}>{state.expression || ' '}</div>
        <div className={styles['display-text']}>{state.display}</div>
      </div>

      {/* Button Grid */}
      <div className={styles['button-grid']}>
        {/* Row 1 */}
        <Button onClick={() => inputNumber('7')} styleClass="number-btn">7</Button>
        <Button onClick={() => inputNumber('8')} styleClass="number-btn">8</Button>
        <Button onClick={() => inputNumber('9')} styleClass="number-btn">9</Button>
        <Button onClick={() => performOperation('÷')} styleClass="operator-btn">÷</Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber('4')} styleClass="number-btn">4</Button>
        <Button onClick={() => inputNumber('5')} styleClass="number-btn">5</Button>
        <Button onClick={() => inputNumber('6')} styleClass="number-btn">6</Button>
        <Button onClick={() => performOperation('×')} styleClass="operator-btn">×</Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber('1')} styleClass="number-btn">1</Button>
        <Button onClick={() => inputNumber('2')} styleClass="number-btn">2</Button>
        <Button onClick={() => inputNumber('3')} styleClass="number-btn">3</Button>
        <Button onClick={() => performOperation('-')} styleClass="operator-btn">-</Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber('0')} styleClass="number-btn">0</Button>
        <Button onClick={inputDecimal} styleClass="number-btn">.</Button>
        <Button onClick={clear} styleClass="clear-btn">C</Button>
        <Button onClick={() => performOperation('+')} styleClass="operator-btn">+</Button>

        {/* Row 5 - Equals button spanning full width */}
        <Button onClick={handleEquals} styleClass="equals-btn">=</Button>
      </div>
    </div>
  );
};

export default Calculator;

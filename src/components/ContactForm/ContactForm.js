import {useState} from 'react';
import css from './ContactForm.module.css';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';


const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor={inputNameId}>
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            pattern="^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+( [A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+)?"
            title="Enter last name or first name or both last name and first name"
            required
            value={name}
            onChange={handleChange}
            id={inputNameId}
          />
        </label>
        <label htmlFor={inputNumberId}>
          <input
            type="tel"
            name="number"
            placeholder="Номер телефону"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Valid Phone Number: Optional '+' Symbol, Digits, Spaces, Hyphens, and Parentheses"
            required
            value={number}
            onChange={handleChange}
            id={inputNumberId}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};


ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
















/*class ContactForm extends React.Component{
    state = {
        name: '',
        number: ''
    };
     
    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value, });
    };

    //onSubmit={this.formSubmitHandler}   onSubmit={this.addContact}
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            name: '',
            number: '',
        });
       // this.reset();
    };

    inputNameId = nanoid();
    inputNumberId =  nanoid();
    
    //oчищення форми після submit
    reset = () => {
        this.setState({ name: ' ', number: ' ' })
    };

    render() {
    const { name, number } = this.state;
        return (<div>
            <form className={css.form}
                onSubmit={this.handleSubmit}>
                <label htmlFor={this.inputNameId}>
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        pattern="^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+( [A-Za-zА-Яа-яЁёІіЇїЄєҐґ']+)?"
                        title="Enter last name or first name or both last name and first name"
                        required
                        value={name}
                        onChange={this.handleChange}
                        id={this.inputNameId}
                    />
                </label>
                <label htmlFor={this.inputNumberId}>
                    <input type="tel"
                        name="number"
                        placeholder='Phone number'
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="Valid Phone Number: Optional '+' Symbol, Digits, Spaces, Hyphens, and Parentheses"
                        required
                        value={number}
                        onChange={this.handleChange}
                        id={this.inputNumberId}
                    />
                </label>
                <button type="submit">Add contact</button>
            </form>
        </div>);
    };
};*/






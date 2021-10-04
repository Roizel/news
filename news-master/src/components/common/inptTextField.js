import classnames from "classnames";
import PropTypes from "prop-types"; /*Бібліотека для провірки типів*/

const InputTextField = ({
    field,
    label, /*Змінні які приходять з логінкі або з реєстрації*/
    value, /*Ми просто їх создаєм*/
    error,
    type,
    onChange
}) => {
    return ( /*Тут ми вертаєм данні і робим так, щоб ми відходили від конкретного типу або файла*/
        <div className="mb-3">
            <label htmlFor={field}>{label}</label>
            <input type={type}
                className={classnames("form-control", 
                { "is-invalid": error },
                { "is-valid": error==undefined })}
                id={field}
                name={field}
                value={value}
                onChange={onChange}
                 />
            {!!error && <span className="text-danger">{error}</span>}
            <img src={value}></img>
        </div>
    );
};

InputTextField.propTypes = {           /*Спеціальна бібліотека за дпомогою якої ми можем перевіряти тип входящіх данних */
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  InputTextField.defaultProps = { /*по дефолту в цей метод буде приходить тип *текст**/
    type: "text"
  };

export default InputTextField; /*Вертаєм*/
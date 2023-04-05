import { FormGroup, Input } from "reactstrap"

const OptionPicker = ({ label, onSelect, options, loadingOptions, selectedOption, placeholder }
    : { label: string, onSelect?: any, options: string[], loadingOptions?: boolean, selectedOption?: string, placeholder: string }) => {
    return (
        <FormGroup>
            <label
                className="form-control-label"
                htmlFor="exampleFormControlSelect1"
            >
                {label}
            </label>
            <Input
                type="select"
                name="homeNetwork"
                placeholder={placeholder}>
                {options.map(option => {
                    return (
                        <option value={option}>{option}</option>
                    )
                })}
            </Input>
        </FormGroup>
    )
}

export default OptionPicker
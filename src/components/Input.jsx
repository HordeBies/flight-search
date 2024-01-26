import {useFormContext} from "react-hook-form";
import {AnimatePresence, motion} from "framer-motion";
import {MdError} from "react-icons/md";
import {findInputError, isFormInvalid} from "../utils";

export const Input = ({label, type, id, placeholder, onChange, disabled, value, validation, data}) => {
    const {register, formState: {errors}} = useFormContext()

    const inputError = findInputError(errors, id)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between">
                <label className="form-label text-white" htmlFor={id}>{label}</label>
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>
            <input
                id={id}
                type={type}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...register(id, validation)}
                list={`${id}-list`}
            />
            {data && (
                <datalist id={`${id}-list`}>
                    {data.map((item, index) => (
                        <option key={index} value={item.label}>{item.value}</option>
                    ))}
                </datalist>
            )}
        </div>
    )
}
const InputError = ({message}) => {
    return (
        <motion.p
            className="badge bg-danger d-flex align-items-center"
            {...framer_error}>
            <MdError/>
            {message}
        </motion.p>
    )
}

const framer_error = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 10},
    transition: {duration: 0.2},
}
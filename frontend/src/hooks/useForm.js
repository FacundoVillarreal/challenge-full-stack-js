import { useState } from 'react'

export const useForm = (initialValues = {}) => {

    const [formValues, setFormValues] = useState(initialValues);

    const handleFormChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }

    return [formValues, handleFormChange, setFormValues]
}

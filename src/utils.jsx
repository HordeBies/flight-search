
export function findInputError(errors, id) {
    const filtered = Object.keys(errors)
        .filter(key => key === id)
        .reduce((curr, key) => {
            return Object.assign(curr,{ error: errors[key] })
        }, {});
    return filtered;
}

export const isFormInvalid = err => {
    return Object.keys(err).length > 0;
}

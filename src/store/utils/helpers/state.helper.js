const updateObject = (object, fields) => {
    return {
        ...object,
        ...fields
    }
}

export default updateObject
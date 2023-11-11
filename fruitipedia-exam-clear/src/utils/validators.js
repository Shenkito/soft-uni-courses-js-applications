export const fruitIsInvalid = (fruitData) => {

    const requiredFields = [
        "name",
        "imageUrl",
        "description",
        "nutrition"
    ];

    return requiredFields.some(x => !fruitData[x])
}

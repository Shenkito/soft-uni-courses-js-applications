export const factIsInvalid = (factData) => {

    const requiredFields = [
        "category",
        "imageUrl",
        "description",
        "moreInfo"
    ];

    return requiredFields.some(x => !factData[x])
}
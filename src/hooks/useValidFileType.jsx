export const useValidFileType = (image) => {

    let fileValid

    if (image?.includes('.jpg')) {
        fileValid = '.jpg'
    } else if (image?.includes('.jpeg')) {
        fileValid = '.jpeg'
    } else if (image?.includes('.png')) {
        fileValid = '.png'
    } else if (image?.includes('.gif')) {
        fileValid = '.gif'
    } else if (image?.includes('.svg')) {
        fileValid = '.svg'
    }

  return [fileValid]
}

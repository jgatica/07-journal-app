import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('upload_preset', 'journal-vue')
    formData.append('file', file)
    const url = 'https://api.cloudinary.com/v1_1/dejzmy2qp/image/upload'
    const {data} = await axios.post(url, formData)

    return data.secure_url

  } catch (error) {
    console.error('Error al cargar la imagen, revisar logs')
    console.log(error)
    
    return null
  }

}

export default uploadImage

/* Sugerencia del IDE
import data from "bootstrap/js/src/dom/data";

const uploadImage = async (file) => {
  try {
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: file
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error(error);
    throw new Error('Image upload failed');
  }
}
 */
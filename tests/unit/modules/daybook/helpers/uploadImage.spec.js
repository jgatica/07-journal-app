import cloudinary from "cloudinary";
import axios from "axios";

import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
  cloud_name: 'dejzmy2qp',
  api_key: '478318617227258',
  api_secret: '6AXshmhaDIfPX_QN_rCx9YckiPY',
})


describe('Pruebas Helper uploadImage', () => {

  it('debe de cargar un archivo y retornar el url', async () => {
    const {data} = await axios.get('https://res.cloudinary.com/dejzmy2qp/image/upload/v1702715675/images/abc.png', {
      responseType: 'arraybuffer'
    })

    // Se obtiene la url
    const file = new File([data], 'foto.jpg')

    const url = await uploadImage(file)

    // Con que venga string es mas que suficiente
    expect(typeof url).toBe('string')

    // Tomar el id

    const segments = url.split('/')
    const imagenId = segments[segments.length - 1].replace('.png', '')
    await cloudinary.v2.api.delete_resources(`images/${imagenId}`)
  });

});
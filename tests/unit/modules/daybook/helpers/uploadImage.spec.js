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
    const {data} = await axios.get('https://res.cloudinary.com/dejzmy2qp/image/upload/v1702384200/images/kmkbgxmahecexg6l8cz6.jpg', {
      responseType: 'arraybuffer'
    })

    // Se obtiene la url
    const file = new File([data], 'foto.jpg')

    const url = await uploadImage(file)

    // Con que venga string es mas que suficiente
    expect(typeof url).toBe('string')

  });

});
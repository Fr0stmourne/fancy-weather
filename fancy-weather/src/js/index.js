import getWeatherJSON from './utils';

class App {
  // constructor() {
  //   this.a = 1;
  // }

  static async init() {
    const data = await getWeatherJSON();
    // data.items.forEach((img) => {
    //   const image = new Image();
    //   image.crossOrigin = 'anonymous';
    //   image.onload = () => {
    //     document.body.appendChild(image);
    //   };
    //   image.src = img.link;
    // });
    const img = new Image();
    img.onload = () => {
      document.body.appendChild(img);
    };
    img.src = data.items[0].link;
    console.log(data.items[0].link);
  }
}


// async function test() {

// }

// test();


App.init();

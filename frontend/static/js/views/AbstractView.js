export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return ``;
    }
}

//export default function AbstractView(params) {
//    const setTitle = (title) => {
//      document.title = title;
//    };
  
//    const getHtml = async () => {
//      return "";
//    };
  
//    return {
//      params,
//      setTitle,
//      getHtml
//    };
//  }
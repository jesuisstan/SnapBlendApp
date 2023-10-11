import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('SignIn');
  }

  async getHtml() {
    const response = await fetch('/static/js/htmls/SignIn.html'); // Используйте правильный путь к файлу
    
    if (response.ok) {
      const html = await response.text();
      return html;
    } else {
      return 'Failed to load HTML content';
    }
  }
}
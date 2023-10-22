import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('SignUp');
  }

  async getHtml() {
    const response = await fetch('/static/js/views/htmls/SignUp.html');
    
    if (response.ok) {
      const html = await response.text();
      return html;
    } else {
      return 'Failed to load HTML content';
    }
  }
}
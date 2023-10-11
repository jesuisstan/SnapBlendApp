import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Sign In");
    }

    async getHtml() {
        return `
            <h1>Sign innnnnnnnnnnn</h1>
        `;
    }
}

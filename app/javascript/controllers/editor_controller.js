import { Controller } from "@hotwired/stimulus"
import EditorJS from "@editorjs/editorjs";

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = ["article_content"];
  connect() {
    console.log("Hello, Stimulus!", this.element);

    this.contentEditor = new EditorJS({
     holder: this.article_contentTarget, 
    });

    this.element.addEventListener("submit", this.savedEditorData.bind(this));


  }
  async savedEditorData(event) {
    event.preventDefault();

    const outputData = await this.contentEditor.save();
    const articleForm = this.element;

    const hiddenInput = document.getElementById("article_content_hidden");
    hiddenInput.value = JSON.stringify(outputData);
    articleForm.submit();
  }
}
 
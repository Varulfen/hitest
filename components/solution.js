
class Solution extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                        
            <!-- Solution -->
            <div class="accordion m-3" id="solutionAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#solutionCollapseDiv" aria-expanded="false" aria-controls="solutionCollapseDiv">
                            Lösung
                        </button>
                    </h2>
                    <div id="solutionCollapseDiv" class="accordion-collapse collapse" data-bs-parent="#solutionAccordion">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-3">
                                    <strong>Künstler:</strong>
                                </div>
                                <div class="col offset-0">
                                    <span id="artist">-</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <strong>Jahr:</strong>
                                </div>
                                <div class="col offset-0">
                                    <span id="year">-</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <strong>Titel:</strong>
                                </div>
                                <div class="col offset-0">
                                    <span id="title">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("my-solution", Solution);

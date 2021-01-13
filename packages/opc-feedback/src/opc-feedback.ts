import { LitElement, html, property, customElement, internalProperty } from 'lit-element';
import style  from './opc-feedback.scss';
import { repeat } from 'lit-html/directives/repeat.js';
const fetch = require( 'node-fetch' );

@customElement('opc-feedback')
export class OpcFeedback extends LitElement {
  @property({ type: String, attribute: 'apiUrl'}) apiUrl = '';
  @internalProperty() openFeedbackModal = false;
  @internalProperty() openConfirmationModal = false;
  @internalProperty() summary = '';
  @internalProperty() description = '';
  @internalProperty() experience = '';
  @internalProperty() category = '';
  @internalProperty() experienceList = [{
    name: 'Excellent',
    assetUrl: './assets/happy.svg'
  },
  {
    name: 'Good',
    assetUrl: './assets/good.svg'
  },
  {
    name: 'Sad',
    assetUrl: './assets/sad.svg'
  }];
  @internalProperty() error = '';
  @internalProperty() errorList = [{
    name: 'Slow Loading',
  },
  {
    name: 'App Crashed',
  },
  {
    name: 'Navigation',
  },
  {
    name: 'Not Responsive',
  }, 
  {
    name: 'Other',
  }];
  static get styles() {
    return [ style ];
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly/patternfly.css" crossorigin="anonymous" />
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly/patternfly-addons.css" crossorigin="anonymous" />
      <dialog id="op-feedback__panel" class="op-feedback__panel" .open="${this.openFeedbackModal}">
      <form class="feedback-form" id="feedbackForm">
        <header>
          <h3 class="op-feedback__title">How was your overall experience?.</h3>
        </header>
        <p class="feedback-subtitle pf-u-text-align-center pf-u-font-size-sm pf-u-pt-md pf-u-pb-md">It will help us to improve platform</p>
        ${repeat(this.experienceList, (experience) => html`
        <div class="pf-c-chip pf-m-draggable feedback-chip ${this.experience === experience.name ? 'feedback-chip-active' : ''}" @click="${e => this.experience = experience.name}">
          <span class="pf-c-chip__icon">
            <img src="${experience.assetUrl}" width="20px" >
          </span>
          <span class="pf-c-chip__text">${experience.name}</span>
        </div>
        `)}
        <hr class="pf-c-divider pf-u-pt-md pf-u-pb-md ${this.experience !== 'Sad'? 'pf-u-display-none-on-sm': ''}"/>
        <p class="feedback-subtitle pf-u-font-size-md ${this.experience !== 'Sad'? 'pf-u-display-none-on-sm': ''}">What is wrong?</p>
        ${repeat(this.errorList, (error) => html`
        <div class="pf-c-chip pf-m-draggable feedback-chip ${this.experience !== 'Sad'? 'pf-u-display-none-on-sm': ''} ${this.error === error.name ? 'feedback-chip-active' : ''}" @click="${e => this.error = error.name}">
          <span class="pf-c-chip__text">${error.name}</span>
        </div>
        `)}
        <p class="feedback-subtitle pf-u-font-size-md pf-u-pt-md">Summary</p>
        <textarea id="summary" rows="3" name="summary" @change="${e => this.summary = e.srcElement.value}" class="pf-c-form-control pf-m-resize-vertical"></textarea>
        <button class="pf-c-button pf-m-block" type="button" @click="${e=>{
          this.submitFeedback();
          this.openFeedbackModal = !this.openFeedbackModal;
          this.openConfirmationModal = !this.openConfirmationModal;
        }}" form="feedbackForm">Submit</button>
      </form>
      </dialog>
      <dialog id="op-feedback__panel" class="op-feedback__panel" .open="${this.openConfirmationModal}">
        <h2 class="pf-u-text-align-center">Thanks your experience is important to us!</h2>
        <p class="feedback-subtitle pf-u-text-align-center pf-u-font-size-xs pf-u-pb-md">Each time a friend submits a experience, it creates a task for ur developer team to resolve it with priority.</p>
        <hr class="pf-c-divider" />
        <a href="/feedback"><p class="pf-u-text-align-center pf-u-p-xs">View Feedback</p></a>
        <hr class="pf-c-divider" />
        <p class="feedback-subtitle pf-u-text-align-center pf-u-p-xs" @click="${e => this.openConfirmationModal = false}">close</p>
      </dialog>
      <button id="op-feedback__button" type="button" class="op-feedback__button" @click="${e => {
        this.openFeedbackModal = !this.openFeedbackModal;
        this.openConfirmationModal = false;
      }}">
        <ion-icon name="chatbox-ellipses" class="op-feedback__icon"></ion-icon>
        Feedback
      </button>
    `;
  }

  submitFeedback() {
    this.category = (this.experience !== 'Sad') ? 'FEEDBACK' : 'BUG';
    this.description = `
${(this.error) ? `Error: ${this.error}` : ''}

Browser Information
____________________
Stack - ${navigator.appVersion}
URL - ${window.location.href}
Relative Path - ${window.location.pathname}
`;
this.dispatchEvent(new CustomEvent('opc-feedback:emit', {
  detail: {
    message: 'Emitted the Feedback',
    data: {
      summary: this.summary,
      experience: this.experience,
      category: this.category,
      description: this.description
    }
  }
}));
  }
}

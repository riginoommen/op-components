/**
 * Copyright (c) 2021 Red Hat One Platform
 *
 * MIT
 *
 * opc-feedback.ts enables the user to collect the feedback from the user
 *
 * @summary opc-feedback.ts will set the properties 
 * @author Rigin Oommen
 *
 * Created at     : 2021-01-18 14:53:24 
 * Last modified  : 2021-01-18 23:41:08
 */

import { LitElement, html, property, customElement, internalProperty } from 'lit-element';
import style from './opc-feedback.scss';
import { repeat } from 'lit-html/directives/repeat.js';

@customElement('opc-feedback')
export class OpcFeedback extends LitElement {
  @property({ type: String, attribute: 'url' }) url = '/feedback';
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
    return [style];
  }

  resetForm() {
    this.summary = '';
    this.experience = '';
    this.category = '';
    this.description = '';
    this.error = '';
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
    this.resetForm();
  }
  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly/patternfly.css"
      crossorigin="anonymous" />
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly/patternfly-addons.css"
      crossorigin="anonymous" />
    <dialog class="op-feedback__panel" .open="${this.openFeedbackModal}">
      <form class="feedback-form" id="feedbackForm">
        <header>
          <h3 class="op-feedback__title">How was your overall experience?.</h3>
        </header>
        <p class="feedback-subtitle pf-u-text-align-center pf-u-font-size-sm pf-u-pt-md pf-u-pb-md">It will help us to
          improve platform</p>
        ${repeat(this.experienceList, (experience) => html`
        <div
          class="pf-c-chip pf-m-draggable feedback-chip ${this.experience === experience.name ? 'feedback-chip-active' : ''}"
          @click="${e => this.experience = experience.name}" tabindex="0">
          <span class="pf-c-chip__icon">
            <img src="${experience.assetUrl}" alt="${experience.name} icon" width="20px">
          </span>
          <span class="pf-c-chip__text">${experience.name}</span>
        </div>
        `)}
        <hr class="pf-c-divider pf-u-pt-md pf-u-pb-md ${this.experience !== 'Sad' ? 'pf-u-display-none-on-sm' : ''}" />
        <p class="feedback-subtitle pf-u-font-size-md ${this.experience !== 'Sad' ? 'pf-u-display-none-on-sm' : ''}">What is
          wrong?</p>
        ${repeat(this.errorList, (error) => html`
        <div
          class="pf-c-chip pf-m-draggable feedback-chip ${this.experience !== 'Sad' ? 'pf-u-display-none-on-sm' : ''} ${this.error === error.name ? 'feedback-chip-active' : ''}"
          @click="${e => this.error = error.name}" tabindex="0">
          <span class="pf-c-chip__text">${error.name}</span>
        </div>
        `)}
        <p class="feedback-subtitle pf-u-font-size-md pf-u-pt-md">Summary</p>
        <textarea id="summary" rows="3" name="summary" @change="${e => {
          this.summary = e.srcElement.value;
          e.srcElement.value ='';
        }}"
          placeholder="How can we do better?" class="pf-c-form-control pf-m-resize-vertical" required></textarea>
        <button class="pf-c-button pf-m-block" type="button" @click="${e => {
            this.submitFeedback();
            this.openFeedbackModal = !this.openFeedbackModal;
            this.openConfirmationModal = !this.openConfirmationModal;
          }}">Submit</button>
      </form>
    </dialog>
    <dialog id="op-feedback__panel" class="op-feedback__panel" .open="${this.openConfirmationModal}">
      <h2 class="pf-u-text-align-center">Thanks your experience is important to us!</h2>
      <p class="feedback-subtitle pf-u-text-align-center pf-u-font-size-xs pf-u-pb-md">Each time a friend submits a
        experience, it creates a task for our developer team to resolve it with priority.</p>
      <hr class="pf-c-divider" />
      <a href="${this.url}" target="_blank">
        <p class="pf-u-text-align-center pf-u-p-xs">View Feedback</p>
      </a>
      <hr class="pf-c-divider" />
      <p class="feedback-subtitle pf-u-text-align-center pf-u-p-xs pointer" @click="${e => this.openConfirmationModal = false}">
        close</p>
    </dialog>
    <button id="op-feedback__button" type="button" class="op-feedback__button" @click="${e => {
            this.openFeedbackModal = !this.openFeedbackModal;
            this.openConfirmationModal = false;
          }}">
      <ion-icon name="${(this.openFeedbackModal)?'ellipsis-horizontal-outline':'chatbox-ellipses'}" class="op-feedback__icon"></ion-icon>
      Feedback
    </button>
    `;
  }
}

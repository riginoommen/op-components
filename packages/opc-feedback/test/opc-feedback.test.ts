import { axe, toHaveNoViolations } from 'jest-axe';
import { OpcFeedback } from '../src/opc-feedback';

expect.extend(toHaveNoViolations);

describe('opc-feedback', () => {

    const OPC_COMPONENT = 'opc-feedback';
    const ELEMENT_ID = 'opc-feedback';
    let opcElement: OpcFeedback;

    const getShadowRoot = (tagName: string): ShadowRoot => {
        return document.body.getElementsByTagName(tagName)[0].shadowRoot;
    }

    beforeEach(() => {
        opcElement = window.document.createElement(OPC_COMPONENT) as OpcFeedback;
        document.body.appendChild(opcElement);
    });

    afterEach(() => {
       document.body.getElementsByTagName(OPC_COMPONENT)[0].remove();
    });

    it('is defined', async () => {
        expect(opcElement).toBeDefined();
    });

    it('has no axe violations', async () => {
        expect(await axe(opcElement)).toHaveNoViolations()
    });

    // Add more tests here
});

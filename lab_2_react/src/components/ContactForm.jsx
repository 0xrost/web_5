import { useEffect, useState } from 'react';
import { FORMSPREE_URL } from '../config';

const MODAL_DELAY_MS = 60000;
const SHOWN_KEY = 'feedbackModalShown';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SHOWN_KEY)) return undefined;

    const timerId = setTimeout(() => setIsOpen(true), MODAL_DELAY_MS);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.classList.add('modal-open');
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
    sessionStorage.setItem(SHOWN_KEY, 'true');
  }

  return (
    isOpen && (
      <div
        className="modal"
        onClick={(event) => event.target === event.currentTarget && handleClose()}
      >
        <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
          <button type="button" className="modal-close" aria-label="Закрити" onClick={handleClose}>
            &times;
          </button>
          <h2 id="feedback-title">Feedback</h2>
          <p className="modal-subtitle">Have a question or an offer? Send me a message.</p>
          <form id="feedback-form" action={FORMSPREE_URL} method="POST">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required autoComplete="name" autoFocus />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required autoComplete="email" />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                placeholder="+380XXXXXXXXX"
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required />
            </div>
            <button type="submit">Надіслати</button>
          </form>
        </div>
      </div>
    )
  );
}

export default ContactForm;

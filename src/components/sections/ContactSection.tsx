/**
 * ContactSection: Contact form with Web3Forms integration, hCaptcha, and direct communication channels.
 * Communicates with: ContactSection.module.css, Input.tsx, Checkbox.tsx, Button.tsx, CustomIcons.tsx, and Web3Forms API.
 */
import React, { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Input } from '@/components/ui/Form/Input';
import { Checkbox } from '@/components/ui/Form/Checkbox';
import { Button } from '@/components/ui/Button/Button';
import { ExternalLinkIcon } from '@/components/ui/Icons/CustomIcons';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './ContactSection.module.css';

interface DirectChannel {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY;

const EMAIL_SUBJECTS = [
  '🦇 New project opportunity just landed',
  '🚀 Someone wants to build something cool',
  '📬 Fresh client inquiry: check it out',
  '✨ A potential client just reached out',
];

const DIRECT_CHANNELS: readonly DirectChannel[] = [
  {
    label: 'Prefer email?',
    value: 'kamruzzaman080@protonmail.com',
    href: 'mailto:kamruzzaman080@protonmail.com',
  },
  {
    label: 'WhatsApp',
    value: '+880 1981 113040',
    href: 'https://wa.me/8801981113040',
  },
  {
    label: 'Code repository',
    value: 'github.com/GhostBat101',
    href: 'https://github.com/GhostBat101',
  },
];

const pickRandomSubject = (): string =>
  EMAIL_SUBJECTS[Math.floor(Math.random() * EMAIL_SUBJECTS.length)];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: '',
    consent: false,
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const captchaRef = useRef<HCaptcha>(null);

  const ctaRadius = getAsymmetricRadius('contact-cta-banner', 'large');
  const ctaBtnRadius = getAsymmetricRadius('contact-cta-btn', 'medium');
  const formRadius = getAsymmetricRadius('contact-form-plate', 'large');
  const confirmRadius = getAsymmetricRadius('contact-confirm-plate', 'medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.inquiry) return;
    if (!captchaToken) {
      setErrorMessage('Please complete the captcha verification.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: pickRandomSubject(),
      from_name: 'GhostBat101 Portfolio',
      name: formData.name,
      email: formData.email,
      message: formData.inquiry,
      botcheck: honeypot,
      'h-captcha-response': captchaToken,
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    } finally {
      captchaRef.current?.resetCaptcha();
      setCaptchaToken('');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', inquiry: '', consent: false });
    setStatus('idle');
    setErrorMessage('');
    setCaptchaToken('');
    setHoneypot('');
  };

  const handleStartProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('contact-form');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.ctaBanner} style={{ borderRadius: ctaRadius }}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>Ready to build something memorable?</h2>
            <p className={styles.ctaCopy}>
              Whether you're launching a new venture, upgrading an existing site, or exploring an ambitious interactive concept, let's discuss how to bring it to life.
            </p>
          </div>
          <a
            href="#contact-form"
            onClick={handleStartProject}
            className={styles.ctaButton}
            style={{ borderRadius: ctaBtnRadius }}
          >
            Start a project
          </a>
        </div>

        <div id="contact-form" className={styles.grid}>
          <div className={styles.channelCol}>
            <span className={styles.kicker}>LET'S TALK</span>

            <h2 className={styles.title}>Tell me about your project.</h2>

            <div className={styles.statementGroup}>
              <p className={styles.statement}>
                Share what you're looking to build.
              </p>
              <p className={styles.statementSecondary}>
                You don't need an exhaustive specification. A brief summary of your idea, key goals, and target timeline is plenty.
              </p>
              <p className={styles.statementSecondary}>
                I will review your inquiry and get back to you within 24 hours with initial thoughts and next steps.
              </p>
            </div>

            <div className={styles.channelsList}>
              {DIRECT_CHANNELS.map((channel, index) => {
                const cardRadius = getAsymmetricRadius(`contact-channel-${index}`, 'small');

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelCard}
                    style={{ borderRadius: cardRadius }}
                  >
                    <div className={styles.channelInfo}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </div>
                    <ExternalLinkIcon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.formCard} style={{ borderRadius: formRadius }}>
            <div className={styles.formHeader}>
              <span className={styles.formTitle}>CONTACT FORM</span>
              <span className={styles.formBadge}>GHOSTBAT101</span>
            </div>

            {status === 'success' ? (
              <div className={styles.confirmationBox} style={{ borderRadius: confirmRadius }}>
                <h3 className={styles.confirmationTitle}>Thanks for reaching out.</h3>
                <p className={styles.confirmationText}>
                  I've received your message and will get back to you soon.
                </p>
                <div>
                  <Button variant="secondary" onClick={handleReset} seed="contact-reset">
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="botcheck"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <Input
                  label="Your name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  seed="input-name"
                />

                <Input
                  label="Your email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  seed="input-email"
                />

                <Input
                  label="Tell me about your project"
                  placeholder="What are you building? What do you need help with?"
                  multiline
                  rows={4}
                  required
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  seed="input-scope"
                />

                <Checkbox
                  label="You can contact me about this project."
                  checked={formData.consent}
                  onChange={(checked) => setFormData({ ...formData, consent: checked })}
                  seed="check-consent"
                />

                <div className={styles.captchaWrapper}>
                  <HCaptcha
                    sitekey={HCAPTCHA_SITEKEY}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken('')}
                    ref={captchaRef}
                  />
                </div>

                {status === 'error' && errorMessage && (
                  <p className={styles.errorText}>{errorMessage}</p>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  seed="contact-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

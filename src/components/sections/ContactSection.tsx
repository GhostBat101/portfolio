/**
 * ContactSection: Contact form, direct communication channels, and final project call-to-action.
 * Communicates with: ContactSection.module.css, Input.tsx, Checkbox.tsx, Button.tsx, and CustomIcons.tsx.
 */
import React, { useState } from 'react';
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

const DIRECT_CHANNELS: readonly DirectChannel[] = [
  {
    label: 'Prefer email?',
    value: 'ghostbat101.dev@gmail.com',
    href: 'mailto:ghostbat101.dev@gmail.com',
  },
  {
    label: 'Code repository',
    value: 'github.com/GhostBat101',
    href: 'https://github.com/GhostBat101',
  },
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const ctaRadius = getAsymmetricRadius('contact-cta-banner', 'large');
  const ctaBtnRadius = getAsymmetricRadius('contact-cta-btn', 'medium');
  const formRadius = getAsymmetricRadius('contact-form-plate', 'large');
  const confirmRadius = getAsymmetricRadius('contact-confirm-plate', 'medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.inquiry) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', inquiry: '', consent: false });
    setSubmitted(false);
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
            <h2 className={styles.ctaHeading}>Let's build something useful.</h2>
            <p className={styles.ctaCopy}>
              If you have an idea, a business that needs a better website, or a project you are not sure how to approach, send me a message.
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

            <h2 className={styles.title}>Have a project in mind?</h2>

            <div className={styles.statementGroup}>
              <p className={styles.statement}>
                Tell me what you are trying to build.
              </p>
              <p className={styles.statementSecondary}>
                It does not need to be a perfect brief. A few sentences about your idea, what you need, and when you would like to start is enough.
              </p>
              <p className={styles.statementSecondary}>
                I'll take a look and get back to you.
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

            {submitted ? (
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

                <Button variant="primary" type="submit" seed="contact-submit">
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

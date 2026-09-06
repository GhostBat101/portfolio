/**
 * ContactSection: Stamped inquiry dispatch terminal with form validation and direct links.
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
    label: 'CODE REPOSITORY // GITHUB',
    value: 'github.com/GhostBat101',
    href: 'https://github.com/GhostBat101',
  },
  {
    label: 'DIRECT DISPATCH // EMAIL',
    value: 'ghostbat101.dev@gmail.com',
    href: 'mailto:ghostbat101.dev@gmail.com',
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

  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.channelCol}>
          <span className={styles.kicker}>DISPATCH & TRANSMISSION</span>

          <h2 className={styles.title}>Initiate dialogue or commission review.</h2>

          <p className={styles.statement}>
            Available for select engineering engagements, design system architecture, and interactive software audits.
          </p>

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
            <span className={styles.formTitle}>INQUIRY TERMINAL</span>
            <span className={styles.formBadge}>SECURE PROTOCOL</span>
          </div>

          {submitted ? (
            <div className={styles.confirmationBox} style={{ borderRadius: confirmRadius }}>
              <h3 className={styles.confirmationTitle}>Transmission Recorded</h3>
              <p className={styles.confirmationText}>
                Your inquiry has been stamped and logged. GhostBat101 will respond promptly.
              </p>
              <div>
                <Button variant="secondary" onClick={handleReset} seed="contact-reset">
                  Dispatch Another Transmission
                </Button>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                label="Sender Name"
                placeholder="Ada Lovelace"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                seed="input-name"
              />

              <Input
                label="Electronic Mail"
                type="email"
                placeholder="ada@analytical-engine.org"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                seed="input-email"
              />

              <Input
                label="Project Parameters & Scope"
                placeholder="Outline system requirements, architectural timelines, and deliverables..."
                multiline
                rows={4}
                required
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                seed="input-scope"
              />

              <Checkbox
                label="Consent to architectural correspondence"
                checked={formData.consent}
                onChange={(checked) => setFormData({ ...formData, consent: checked })}
                seed="check-consent"
              />

              <Button variant="primary" type="submit" seed="contact-submit">
                Transmit Stamped Inquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

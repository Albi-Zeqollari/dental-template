import { CLINIC } from '../config';
import { useLang } from '../lang';
import { Reveal } from './Motion';
import { CheckIcon } from './Icons';

export function Team() {
  const { t } = useLang();
  return (
    <section className="section" id="team">
      <div className="container">
        <Reveal>
          <h2>{t('team.title')}</h2>
        </Reveal>
        <ul className="card-grid">
          {CLINIC.team.map((member, i) => (
            <Reveal as="li" key={i} delay={i * 90} className="card team-card">
              <span className="avatar" aria-hidden="true">
                {member.initials}
              </span>
              <h3>{member.name}</h3>
              <p className="muted">{t(`role.${member.role}`)}</p>
              {member.speaksItalian && (
                <p className="tag">
                  <CheckIcon size={14} /> {t('team.speaksItalian')}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

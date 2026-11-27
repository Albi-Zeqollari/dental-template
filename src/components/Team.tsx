import { CLINIC } from '../config';
import { useLang } from '../lang';
import { CheckIcon } from './Icons';

export function Team() {
  const { t } = useLang();
  return (
    <section className="section" id="team">
      <div className="container">
        <h2>{t('team.title')}</h2>
        <ul className="card-grid">
          {CLINIC.team.map((member, i) => (
            <li key={i} className="card team-card">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

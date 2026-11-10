import { useState } from 'react';

function ExperienceItem({ title, period, description }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article>
      <h3>{title}</h3>
      <p><em>{period}</em></p>
      <p className={expanded ? 'exp-desc' : 'exp-desc collapsed'}>{description}</p>
      <button type="button" className="toggle-desc" onClick={() => setExpanded((v) => !v)}>
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </article>
  );
}

export default ExperienceItem;

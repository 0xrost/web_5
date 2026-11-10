import { useState } from 'react';

const skills = [
  'Python',
  'TypeScript',
  'Embedded C',
  'React',
  'HTML',
  'CSS',
  'FastAPI',
  'REST APIs',
  'Asynchronous programming',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'MinIO',
  'RabbitMQ',
];

function Skills() {
  const [query, setQuery] = useState('');
  const filtered = skills.filter((skill) =>
    skill.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section id="skills">
      <h2>Skills</h2>
      <input
        type="search"
        id="skills-filter"
        placeholder="Filter skills…"
        aria-label="Filter skills"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul id="skills-list">
        {filtered.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      {filtered.length === 0 && <p id="skills-empty">No skills match your search.</p>}
    </section>
  );
}

export default Skills;

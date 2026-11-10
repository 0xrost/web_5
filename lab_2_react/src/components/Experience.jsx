import ExperienceItem from './ExperienceItem';

const jobs = [
  {
    title: 'Backend Developer (AI / RAG), University Project, Remote',
    period: 'Feb 2026 — Current',
    description:
      'Developed backend for an AI-powered contract analysis system. ' +
      'Implemented RAG (Retrieval-Augmented Generation) pipeline for ' +
      'document processing and semantic search. Used PostgreSQL with ' +
      'vector extensions for storing and querying embeddings. Designed ' +
      'and implemented REST API for document analysis and result ' +
      'delivery. Integrated notification system for processing status ' +
      'updates. Handled text preprocessing, embeddings generation, and ' +
      'similarity search.',
  },
  {
    title: 'Full-Stack Developer, Freelance',
    period: 'Dec 2025 — Current',
    description:
      'Developed a full-stack web application for a medical equipment ' +
      'maintenance service company using FastAPI (Python) and React ' +
      '(TypeScript), supporting internal business workflows. Designed ' +
      'and implemented REST API handling service operations and ' +
      'business logic. Built a responsive and user-friendly frontend ' +
      'following modern UI practices. Ensured seamless integration ' +
      'between frontend and backend systems. Designed scalable and ' +
      'maintainable project architecture with clean modular code.',
  },
];

function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {jobs.map((job) => (
        <ExperienceItem
          key={job.title}
          title={job.title}
          period={job.period}
          description={job.description}
        />
      ))}
    </section>
  );
}

export default Experience;

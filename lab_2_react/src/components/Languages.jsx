const languages = ['Ukrainian', 'English (B1)', 'Polish (B2)'];

function Languages() {
  return (
    <section id="languages">
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </section>
  );
}

export default Languages;

const hobbies = [
  'Building small electronics and firmware projects',
  'Embedded systems and microcontroller development',
  'System-level programming',
];

function Hobbies() {
  return (
    <section id="hobbies">
      <h2>Hobbies and Interests</h2>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </section>
  );
}

export default Hobbies;

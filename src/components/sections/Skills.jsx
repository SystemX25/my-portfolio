const SkillsSection = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Tailwind', level: 85 },
    // ...
  ];

  return (
    <section className="py-20 bg-opacity-50">
      <h2 className="text-3xl font-bold text-center mb-12">Habilidades</h2>
      <div >
        {skills.map(skill => (
          <div key={skill.name} className="skill-badge">
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
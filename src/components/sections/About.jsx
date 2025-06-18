import { forwardRef} from 'react';

const AboutSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Sobre mí</h2>
      <div >
        {/* Tarjetas con datos clave */}
        <div className="card">...</div>
        <div className="card">...</div>
        <div className="card">...</div>
      </div>
    </section>
  );
});

export default AboutSection;
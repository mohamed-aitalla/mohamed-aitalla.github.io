/* ===========================
   components.js — React Components (loaded via Babel standalone)
=========================== */

/* ── Data ── */
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A full-stack dashboard for managing products, orders, and customers with real-time analytics and chart visualizations.",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    github: "https://github.com/username/ecommerce-dashboard",
    demo: "https://demo.example.com",
  },
  {
    id: 2,
    title: "Task Manager App",
    description: "A productivity app with drag-and-drop boards, priority tags, deadline reminders, and team collaboration features.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/username/task-manager",
    demo: null,
  },
  {
    id: 3,
    title: "Weather Forecast PWA",
    description: "A progressive web app that delivers 7-day forecasts with offline support, geolocation, and beautiful animated icons.",
    tags: ["JavaScript", "OpenWeather API", "CSS3", "PWA"],
    github: "https://github.com/username/weather-pwa",
    demo: "https://weather.example.com",
  },
];

/* ── ProjectCard Component ── */
function ProjectCard({ title, description, tags, github, demo }) {
  return (
    <div className="project-card reveal">
      <div className="project-card-top"></div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>
        <div className="project-tags">
          {tags.map((tag, i) => (
            <span className="project-tag" key={i}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="project-card-footer">
        {github && (
          <a href={github} className="project-link" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-code-branch"></i> GitHub
          </a>
        )}
        {demo && (
          <a href={demo} className="project-link" target="_blank" rel="noopener noreferrer">
            Live Demo <i className="fas fa-arrow-right"></i>
          </a>
        )}
        {!demo && <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>No demo yet</span>}
      </div>
    </div>
  );
}

/* ── ProjectsGrid Component ── */
function ProjectsGrid() {
  return (
    <>
      {projectsData.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </>
  );
}

/* ── ContactForm Component ── */
function ContactForm() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nom requis.';
    if (!form.email.trim()) {
      errs.email = 'Email requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Format email invalide.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Message trop court (min 10 caractères).';
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className="cf-group">
            <label className="cf-label">Nom complet</label>
            <input
              className={`cf-input${errors.name ? ' error' : ''}`}
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="cf-error visible">{errors.name}</div>}
          </div>

          <div className="cf-group">
            <label className="cf-label">Email</label>
            <input
              className={`cf-input${errors.email ? ' error' : ''}`}
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="cf-error visible">{errors.email}</div>}
          </div>

          <div className="cf-group">
            <label className="cf-label">Message</label>
            <textarea
              className={`cf-textarea${errors.message ? ' error' : ''}`}
              name="message"
              placeholder="Votre message..."
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <div className="cf-error visible">{errors.message}</div>}
          </div>

          <button type="submit" className="cf-submit">
            <i className="fas fa-paper-plane"></i> Envoyer le message
          </button>
        </form>
      ) : (
        <div className="cf-success visible">
          <i className="fas fa-check-circle" style={{ marginRight: '8px', color: 'var(--accent2)' }}></i>
          Message envoyé avec succès ! Je vous répondrai bientôt.
        </div>
      )}
    </div>
  );
}

/* ── Mount React components ── */
const projectsRoot = ReactDOM.createRoot(document.getElementById('projects-mount'));
projectsRoot.render(<ProjectsGrid />);

const contactRoot = ReactDOM.createRoot(document.getElementById('contact-form-mount'));
contactRoot.render(<ContactForm />);

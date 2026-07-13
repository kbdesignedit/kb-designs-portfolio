import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.get('/static/*', serveStatic({ root: './' }))
app.get('/favicon.svg', serveStatic({ root: './' }))

app.get('/', (c) => c.html(String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Katlyn Brown, an instructional designer and creative content strategist building engaging learning experiences and thoughtful brand systems.">
  <title>Katlyn Brown | KB Designs</title>
  <link rel="icon" href="/static/images/favicon-32.png" type="image/png">
  <link rel="stylesheet" href="/static/style_editorial.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top">
    <nav class="nav-shell" aria-label="Main navigation">
      <a class="brand-mark" href="#top" aria-label="KB Designs home"><img src="/static/images/kb-logo-provided.png" alt="KB Designs"></a>
      <button class="menu-button" id="menuButton" aria-label="Open navigation" aria-expanded="false" aria-controls="siteNav"><span></span><span></span></button>
      <div class="site-nav" id="siteNav">
        <a href="#work">Selected Work</a>
        <a href="#background">Background</a>
        <a href="#proof">Social Proof</a>
        <a href="#resume">Résumé</a>
        <a class="nav-contact" href="#contact">Get in Touch</a>
      </div>
    </nav>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Instructional designer · creative content strategist</p>
        <h1 id="hero-title">Designing learning that makes <em>an impact.</em></h1>
        <p class="lead">I turn complex ideas into clear, engaging learning and content experiences that people remember—and organizations can measure.</p>
        <div class="action-row">
          <a class="button button-primary" href="#work">Explore selected work</a>
          <a class="text-link" href="/static/Katlyn-Brown-Resume-2026.pdf" target="_blank" rel="noopener">View résumé <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-art-image"></div>
        <img src="/static/images/kb-logo-provided.png" alt="" class="hero-logo">
        <p class="hero-location">Madisonville, Kentucky</p>
      </div>
    </section>

    <section class="work section-space" id="work" aria-labelledby="work-title">
      <div class="section-heading split-heading">
        <div><p class="eyebrow">01 / Selected work</p><h2 id="work-title">Work with purpose.</h2></div>
        <p>I bring together learning strategy, visual clarity, and thoughtful storytelling to help people understand, act, and grow.</p>
      </div>
      <div class="project-grid">
        <article class="project-card project-large" data-project="online-course" tabindex="0" role="button" aria-label="View Online Course Design project details">
          <img src="/static/images/portfolio-online-course.jpg" alt="Online course interface showcasing learning design">
          <div class="project-meta"><span>Instructional design</span><h3>Online Course Design</h3><p>Interactive learning built for clarity, confidence, and completion.</p></div>
        </article>
        <article class="project-card" data-project="moor-spa" tabindex="0" role="button" aria-label="View Moor Spa project details">
          <img src="/static/images/portfolio-moor-spa.png" alt="Moor Spa product training materials">
          <div class="project-meta"><span>Brand &amp; product training</span><h3>Moor Spa</h3><p>Education materials rooted in a cohesive brand experience.</p></div>
        </article>
        <article class="project-card" data-project="safermobility" tabindex="0" role="button" aria-label="View SaferMobility project details">
          <img src="/static/images/portfolio-safermobility.jpg" alt="SaferMobility marketing and content materials">
          <div class="project-meta"><span>Content strategy</span><h3>SaferMobility</h3><p>Useful content and a clearer voice for a safety-focused platform.</p></div>
        </article>
        <article class="project-card" data-project="cnd-plexigel" tabindex="0" role="button" aria-label="View CND Plexigel project details">
          <img src="/static/images/portfolio-cnd.jpg" alt="CND Plexigel training guide">
          <div class="project-meta"><span>Product education</span><h3>CND Plexigel</h3><p>Visual protocols that help professionals learn with confidence.</p></div>
        </article>
      </div>
    </section>

    <section class="background section-space" id="background" aria-labelledby="background-title">
      <div class="background-image"><img src="/static/images/katlyn-workspace-provided.jpg" alt="Katlyn Brown working at a laptop and tablet"></div>
      <div class="background-copy">
        <p class="eyebrow">02 / Background</p>
        <h2 id="background-title">Strategy-minded. <em>People-first.</em></h2>
        <p class="lead">I am a multidisciplinary instructional designer and content strategist with a background in education, digital learning, visual design, and brand-forward marketing.</p>
        <p>I combine learning science with creative direction to make complicated topics feel useful and approachable. Whether I am building an onboarding experience, reworking training content, or shaping a brand story, the goal stays the same: create a better experience for the person on the other side.</p>
        <div class="impact-grid" aria-label="Selected results">
          <div><strong>25%</strong><span>Learner engagement lift</span></div>
          <div><strong>35%</strong><span>Course completion increase</span></div>
          <div><strong>4+</strong><span>Years of design experience</span></div>
        </div>
        <a class="text-link" href="/static/Katlyn-Brown-Resume-2026.pdf" target="_blank" rel="noopener">Read the full résumé <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section class="proof section-space" id="proof" aria-labelledby="proof-title">
      <div class="section-heading"><p class="eyebrow">03 / Social proof</p><h2 id="proof-title">Built to move the needle.</h2></div>
      <div class="proof-grid">
        <blockquote><p>“Katlyn transformed our compliance training from boring to engaging. Completion rates jumped 35% and learner feedback was outstanding.”</p><footer><strong>Sarah M.</strong><span>Learning &amp; Development Manager</span></footer></blockquote>
        <blockquote><p>“Her content strategy work elevated our brand voice across every channel. She understands how to connect with an audience.”</p><footer><strong>James T.</strong><span>Marketing Director</span></footer></blockquote>
        <blockquote><p>“She brought both creative vision and strategic thinking to our onboarding program. Working together was a game-changer.”</p><footer><strong>Rachel K.</strong><span>VP of People Operations</span></footer></blockquote>
      </div>
    </section>

    <section class="resume-section" id="resume" aria-labelledby="resume-title">
      <div class="resume-content"><p class="eyebrow">04 / Résumé</p><h2 id="resume-title">The details behind the work.</h2><p>Explore my professional experience, education, and full skill set in a clean, printable format.</p></div>
      <div class="resume-actions"><a class="button button-primary" href="/static/Katlyn-Brown-Resume-2026.pdf" target="_blank" rel="noopener">View résumé</a><a class="button button-quiet" href="/static/Katlyn-Brown-Resume-2026.pdf" download>Download PDF</a></div>
    </section>

    <section class="contact section-space" id="contact" aria-labelledby="contact-title">
      <div class="contact-copy"><p class="eyebrow">05 / Get in touch</p><h2 id="contact-title">Let’s make something <em>meaningful.</em></h2><p class="lead">Have a learning challenge, a new idea, or a story that needs a clearer shape? I would love to hear about it.</p></div>
      <div class="contact-links"><a href="mailto:katyrbrown96@gmail.com">katyrbrown96@gmail.com <span aria-hidden="true">↗</span></a><a href="tel:+12702102478">270.210.2478 <span aria-hidden="true">↗</span></a><a href="https://linkedin.com/in/katlyn-brown" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a></div>
    </section>
  </main>

  <footer class="site-footer">
    <img src="/static/images/kb-logo-provided.png" alt="KB Designs" class="footer-logo">
    <p>Instructional design &amp; creative content strategy</p>
    <p class="copyright">© 2026 Katlyn Brown. All rights reserved.</p>
  </footer>

  <dialog class="project-dialog" id="projectDialog" aria-labelledby="dialogTitle"><button class="dialog-close" id="dialogClose" aria-label="Close project details">×</button><img id="dialogImage" src="" alt=""><div class="dialog-content"><p class="eyebrow" id="dialogCategory"></p><h2 id="dialogTitle"></h2><p id="dialogDescription"></p><dl id="dialogDetails"></dl></div></dialog>
  <script src="/static/app.js"></script>
</body>
</html>`))

export default app

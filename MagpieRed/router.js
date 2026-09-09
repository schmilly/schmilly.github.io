// router.js – client-side routing & page templates

const pages = {
  home: `
    <!-- hero -->
    <section class="hero">
      <div class="hero-text">
        <div class="tag"><i class="fas fa-bolt" style="margin-right: 6px;"></i>IT</div>
 <div class="tag"><i class="fas fa-desktop" style="margin-right: 6px;"></i>MSP</div>
 <div class="tag"><i class="fas fa-wrench" style="margin-right: 6px;"></i>Repair</div>
<div class="tag"><i class="fas fa-code" style="margin-right: 6px;"></i>Development</div>



        <h1>Swooping in<br> for all your tech needs</h1>
        <p>From hosting to development to repair — we deliver reliable, secure, and fast IT services tailored to your needs.</p>
<p> Wether you need on going support, have a specific project, or just need your tech working again, <b> Magpie.<b style="color:red">Red</b></b> is here for you! </p>
        <div class="hero-cta">
          <span class="btn-primary"><i class="fas fa-rocket"></i> Get started</span>
          <span class="btn-outline" style="border-color: #ccc; background: white;"><i class="fas fa-phone-alt"></i> 0487 178 768 </span>
        </div>
      </div>
      <div height=100% class="hero-image">
        <div>
<img src='MagpieRed/Code.jpg'>
        </div>
      </div>
    </section>



    <!-- feature row -->
    <div class="feature-row">
      <div class="item"><i class="fas fa-check-circle"></i><div><strong>150+</strong> <span>clients served</span></div></div>
      <div class="item"><i class="fas fa-clock"></i><div><strong>24/7</strong> <span>monitoring</span></div></div>
      <div class="item"><i class="fas fa-shield-alt"></i><div><strong>99.9%</strong> <span>uptime guarantee</span></div></div>
      <div class="item"><i class="fas fa-star"></i><div><strong>4.9</strong> <span>average rating</span></div></div>
    </div>

    ${renderServices()}
  `,

  plan: `
      <section class="plan-section">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <h1 style="font-size: 2.8rem; font-weight: 700; letter-spacing: -0.02em;"><i class="fas fa-sitemap" style="color: #d93f4c;"></i> Magpie.Red Plan</h1>
        <span style="background: #1e1b2e; color: white; padding: 0.3rem 1.5rem; border-radius: 60px; font-weight: 500;">co‑operative roadmap</span>
      </div>

      <p style="font-size: 1.2rem; color: #3f3a53; max-width: 700px; margin-bottom: 2rem;">For too long the IT sector is dominated by individual providers with only one focus: money</p>
      <p style="font-size: 1.2rem; color: #3f3a53; max-width: 700px; margin-bottom: 2rem;"> <b> Magpie.<b style="color:red">Red</b></b> is doing things differently. We are bringing democracy and client and worker voices together. To create the IT solutions that are better for everyone and enable the best outcomes for clients and workers alike.</p>
      <!-- Phases -->
      <h2><i class="fas fa-route"></i> Road Map</h2>

      <div class="plan-card">
        <span class="phase-badge">Phase 1</span>
        <h3><i class="fas fa-file-signature"></i> Foundation & Establishment</h3>
        <ul>
          <li><strong>Initial Registration:</strong> Sole trader ABN.</li>
          <li>Establish legal & operational foundation.</li>
        </ul>
      </div>

      <div class="plan-card">
        <span class="phase-badge">Phase 2</span>
        <h3><i class="fas fa-chart-line"></i> Growth & Stabilisation</h3>
        <ul>
          <li><strong>Build client base & reputation</strong> — deliver services, earn trust.</li>
          <li><strong>Sustainable income:</strong> transition from investment to financial stability.</li>
        </ul>
      </div>

      <div class="plan-card">
        <span class="phase-badge">Phase 3</span>
        <h3><i class="fas fa-user-plus"></i> Scaling & Employment</h3>
        <ul>
          <li><strong>Grow the business:</strong> marketing, expand services, larger clients.</li>
          <li><strong>Hire employees</strong> when practical & sustainable — transforms into multi‑person org.</li>
        </ul>
      </div>

      <div class="plan-card">
        <span class="phase-badge">Phase 4</span>
        <h3><i class="fas fa-hand-holding-heart"></i> Transition to Co‑operative</h3>
        <ul>
          <li><strong>Critical mass (5 employees)</strong> — trigger point for co‑op conversion.</li>
          <li><strong>Register as a Co‑operative</strong> under Co‑operatives National Law (CNL).</li>
        </ul>
        <div class="coop-steps">
          <p style="font-weight: 600; margin-bottom: 0.5rem;"><i class="fas fa-gavel" style="color: #d93f4c;"></i> Steps under CNL:</p>
          <ol>
            <li><strong>Draft Rules:</strong> governance, active membership, democratic process, board role.</li>
            <li><strong>Pre‑approval:</strong> submit rules & proposed name (include “Co‑operative” & “Limited”) to registrar.</li>
            <li><strong>Formation Meeting:</strong> at least 5 founding members approve rules & transition.</li>
            <li><strong>Application to Register:</strong> lodge application, deregister previous entity.</li>
          </ol>
        </div>
      </div>

      <div style="background: #eae4f0; border-radius: 40px; padding: 2rem; margin-top: 1rem;">
        <p style="font-size: 1.1rem; font-weight: 500;"><i class="fas fa-quote-left" style="color: #d93f4c; margin-right: 0.5rem;"></i>From sole trader to co‑operative — a democratic, values‑driven future.</p>
      </div>
    </section>
  `,

  values: `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <h1 style="font-size: 2.8rem; font-weight: 700; letter-spacing: -0.02em;"><i class="fas fa-heart" style="color: #d93f4c;"></i>Our Values</h1>
        <span style="background: #1e1b2e; color: white; padding: 0.3rem 1.5rem; border-radius: 60px; font-weight: 500;">Values</span>
      </div>
      <p style="font-size: 1.2rem; color: #3f3a53; max-width: 700px; margin-bottom: 2rem;">Delivering computer & technology services across Australia — built on equity, service, democracy, and security.</p>

      <!-- Values -->
      <h2><i class="fas fa-heart"></i> Values</h2>
      <div class="values-grid">
        <div class="value-item"><i class="fas fa-scale-balanced"></i><h4>Equity & Fairness</h4><p>Fair dealings with clients & employees, aligned with co‑operative model.</p></div>
        <div class="value-item"><i class="fas fa-handshake"></i><h4>Service</h4><p>Exceptional, reliable, client‑focused service — our key differentiator.</p></div>
        <div class="value-item"><i class="fa-solid fa-people-group"></i><h4>Democracy</h4><p>Employees and clients alike have a voice in our business, foundational to future co‑op.</p></div>
        <div class="value-item"><i class="fas fa-shield-halved"></i><h4>Security</h4><p>Highest standards to protect client data and systems.</p></div>
        <div class="value-item"><i class="fas fa-user-secret"></i><h4>Privacy</h4><p>In the modern era, every tech company is trying to steal your data. At <b> Magpie.<b style="color:red">Red</b></b> we strive to ensure your data remains private and controlled by you.</p></div>
      </div>
  `,

  services: `
      ${renderServices()}
  `,

  support: `
    <section style="padding: 3rem 0; max-width: 700px;">
      <h1 style="font-size: 2.8rem; font-weight: 700; margin-bottom: 1rem;"><i class="fas fa-headset" style="color: #d93f4c;"></i> Support</h1>
      <p style="font-size: 1.2rem; color: #3f3a53; margin-bottom: 1.5rem;">We're here to help. Reach out anytime.</p>
      <div style="background: white; border-radius: 32px; padding: 2rem; box-shadow: 0 6px 20px rgba(0,0,0,0.02); border: 1px solid #f0ebf5;">
        <p><i class="fas fa-phone" style="color: #d93f4c; width: 2rem;"></i> (+61) 0487 178 768</p>
        <p><i class="fas fa-envelope" style="color: #d93f4c; width: 2rem;"></i> support@magpie.red</p>

      </div>
    </section>
  `,

  contact: `
    <section style="padding: 3rem 0; max-width: 700px;">
      <h1 style="font-size: 2.8rem; font-weight: 700; margin-bottom: 1rem;"><i class="fas fa-paper-plane" style="color: #d93f4c;"></i> Contact</h1>
      <p style="font-size: 1.2rem; color: #3f3a53; margin-bottom: 1.5rem;">Let's talk about your IT needs.</p>
      <div style="background: white; border-radius: 32px; padding: 2rem; box-shadow: 0 6px 20px rgba(0,0,0,0.02); border: 1px solid #f0ebf5;">
        <p><i class="fas fa-map-pin" style="color: #d93f4c; width: 2rem;"></i> Australia wide</p>
        <p><i class="fas fa-envelope" style="color: #d93f4c; width: 2rem;"></i> hello@magpie.red</p>
        <p><i class="fas fa-phone" style="color: #d93f4c; width: 2rem;"></i> (+61) 0487 178 768</p>
      </div>
    </section>
  `
};

function renderServices() {
  return `
    <div class="services">
      <div class="section-header">
        <h2><i class="fas fa-cogs"></i> Our services</h2>
        <span class="sub">Everything you need</span>
      </div>

      <div class="service-grid">
        <div class="service-card">
          <div class="icon"><i class="fas fa-globe"></i></div>
          <h3>Web hosting</h3>
          <p>Fast, secure & scalable hosting with 99.9% uptime and 24/7 monitoring.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-envelope"></i></div>
          <h3>Mail hosting</h3>
          <p>Professional email with custom domains, spam protection, and easy migration.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-headset"></i></div>
          <h3>IT support</h3>
          <p>On‑site & remote support, network setup, and proactive maintenance.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-desktop"></i></div>
          <h3>Computer repair</h3>
          <p>Hardware & software repair, virus removal, data recovery, and upgrades.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-code"></i></div>
          <h3>Software development</h3>
          <p>Custom apps, integrations, and legacy modernization — built to scale.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-paint-brush"></i></div>
          <h3>website development</h3>
          <p>responsive, seo‑friendly websites from design to deployment & maintenance.</p>
        </div>
        <div class="service-card">
          <div class="icon"><i class="fas fa-lock"></i></div>
          <h3>Security</h3>
          <p>With accredited qualifications, cybersecurity and protection of you and your data to the highest level.</p>
        </div>
      </div>
    </div>
  `;
}

// Function to render individual service cards (for detailed service pages)
function renderServiceCard(icon, title, description, features) {
  return `
    <section style="padding: 3rem 0; max-width: 800px;">
      <h1 style="font-size: 2.8rem; font-weight: 700; margin-bottom: 1rem;"><i class="fas ${icon}" style="color: #d93f4c;"></i> ${title}</h1>
      <p style="font-size: 1.2rem; color: #3f3a53; margin-bottom: 1.5rem;">${description}</p>
      <div style="background: white; border-radius: 32px; padding: 2rem; border: 1px solid #f0ebf5;">
        <h3>Features</h3>
        <ul style="padding-left: 1.5rem; margin-top: 1rem;">
          ${features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    </section>
  `;
}

function navigate(page) {
  const content = document.getElementById('page-content');
  if (pages[page]) {
    content.innerHTML = pages[page];
  } else {
    content.innerHTML = `<h1 style="padding: 3rem 0;">Page not found</h1>`;
  }

  // update active nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // push state
  history.pushState({ page }, '', `?page=${page}`);
}

// handle link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    const page = link.dataset.page;
    navigate(page);
  }
});

// handle back/forward
window.addEventListener('popstate', (e) => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 'home';
  navigate(page);
});

// initial load
(function init() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 'home';
  navigate(page);
})();

# Read current HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Phase 5: Final updates - Experience, Contact, Testimonials...")

# Update Contact section title
html = html.replace(
    '<h2 class="section-title">Let\'s Create<br>Something Together</h2>',
    '<h2 class="section-title">Let\'s Work Together</h2>'
)

# Update Testimonials section label
html = html.replace(
    '<span class="section-label reveal">Kind Words</span>',
    '<span class="section-label reveal">What Clients Say</span>'
)
html = html.replace(
    '<h2 class="section-title reveal">What Others Say</h2>',
    '<h2 class="section-title reveal">Client Testimonials</h2>'
)

# Update portfolio filter categories
html = html.replace(
    '<button class="filter-btn" data-filter="instructional">Instructional Design</button>',
    '<button class="filter-btn" data-filter="elearning">eLearning</button>'
)
html = html.replace(
    '<button class="filter-btn" data-filter="brand">Brand & Product</button>',
    '<button class="filter-btn" data-filter="brand">Brand Training</button>'
)

# Update first portfolio item to add data-category="elearning" and benefit-driven title
html = html.replace(
    'data-category="instructional" data-modal="coursedesign">',
    'data-category="elearning" data-modal="coursedesign">'
)

# Add portfolio metrics to first project
old_portfolio_desc = '<p>Comprehensive curriculum modules featuring service menus, treatment protocols, and interactive learning materials for wellness education platforms.</p>'
new_portfolio_desc = '''<p>Comprehensive SCORM-compliant certification program serving 1,000+ professionals with interactive modules and performance-based assessments.</p>
            <div class="portfolio-metrics">
              <span class="metric">+35% Completion</span>
              <span class="metric">+40% Engagement</span>
              <span class="metric">1,000+ Learners</span>
            </div>'''

html = html.replace(old_portfolio_desc, new_portfolio_desc)

# Update second portfolio item
html = html.replace(
    'data-category="instructional" data-modal="ucmaterials">',
    'data-category="elearning" data-modal="ucmaterials">'
)

# Update footer copyright
html = html.replace(
    '&copy; 2026 KB Designs. Crafted with intention & creativity.',
    '&copy; 2026 KB Designs. Creating impactful learning experiences.'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Phase 5 complete: Contact, Testimonials, Portfolio updates ({len(html)} characters)")


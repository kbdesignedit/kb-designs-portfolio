import re

# Read current HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Phase 3: Updating Services Section...")

# Update Services section header
html = html.replace(
    '<span class="section-label reveal">What I Do</span>',
    '<span class="section-label reveal">What I Can Do For You</span>'
)
html = html.replace(
    '<h2 class="section-title reveal">Expertise & Services</h2>',
    '<h2 class="section-title reveal">Services & Capabilities</h2>'
)
html = html.replace(
    'Bridging the gap between education and design to deliver experiences that educate, inspire, and drive results.',
    'Comprehensive learning solutions from needs analysis to evaluation, designed to solve real business problems and drive measurable results.'
)

# Update Service 1 - Change to "Custom eLearning Development"
html = html.replace(
    '<h3>Instructional Design</h3>\n          <p>Developing learner-centered curricula using ADDIE methodology, scaffolded instruction, and evidence-based strategies that increase completion rates and knowledge retention.</p>',
    '<h3>Custom eLearning Development</h3>\n          <p>Transform your training content into engaging, interactive courses using Articulate 360, Adobe Captivate, or Rise 360. SCORM-compliant and LMS-ready.</p>'
)
html = html.replace(
    '<span class="service-tag">ADDIE</span>\n            <span class="service-tag">Curriculum Design</span>\n            <span class="service-tag">LMS</span>',
    '<span class="service-tag">Articulate 360</span>\n            <span class="service-tag">SCORM</span>\n            <span class="service-tag">Interactive</span>'
)

# Update Service 4 - Change "Brand Training Development" to "Leadership & Management Training"
html = html.replace(
    '<h3>Brand Training Development</h3>\n          <p>Creating professional brand introduction courses and internal training materials that educate teams, align brand messaging, and drive product knowledge.</p>\n          <div class="service-tags">\n            <span class="service-tag">Training</span>\n            <span class="service-tag">Onboarding</span>\n            <span class="service-tag">Brand Identity</span>',
    '<h3>Leadership & Management Training</h3>\n          <p>Design leadership development programs, new manager training, and executive onboarding experiences that build essential skills.</p>\n          <div class="service-tags">\n            <span class="service-tag">Leadership</span>\n            <span class="service-tag">Development</span>\n            <span class="service-tag">Coaching</span>'
)

# Update Service 5 - Change "Digital Marketing" to "Compliance & Certification Programs"
old_service_5 = '''<h3>Digital Marketing</h3>
          <p>Building digital strategies that fuel growth — from social media management and email campaigns to SEO optimization and analytics-driven content planning.</p>
          <div class="service-tags">
            <span class="service-tag">Social Media</span>
            <span class="service-tag">SEO</span>
            <span class="service-tag">Email Marketing</span>'''

new_service_5 = '''<h3>Compliance & Certification Programs</h3>
          <p>Create compliance training that employees actually complete (and remember). Track certifications and ensure regulatory requirements are met.</p>
          <div class="service-tags">
            <span class="service-tag">Compliance</span>
            <span class="service-tag">Certification</span>
            <span class="service-tag">Assessment</span>'''

html = html.replace(old_service_5, new_service_5)

# Update Service 6 - Change "Project Management" to "Performance Consulting"
old_service_6 = '''<h3>Project Management</h3>
          <p>Leading cross-functional projects from concept to completion with exceptional organization, clear communication, and a proven track record of on-time, on-budget delivery.</p>
          <div class="service-tags">
            <span class="service-tag">Agile</span>
            <span class="service-tag">Workflow</span>
            <span class="service-tag">Leadership</span>'''

new_service_6 = '''<h3>Performance Consulting</h3>
          <p>Identify performance gaps, conduct needs analysis, and design targeted learning interventions that solve real business problems.</p>
          <div class="service-tags">
            <span class="service-tag">Needs Analysis</span>
            <span class="service-tag">Gap Analysis</span>
            <span class="service-tag">Strategy</span>'''

html = html.replace(old_service_6, new_service_6)

# Add two new services before closing services section
new_services = '''
        <!-- Service 7 -->
        <div class="service-card reveal">
          <div class="service-icon">
            <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3>LMS Implementation & Support</h3>
          <p>Select, implement, and optimize learning management systems. Provide training and ongoing support for administrators and learners.</p>
          <div class="service-tags">
            <span class="service-tag">Canvas</span>
            <span class="service-tag">Moodle</span>
            <span class="service-tag">Administration</span>
          </div>
        </div>
        <!-- Service 8 -->
        <div class="service-card reveal">
          <div class="service-icon">
            <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
          <h3>Course Conversions & Updates</h3>
          <p>Modernize outdated training materials. Convert ILT to eLearning, update legacy courses, refresh content and design.</p>
          <div class="service-tags">
            <span class="service-tag">Conversion</span>
            <span class="service-tag">Modernization</span>
            <span class="service-tag">Refresh</span>
          </div>
        </div>
'''

# Find the end of services grid and insert new services
services_grid_end = html.find('</div>\n    </div>\n  </section>', html.find('class="services-grid"'))
if services_grid_end != -1:
    html = html[:services_grid_end] + new_services + '      ' + html[services_grid_end:]
    print("✓ Added 2 new services (LMS Implementation, Course Conversions)")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Phase 3 complete: Services section updated ({len(html)} characters)")


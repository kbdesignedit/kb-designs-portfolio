# Read current HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Phase 4: Adding Process Section...")

# Create the Process section
process_section = '''
  <!-- Process Section -->
  <section class="process" id="process">
    <div class="container">
      <div class="process-header">
        <span class="section-label reveal">How I Work</span>
        <h2 class="section-title reveal">My Design Process</h2>
        <p class="section-desc reveal">
          I follow a systematic, research-based approach to ensure every learning solution is effective, engaging, and delivers measurable results.
        </p>
      </div>
      
      <div class="process-steps">
        <!-- Step 1 -->
        <div class="process-step reveal">
          <div class="process-number">01</div>
          <div class="process-content">
            <h3>Analyze</h3>
            <ul class="process-list">
              <li>Conduct needs analysis & gap assessment</li>
              <li>Interview stakeholders & SMEs</li>
              <li>Define learning objectives & success metrics</li>
              <li>Analyze target audience & constraints</li>
            </ul>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="process-step reveal">
          <div class="process-number">02</div>
          <div class="process-content">
            <h3>Design</h3>
            <ul class="process-list">
              <li>Create instructional strategy & course outline</li>
              <li>Develop assessment strategy</li>
              <li>Design storyboards & prototypes</li>
              <li>Get stakeholder approval</li>
            </ul>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="process-step reveal">
          <div class="process-number">03</div>
          <div class="process-content">
            <h3>Develop</h3>
            <ul class="process-list">
              <li>Build interactive eLearning modules</li>
              <li>Create multimedia assets (video, audio, graphics)</li>
              <li>Develop assessments & knowledge checks</li>
              <li>Ensure SCORM compliance & accessibility</li>
            </ul>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="process-step reveal">
          <div class="process-number">04</div>
          <div class="process-content">
            <h3>Implement</h3>
            <ul class="process-list">
              <li>Deploy to LMS</li>
              <li>Provide facilitator guides & learner support</li>
              <li>Train administrators & stakeholders</li>
              <li>Monitor initial rollout</li>
            </ul>
          </div>
        </div>

        <!-- Step 5 -->
        <div class="process-step reveal">
          <div class="process-number">05</div>
          <div class="process-content">
            <h3>Evaluate</h3>
            <ul class="process-list">
              <li>Collect learner feedback & completion data</li>
              <li>Measure knowledge gain & behavior change</li>
              <li>Calculate ROI & business impact</li>
              <li>Iterate and improve based on results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

'''

# Find the end of Services section and insert Process section
services_end = html.find('</section>', html.find('class="services"'))
if services_end != -1:
    html = html[:services_end+10] + process_section + html[services_end+10:]
    print("✓ Process section added after Services")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Phase 4 complete: Process section added ({len(html)} characters)")


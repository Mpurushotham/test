// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Universal AI Technology Selection
class UniversalAI {
    constructor() {
        this.selectedTechnologies = {
            languages: [],
            frontend: [],
            backend: [],
            aws: [],
            azure: [],
            gcp: [],
            oci: []
        };
        
        this.init();
    }

    init() {
        this.setupTechSelection();
        this.setupQueryInterface();
    }

    setupTechSelection() {
        // Add click handlers to all tech options
        document.querySelectorAll('.tech-option').forEach(option => {
            option.addEventListener('click', () => this.toggleTechSelection(option));
        });
    }

    toggleTechSelection(option) {
        const techName = option.dataset.tech;
        const category = this.getCategoryFromElement(option);
        
        if (option.classList.contains('selected')) {
            // Remove selection
            option.classList.remove('selected');
            const index = this.selectedTechnologies[category].indexOf(techName);
            if (index > -1) {
                this.selectedTechnologies[category].splice(index, 1);
            }
        } else {
            // Add selection
            option.classList.add('selected');
            this.selectedTechnologies[category].push(techName);
        }
        
        this.updateSelectedTechList();
    }

    getCategoryFromElement(element) {
        const parent = element.closest('.tech-options');
        if (parent.id === 'languages') return 'languages';
        if (parent.id === 'frontend') return 'frontend';
        if (parent.id === 'backend') return 'backend';
        if (parent.id === 'aws-services') return 'aws';
        if (parent.id === 'azure-services') return 'azure';
        if (parent.id === 'gcp-services') return 'gcp';
        if (parent.id === 'oci-services') return 'oci';
        return 'languages';
    }

    updateSelectedTechList() {
        const selectedTechList = document.getElementById('selectedTechList');
        const allSelected = Object.values(this.selectedTechnologies).flat();
        
        if (allSelected.length === 0) {
            selectedTechList.innerHTML = '<p class="no-selection">No technologies selected yet</p>';
            return;
        }
        
        selectedTechList.innerHTML = allSelected.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }

    setupQueryInterface() {
        const generateBtn = document.getElementById('generateSolution');
        const projectDescription = document.getElementById('projectDescription');
        
        generateBtn.addEventListener('click', () => this.generateSolution());
        projectDescription.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateSolution();
            }
        });
    }

    async generateSolution() {
        const projectDescription = document.getElementById('projectDescription').value.trim();
        const allSelected = Object.values(this.selectedTechnologies).flat();
        
        if (!projectDescription) {
            alert('Please describe your project requirements');
            return;
        }
        
        if (allSelected.length === 0) {
            alert('Please select at least one technology');
            return;
        }
        
        const generateBtn = document.getElementById('generateSolution');
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<div class="loading"></div> Generating Solution...';
        generateBtn.disabled = true;
        
        try {
            const solution = await this.createComprehensiveSolution(projectDescription, allSelected);
            this.displaySolution(solution);
        } catch (error) {
            console.error('Error generating solution:', error);
            alert('Error generating solution. Please try again.');
        } finally {
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
        }
    }

    async createComprehensiveSolution(description, technologies) {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return {
            title: "Comprehensive Technology Solution",
            overview: this.generateOverview(description, technologies),
            architecture: this.generateArchitecture(technologies),
            implementation: this.generateImplementationPlan(technologies),
            codeExamples: this.generateCodeExamples(technologies),
            deployment: this.generateDeploymentGuide(technologies),
            monitoring: this.generateMonitoringStrategy(technologies),
            security: this.generateSecurityRecommendations(technologies),
            costEstimation: this.generateCostEstimation(technologies),
            timeline: this.generateTimeline(technologies)
        };
    }

    generateOverview(description, technologies) {
        return `**Project Overview**

Based on your requirements: "${description}"

**Selected Technology Stack:**
${technologies.map(tech => `• ${tech}`).join('\n')}

**Solution Summary:**
This comprehensive solution leverages modern technologies to create a scalable, secure, and maintainable system that meets your specific requirements. The architecture is designed for high availability, performance, and future scalability.

**Key Benefits:**
• Scalable and flexible architecture
• Modern development practices
• Cloud-native deployment
• Comprehensive security measures
• Cost-effective solution
• Easy maintenance and updates`;
    }

    generateArchitecture(technologies) {
        const hasFrontend = technologies.some(tech => ['react', 'vue', 'angular', 'svelte'].includes(tech));
        const hasBackend = technologies.some(tech => ['nodejs', 'django', 'flask', 'spring'].includes(tech));
        const hasCloud = technologies.some(tech => ['ec2', 'lambda', 'azure-vm', 'gcp-compute'].includes(tech));
        
        return `**System Architecture**

**High-Level Architecture:**
\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (${hasFrontend ? technologies.find(t => ['react', 'vue', 'angular'].includes(t)) || 'React' : 'Web Interface'})     │◄──►│   (${hasBackend ? technologies.find(t => ['nodejs', 'django', 'flask'].includes(t)) || 'API Server' : 'API Layer'})     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Cloud         │
                    │   (${hasCloud ? 'AWS/Azure/GCP' : 'Infrastructure'})     │
                    └─────────────────┘
\`\`\`

**Component Details:**
• **Frontend Layer**: User interface and client-side logic
• **Backend Layer**: Business logic and API services
• **Database Layer**: Data persistence and management
• **Cloud Infrastructure**: Scalable hosting and services
• **Security Layer**: Authentication, authorization, and data protection
• **Monitoring Layer**: Performance tracking and alerting`;
    }

    generateImplementationPlan(technologies) {
        return `**Implementation Plan**

**Phase 1: Foundation Setup (Weeks 1-2)**
1. **Environment Setup**
   • Development environment configuration
   • Version control setup (Git)
   • CI/CD pipeline initialization
   • Code quality tools setup

2. **Project Structure**
   • Repository organization
   • Configuration management
   • Documentation setup

**Phase 2: Core Development (Weeks 3-6)**
1. **Backend Development**
   • API design and implementation
   • Database schema design
   • Authentication system
   • Business logic implementation

2. **Frontend Development**
   • UI/UX design implementation
   • Component development
   • State management setup
   • API integration

**Phase 3: Integration & Testing (Weeks 7-8)**
1. **System Integration**
   • Frontend-backend integration
   • Third-party service integration
   • End-to-end testing

2. **Quality Assurance**
   • Unit testing
   • Integration testing
   • Performance testing
   • Security testing

**Phase 4: Deployment & Launch (Weeks 9-10)**
1. **Production Setup**
   • Cloud infrastructure provisioning
   • Database setup
   • Security configuration
   • Monitoring setup

2. **Go-Live**
   • Production deployment
   • Performance monitoring
   • User acceptance testing
   • Documentation finalization`;
    }

    generateCodeExamples(technologies) {
        const examples = [];
        
        if (technologies.includes('react')) {
            examples.push(`**React Component Example**
\`\`\`jsx
import React, { useState, useEffect } from 'react';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Project Dashboard</h1>
      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
\`\`\``);
        }
        
        if (technologies.includes('nodejs')) {
            examples.push(`**Node.js API Example**
\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\``);
        }
        
        if (technologies.includes('python')) {
            examples.push(`**Python FastAPI Example**
\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="Project Management API", version="1.0.0")

class Project(BaseModel):
    id: int
    name: str
    description: str
    status: str

projects_db = []

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    return projects_db

@app.post("/api/projects", response_model=Project)
async def create_project(project: Project):
    projects_db.append(project)
    return project

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    for project in projects_db:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
\`\`\``);
        }
        
        return examples.join('\n\n');
    }

    generateDeploymentGuide(technologies) {
        const hasAWS = technologies.some(tech => ['ec2', 'lambda', 's3'].includes(tech));
        const hasAzure = technologies.some(tech => ['azure-vm', 'azure-functions'].includes(tech));
        const hasGCP = technologies.some(tech => ['gcp-compute', 'gcp-functions'].includes(tech));
        
        return `**Deployment Guide**

**${hasAWS ? 'AWS Deployment' : hasAzure ? 'Azure Deployment' : hasGCP ? 'GCP Deployment' : 'Cloud Deployment'}**

**1. Infrastructure Setup**
\`\`\`bash
# Install AWS CLI (if using AWS)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS credentials
aws configure
\`\`\`

**2. Container Deployment**
\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**3. Kubernetes Deployment**
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: project-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: project-api
  template:
    metadata:
      labels:
        app: project-api
    spec:
      containers:
      - name: api
        image: your-registry/project-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
\`\`\`

**4. CI/CD Pipeline**
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Build Docker image
      run: docker build -t project-api .
    - name: Deploy to cloud
      run: |
        # Your deployment commands here
\`\`\``;
    }

    generateMonitoringStrategy(technologies) {
        return `**Monitoring & Observability Strategy**

**1. Application Monitoring**
• **Performance Metrics**: Response time, throughput, error rates
• **Business Metrics**: User engagement, conversion rates
• **Infrastructure Metrics**: CPU, memory, disk usage

**2. Logging Strategy**
\`\`\`javascript
// Structured logging example
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
\`\`\`

**3. Health Checks**
\`\`\`javascript
// Health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  res.status(200).send(healthcheck);
});
\`\`\`

**4. Alerting Rules**
• **Critical**: Service down, high error rate
• **Warning**: High CPU usage, slow response times
• **Info**: Deployment notifications, scaling events`;
    }

    generateSecurityRecommendations(technologies) {
        return `**Security Recommendations**

**1. Authentication & Authorization**
• Implement JWT-based authentication
• Use OAuth 2.0 for third-party integrations
• Implement role-based access control (RBAC)
• Enable multi-factor authentication (MFA)

**2. Data Protection**
• Encrypt data at rest and in transit
• Implement proper input validation
• Use parameterized queries to prevent SQL injection
• Implement rate limiting and DDoS protection

**3. API Security**
\`\`\`javascript
// API security middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Input validation
const { body, validationResult } = require('express-validator');

app.post('/api/projects', [
  body('name').isLength({ min: 1 }).trim().escape(),
  body('description').isLength({ max: 500 }).trim().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
\`\`\`

**4. Infrastructure Security**
• Use HTTPS everywhere
• Implement network segmentation
• Regular security updates and patches
• Vulnerability scanning and penetration testing`;
    }

    generateCostEstimation(technologies) {
        return `**Cost Estimation**

**Monthly Infrastructure Costs (Estimated)**

**Development Environment:**
• Cloud instances: $50-100/month
• Database: $30-60/month
• Storage: $10-20/month
• Monitoring tools: $20-40/month
• **Total Dev**: $110-220/month

**Production Environment:**
• High-availability setup: $200-400/month
• Load balancers: $50-100/month
• CDN: $30-60/month
• Backup storage: $20-40/month
• **Total Prod**: $300-600/month

**Additional Services:**
• CI/CD tools: $50-100/month
• Security tools: $100-200/month
• Third-party APIs: $50-150/month
• **Total Additional**: $200-450/month

**Total Estimated Monthly Cost: $610-1,270**

**Cost Optimization Tips:**
• Use reserved instances for predictable workloads
• Implement auto-scaling to handle traffic spikes
• Monitor and optimize resource usage
• Consider serverless options for variable workloads`;
    }

    generateTimeline(technologies) {
        return `**Project Timeline**

**Week 1-2: Planning & Setup**
• Requirements analysis and documentation
• Technology stack finalization
• Development environment setup
• Team onboarding and training

**Week 3-4: Foundation Development**
• Project structure and boilerplate code
• Database design and setup
• Basic API endpoints
• Authentication system

**Week 5-6: Core Features**
• Main business logic implementation
• Frontend components development
• API integration
• Basic testing

**Week 7-8: Advanced Features**
• Advanced functionality implementation
• Third-party integrations
• Performance optimization
• Security implementation

**Week 9-10: Testing & Deployment**
• Comprehensive testing (unit, integration, e2e)
• Performance testing and optimization
• Security testing and fixes
• Production deployment

**Week 11-12: Launch & Support**
• User acceptance testing
• Bug fixes and improvements
• Documentation finalization
• Go-live support

**Total Duration: 12 weeks (3 months)**

**Milestones:**
• Week 2: Project kickoff complete
• Week 4: MVP ready for testing
• Week 8: Feature-complete version
• Week 10: Production-ready release
• Week 12: Full launch and handover`;
    }

    displaySolution(solution) {
        const resultsDiv = document.getElementById('solutionResults');
        
        resultsDiv.innerHTML = `
            <div class="solution-container">
                <div class="solution-header">
                    <h2>${solution.title}</h2>
                    <div class="solution-actions">
                        <button class="btn btn-secondary" onclick="window.print()">
                            <i class="fas fa-print"></i> Print Solution
                        </button>
                        <button class="btn btn-secondary" onclick="window.universalAI.downloadSolution()">
                            <i class="fas fa-download"></i> Download PDF
                        </button>
                    </div>
                </div>
                
                <div class="solution-content">
                    <div class="solution-section">
                        <h3><i class="fas fa-info-circle"></i> Project Overview</h3>
                        <div class="solution-text">${solution.overview.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-sitemap"></i> System Architecture</h3>
                        <div class="solution-text">${solution.architecture.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-tasks"></i> Implementation Plan</h3>
                        <div class="solution-text">${solution.implementation.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-code"></i> Code Examples</h3>
                        <div class="solution-text">${solution.codeExamples.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-rocket"></i> Deployment Guide</h3>
                        <div class="solution-text">${solution.deployment.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-chart-line"></i> Monitoring Strategy</h3>
                        <div class="solution-text">${solution.monitoring.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-shield-alt"></i> Security Recommendations</h3>
                        <div class="solution-text">${solution.security.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-dollar-sign"></i> Cost Estimation</h3>
                        <div class="solution-text">${solution.costEstimation.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="solution-section">
                        <h3><i class="fas fa-calendar-alt"></i> Project Timeline</h3>
                        <div class="solution-text">${solution.timeline.replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
                
                <div class="solution-footer">
                    <div class="follow-up-questions">
                        <h4>Need More Details?</h4>
                        <div class="question-buttons">
                            <button class="btn btn-outline" onclick="window.universalAI.askFollowUp('architecture')">
                                <i class="fas fa-sitemap"></i> Architecture Details
                            </button>
                            <button class="btn btn-outline" onclick="window.universalAI.askFollowUp('implementation')">
                                <i class="fas fa-code"></i> Implementation Help
                            </button>
                            <button class="btn btn-outline" onclick="window.universalAI.askFollowUp('deployment')">
                                <i class="fas fa-rocket"></i> Deployment Support
                            </button>
                            <button class="btn btn-outline" onclick="window.universalAI.askFollowUp('cost')">
                                <i class="fas fa-calculator"></i> Cost Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    askFollowUp(topic) {
        const followUpQuestions = {
            architecture: "I'd like more details about the system architecture and how the components interact with each other.",
            implementation: "Can you provide more specific implementation guidance and best practices?",
            deployment: "I need help with the deployment process and infrastructure setup.",
            cost: "Can you break down the costs in more detail and suggest optimization strategies?"
        };
        
        document.getElementById('projectDescription').value = followUpQuestions[topic];
        this.generateSolution();
    }

    downloadSolution() {
        // This would typically generate a PDF
        alert('PDF download functionality would be implemented here. This would generate a comprehensive document with all the solution details.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.universalAI = new UniversalAI();
});

// Add CSS for the new components
const additionalCSS = `
/* Universal AI Styles */
.universal-ai-section {
    padding: 80px 0;
    background-color: #f8fafc;
}

.universal-ai-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

.tech-stack-selection {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.tech-stack-selection h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1e293b;
    font-size: 2rem;
}

.tech-category {
    margin-bottom: 2rem;
}

.tech-category h3 {
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tech-category h4 {
    color: #475569;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
}

.tech-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.tech-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: white;
}

.tech-option:hover {
    border-color: #2563eb;
    background-color: #f8fafc;
    transform: translateY(-2px);
}

.tech-option.selected {
    border-color: #2563eb;
    background-color: #eff6ff;
    color: #2563eb;
}

.tech-option i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: inherit;
}

.tech-option span {
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
}

.cloud-providers {
    margin-top: 2rem;
}

.cloud-category {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
}

.ai-query-interface {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.query-header {
    text-align: center;
    margin-bottom: 2rem;
}

.query-header h3 {
    color: #1e293b;
    margin-bottom: 0.5rem;
}

.selected-tech {
    margin-bottom: 2rem;
}

.selected-tech h4 {
    color: #1e293b;
    margin-bottom: 1rem;
}

.selected-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.no-selection {
    color: #64748b;
    font-style: italic;
}

.query-input textarea {
    width: 100%;
    min-height: 120px;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    margin-bottom: 1rem;
}

.query-input textarea:focus {
    outline: none;
    border-color: #2563eb;
}

.solution-results {
    margin-top: 2rem;
}

.solution-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.solution-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.solution-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.solution-actions {
    display: flex;
    gap: 1rem;
}

.solution-content {
    padding: 2rem;
}

.solution-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.solution-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.solution-section h3 {
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.solution-text {
    color: #475569;
    line-height: 1.7;
    white-space: pre-line;
}

.solution-footer {
    background-color: #f8fafc;
    padding: 2rem;
    border-top: 1px solid #e2e8f0;
}

.follow-up-questions h4 {
    color: #1e293b;
    margin-bottom: 1rem;
    text-align: center;
}

.question-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.btn-outline {
    background-color: transparent;
    color: #2563eb;
    border: 2px solid #2563eb;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-outline:hover {
    background-color: #2563eb;
    color: white;
}

@media (max-width: 768px) {
    .tech-options {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
    
    .solution-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .solution-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .question-buttons {
        flex-direction: column;
    }
}
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
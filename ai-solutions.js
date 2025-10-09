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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Solution Database
const solutionDatabase = {
    'aws-zero-trust': {
        title: 'AWS Zero Trust Architecture Implementation',
        description: 'Complete implementation guide for zero trust security model using AWS services',
        steps: [
            {
                step: 1,
                title: 'Identity Foundation',
                description: 'Implement AWS IAM with least privilege access',
                details: [
                    'Create IAM roles and policies with minimal permissions',
                    'Enable MFA for all users and root accounts',
                    'Implement AWS SSO for centralized identity management',
                    'Set up AWS Organizations for multi-account governance'
                ],
                tools: ['AWS IAM', 'AWS SSO', 'AWS Organizations', 'AWS CloudTrail']
            },
            {
                step: 2,
                title: 'Network Segmentation',
                description: 'Create isolated network segments using VPC',
                details: [
                    'Design VPC architecture with public and private subnets',
                    'Implement NACLs and Security Groups for micro-segmentation',
                    'Set up VPC endpoints for secure AWS service access',
                    'Configure AWS Transit Gateway for multi-VPC connectivity'
                ],
                tools: ['Amazon VPC', 'NACLs', 'Security Groups', 'Transit Gateway']
            },
            {
                step: 3,
                title: 'Data Protection',
                description: 'Encrypt data at rest and in transit',
                details: [
                    'Enable S3 encryption with AWS KMS',
                    'Implement EBS encryption for EC2 instances',
                    'Set up AWS Certificate Manager for SSL/TLS',
                    'Configure AWS CloudHSM for key management'
                ],
                tools: ['AWS KMS', 'S3 Encryption', 'EBS Encryption', 'CloudHSM']
            },
            {
                step: 4,
                title: 'Monitoring & Detection',
                description: 'Implement comprehensive security monitoring',
                details: [
                    'Enable AWS GuardDuty for threat detection',
                    'Set up AWS Security Hub for centralized security findings',
                    'Configure AWS Config for compliance monitoring',
                    'Implement AWS CloudWatch for logging and alerting'
                ],
                tools: ['GuardDuty', 'Security Hub', 'AWS Config', 'CloudWatch']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Zero Trust Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  Internet Gateway                                          │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │                AWS WAF                              │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Load Balancer              │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Public Subnet                          │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   Web App   │  │   Bastion   │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Private Subnet                         │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │ Application │  │  Database   │                  │    │
        │  │  │   Server    │  │   Server    │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Data Subnet                            │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   RDS       │  │   S3        │                  │    │
        │  │  │  Database   │  │  Storage    │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$2,000-5,000/month for medium enterprise',
        timeline: '4-6 weeks implementation'
    },
    'aws-encryption': {
        title: 'AWS Data Encryption at Scale',
        description: 'Comprehensive data encryption strategy for AWS environments',
        steps: [
            {
                step: 1,
                title: 'Key Management Setup',
                description: 'Configure AWS KMS for centralized key management',
                details: [
                    'Create customer-managed keys in AWS KMS',
                    'Set up key rotation policies',
                    'Configure key policies and permissions',
                    'Implement cross-region key replication'
                ],
                tools: ['AWS KMS', 'CloudHSM', 'AWS Secrets Manager']
            },
            {
                step: 2,
                title: 'S3 Encryption',
                description: 'Implement encryption for S3 storage',
                details: [
                    'Enable default encryption for S3 buckets',
                    'Configure server-side encryption with KMS',
                    'Set up bucket policies for encryption enforcement',
                    'Implement client-side encryption for sensitive data'
                ],
                tools: ['Amazon S3', 'AWS KMS', 'S3 Client-Side Encryption']
            },
            {
                step: 3,
                title: 'Database Encryption',
                description: 'Encrypt RDS and DynamoDB data',
                details: [
                    'Enable encryption at rest for RDS instances',
                    'Configure DynamoDB encryption with KMS',
                    'Set up encrypted snapshots and backups',
                    'Implement TDE for Oracle and SQL Server'
                ],
                tools: ['Amazon RDS', 'DynamoDB', 'AWS KMS']
            },
            {
                step: 4,
                title: 'Transit Encryption',
                description: 'Encrypt data in transit',
                details: [
                    'Configure SSL/TLS for all connections',
                    'Set up AWS Certificate Manager',
                    'Implement VPC endpoints for secure communication',
                    'Use AWS Direct Connect with encryption'
                ],
                tools: ['AWS Certificate Manager', 'VPC Endpoints', 'Direct Connect']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Encryption Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  Client Application                                        │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              TLS/SSL Encryption                     │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Load Balancer              │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │            SSL Termination                  │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Servers                    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Client-Side Encryption              │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              AWS KMS                                │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Customer Managed Keys               │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Encrypted Storage                      │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   S3        │  │    RDS      │                  │    │
        │  │  │ Encryption  │  │ Encryption  │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$500-1,500/month for medium enterprise',
        timeline: '2-3 weeks implementation'
    },
    'azure-iam': {
        title: 'Azure Identity & Access Management',
        description: 'Comprehensive IAM solution using Azure Active Directory',
        steps: [
            {
                step: 1,
                title: 'Azure AD Configuration',
                description: 'Set up Azure Active Directory with security features',
                details: [
                    'Configure Azure AD Premium P2 features',
                    'Set up conditional access policies',
                    'Enable identity protection',
                    'Configure privileged identity management (PIM)'
                ],
                tools: ['Azure AD', 'Conditional Access', 'Identity Protection', 'PIM']
            },
            {
                step: 2,
                title: 'Multi-Factor Authentication',
                description: 'Implement MFA for all users and applications',
                details: [
                    'Enable MFA for all user accounts',
                    'Configure app-specific passwords',
                    'Set up Azure MFA server for on-premise',
                    'Implement risk-based MFA policies'
                ],
                tools: ['Azure MFA', 'Microsoft Authenticator', 'Azure MFA Server']
            },
            {
                step: 3,
                title: 'Role-Based Access Control',
                description: 'Implement RBAC for Azure resources',
                details: [
                    'Create custom roles with specific permissions',
                    'Assign roles at appropriate scope levels',
                    'Implement just-in-time access',
                    'Set up access reviews and certifications'
                ],
                tools: ['Azure RBAC', 'Custom Roles', 'Access Reviews']
            },
            {
                step: 4,
                title: 'Monitoring & Auditing',
                description: 'Monitor and audit access activities',
                details: [
                    'Enable Azure AD audit logs',
                    'Set up Azure Monitor for IAM events',
                    'Configure security alerts',
                    'Implement compliance reporting'
                ],
                tools: ['Azure Monitor', 'Log Analytics', 'Security Center']
            }
        ],
        architecture: `
        ┌─────────────────────────────────────────────────────────────┐
        │                Azure IAM Architecture                       │
        ├─────────────────────────────────────────────────────────────┤
        │  Users & Devices                                          │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Multi-Factor Authentication            │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Azure Active Directory                 │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Conditional Access Policies         │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Identity Protection                 │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Privileged Identity Management     │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Azure Resources                        │    │
        │  │  ┌─────────────┐  ┌─────────────┐                  │    │
        │  │  │   VMs       │  │  Storage    │                  │    │
        │  │  │   Apps      │  │  Databases  │                  │    │
        │  │  └─────────────┘  └─────────────┘                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Monitoring & Auditing                  │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Azure Monitor                       │    │    │
        │  │  │         Log Analytics                       │    │    │
        │  │  │         Security Center                     │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        cost: '$1,500-3,000/month for medium enterprise',
        timeline: '3-4 weeks implementation'
    }
};

// Architecture Database
const architectureDatabase = {
    'zero-trust': {
        title: 'Zero Trust Security Architecture',
        description: 'Comprehensive zero trust implementation framework',
        components: [
            'Identity & Access Management',
            'Network Segmentation',
            'Data Protection',
            'Device Security',
            'Application Security',
            'Monitoring & Analytics'
        ],
        diagram: `
        ┌─────────────────────────────────────────────────────────────┐
        │                    Zero Trust Architecture                   │
        ├─────────────────────────────────────────────────────────────┤
        │  External Users & Devices                                  │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Identity Verification                  │    │
        │  │  • Multi-Factor Authentication                     │    │
        │  │  • Device Compliance Check                         │    │
        │  │  • Risk Assessment                                 │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Network Perimeter                      │    │
        │  │  • Software-Defined Perimeter (SDP)                │    │
        │  │  • Micro-segmentation                              │    │
        │  │  • Dynamic Access Control                          │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Application Layer                      │    │
        │  │  • API Gateway with Authentication                 │    │
        │  │  • Application-level Authorization                 │    │
        │  │  • Continuous Security Monitoring                  │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Data Layer                             │    │
        │  │  • Data Classification & Labeling                  │    │
        │  │  • Encryption at Rest & in Transit                 │    │
        │  │  • Data Loss Prevention (DLP)                      │    │
        │  └─────────────────────────────────────────────────────┘    │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Monitoring & Analytics                 │    │
        │  │  • Security Information & Event Management (SIEM)  │    │
        │  │  • User & Entity Behavior Analytics (UEBA)         │    │
        │  │  • Security Orchestration & Response (SOAR)        │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        implementation: [
            'Phase 1: Identity Foundation (Weeks 1-4)',
            'Phase 2: Network Segmentation (Weeks 5-8)',
            'Phase 3: Application Security (Weeks 9-12)',
            'Phase 4: Data Protection (Weeks 13-16)',
            'Phase 5: Monitoring & Optimization (Weeks 17-20)'
        ]
    },
    'cloud-security': {
        title: 'Multi-Cloud Security Framework',
        description: 'Comprehensive security framework for multi-cloud environments',
        components: [
            'Cloud Access Security Broker (CASB)',
            'Cloud Workload Protection',
            'Cloud Data Loss Prevention',
            'Cloud Security Posture Management',
            'Cloud Identity & Access Management',
            'Cloud Security Monitoring'
        ],
        diagram: `
        ┌─────────────────────────────────────────────────────────────┐
        │                Multi-Cloud Security Framework               │
        ├─────────────────────────────────────────────────────────────┤
        │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
        │  │     AWS     │  │    Azure    │  │     GCP     │        │
        │  │             │  │             │  │             │        │
        │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │        │
        │  │ │  IAM    │ │  │ │  Azure  │ │  │ │ Cloud   │ │        │
        │  │ │  KMS    │ │  │ │   AD    │ │  │ │  IAM    │ │        │
        │  │ │ GuardDuty│ │  │ │ Key Vault│ │  │ │ Security│ │        │
        │  │ └─────────┘ │  │ └─────────┘ │  │ │ Command │ │        │
        │  │             │  │             │  │ │ Center  │ │        │
        │  └─────────────┘  └─────────────┘  │ └─────────┘ │        │
        │                                   └─────────────┘        │
        │  ┌─────────────────────────────────────────────────────┐    │
        │  │              Centralized Security Layer             │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Cloud Access Security Broker        │    │    │
        │  │  │         (CASB)                             │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Security Orchestration              │    │    │
        │  │  │         & Response (SOAR)                  │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  │  ┌─────────────────────────────────────────────┐    │    │
        │  │  │         Security Information &              │    │    │
        │  │  │         Event Management (SIEM)            │    │    │
        │  │  └─────────────────────────────────────────────┘    │    │
        │  └─────────────────────────────────────────────────────┘    │
        └─────────────────────────────────────────────────────────────┘
        `,
        implementation: [
            'Phase 1: Cloud Discovery & Assessment (Weeks 1-2)',
            'Phase 2: CASB Implementation (Weeks 3-6)',
            'Phase 3: Workload Protection (Weeks 7-10)',
            'Phase 4: Data Protection (Weeks 11-14)',
            'Phase 5: Monitoring & Response (Weeks 15-18)'
        ]
    }
};

// Show solution details
function showSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;

    const modal = document.getElementById('solutionModal');
    const content = document.getElementById('solutionContent');
    
    content.innerHTML = `
        <div class="solution-detail">
            <h2>${solution.title}</h2>
            <p class="solution-description">${solution.description}</p>
            
            <div class="solution-steps">
                <h3>Implementation Steps</h3>
                ${solution.steps.map(step => `
                    <div class="step-item">
                        <div class="step-header">
                            <span class="step-number">${step.step}</span>
                            <h4>${step.title}</h4>
                        </div>
                        <p class="step-description">${step.description}</p>
                        <div class="step-details">
                            <h5>Implementation Details:</h5>
                            <ul>
                                ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="step-tools">
                            <h5>Tools & Services:</h5>
                            <div class="tools-list">
                                ${step.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="solution-architecture">
                <h3>Architecture Diagram</h3>
                <pre class="architecture-diagram">${solution.architecture}</pre>
            </div>
            
            <div class="solution-meta">
                <div class="meta-item">
                    <strong>Estimated Cost:</strong> ${solution.cost}
                </div>
                <div class="meta-item">
                    <strong>Timeline:</strong> ${solution.timeline}
                </div>
            </div>
            
            <div class="solution-actions">
                <button class="btn btn-primary" onclick="downloadSolution('${solutionId}')">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn btn-secondary" onclick="shareSolution('${solutionId}')">
                    <i class="fas fa-share"></i> Share Solution
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Show architecture details
function showArchitecture(archId) {
    const architecture = architectureDatabase[archId];
    if (!architecture) return;

    const modal = document.getElementById('solutionModal');
    const content = document.getElementById('solutionContent');
    
    content.innerHTML = `
        <div class="architecture-detail">
            <h2>${architecture.title}</h2>
            <p class="architecture-description">${architecture.description}</p>
            
            <div class="architecture-components">
                <h3>Key Components</h3>
                <div class="components-grid">
                    ${architecture.components.map(component => `
                        <div class="component-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${component}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="architecture-diagram-section">
                <h3>Architecture Diagram</h3>
                <pre class="architecture-diagram">${architecture.diagram}</pre>
            </div>
            
            <div class="implementation-phases">
                <h3>Implementation Phases</h3>
                <div class="phases-list">
                    ${architecture.implementation.map(phase => `
                        <div class="phase-item">
                            <i class="fas fa-arrow-right"></i>
                            <span>${phase}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="architecture-actions">
                <button class="btn btn-primary" onclick="downloadArchitecture('${archId}')">
                    <i class="fas fa-download"></i> Download Architecture
                </button>
                <button class="btn btn-secondary" onclick="shareArchitecture('${archId}')">
                    <i class="fas fa-share"></i> Share Architecture
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('solutionModal').style.display = 'none';
}

// Download solution
function downloadSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;
    
    // Create a comprehensive PDF content
    const pdfContent = generatePDFContent(solution);
    downloadAsPDF(pdfContent, `${solutionId}-solution.pdf`);
}

function generatePDFContent(solution) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${solution.title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                h2 { color: #1e293b; margin-top: 30px; }
                h3 { color: #475569; }
                .step { margin: 20px 0; padding: 15px; background: #f8fafc; border-left: 4px solid #2563eb; }
                .step-number { background: #2563eb; color: white; padding: 5px 10px; border-radius: 50%; display: inline-block; margin-right: 10px; }
                .tools { background: #e0f2fe; padding: 10px; border-radius: 5px; margin: 10px 0; }
                .architecture { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 5px; font-family: monospace; white-space: pre; }
                .meta { background: #f1f5f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <h1>${solution.title}</h1>
            <p><strong>Description:</strong> ${solution.description}</p>
            
            <h2>Implementation Steps</h2>
            ${solution.steps.map(step => `
                <div class="step">
                    <h3><span class="step-number">${step.step}</span>${step.title}</h3>
                    <p><strong>Description:</strong> ${step.description}</p>
                    <div class="tools">
                        <strong>Tools & Services:</strong> ${step.tools.join(', ')}
                    </div>
                    <h4>Implementation Details:</h4>
                    <ul>
                        ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            
            <h2>Architecture Diagram</h2>
            <div class="architecture">${solution.architecture}</div>
            
            <div class="meta">
                <p><strong>Estimated Cost:</strong> ${solution.cost}</p>
                <p><strong>Timeline:</strong> ${solution.timeline}</p>
            </div>
            
            <footer style="margin-top: 50px; text-align: center; color: #64748b;">
                <p>Generated by CyberTarget.cloud - Professional Technology Solutions</p>
                <p>Visit us at: https://cybertarget.cloud</p>
            </footer>
        </body>
        </html>
    `;
}

function downloadAsPDF(content, filename) {
    // Create a new window with the content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// Share solution
function shareSolution(solutionId) {
    const solution = solutionDatabase[solutionId];
    if (!solution) return;
    
    const url = `${window.location.origin}/ai-solutions.html#${solutionId}`;
    const shareText = `Check out this cybersecurity solution: ${solution.title}\n\n${url}\n\n#CyberSecurity #DevSecOps #CloudSecurity`;
    
    if (navigator.share) {
        navigator.share({
            title: solution.title,
            text: shareText,
            url: url
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(url, shareText);
        });
    } else {
        fallbackShare(url, shareText);
    }
}

function fallbackShare(url, shareText) {
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Solution link copied to clipboard! You can now share it on social media.');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Solution link copied to clipboard!');
    });
}

// Download architecture
function downloadArchitecture(archId) {
    const architecture = architectureDatabase[archId];
    if (!architecture) return;
    
    const pdfContent = generateArchitecturePDF(architecture);
    downloadAsPDF(pdfContent, `${archId}-architecture.pdf`);
}

function generateArchitecturePDF(architecture) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${architecture.title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                h2 { color: #1e293b; margin-top: 30px; }
                h3 { color: #475569; }
                .component { margin: 15px 0; padding: 10px; background: #f8fafc; border-left: 3px solid #2563eb; }
                .phase { margin: 15px 0; padding: 10px; background: #e0f2fe; border-radius: 5px; }
                .architecture { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 5px; font-family: monospace; white-space: pre; }
            </style>
        </head>
        <body>
            <h1>${architecture.title}</h1>
            <p><strong>Description:</strong> ${architecture.description}</p>
            
            <h2>Key Components</h2>
            ${architecture.components.map(component => `
                <div class="component">
                    <h3>${component}</h3>
                </div>
            `).join('')}
            
            <h2>Architecture Diagram</h2>
            <div class="architecture">${architecture.diagram}</div>
            
            <h2>Implementation Phases</h2>
            ${architecture.implementation.map(phase => `
                <div class="phase">
                    <h3>${phase}</h3>
                </div>
            `).join('')}
            
            <footer style="margin-top: 50px; text-align: center; color: #64748b;">
                <p>Generated by CyberTarget.cloud - Professional Technology Solutions</p>
                <p>Visit us at: https://cybertarget.cloud</p>
            </footer>
        </body>
        </html>
    `;
}

// Share architecture
function shareArchitecture(archId) {
    const url = `${window.location.origin}/ai-solutions.html#${archId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert('Architecture link copied to clipboard!');
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('solutionModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);
        
        this.init();
    }

    init() {
        // Add animation to solution cards
        document.querySelectorAll('.solution-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to attack cards
        document.querySelectorAll('.attack-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Add animation to architecture cards
        document.querySelectorAll('.arch-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    
    // Add smooth reveal animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.quick-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}